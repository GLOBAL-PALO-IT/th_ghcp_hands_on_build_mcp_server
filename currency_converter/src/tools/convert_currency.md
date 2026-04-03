import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 4: Tool — convert_currency =====
// Tool นี้แปลงจำนวนเงินจากสกุลหนึ่งไปอีกสกุลหนึ่ง
// ต้องมี input: amount, from, to
// API นี้ไม่รองรับ amount parameter — ต้องคำนวณเอง: amount * rate

export function registerConvertCurrency(server: McpServer) {
    server.tool(
        "convert_currency",
        "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง",
        {
            amount: z.___BLANK_1___().positive().describe("จำนวนเงินที่ต้องการแปลง"), // ใส่ชนิดข้อมูล Zod เช่น "number"
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
        },
        async ({ amount, from, to }) => {
            // เรียก API ดึงอัตราแลกเปลี่ยน
            const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
            const response = await fetch(url);
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                time_last_update_utc: string;
                rates: Record<string, number>;
            };

            const rate = data.rates[to.toUpperCase()];
            const result = ___BLANK_2___ * rate; // ใส่ตัวแปรที่เก็บจำนวนเงิน เช่น "amount"

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `💰 ${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}\n📅 อัปเดตล่าสุด: ${data.time_last_update_utc}`,
                    },
                ],
            };
        }
    );
}
