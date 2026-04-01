# 🧩 Puzzle 2: สร้าง Tool — get_exchange_rate

## 📖 เป้าหมาย
เรียนรู้การกำหนด **input schema ด้วย Zod** — Tool นี้รับสกุลเงินต้นทางและปลายทาง แล้วแสดงอัตราแลกเปลี่ยน

## 🔧 ความรู้ที่ต้องใช้

### Zod คืออะไร?
Zod เป็น library สำหรับกำหนด schema (รูปแบบข้อมูล) ใน TypeScript ใช้กับ MCP เพื่อบอกว่า tool รับ input อะไรบ้าง

```typescript
import { z } from "zod";

// ตัวอย่าง Zod schema
z.string()                          // ต้องเป็น string
z.string().length(3)                // string ยาว 3 ตัวอักษร
z.string().describe("คำอธิบาย")     // เพิ่มคำอธิบายให้ LLM เข้าใจ
z.number()                          // ต้องเป็นตัวเลข
z.number().positive()               // ตัวเลขที่มากกว่า 0
```

### `server.tool()` กับ Input Schema
```typescript
server.tool(
  "tool_name",
  "description",
  {
    // กำหนด input parameters ด้วย Zod
    param1: z.string().describe("คำอธิบาย param1"),
    param2: z.number().describe("คำอธิบาย param2"),
  },
  async ({ param1, param2 }) => {
    // ใช้ param1, param2 ได้เลย
    return { content: [{ type: "text", text: "ผลลัพธ์" }] };
  }
);
```

### frankfurter.app API — อัตราแลกเปลี่ยน
- URL: `https://api.frankfurter.app/latest?from=USD&to=THB`
- ส่งคืน: `{ "base": "USD", "date": "2024-01-15", "rates": { "THB": 34.5 } }`

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 2 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_7___` | Zod schema สำหรับ `from` | `string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD")` |
| `___BLANK_8___` | Zod schema สำหรับ `to` | `string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB")` |
| `___BLANK_9___` | URL สำหรับเรียก API | ดู Hint ด้านล่าง |

---

## 💡 Hints

<details>
<summary>Hint 1: Zod schema เขียนยังไง?</summary>

สกุลเงินมีรูปแบบเป็นตัวอักษร 3 ตัว (เช่น USD, THB) ดังนั้น:
```typescript
z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD")
```

</details>

<details>
<summary>Hint 2: URL ต้องประกอบยังไง?</summary>

ใช้ template literal ประกอบ URL:
```typescript
`https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
```
> 💡 `encodeURIComponent()` ช่วยป้องกัน URL injection

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

```typescript
server.tool(
  "get_exchange_rate",
  "ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน",
  {
    from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
    to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
  },
  async ({ from, to }) => {
    const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      base: string;
      date: string;
      rates: Record<string, number>;
    };

    const rate = data.rates[to.toUpperCase()];

    return {
      content: [
        {
          type: "text" as const,
          text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (ข้อมูลวันที่ ${data.date})`,
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
