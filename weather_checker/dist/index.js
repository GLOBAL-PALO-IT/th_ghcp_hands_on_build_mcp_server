#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
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
// ===== Puzzle 1: เชื่อมต่อ Server กับ HTTP Transport (SSE) =====
const app = ___BLANK_4___(); // ใส่ฟังก์ชันสร้าง Express app เช่น express
// เก็บ transport instances สำหรับแต่ละ session
const transports = {};
// SSE endpoint — client เชื่อมต่อที่นี่
app.get("/sse", async (_req, res) => {
    const transport = new SSEServerTransport("/___BLANK_5___", res); // ใส่ path สำหรับรับ message เช่น "messages"
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.___BLANK_6___(transport); // ใส่ method เชื่อมต่อ server กับ transport เช่น "connect"
});
// Message endpoint — client ส่ง message มาที่นี่
app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[sessionId];
    if (!transport) {
        res.status(400).json({ error: "Invalid session ID" });
        return;
    }
    await transport.handlePostMessage(req, res);
});
// เริ่ม HTTP Server
const PORT = ___BLANK_7___; // ใส่ port number เช่น 3001
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});
