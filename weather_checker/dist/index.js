#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
// import { registerSearchLocation } from "./tools/search_location.js";       // ← Puzzle 2: uncomment
// import { registerGetCurrentWeather } from "./tools/get_current_weather.js"; // ← Puzzle 3: uncomment
// import { registerGetForecast } from "./tools/get_forecast.js";             // ← Puzzle 4: uncomment
// ===== Puzzle 1: สร้าง MCP Server =====
const server = new McpServer({
    name: "___BLANK_1___", // ใส่ชื่อ server เช่น "weather-checker"
    version: "___BLANK_2___", // ใส่เวอร์ชัน เช่น "1.0.0"
    description: "___BLANK_3___", // ใส่คำอธิบาย เช่น "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)"
});
// ===== ลงทะเบียน Tools =====
// registerSearchLocation(server);      // ← Puzzle 2: uncomment
// registerGetCurrentWeather(server);   // ← Puzzle 3: uncomment
// registerGetForecast(server);         // ← Puzzle 4: uncomment
// ===== Puzzle 1: เชื่อมต่อ Server กับ HTTP Transport (Streamable HTTP) =====
const app = ___BLANK_4___(); // ใส่ฟังก์ชันสร้าง Express app เช่น express
// สร้าง transport instance (รองรับหลาย session อัตโนมัติ)
const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => ___BLANK_5___(), // ใส่ฟังก์ชันสร้าง session ID เช่น randomUUID
});
// เชื่อมต่อ server กับ transport
await server.___BLANK_6___(transport); // ใส่ method เชื่อมต่อ server กับ transport เช่น "connect"
// MCP endpoint — client สื่อสารผ่าน endpoint เดียว (รองรับ GET, POST, DELETE)
app.all("/mcp", async (req, res) => {
    await transport.handleRequest(req, res);
});
// เริ่ม HTTP Server
const PORT = ___BLANK_7___; // ใส่ port number เช่น 3001
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
});
