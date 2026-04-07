#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerListCurrencies } from "./tools/list_currencies.js";
// import { registerGetExchangeRate } from "./tools/get_exchange_rate.js";
// import { registerConvertCurrency } from "./tools/convert_currency.js";
// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "___BLANK_1___",
    version: "___BLANK_2___",
    description: "___BLANK_3___",
});
// ===== ลงทะเบียน Tools =====
registerListCurrencies(server);
// registerGetExchangeRate(server);
// registerConvertCurrency(server);
// ===== เชื่อมต่อ Server กับ Transport =====
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("___BLANK_4___");
}
main().catch(console.error);
