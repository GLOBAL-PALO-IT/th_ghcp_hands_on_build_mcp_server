#!/usr/bin/env node

import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerSearchLocation } from "./tools/search_location.js";
import { registerGetCurrentWeather } from "./tools/get_current_weather.js";
import { registerGetForecast } from "./tools/get_forecast.js";

// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "weather-checker",
    version: "1.0.0",
    description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});

// ===== ลงทะเบียน Tools =====
registerSearchLocation(server);
registerGetCurrentWeather(server);
registerGetForecast(server);

// ===== เชื่อมต่อ Server กับ HTTP Transport (Streamable HTTP) =====
const app = express();

// สร้าง transport instance (รองรับหลาย session อัตโนมัติ)
const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
});

// เชื่อมต่อ server กับ transport
await server.connect(transport);

// MCP endpoint — client สื่อสารผ่าน endpoint เดียว (รองรับ GET, POST, DELETE)
app.all("/mcp", async (req: express.Request, res: express.Response) => {
    await transport.handleRequest(req, res);
});

// เริ่ม HTTP Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
    console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
});
