# 🧩 Puzzle 3: เพิ่ม Tool — get_exchange_rate

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_exchange_rate.ts`

เปิดไฟล์ `src/tools/get_exchange_rate.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชื่อ tool | `get_exchange_rate` |
| `___BLANK_2___` | คำอธิบาย tool | `ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน` |
| `___BLANK_3___` | คำอธิบาย parameter `from` | `สกุลเงินต้นทาง (เช่น USD)` |
| `___BLANK_4___` | คำอธิบาย parameter `to` | `สกุลเงินปลายทาง (เช่น EUR)` |
| `___BLANK_5___` | ข้อความเมื่อไม่พบอัตราแลกเปลี่ยน | `ไม่พบอัตราแลกเปลี่ยนสำหรับ` |
| `___BLANK_6___` | ข้อความนำหน้าผลลัพธ์ | `อัตราแลกเปลี่ยน` |

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

- [ ] ไฟล์ `src/tools/get_exchange_rate.ts` เติมช่องว่างครบ 6 ช่องแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_exchange_rate` ใน MCP server
- [ ] ถาม Copilot แล้วได้อัตราแลกเปลี่ยนกลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ tool ตั้งยังไง?</summary>

ชื่อ tool ควรสื่อความหมาย เช่น `get_exchange_rate`
ใช้ snake_case ตามมาตรฐาน MCP

</details>

<details>
<summary>Hint 2: คำอธิบาย parameter เขียนยังไง?</summary>

ให้บอกว่า parameter นี้คืออะไร พร้อมตัวอย่าง เช่น `"สกุลเงินต้นทาง (เช่น USD)"`
โค้ดส่วน `z.string().length(3).describe(...)` เขียนให้แล้ว — เติมแค่ข้อความในช่อง describe!

</details>

<details>
<summary>Hint 3: ข้อความตอบกลับเขียนยังไง?</summary>

- เมื่อไม่พบอัตราแลกเปลี่ยน: `"ไม่พบอัตราแลกเปลี่ยนสำหรับ EUR"`
- เมื่อสำเร็จ: `"อัตราแลกเปลี่ยน: 1 USD = 0.85 EUR (อัปเดตล่าสุด: ...)"`

</details>

<details>
<summary>Hint 4: ดูเฉลยเต็ม</summary>

**src/tools/get_exchange_rate.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetExchangeRate(server: McpServer) {
    server.registerTool(
        "get_exchange_rate",
        {
            description: "ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน",
            inputSchema: {
                from: z.string().length(3).describe("สกุลเงินต้นทาง (เช่น USD)"),
                to: z.string().length(3).describe("สกุลเงินปลายทาง (เช่น EUR)"),
            },
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

            if (!data.rates[to.toUpperCase()]) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `ไม่พบอัตราแลกเปลี่ยนสำหรับ ${to.toUpperCase()}`,
                        },
                    ],
                };
            }

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
