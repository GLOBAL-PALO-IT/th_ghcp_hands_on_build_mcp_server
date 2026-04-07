import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// ===== Puzzle 4: Tool — get_project_structure =====
// Tool นี้ดึงโครงสร้าง Project ตามภาษาที่ระบุ
// ต้องมี input: language (Java, React, หรือ Flutter)
// API ที่ใช้: http://localhost:3000/api/projects/{language}

export function registerGetProjectStructure(server: McpServer) {
    server.registerTool(
        "get_project_structure",
        {
            description: "ดูโครงสร้าง Project ตามภาษาที่ระบุ",
            inputSchema: {
                // language คือ ภาษาที่ต้องการดูโครงสร้าง เช่น Java, React, Flutter
                language: z.string().describe("___BLANK_1___"), // ใส่คำอธิบาย parameter เช่น "ภาษาที่ต้องการ: Java, React, หรือ Flutter"
            },
        },
        async ({ language }) => {
            // สร้าง URL สำหรับเรียก API
            const url = `http://localhost:3000/api/___BLANK_2___/${encodeURIComponent(language)}`; // ใส่ API endpoint เช่น "projects"
            const response = await fetch(url);

            // ดึงข้อมูลโครงสร้าง project จาก response
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
            // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
            // {
            //   "result": "success",
            //   "language": "React",
            //   "structure": {
            //     "name": "React Frontend App",
            //     "description": "Main user-facing React application",
            //     "folders": ["src", "public", "tests", "components", "hooks"],
            //     "files": ["App.tsx", "index.tsx", "package.json"]
            //   }
            // }

            // ดึงข้อมูล folders และ files จาก structure
            const folderList = data.structure.folders.join("\n  - ");
            const fileList = data.structure.files.join("\n  - ");

            // ส่งกลับข้อความที่จะแสดงใน UI ของ client
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `📁 ___BLANK_3___ ${data.structure.name} (${language})\n${data.structure.description}\n\n📂 Folders:\n  - ${folderList}\n\n📄 Key Files:\n  - ${fileList}`,
                        // ใส่ข้อความนำหน้า เช่น "โครงสร้าง Project:"
                        // ตัวอย่างข้อความที่ส่งกลับจะมีรูปแบบประมาณนี้:
                        // 📁 โครงสร้าง Project: React Frontend App (React)
                        // Main user-facing React application
                        //
                        // 📂 Folders
                        // - src    
                        // - public
                        // - tests
                        // - components
                        // - hooks
                        //
                        // 📄 Key Files
                        // - App.tsx
                        // - index.tsx
                        // - package.json:
                    },
                ],
            };
        }
    );
}
