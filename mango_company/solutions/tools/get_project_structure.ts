import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetProjectStructure(server: McpServer) {
    server.registerTool(
        "get_project_structure",
        {
            description: "ดูโครงสร้าง Project ตามภาษาที่ระบุ",
            inputSchema: {
                language: z.string().describe("ภาษาที่ต้องการ: Java, React, หรือ Flutter"),
            },
        },
        async ({ language }: { language: string }) => {
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
}
