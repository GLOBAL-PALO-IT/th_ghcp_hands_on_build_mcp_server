import { z } from "zod";
// ===== Puzzle 2: Tool — search_location =====
// Tool นี้ค้นหาตำแหน่ง (ชื่อเมือง) เพื่อรับพิกัด latitude/longitude
// มี input parameter: query (ชื่อเมืองที่ต้องการค้นหา)
// API ที่ใช้: https://geocoding-api.open-meteo.com/v1/search?name={query}&count=5&language=th
export function registerSearchLocation(server) {
    server.registerTool("search_location", // ใส่ชื่อ tool เช่น "search_location"
    {
        description: "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude", // ใส่คำอธิบาย tool เช่น "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude"
        inputSchema: {
            // query คือ ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok
            query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
        },
    }, async ({ query }) => {
        // สร้าง URL สำหรับเรียก Geocoding API เพื่อค้นหาตำแหน่งเมือง
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=th`; // ใส่ endpoint เช่น "search"
        const response = await fetch(url);
        // แปลง response เป็น JSON และดึงข้อมูลที่เราต้องการ
        const data = (await response.json());
        // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
        // {
        //   "results": [
        //     {
        //       "name": "กรุงเทพมหานคร",
        //       "latitude": 13.7525,
        //       "longitude": 100.49361,
        //       "country": "Thailand",
        //       "admin1": "Bangkok"
        //     }
        //   ]
        // }
        // ถ้าไม่พบตำแหน่งที่ค้นหา ให้ส่งกลับข้อความบอกผู้ใช้
        if (!data.results || data.results.length === 0) {
            return {
                content: [{ type: "text", text: `ไม่พบตำแหน่งสำหรับ "${query}"` }],
            };
        }
        // แปลงผลลัพธ์ทั้งหมดเป็น string แสดงผลเป็นรายการ
        // แต่ละรายการจะแสดง: ชื่อเมือง, จังหวัด/รัฐ, ประเทศ (พร้อมพิกัด)
        const locationList = data.results
            .map((loc, i) => `${i + 1}. ${loc.name}, ${loc.admin1 ?? ""} ${loc.country} (lat: ${loc.latitude}, lon: ${loc.longitude})`)
            .join("\n");
        // ตัวอย่างข้อความที่แสดงผลจะเป็นประมาณนี้:
        // 1. กรุงเทพมหานคร, Bangkok Thailand (lat: 13.7525, lon: 100.49361)
        // 2. ภูเก็ต, Phuket Thailand (lat: 7.88044, lon: 98.3923)
        // ...
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    text: `ผลการค้นหาตำแหน่ง ${locationList}`, // ใส่ข้อความนำหน้า เช่น "ผลการค้นหาตำแหน่ง:"
                },
            ],
        };
    });
}
