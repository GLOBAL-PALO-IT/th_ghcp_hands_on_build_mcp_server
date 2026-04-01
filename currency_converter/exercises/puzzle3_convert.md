# 🧩 Puzzle 3: สร้าง Tool — convert_currency

## 📖 เป้าหมาย
เรียนรู้การสร้าง tool ที่มี **logic ซับซ้อนขึ้น** — รับจำนวนเงิน + สกุลเงินต้นทาง/ปลายทาง แล้วแปลงค่าให้

## 🔧 ความรู้ที่ต้องใช้

### Zod — ประเภท number
```typescript
z.number()              // ต้องเป็นตัวเลข
z.number().positive()   // ตัวเลขที่มากกว่า 0
z.number().positive().describe("คำอธิบาย")  // เพิ่มคำอธิบาย
```

### frankfurter.app API — แปลงเงิน
- URL: `https://api.frankfurter.app/latest?amount=100&from=USD&to=THB`
- ส่งคืน: `{ "amount": 100, "base": "USD", "date": "2024-01-15", "rates": { "THB": 3450.0 } }`
- สังเกตว่า `rates.THB` คือผลลัพธ์ที่คำนวณแล้ว!

### การดึงค่าจาก Object
```typescript
const data = { rates: { THB: 3450.0, EUR: 0.92 } };
const result = data.rates["THB"]; // 3450.0
// หรือใช้ตัวแปร
const to = "THB";
const result = data.rates[to.toUpperCase()]; // 3450.0
```

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 3 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_10___` | Zod schema สำหรับ `amount` | `number().positive().describe("จำนวนเงินที่ต้องการแปลง")` |
| `___BLANK_11___` | URL สำหรับเรียก API (พร้อม amount) | ดู Hint ด้านล่าง |
| `___BLANK_12___` | ดึงผลลัพธ์จาก response | `data.rates[to.toUpperCase()]` |

---

## 💡 Hints

<details>
<summary>Hint 1: Zod schema สำหรับจำนวนเงิน</summary>

จำนวนเงินต้องเป็นตัวเลขที่มากกว่า 0:
```typescript
z.number().positive().describe("จำนวนเงินที่ต้องการแปลง")
```

</details>

<details>
<summary>Hint 2: URL ต้องประกอบยังไง?</summary>

เหมือน Puzzle 2 แต่เพิ่ม `amount` เข้าไป:
```typescript
`https://api.frankfurter.app/latest?amount=${amount}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
```

</details>

<details>
<summary>Hint 3: ดึงผลลัพธ์ยังไง?</summary>

API ส่งผลลัพธ์มาใน `data.rates` โดย key คือรหัสสกุลเงินปลายทาง:
```typescript
const result = data.rates[to.toUpperCase()];
```

</details>

<details>
<summary>Hint 4: ดูเฉลยเต็ม</summary>

```typescript
server.tool(
  "convert_currency",
  "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง",
  {
    amount: z.number().positive().describe("จำนวนเงินที่ต้องการแปลง"),
    from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
    to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
  },
  async ({ amount, from, to }) => {
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      amount: number;
      base: string;
      date: string;
      rates: Record<string, number>;
    };

    const result = data.rates[to.toUpperCase()];

    return {
      content: [
        {
          type: "text" as const,
          text: `💰 ${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}\n📅 อัตราแลกเปลี่ยน ณ วันที่ ${data.date}`,
        },
      ],
    };
  }
);
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมเสร็จแล้ว ให้ไปทำ Puzzle 4 (Server Setup) ต่อได้เลย!
