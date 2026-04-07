import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetCurrentWeather(server: McpServer) {
    server.registerTool(
        "get_current_weather",
        {
            description: "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
            inputSchema: {
                latitude: z.number().describe("ละติจูด เช่น 13.75"),
                longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
            },
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
}
