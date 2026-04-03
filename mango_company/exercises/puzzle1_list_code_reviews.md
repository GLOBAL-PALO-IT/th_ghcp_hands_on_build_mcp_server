# 🧩 Puzzle 1: สร้าง Tool — list_code_reviews

## 📖 เป้าหมาย
เรียนรู้การสร้าง MCP Tool ด้วย `server.tool()` — Tool แรกของเรา!
Tool นี้จะ**แสดงรายการ Code Review ทั้งหมด**ที่เก็บไว้ใน HTTP Server (ไม่ต้องรับ input ใดๆ)

## 🔧 ความรู้ที่ต้องใช้

### `server.tool()` คืออะไร?
เป็น method สำหรับลงทะเบียน tool ใน MCP Server โดยรับ 4 parameters:

```typescript
server.tool(
  "tool_name",        // 1. ชื่อ tool (string)
  "tool description", // 2. คำอธิบาย tool (string)
  { /* schema */ },   // 3. Input schema (Zod object หรือ {} ถ้าไม่มี input)
  async (input) => {  // 4. Handler function (async)
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
- เราจะแสดงรายการ Code Review ทั้งหมดจากข้อมูล array

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_3___` | ชื่อของ tool | `"list_code_reviews"` |
| `___BLANK_4___` | คำอธิบาย tool | `"แสดงรายการ Code Review ทั้งหมด"` |
| `___BLANK_5___` | URL ของ API | `"http://localhost:3000/api/code-reviews"` |
| `___BLANK_6___` | ข้อความนำหน้ารายการ | `"Code Review ทั้งหมด:\n"` |

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

```typescript
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
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมเสร็จแล้ว ให้ไปทำ Puzzle 2 ต่อได้เลย! (ยังไม่ต้อง build — รอทำครบทุก puzzle ก่อน)
