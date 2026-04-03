#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ===== Puzzle 4: สร้าง MCP Server =====
// สร้าง instance ของ McpServer พร้อมตั้งชื่อและเวอร์ชัน
const server = new McpServer({
    name: "___BLANK_1___",       // ใส่ชื่อ server เช่น "mango-company"
    version: "___BLANK_2___",    // ใส่เวอร์ชัน เช่น "1.0.0"
    description: "MCP Server สำหรับเก็บข้อมูล Mango Company",
});

// ===== Puzzle 1: Tool — list_code_reviews =====
// Tool นี้แสดงรายการ Code Review ทั้งหมด
// ไม่มี input parameter
// API ที่ใช้: http://localhost:3000/api/code-reviews
server.tool(
    "___BLANK_3___",           // ใส่ชื่อ tool เช่น "list_code_reviews"
    "___BLANK_4___",           // ใส่คำอธิบาย tool เช่น "แสดงรายการ Code Review ทั้งหมด"
    {},                        // ไม่มี input parameters
    async () => {
        const response = await fetch("___BLANK_5___"); // ใส่ URL ของ API: http://localhost:3000/api/code-reviews
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
                    text: `___BLANK_6___${reviewList}`, // ใส่ข้อความนำหน้า เช่น "Code Review ทั้งหมด:\n"
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
        language: z.___BLANK_7___().describe("ภาษาที่ต้องการ: Java, React, หรือ Flutter"),   // ใส่ชนิดข้อมูล Zod เช่น "string"
    },
    async ({ language }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `http://localhost:3000/api/___BLANK_8___/${encodeURIComponent(language)}`; // ใส่ API endpoint เช่น "projects"
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

        const folderList = data.___BLANK_9___.folders.join("\n  - ");
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
        member: z.___BLANK_10___().describe("ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"),   // ใส่ชนิดข้อมูล Zod เช่น "string"
    },
    async ({ member }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `http://localhost:3000/api/___BLANK_11___/${encodeURIComponent(member)}`; // ใส่ API endpoint เช่น "team"
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

        const skillsList = data.___BLANK_12___.skills.join(", ");
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
    const transport = new ___BLANK_13___(); // ใส่ class: StdioServerTransport
    await server.___BLANK_14___(transport); // ใส่ method: connect
    console.error("Mango Company MCP Server is running...");
}

main().catch(console.error);
