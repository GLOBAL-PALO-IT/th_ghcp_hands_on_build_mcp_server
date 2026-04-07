import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 5: Tool — get_team_member =====
// Tool นี้ดึงข้อมูลสมาชิกทีมตามชื่อหรือ ID
// ต้องมี input: member (ชื่อหรือ ID ของสมาชิก)
// API ที่ใช้: http://localhost:3000/api/team/{member}

export function registerGetTeamMember(server: McpServer) {
    server.registerTool(
        "get_team_member",
        {
            description: "ดูข้อมูลสมาชิกทีม Mango Company",
            inputSchema: {
                // member คือ ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001
                member: z.string().describe("___BLANK_1___"), // ใส่คำอธิบาย parameter เช่น "ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"
            },
        },
        async ({ member }) => {
            // สร้าง URL สำหรับเรียก API
            const url = `http://localhost:3000/api/___BLANK_2___/${encodeURIComponent(member)}`; // ใส่ API endpoint เช่น "team"
            const response = await fetch(url);

            // ดึงข้อมูลสมาชิกทีมจาก response
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
            // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
            // {
            //   "result": "success",
            //   "member": {
            //     "id": "T001",
            //     "name": "John Developer",
            //     "role": "Senior React Developer",
            //     "email": "john@mangodev.com",
            //     "skills": ["React", "TypeScript", "Node.js"],
            //     "projects": ["Frontend App", "Admin Dashboard"]
            //   }
            // }

            // ดึงข้อมูล skills และ projects จาก member
            const skillsList = data.member.skills.join(", ");
            const projectsList = data.member.projects.join(", ");

            // ส่งกลับข้อความที่จะแสดงใน UI ของ client
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `👤 ___BLANK_3___ ${data.member.name}\n📧 Email: ${data.member.email}\n💼 Role: ${data.member.role}\n🛠️ Skills: ${skillsList}\n📌 Projects: ${projectsList}`,
                        // ใส่ข้อความนำหน้า เช่น "ข้อมูลสมาชิกทีม:"
                        // ตัวอย่างข้อความที่ส่งกลับจะมีรูปแบบประมาณนี้:
                        // 👤 ข้อมูลสมาชิกทีม: John Developer
                        // 📧 Email:
                        // Role: Senior React Developer
                        // 🛠️ Skills: React, TypeScript, Node.js
                        // 📌 Projects: Frontend App, Admin Dashboard
                    },
                ],
            };
        }
    );
}
