import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCurrencies(server: McpServer) {
    server.tool(
        "list_currencies",
        "แสดงรายการสกุลเงินทั้งหมดที่รองรับ",
        {},
        async () => {
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                rates: Record<string, number>;
            };

            const currencyList = Object.keys(data.rates).join(", ");

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `สกุลเงินที่รองรับ:\n${currencyList}`,
                    },
                ],
            };
        }
    );
}
