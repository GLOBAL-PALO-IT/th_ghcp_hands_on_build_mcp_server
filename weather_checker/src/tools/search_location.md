import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 1: Tool — search_location =====
// Tool นี้ค้นหาตำแหน่ง (ชื่อเมือง) เพื่อรับพิกัด latitude/longitude
// มี input parameter: query (ชื่อเมืองที่ต้องการค้นหา)
// API ที่ใช้: https://geocoding-api.open-meteo.com/v1/search?name={query}&count=5&language=th

export function registerSearchLocation(server: McpServer) {
    server.tool(
        "___BLANK_1___",           // ใส่ชื่อ tool เช่น "search_location"
        "___BLANK_2___",           // ใส่คำอธิบาย tool เช่น "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude"
        {
            query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
        },
        async ({ query }) => {
            const url = `https://geocoding-api.open-meteo.com/v1/___BLANK_3___?name=${encodeURIComponent(query)}&count=5&language=th`; // ใส่ endpoint เช่น "search"
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
                        text: `___BLANK_4___${locationList}`, // ใส่ข้อความนำหน้า เช่น "ผลการค้นหาตำแหน่ง:\n"
                    },
                ],
            };
        }
    );
}
