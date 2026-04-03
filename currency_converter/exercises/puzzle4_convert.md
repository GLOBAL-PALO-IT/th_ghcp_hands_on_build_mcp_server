# 🧩 Puzzle 4: เพิ่ม Tool — convert_currency

## 📖 เป้าหมาย
เรียนรู้การสร้าง tool ที่มี **logic ซับซ้อนขึ้น** — รับจำนวนเงิน + สกุลเงินต้นทาง/ปลายทาง แล้วแปลงค่าให้

## 🔧 ความรู้ที่ต้องใช้

### Zod — ประเภท number
```typescript
z.number()              // ต้องเป็นตัวเลข
z.number().positive()   // ตัวเลขที่มากกว่า 0
z.number().positive().describe("คำอธิบาย")  // เพิ่มคำอธิบาย
```

### ExchangeRate-API — แปลงเงิน
- URL: `https://open.er-api.com/v6/latest/USD` (ใส่สกุลเงินต้นทางแทน USD)
- ส่งคืน: `{ "result": "success", "base_code": "USD", "time_last_update_utc": "...", "rates": { "THB": 34.5, ... } }`
- API นี้ไม่รองรับ `amount` parameter — ต้องคำนวณเอง: `amount * rate`

### การคำนวณผลลัพธ์
```typescript
const rate = data.rates["THB"]; // 34.5
const amount = 100;
const result = amount * rate;   // 3450.0
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/convert_currency.ts`

เปิดไฟล์ `src/tools/convert_currency.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชนิดข้อมูล Zod สำหรับ `amount` | `number` |
| `___BLANK_2___` | ตัวแปรที่เก็บจำนวนเงิน (ใช้คูณกับ rate) | `amount` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 4:

```typescript
// บรรทัดบน (import)
import { registerConvertCurrency } from "./tools/convert_currency.js";

// บรรทัดล่าง (ลงทะเบียน)
registerConvertCurrency(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "แปลง 100 USD เป็น THB"
- "5000 THB เท่ากับกี่ JPY?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/convert_currency.ts` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `convert_currency` ใน MCP server
- [ ] ถาม Copilot แล้วได้ผลลัพธ์การแปลงเงินกลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชนิดข้อมูล Zod สำหรับจำนวนเงิน</summary>

จำนวนเงินเป็นตัวเลข — ชนิดข้อมูลคือ `number`
โค้ดที่เหลือ `.positive().describe(...)` เขียนให้แล้ว!

</details>

<details>
<summary>Hint 2: คำนวณผลลัพธ์ยังไง?</summary>

API ไม่คำนวณ amount ให้ — ต้องเอา amount คูณกับ rate เอง:
```typescript
const result = amount * rate;
```
เติมแค่ชื่อตัวแปร `amount`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/convert_currency.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerConvertCurrency(server: McpServer) {
    server.tool(
        "convert_currency",
        "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง",
        {
            amount: z.number().positive().describe("จำนวนเงินที่ต้องการแปลง"),
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
        },
        async ({ amount, from, to }) => {
            const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
            const response = await fetch(url);
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                time_last_update_utc: string;
                rates: Record<string, number>;
            };

            const rate = data.rates[to.toUpperCase()];
            const result = amount * rate;

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `💰 ${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}\n📅 อัปเดตล่าสุด: ${data.time_last_update_utc}`,
                    },
                ],
            };
        }
    );
}
```

**src/index.ts — uncomment:**
```typescript
import { registerConvertCurrency } from "./tools/convert_currency.js";
// ...
registerConvertCurrency(server);
```

</details>
