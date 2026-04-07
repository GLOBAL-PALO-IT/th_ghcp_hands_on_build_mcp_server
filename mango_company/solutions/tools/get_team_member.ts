import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetTeamMember(server: McpServer) {
    server.tool(
        "get_team_member",
        "ดูข้อมูลสมาชิกทีม Mango Company",
        {
            member: z.string().describe("ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"),
        },
        async ({ member }) => {
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
}
