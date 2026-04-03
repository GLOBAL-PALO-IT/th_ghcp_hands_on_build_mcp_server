import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetExchangeRate(server: McpServer) {
    server.tool(
        "get_exchange_rate",
        "ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน",
        {
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
        },
        async ({ from, to }) => {
            const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
            const response = await fetch(url);
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                time_last_update_utc: string;
                rates: Record<string, number>;
            };

            const rate = data.rates[to.toUpperCase()];

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (อัปเดตล่าสุด: ${data.time_last_update_utc})`,
                    },
                ],
            };
        }
    );
}
