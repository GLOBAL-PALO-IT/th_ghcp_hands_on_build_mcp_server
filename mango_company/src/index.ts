#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { registerListCodeReviews } from "./tools/list_code_reviews.js";           // ← Puzzle 3: uncomment
// import { registerGetProjectStructure } from "./tools/get_project_structure.js";   // ← Puzzle 4: uncomment
// import { registerGetTeamMember } from "./tools/get_team_member.js";               // ← Puzzle 5: uncomment

// ===== สร้าง MCP Server =====
const server = new McpServer({
    name: "___BLANK_1___",
    version: "___BLANK_2___",
    description: "___BLANK_3___",
});

// ===== ลงทะเบียน Tools =====
// registerListCodeReviews(server);      // ← Puzzle 3: uncomment
// registerGetProjectStructure(server);  // ← Puzzle 4: uncomment
// registerGetTeamMember(server);        // ← Puzzle 5: uncomment

// ===== เชื่อมต่อ Server กับ Transport =====
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // เมื่อ server พร้อมทำงานแล้ว ให้แสดงข้อความนี้ใน console.error เพื่อให้ผู้ใช้รู้ว่า server พร้อมแล้ว
    // คุณจะเติมข้อความอะไรลงในช่อง ___BLANK_4___ เพื่อบอกผู้ใช้ว่า server พร้อมแล้ว?
    // เช่น "Mango Company MCP Server is running..."
    console.error("___BLANK_4___");
}

main().catch(console.error);
