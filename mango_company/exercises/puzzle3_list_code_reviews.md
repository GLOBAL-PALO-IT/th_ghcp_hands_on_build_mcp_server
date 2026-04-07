# 🧩 Puzzle 3: เพิ่ม Tool — list_code_reviews

## 📖 เป้าหมาย
เรียนรู้การสร้าง MCP Tool ด้วย `server.registerTool()` — Tool แรกของเรา!
Tool นี้จะ**แสดงรายการ Code Review ทั้งหมด**ที่เก็บไว้ใน HTTP Server (ไม่ต้องรับ input ใดๆ)

## 🔧 ความรู้ที่ต้องใช้

### `server.registerTool()` คืออะไร?
เป็น method สำหรับลงทะเบียน tool ใน MCP Server โดยรับ 3 parameters:

```typescript
server.registerTool(
  "tool_name",           // 1. ชื่อ tool (string snake_case)
  {
    description: "tool description",  // 2. คำอธิบาย tool
    inputSchema: { /* schema */ },    // 3. input parameters (optional)
  },
  async (input) => {     // 4. Handler function (async)
    // ... logic ...
    return {
      content: [{ type: "text", text: "ผลลัพธ์" }]
    };
  }
);
```

### Mango Company API (HTTP Remote)
- URL สำหรับดูรายการ Code Review: `http://localhost:3000/api/code-reviews`
- ส่งคืน JSON object เช่น:
```json
{
  "result": "success",
  "data": [
    {
      "id": "CR001",
      "title": "Review Authentication System",
      "author": "Alice",
      "date": "2024-03-01"
    },
    {
      "id": "CR002",
      "title": "Review Database Design",
      "author": "Bob",
      "date": "2024-03-02"
    }
  ]
}
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/list_code_reviews.ts`

เปิดไฟล์ `src/tools/list_code_reviews.ts` แล้วหา Puzzle 3 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อของ tool | `"list_code_reviews"` |
| `___BLANK_2___` | คำอธิบาย tool | `"แสดงรายการ Code Review ทั้งหมด"` |
| `___BLANK_3___` | URL ของ API | `"http://localhost:3000/api/code-reviews"` |
| `___BLANK_4___` | ข้อความนำหน้ารายการ | `"Code Review ทั้งหมด:\n"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 3:

```typescript
// บรรทัดบน (import)
import { registerListCodeReviews } from "./tools/list_code_reviews.js";

// บรรทัดล่าง (ลงทะเบียน)
registerListCodeReviews(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "แสดงรายการ Code Review"
- "มี Code Review อะไรบ้าง?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/list_code_reviews.ts` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `list_code_reviews` ใน MCP server
- [ ] ถาม Copilot แล้วได้รายการ Code Review กลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ tool ควรตั้งอย่างไร?</summary>

ชื่อ tool ควรเป็น snake_case และบอกได้ว่า tool ทำอะไร
เช่น `list_code_reviews` หมายถึง "แสดงรายการ Code Review"

</details>

<details>
<summary>Hint 2: URL ต้องใส่อะไร?</summary>

Mango Company API — endpoint สำหรับดูรายการ Code Review:
```
http://localhost:3000/api/code-reviews
```

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/list_code_reviews.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCodeReviews(server: McpServer) {
    server.registerTool(
        "list_code_reviews",
        { description: "แสดงรายการ Code Review ทั้งหมด" },
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
}
```

**src/index.ts — uncomment:**
```typescript
import { registerListCodeReviews } from "./tools/list_code_reviews.js";
// ...
registerListCodeReviews(server);
```

</details>
