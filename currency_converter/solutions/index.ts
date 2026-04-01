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
        const response = await fetch("https://api.frankfurter.app/currencies");
        const data = (await response.json()) as Record<string, string>;

        const currencyList = Object.entries(data)
            .map(([code, name]) => `${code}: ${name}`)
            .join("\n");

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
        const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            base: string;
            date: string;
            rates: Record<string, number>;
        };

        const rate = data.rates[to.toUpperCase()];

        return {
            content: [
                {
                    type: "text" as const,
                    text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (ข้อมูลวันที่ ${data.date})`,
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
        const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            amount: number;
            base: string;
            date: string;
            rates: Record<string, number>;
        };

        const result = data.rates[to.toUpperCase()];

        return {
            content: [
                {
                    type: "text" as const,
                    text: `💰 ${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}\n📅 อัตราแลกเปลี่ยน ณ วันที่ ${data.date}`,
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
