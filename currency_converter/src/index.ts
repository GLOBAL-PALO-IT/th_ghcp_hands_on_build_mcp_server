#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ===== Puzzle 4: สร้าง MCP Server =====
// สร้าง instance ของ McpServer พร้อมตั้งชื่อและเวอร์ชัน
const server = new McpServer({
    name: "___BLANK_1___",       // ใส่ชื่อ server เช่น "currency-converter"
    version: "___BLANK_2___",    // ใส่เวอร์ชัน เช่น "1.0.0"
    description: "MCP Server สำหรับแปลงสกุลเงิน",
});

// ===== Puzzle 1: Tool — list_currencies =====
// Tool นี้แสดงรายการสกุลเงินทั้งหมดที่ API รองรับ
// ไม่มี input parameter
server.tool(
    "___BLANK_3___",           // ใส่ชื่อ tool เช่น "list_currencies"
    "___BLANK_4___",           // ใส่คำอธิบาย tool เช่น "แสดงรายการสกุลเงินทั้งหมดที่รองรับ"
    {},                        // ไม่มี input parameters
    async () => {
        const response = await fetch("___BLANK_5___"); // ใส่ URL ของ API: https://api.frankfurter.app/currencies
        const data = (await response.json()) as Record<string, string>;

        // แปลง object เป็น string แสดงผล
        const currencyList = Object.entries(data)
            .map(([code, name]) => `${code}: ${name}`)
            .join("\n");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `___BLANK_6___${currencyList}`, // ใส่ข้อความนำหน้า เช่น "สกุลเงินที่รองรับ:\n"
                },
            ],
        };
    }
);

// ===== Puzzle 2: Tool — get_exchange_rate =====
// Tool นี้ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน
// ต้องมี input: from (สกุลเงินต้นทาง) และ to (สกุลเงินปลายทาง)
server.tool(
    "get_exchange_rate",
    "ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน",
    {
        from: z.___BLANK_7___,   // ใส่ Zod schema: string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD")
        to: z.___BLANK_8___,     // ใส่ Zod schema: string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB")
    },
    async ({ from, to }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `___BLANK_9___`; // ใส่ URL: https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}
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

// ===== Puzzle 3: Tool — convert_currency =====
// Tool นี้แปลงจำนวนเงินจากสกุลหนึ่งไปอีกสกุลหนึ่ง
// ต้องมี input: amount, from, to
server.tool(
    "convert_currency",
    "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง",
    {
        amount: z.___BLANK_10___, // ใส่ Zod schema: number().positive().describe("จำนวนเงินที่ต้องการแปลง")
        from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
        to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
    },
    async ({ amount, from, to }) => {
        // สร้าง URL สำหรับเรียก API พร้อมจำนวนเงิน
        const url = `___BLANK_11___`; // ใส่ URL: https://api.frankfurter.app/latest?amount=${amount}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}
        const response = await fetch(url);
        const data = (await response.json()) as {
            amount: number;
            base: string;
            date: string;
            rates: Record<string, number>;
        };

        const result = ___BLANK_12___; // ดึงผลลัพธ์จาก data: data.rates[to.toUpperCase()]

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

// ===== Puzzle 4: เชื่อมต่อ Server =====
// ส่วนนี้เชื่อมต่อ MCP Server กับ StdioServerTransport เพื่อรับ-ส่งข้อมูลผ่าน stdin/stdout
async function main() {
    const transport = new ___BLANK_13___(); // ใส่ class: StdioServerTransport
    await server.___BLANK_14___(transport); // ใส่ method: connect
    console.error("Currency Converter MCP Server is running...");
}

main().catch(console.error);
