#!/usr/bin/env node

import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "weather-checker",
    version: "1.0.0",
    description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});

// ===== Tool 1: search_location =====
// ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude
server.tool(
    "search_location",
    "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude",
    {
        query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
    },
    async ({ query }) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=th`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            results?: Array<{
                name: string;
                latitude: number;
                longitude: number;
                country: string;
                admin1?: string;
            }>;
        };

        if (!data.results || data.results.length === 0) {
            return {
                content: [{ type: "text" as const, text: `ไม่พบตำแหน่งสำหรับ "${query}"` }],
            };
        }

        const locationList = data.results
            .map((loc, i) => `${i + 1}. ${loc.name}, ${loc.admin1 ?? ""} ${loc.country} (lat: ${loc.latitude}, lon: ${loc.longitude})`)
            .join("\n");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `ผลการค้นหาตำแหน่ง:\n${locationList}`,
                },
            ],
        };
    }
);

// ===== Tool 2: get_current_weather =====
// ดูสภาพอากาศปัจจุบันจากพิกัด
server.tool(
    "get_current_weather",
    "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
    {
        latitude: z.number().describe("ละติจูด เช่น 13.75"),
        longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
    },
    async ({ latitude, longitude }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            current_weather: {
                temperature: number;
                windspeed: number;
                winddirection: number;
                weathercode: number;
                time: string;
            };
        };

        const weather = data.current_weather;

        return {
            content: [
                {
                    type: "text" as const,
                    text: `🌡️ สภาพอากาศปัจจุบัน (${latitude}, ${longitude}):\n🌡️ อุณหภูมิ: ${weather.temperature}°C\n💨 ลม: ${weather.windspeed} km/h\n🧭 ทิศทางลม: ${weather.winddirection}°\n🕐 เวลา: ${weather.time}`,
                },
            ],
        };
    }
);

// ===== Tool 3: get_forecast =====
// ดูพยากรณ์อากาศล่วงหน้า
server.tool(
    "get_forecast",
    "ดูพยากรณ์อากาศล่วงหน้าหลายวัน",
    {
        latitude: z.number().describe("ละติจูด เช่น 13.75"),
        longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
        days: z.number().min(1).max(16).describe("จำนวนวันที่ต้องการพยากรณ์ (1-16)"),
    },
    async ({ latitude, longitude, days }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${days}`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            daily: {
                time: string[];
                temperature_2m_max: number[];
                temperature_2m_min: number[];
                precipitation_sum: number[];
            };
        };

        const forecastList = data.daily.time
            .map((date, i) => {
                const maxTemp = data.daily.temperature_2m_max[i];
                const minTemp = data.daily.temperature_2m_min[i];
                const rain = data.daily.precipitation_sum[i];
                return `📅 ${date}: 🌡️ ${minTemp}°C - ${maxTemp}°C | 🌧️ ฝน: ${rain} mm`;
            })
            .join("\n");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `📊 พยากรณ์อากาศ ${days} วัน (${latitude}, ${longitude}):\n${forecastList}`,
                },
            ],
        };
    }
);

// ===== เชื่อมต่อ Server กับ HTTP Transport (SSE) =====
const app = express();

// เก็บ transport instances สำหรับแต่ละ session
const transports: Record<string, SSEServerTransport> = {};

// SSE endpoint — client เชื่อมต่อที่นี่
app.get("/sse", async (_req: express.Request, res: express.Response) => {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;

    res.on("close", () => {
        delete transports[transport.sessionId];
    });

    await server.connect(transport);
});

// Message endpoint — client ส่ง message มาที่นี่
app.post("/messages", async (req: express.Request, res: express.Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];

    if (!transport) {
        res.status(400).json({ error: "Invalid session ID" });
        return;
    }

    await transport.handlePostMessage(req, res);
});

// เริ่ม HTTP Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});
