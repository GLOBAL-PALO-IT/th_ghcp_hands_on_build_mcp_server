#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "currency-converter",
    version: "1.0.0",
    description: "MCP Server สำหรับแปลงสกุลเงิน",
});

// ===== Tool 1: list_currencies =====
// แสดงรายการสกุลเงินทั้งหมดที่รองรับ
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

// ===== Tool 2: get_exchange_rate =====
// ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน
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

// ===== Tool 3: convert_currency =====
// แปลงจำนวนเงินจากสกุลหนึ่งไปอีกสกุลหนึ่ง
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

// ===== เชื่อมต่อ Server กับ Transport =====
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Currency Converter MCP Server is running...");
}

main().catch(console.error);
