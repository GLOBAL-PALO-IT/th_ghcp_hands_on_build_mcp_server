# 🧩 Puzzle 2: สร้าง Tool — get_project_structure

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

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 2 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_7___` | ชนิดข้อมูล Zod | `string` |
| `___BLANK_8___` | API endpoint | `"projects"` |
| `___BLANK_9___` | property ของ structure | `"structure"` |

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

```typescript
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
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมเสร็จแล้ว ให้ไปทำ Puzzle 3 ต่อได้เลย!
