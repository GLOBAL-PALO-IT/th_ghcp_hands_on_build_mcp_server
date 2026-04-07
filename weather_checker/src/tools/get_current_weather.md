import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 2: Tool — get_current_weather =====
// Tool นี้ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude
// ต้องมี input: latitude และ longitude
// API ที่ใช้: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true

export function registerGetCurrentWeather(server: McpServer) {
    server.tool(
        "get_current_weather",
        "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
        {
            latitude: z.___BLANK_1___().describe("ละติจูด เช่น 13.75"),     // ใส่ชนิดข้อมูล Zod เช่น "number"
            longitude: z.___BLANK_2___().describe("ลองจิจูด เช่น 100.5"),   // ใส่ชนิดข้อมูล Zod เช่น "number"
        },
        async ({ latitude, longitude }) => {
            const url = `https://api.open-meteo.com/v1/___BLANK_3___?latitude=${latitude}&longitude=${longitude}&current_weather=true`; // ใส่ endpoint เช่น "forecast"
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

            const weather = data.___BLANK_4___; // ใส่ชื่อ property ที่เก็บข้อมูลอากาศ เช่น "current_weather"

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
}
