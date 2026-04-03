#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ===== Puzzle 4: สร้าง MCP Server =====
// สร้าง instance ของ McpServer พร้อมตั้งชื่อและเวอร์ชัน
const server = new McpServer({
    name: "mango-company",
    version: "1.0.0",
    description: "MCP Server สำหรับเก็บข้อมูล Mango Company",
});

// ===== Puzzle 1: Tool — list_code_reviews =====
// Tool นี้แสดงรายการ Code Review ทั้งหมด
// ไม่มี input parameter
// API ที่ใช้: http://localhost:3000/api/code-reviews
server.tool(
    "list_code_reviews",
    "แสดงรายการ Code Review ทั้งหมด",
    {},
    async () => {
        const response = await fetch("http://localhost:3000/api/code-reviews");
        const data = (await response.json()) as {
            result: string;
            data: Array<{
                id: string;
                title: string;
                author: string;
                date: string;
            }>;
        };

        // สร้างรายการ review
        const reviewList = data.data
            .map((review) => `- ${review.title} (by ${review.author} on ${review.date})`)
            .join("\n");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `Code Review ทั้งหมด:\n${reviewList}`,
                },
            ],
        };
    }
);

// ===== Puzzle 2: Tool — get_project_structure =====
// Tool นี้ดึงโครงสร้าง Project ตามภาษาที่ระบุ
// ต้องมี input: language (Java, React, หรือ Flutter)
// API ที่ใช้: http://localhost:3000/api/projects/{language}
server.tool(
    "get_project_structure",
    "ดูโครงสร้าง Project ตามภาษาที่ระบุ",
    {
        language: z.string().describe("ภาษาที่ต้องการ: Java, React, หรือ Flutter"),
    },
    async ({ language }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `http://localhost:3000/api/projects/${encodeURIComponent(language)}`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            result: string;
            language: string;
            structure: {
                name: string;
                description: string;
                folders: string[];
                files: string[];
            };
        };

        const folderList = data.structure.folders.join("\n  - ");
        const fileList = data.structure.files.join("\n  - ");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `📁 ${data.structure.name} (${language})\n${data.structure.description}\n\n📂 Folders:\n  - ${folderList}\n\n📄 Key Files:\n  - ${fileList}`,
                },
            ],
        };
    }
);

// ===== Puzzle 3: Tool — get_team_member =====
// Tool นี้ดึงข้อมูลสมาชิกทีมตามชื่อหรือ ID
// ต้องมี input: member (ชื่อหรือ ID ของสมาชิก)
// API ที่ใช้: http://localhost:3000/api/team/{member}
server.tool(
    "get_team_member",
    "ดูข้อมูลสมาชิกทีม Mango Company",
    {
        member: z.string().describe("ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"),
    },
    async ({ member }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `http://localhost:3000/api/team/${encodeURIComponent(member)}`;
        const response = await fetch(url);
        const data = (await response.json()) as {
            result: string;
            member: {
                id: string;
                name: string;
                role: string;
                email: string;
                skills: string[];
                projects: string[];
            };
        };

        const skillsList = data.member.skills.join(", ");
        const projectsList = data.member.projects.join(", ");

        return {
            content: [
                {
                    type: "text" as const,
                    text: `👤 ${data.member.name}\n📧 Email: ${data.member.email}\n💼 Role: ${data.member.role}\n🛠️ Skills: ${skillsList}\n📌 Projects: ${projectsList}`,
                },
            ],
        };
    }
);

// ===== Puzzle 4: เชื่อมต่อ Server =====
// ส่วนนี้เชื่อมต่อ MCP Server กับ StdioServerTransport เพื่อรับ-ส่งข้อมูลผ่าน stdin/stdout
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Mango Company MCP Server is running...");
}

main().catch(console.error);
