#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerListCurrencies } from "./tools/list_currencies.js";
import { registerGetExchangeRate } from "./tools/get_exchange_rate.js";
import { registerConvertCurrency } from "./tools/convert_currency.js";
// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "Currency Converter", // ใส่ชื่อ server เช่น "Currency Converter"
    version: "1.0.0", // ใส่เวอร์ชันของ server เช่น "1.0.0"
    description: "MCP Server สำหรับแปลงสกุลเงินและดูอัตราแลกเปลี่ยน", // ใส่คำอธิบาย server เช่น "MCP Server สำหรับแปลงสกุลเงินและดูอัตราแลกเปลี่ยน"
});
// ===== ลงทะเบียน Tools =====
registerListCurrencies(server);
registerGetExchangeRate(server);
registerConvertCurrency(server);
// ===== เชื่อมต่อ Server กับ Transport =====
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // เมื่อ server พร้อมทำงานแล้ว ให้แสดงข้อความนี้ใน console.log เพื่อให้ผู้ใช้รู้ว่า server พร้อมแล้ว
    // คุณจะเติมข้อความอะไรลงในช่อง ___BLANK_4___ เพื่อบอกผู้ใช้ว่า server พร้อมแล้ว? 
    // เช่น "Currency Converter MCP Server is ready!"
    console.warn("Currency Converter MCP Server is ready");
}
main().catch(console.error);
