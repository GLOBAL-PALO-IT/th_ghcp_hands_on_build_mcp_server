# 🧩 Puzzle 3: เพิ่ม Tool — get_project_structure

## 📖 เป้าหมาย
สร้าง Tool ที่**ดึงโครงสร้าง Project ตามภาษาที่ระบุ** (Java, React, หรือ Flutter)
Tool นี้ต้องรับ input parameter ชื่อ `language`

## 🔧 ความรู้ที่ต้องใช้

### Input Parameters ด้วย Zod
เมื่อ Tool ต้องรับ input จะใช้ Zod schema เช่น:

```typescript
server.tool(
  "tool_name",
  "tool description",
  {
    param1: z.string().describe("คำอธิบาย param1"),
    param2: z.number().describe("คำอธิบาย param2"),
  },
  async ({ param1, param2 }) => {
    // ใช้ param1 และ param2 ที่รับมา
    return { /* result */ };
  }
);
```

### Mango Company API — Project Structure
- URL: `http://localhost:3000/api/projects/{language}`
- ส่งคืน JSON object เช่น:
```json
{
  "result": "success",
  "language": "React",
  "structure": {
    "name": "React Frontend App",
    "description": "Main user-facing React application",
    "folders": ["src", "public", "tests", "components", "hooks"],
    "files": ["App.tsx", "index.tsx", "package.json"]
  }
}
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_project_structure.ts`

เปิดไฟล์ `src/tools/get_project_structure.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ tool | `"get_project_structure"` |
| `___BLANK_2___` | คำอธิบาย tool | `"ดูโครงสร้าง Project ตามภาษาที่ระบุ"` |
| `___BLANK_3___` | ชนิดข้อมูล Zod | `string` |
| `___BLANK_4___` | คำอธิบาย parameter | `"ภาษาที่ต้องการ: Java, React, หรือ Flutter"` |
| `___BLANK_5___` | API endpoint | `"projects"` |
| `___BLANK_6___` | property ของ structure | `"structure"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 3:

```typescript
// บรรทัดบน (import)
import { registerGetProjectStructure } from "./tools/get_project_structure.js";

// บรรทัดล่าง (ลงทะเบียน)
registerGetProjectStructure(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "โครงสร้าง Project React เป็นยังไง?"
- "แสดงโครงสร้าง Project Java"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/get_project_structure.ts` เติมช่องว่างครบ 6 ช่องแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_project_structure` ใน MCP server
- [ ] ถาม Copilot แล้วได้โครงสร้าง Project กลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ต้องใช้ Zod ชนิดใด?</summary>

ต้องรับ language ที่เป็น string ดังนั้นใช้ `z.string()`

</details>

<details>
<summary>Hint 2: URL ต้องเป็นแบบไหน?</summary>

URL ควรประกอบด้วยภาษาที่ส่งมา:
```
http://localhost:3000/api/projects/${encodeURIComponent(language)}
```

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/get_project_structure.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetProjectStructure(server: McpServer) {
    server.tool(
        "get_project_structure",
        "ดูโครงสร้าง Project ตามภาษาที่ระบุ",
        {
            language: z.string().describe("ภาษาที่ต้องการ: Java, React, หรือ Flutter"),
        },
        async ({ language }) => {
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
```

**src/index.ts — uncomment:**
```typescript
import { registerGetProjectStructure } from "./tools/get_project_structure.js";
// ...
registerGetProjectStructure(server);
```

</details>
