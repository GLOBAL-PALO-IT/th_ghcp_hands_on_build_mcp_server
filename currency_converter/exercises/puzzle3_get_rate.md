# 🧩 Puzzle 3: เพิ่ม Tool — get_exchange_rate

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

### ExchangeRate-API — อัตราแลกเปลี่ยน
- URL: `https://open.er-api.com/v6/latest/USD`
- ส่งคืน: `{ "result": "success", "base_code": "USD", "time_last_update_utc": "...", "rates": { "THB": 34.5, "EUR": 0.92, ... } }`
- เปลี่ยน `USD` ใน URL เป็นสกุลเงินต้นทางที่ต้องการ

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_exchange_rate.ts`

เปิดไฟล์ `src/tools/get_exchange_rate.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชนิดข้อมูล Zod สำหรับ `from` | `string` |
| `___BLANK_2___` | ชนิดข้อมูล Zod สำหรับ `to` | `string` |
| `___BLANK_3___` | API endpoint | `latest` |
| `___BLANK_4___` | ชื่อ property ที่เก็บอัตราแลกเปลี่ยน | `rates` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 3:

```typescript
// บรรทัดบน (import)
import { registerGetExchangeRate } from "./tools/get_exchange_rate.js";

// บรรทัดล่าง (ลงทะเบียน)
registerGetExchangeRate(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "อัตราแลกเปลี่ยน USD เป็น THB เท่าไหร่?"
- "1 EUR เท่ากับกี่ JPY?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/get_exchange_rate.ts` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_exchange_rate` ใน MCP server
- [ ] ถาม Copilot แล้วได้อัตราแลกเปลี่ยนกลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชนิดข้อมูล Zod เขียนยังไง?</summary>

สกุลเงินเป็นตัวอักษร — ชนิดข้อมูลคือ `string`
โค้ดที่เหลือ `.length(3).describe(...)` เขียนให้แล้ว!

</details>

<details>
<summary>Hint 2: API endpoint คืออะไร?</summary>

URL เต็มคือ `https://open.er-api.com/v6/latest/{from}`
ส่วน `https://open.er-api.com/v6/` เขียนให้แล้ว — เติมแค่ `latest`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/get_exchange_rate.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetExchangeRate(server: McpServer) {
    server.tool(
        "get_exchange_rate",
        "ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน",
        {
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),
        },
        async ({ from, to }) => {
            const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
            const response = await fetch(url);
            const data = (await response.json()) as {
                result: string;
                base_code: string;
                time_last_update_utc: string;
                rates: Record<string, number>;
            };

            const rate = data.rates[to.toUpperCase()];

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (อัปเดตล่าสุด: ${data.time_last_update_utc})`,
                    },
                ],
            };
        }
    );
}
```

**src/index.ts — uncomment:**
```typescript
import { registerGetExchangeRate } from "./tools/get_exchange_rate.js";
// ...
registerGetExchangeRate(server);
```

</details>
