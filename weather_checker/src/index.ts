#!/usr/bin/env node

import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

// ===== Puzzle 4: สร้าง MCP Server =====
// สร้าง instance ของ McpServer พร้อมตั้งชื่อและเวอร์ชัน
const server = new McpServer({
    name: "___BLANK_1___",       // ใส่ชื่อ server เช่น "weather-checker"
    version: "___BLANK_2___",    // ใส่เวอร์ชัน เช่น "1.0.0"
    description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});

// ===== Puzzle 1: Tool — search_location =====
// Tool นี้ค้นหาตำแหน่ง (ชื่อเมือง) เพื่อรับพิกัด latitude/longitude
// มี input parameter: query (ชื่อเมืองที่ต้องการค้นหา)
// API ที่ใช้: https://geocoding-api.open-meteo.com/v1/search?name={query}&count=5&language=th
server.tool(
    "___BLANK_3___",           // ใส่ชื่อ tool เช่น "search_location"
    "___BLANK_4___",           // ใส่คำอธิบาย tool เช่น "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude"
    {
        query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
    },
    async ({ query }) => {
        const url = `https://geocoding-api.open-meteo.com/v1/___BLANK_5___?name=${encodeURIComponent(query)}&count=5&language=th`; // ใส่ endpoint เช่น "search"
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
                    text: `___BLANK_6___${locationList}`, // ใส่ข้อความนำหน้า เช่น "ผลการค้นหาตำแหน่ง:\n"
                },
            ],
        };
    }
);

// ===== Puzzle 2: Tool — get_current_weather =====
// Tool นี้ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude
// ต้องมี input: latitude และ longitude
// API ที่ใช้: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
server.tool(
    "get_current_weather",
    "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
    {
        latitude: z.___BLANK_7___().describe("ละติจูด เช่น 13.75"),     // ใส่ชนิดข้อมูล Zod เช่น "number"
        longitude: z.___BLANK_8___().describe("ลองจิจูด เช่น 100.5"),   // ใส่ชนิดข้อมูล Zod เช่น "number"
    },
    async ({ latitude, longitude }) => {
        const url = `https://api.open-meteo.com/v1/___BLANK_9___?latitude=${latitude}&longitude=${longitude}&current_weather=true`; // ใส่ endpoint เช่น "forecast"
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

        const weather = data.___BLANK_10___; // ใส่ชื่อ property ที่เก็บข้อมูลอากาศ เช่น "current_weather"

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

// ===== Puzzle 3: Tool — get_forecast =====
// Tool นี้ดูพยากรณ์อากาศล่วงหน้า
// ต้องมี input: latitude, longitude, days
// API: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days={days}
server.tool(
    "get_forecast",
    "ดูพยากรณ์อากาศล่วงหน้าหลายวัน",
    {
        latitude: z.number().describe("ละติจูด เช่น 13.75"),
        longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
        days: z.___BLANK_11___().min(1).max(16).describe("จำนวนวันที่ต้องการพยากรณ์ (1-16)"), // ใส่ชนิดข้อมูล Zod เช่น "number"
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
                const rain = data.daily.___BLANK_12___[i]; // ใส่ชื่อ property สำหรับปริมาณฝน เช่น "precipitation_sum"
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

// ===== Puzzle 4: เชื่อมต่อ Server กับ HTTP Transport (SSE) =====
const app = ___BLANK_13___(); // ใส่ฟังก์ชันสร้าง Express app เช่น "express"

// เก็บ transport instances สำหรับแต่ละ session
const transports: Record<string, SSEServerTransport> = {};

// SSE endpoint — client เชื่อมต่อที่นี่
app.get("/sse", async (_req: express.Request, res: express.Response) => {
    const transport = new SSEServerTransport("/___BLANK_14___", res); // ใส่ path สำหรับรับ message เช่น "messages"
    transports[transport.sessionId] = transport;

    res.on("close", () => {
        delete transports[transport.sessionId];
    });

    await server.___BLANK_15___(transport); // ใส่ method สำหรับเชื่อมต่อ เช่น "connect"
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
const PORT = ___BLANK_16___; // ใส่ port number เช่น 3001
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});
