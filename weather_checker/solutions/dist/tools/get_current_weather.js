import { z } from "zod";
// ===== Puzzle 3: Tool — get_current_weather =====
// Tool นี้ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude
// ต้องมี input: latitude และ longitude
// API ที่ใช้: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
export function registerGetCurrentWeather(server) {
    server.registerTool("get_current_weather", {
        description: "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
        inputSchema: {
            // latitude คือ ละติจูด เช่น 13.75
            latitude: z.number().describe("latitude คือ ละติจูด เช่น 13.75"), // ใส่คำอธิบาย parameter เช่น "ละติจูด เช่น 13.75"
            // longitude คือ ลองจิจูด เช่น 100.5
            longitude: z.number().describe("longitude คือ ลองจิจูด เช่น 100.5"), // ใส่คำอธิบาย parameter เช่น "ลองจิจูด เช่น 100.5"
        },
    }, async ({ latitude, longitude }) => {
        // สร้าง URL สำหรับเรียก Open-Meteo API เพื่อดูสภาพอากาศปัจจุบัน
        // แทนที่ "___BLANK_3___" ด้วยชื่อ input parameter -> latitude
        // แทนที่ "___BLANK_4___" ด้วยชื่อ input parameter -> longitude
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const response = await fetch(url);
        // แปลง response เป็น JSON และดึงข้อมูลที่เราต้องการ
        const data = (await response.json());
        // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
        // {
        //   "current_weather": {
        //     "temperature": 32.5,
        //     "windspeed": 8.2,
        //     "winddirection": 180,
        //     "weathercode": 1,
        //     "time": "2026-04-02T14:00"
        //   }
        // }
        // ดึงข้อมูลสภาพอากาศปัจจุบันจาก response
        // ข้อมูลที่ได้จะมี: อุณหภูมิ, ความเร็วลม, ทิศทางลม, รหัสสภาพอากาศ, เวลา
        const weather = data.current_weather;
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    text: `🌡️ สภาพอากาศปัจจุบันที่พิกัด (${latitude}, ${longitude}):\n🌡️ อุณหภูมิ: ${weather.temperature}°C\n💨 ลม: ${weather.windspeed} km/h\n🧭 ทิศทางลม: ${weather.winddirection}°\n🕐 เวลา: ${weather.time}`,
                    // แทนที่ "___BLANK_5___" ด้วยข้อความนำหน้า เช่น "สภาพอากาศปัจจุบันที่พิกัด"
                    // ตัวอย่างข้อความที่แสดงผลจะเป็นประมาณนี้:
                    // 🌡️ สภาพอากาศปัจจุบันที่พิกัด (13.75, 100.5)
                    // 🌡️ อุณหภูมิ: 32.5°C
                    // 💨 ลม: 8.2 km/h
                    // 🧭 ทิศทางลม: 180°
                    // 🕐 เวลา: 2026-04-02T14:00
                },
            ],
        };
    });
}
