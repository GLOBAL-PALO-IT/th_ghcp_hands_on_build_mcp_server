#!/usr/bin/env node
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
// import { registerSearchLocation } from "./tools/search_location.js";
// import { registerGetCurrentWeather } from "./tools/get_current_weather.js";
// import { registerGetForecast } from "./tools/get_forecast.js";
// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "weather-checker",
    version: "1.0.0",
    description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});
// ===== ลงทะเบียน Tools =====
// registerSearchLocation(server);
// registerGetCurrentWeather(server);
// registerGetForecast(server);
// ===== เชื่อมต่อ Server กับ HTTP Transport (SSE) =====
const app = express();
// เก็บ transport instances สำหรับแต่ละ session
const transports = {};
// SSE endpoint — client เชื่อมต่อที่นี่
app.get("/sse", async (_req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
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
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});
