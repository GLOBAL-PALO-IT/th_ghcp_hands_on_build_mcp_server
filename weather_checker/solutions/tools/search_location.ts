import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerSearchLocation(server: McpServer) {
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
}
