# 🧩 Puzzle 1: สร้าง Tool — list_currencies

## 📖 เป้าหมาย
เรียนรู้การสร้าง MCP Tool ด้วย `server.tool()` — Tool แรกของเรา!
Tool นี้จะ**แสดงรายการสกุลเงินทั้งหมด**ที่ API รองรับ (ไม่ต้องรับ input ใดๆ)

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

### ExchangeRate-API (Open)
- URL สำหรับดูรายการสกุลเงิน: `https://open.er-api.com/v6/latest/USD`
- ส่งคืน JSON object เช่น `{ "result": "success", "base_code": "USD", "rates": { "USD": 1, "THB": 34.5, "EUR": 0.92, ... } }`
- เราจะดึง key จาก `rates` มาแสดงเป็นรายการสกุลเงิน

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_3___` | ชื่อของ tool | `"list_currencies"` |
| `___BLANK_4___` | คำอธิบาย tool | `"แสดงรายการสกุลเงินทั้งหมดที่รองรับ"` |
| `___BLANK_5___` | URL ของ API | `"https://open.er-api.com/v6/latest/USD"` |
| `___BLANK_6___` | ข้อความนำหน้ารายการ | `"สกุลเงินที่รองรับ:\n"` |

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ tool ควรตั้งอย่างไร?</summary>

ชื่อ tool ควรเป็น snake_case และบอกได้ว่า tool ทำอะไร
เช่น `list_currencies` หมายถึง "แสดงรายการสกุลเงิน"

</details>

<details>
<summary>Hint 2: URL ต้องใส่อะไร?</summary>

ExchangeRate-API — endpoint สำหรับดูรายการสกุลเงิน (ดึงจาก rates keys):
```
https://open.er-api.com/v6/latest/USD
```

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

```typescript
server.tool(
  "list_currencies",
  "แสดงรายการสกุลเงินทั้งหมดที่รองรับ",
  {},
  async () => {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = (await response.json()) as {
      result: string;
      base_code: string;
      rates: Record<string, number>;
    };

    const currencyList = Object.keys(data.rates).join(", ");

    return {
      content: [
        {
          type: "text" as const,
          text: `สกุลเงินที่รองรับ:\n${currencyList}`,
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
