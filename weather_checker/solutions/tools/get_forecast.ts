import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetForecast(server: McpServer) {
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
}
