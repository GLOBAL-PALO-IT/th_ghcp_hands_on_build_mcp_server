#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerListCodeReviews } from "./tools/list_code_reviews.js";
import { registerGetProjectStructure } from "./tools/get_project_structure.js";
import { registerGetTeamMember } from "./tools/get_team_member.js";

// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "mango-company",
    version: "1.0.0",
    description: "MCP Server สำหรับเก็บข้อมูล Mango Company",
});

// ===== ลงทะเบียน Tools =====
registerListCodeReviews(server);
registerGetProjectStructure(server);
registerGetTeamMember(server);

// ===== เชื่อมต่อ Server กับ Transport =====
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Mango Company MCP Server is running...");
}

main().catch(console.error);
