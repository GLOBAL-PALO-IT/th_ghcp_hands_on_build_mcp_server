import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerConvertCurrency(server: McpServer) {
    server.tool(
        "convert_currency",
        "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง",
        {
            amount: z.number().positive().describe("จำนวนเงินที่ต้องการแปลง"),
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
        },
        async ({ amount, from, to }) => {
            const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
            const response = await fetch(url);
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                time_last_update_utc: string;
                rates: Record<string, number>;
            };

            const rate = data.rates[to.toUpperCase()];
            const result = amount * rate;

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
