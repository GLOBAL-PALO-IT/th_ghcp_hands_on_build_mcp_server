import { z } from "zod";
// ===== Puzzle 3: Tool — get_project_structure =====
// Tool นี้ดึงโครงสร้าง Project ตามภาษาที่ระบุ
// ต้องมี input: language (Java, React, หรือ Flutter)
// API ที่ใช้: http://localhost:3000/api/projects/{language}
export function registerGetProjectStructure(server) {
    server.registerTool("___BLANK_1___", // ใส่ชื่อ tool เช่น "get_project_structure"
    {
        description: "___BLANK_2___", // ใส่คำอธิบาย tool เช่น "ดูโครงสร้าง Project ตามภาษาที่ระบุ"
        inputSchema: {
            // language คือ ภาษาที่ต้องการดูโครงสร้าง เช่น Java, React, Flutter
            language: z.string().describe("___BLANK_4___"), // ใส่ชนิดข้อมูล Zod เช่น "string" และคำอธิบาย เช่น "ภาษาที่ต้องการ: Java, React, หรือ Flutter"
        },
    }, async ({ language }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `http://localhost:3000/api/___BLANK_5___/${encodeURIComponent(language)}`; // ใส่ API endpoint เช่น "projects"
        const response = await fetch(url);
        // ดึงข้อมูลโครงสร้าง project จาก response
        const data = (await response.json());
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
        const folderList = data.___BLANK_6___.folders.join("\n  - "); // ใส่ property ของ structure เช่น "structure"
        const fileList = data.structure.files.join("\n  - ");
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    text: `📁 ${data.structure.name} (${language})\n${data.structure.description}\n\n📂 Folders:\n  - ${folderList}\n\n📄 Key Files:\n  - ${fileList}`,
                },
            ],
        };
    });
}
