import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 4: Tool — get_forecast =====
// Tool นี้ดูพยากรณ์อากาศล่วงหน้า
// ต้องมี input: latitude, longitude, days
// API: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days={days}

export function registerGetForecast(server: McpServer) {
    server.registerTool(
        "get_forecast",
        {
            description: "ดูพยากรณ์อากาศล่วงหน้าหลายวัน",
            inputSchema: {
                // latitude คือ ละติจูด เช่น 13.75
                latitude: z.number().describe("___BLANK_1___"),
                // longitude คือ ลองจิจูด เช่น 100.5
                longitude: z.number().describe("___BLANK_2___"),
                // days คือ จำนวนวันที่ต้องการพยากรณ์ (1-16)
                days: z.number().min(1).max(16).describe("___BLANK_3___"), // ใส่คำอธิบาย parameter เช่น "จำนวนวันที่ต้องการพยากรณ์ (1-16)"
            },
        },
        async ({ latitude, longitude, days }) => {
            // สร้าง URL สำหรับเรียก Open-Meteo API เพื่อดูพยากรณ์อากาศรายวัน
            // แทนที่ "___BLANK_4___" ด้วยชื่อ input parameter -> latitude
            // แทนที่ "___BLANK_5___" ด้วยชื่อ input parameter -> longitude
            // แทนที่ "___BLANK_6___" ด้วยชื่อ input parameter -> days
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${"___BLANK_4___"}&longitude=${"___BLANK_5___"}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${"___BLANK_6___"}`;
            const response = await fetch(url);

            // แปลง response เป็น JSON และดึงข้อมูลที่เราต้องการ
            const data = (await response.json()) as {
                daily: {
                    time: string[];
                    temperature_2m_max: number[];
                    temperature_2m_min: number[];
                    precipitation_sum: number[];
                };
            };
            // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
            // {
            //   "daily": {
            //     "time": ["2026-04-02", "2026-04-03", "2026-04-04"],
            //     "temperature_2m_max": [35.2, 34.8, 33.1],
            //     "temperature_2m_min": [26.1, 25.9, 26.3],
            //     "precipitation_sum": [0.0, 2.5, 15.3]
            //   }
            // }

            // วนลูปแสดงผลพยากรณ์อากาศแต่ละวัน
            // แต่ละวันจะแสดง: วันที่, อุณหภูมิต่ำสุด-สูงสุด, ปริมาณฝน
            const forecastList = data.daily.time
                .map((date, i) => {
                    // maxTemp คือ อุณหภูมิสูงสุดของวันนั้น เช่น 35.2
                    const maxTemp = data.daily.temperature_2m_max[i];
                    // minTemp คือ อุณหภูมิต่ำสุดของวันนั้น เช่น 26.1
                    const minTemp = data.daily.temperature_2m_min[i];
                    // rain คือ ปริมาณฝนรวมของวันนั้น เช่น 0.0
                    const rain = data.daily.precipitation_sum[i];

                    // ส่งกลับข้อความสำหรับแต่ละวันในรูปแบบ:
                    // 📅 2026-04-02: 🌡️ 26.1°C - 35.2°C | 🌧️ ฝน: 0.0 mm
                    return `📅 ${date}: 🌡️ ${minTemp}°C - ${maxTemp}°C | 🌧️ ฝน: ${rain} mm`;
                })
                .join("\n");

            // ส่งกลับข้อความที่จะแสดงใน UI ของ client
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `📊 ___BLANK_7___ ${days} วัน (${latitude}, ${longitude}):\n${forecastList}`,
                        // แทนที่ "___BLANK_7___" ด้วยข้อความนำหน้า เช่น "พยากรณ์อากาศ"
                        // ตัวอย่างข้อความที่แสดงผลจะเป็นประมาณนี้:
                        // 📊 พยากรณ์อากาศ 3 วัน (13.75, 100.5)
                        // 📅 2026-04-02: 🌡️ 26.1°C - 35.2°C | 🌧️ ฝน: 0.0 mm
                        // 📅 2026-04-03: 🌡️ 25.9°C - 34.8°C | 🌧️ ฝน: 2.5 mm
                        // 📅 2026-04-04: 🌡️ 26.3°C - 33.1°C | 🌧️ ฝน: 15.3 mm
                    },
                ],
            };
        }
    );
}
