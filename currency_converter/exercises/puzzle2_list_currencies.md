# 🧩 Puzzle 2: เพิ่ม Tool — list_currencies

## 📖 เป้าหมาย
เรียนรู้การสร้าง MCP Tool ด้วย `server.registerTool()` — Tool แรกของเรา!
Tool นี้จะ**แสดงรายการสกุลเงินทั้งหมด**ที่ API รองรับ (ไม่ต้องรับ input ใดๆ)

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

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/list_currencies.ts`

เปิดไฟล์ `src/tools/list_currencies.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อของ tool | `"list_currencies"` |
| `___BLANK_2___` | คำอธิบาย tool | `"แสดงรายการสกุลเงินทั้งหมดที่รองรับ"` |
| `___BLANK_3___` | URL ของ API | `"https://open.er-api.com/v6/latest/USD"` |
| `___BLANK_4___` | ข้อความนำหน้ารายการ | `"สกุลเงินที่รองรับ:\n"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 2:

```typescript
// บรรทัดบน (import)
import { registerListCurrencies } from "./tools/list_currencies.js";

// บรรทัดล่าง (ลงทะเบียน)
registerListCurrencies(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "แสดงรายการสกุลเงิน"
- "มีสกุลเงินอะไรบ้าง?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/list_currencies.ts` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `list_currencies` ใน MCP server
- [ ] ถาม Copilot แล้วได้รายการสกุลเงินกลับมา

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

**src/tools/list_currencies.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCurrencies(server: McpServer) {
    server.registerTool(
        "list_currencies",
        { description: "แสดงรายการสกุลเงินทั้งหมดที่รองรับ" },
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
}
```

**src/index.ts — uncomment:**
```typescript
import { registerListCurrencies } from "./tools/list_currencies.js";
// ...
registerListCurrencies(server);
```

</details>
