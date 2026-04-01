# 🧩 Puzzle 4: ประกอบ MCP Server

## 📖 เป้าหมาย
เรียนรู้ **server lifecycle** — การสร้าง MCP Server instance และเชื่อมต่อกับ Transport

## 🔧 ความรู้ที่ต้องใช้

### MCP Server ประกอบด้วยอะไร?

```
┌─────────────────┐     ┌────────────────────┐
│   McpServer     │────▶│ StdioServerTransport│────▶ stdin/stdout
│  (tools อยู่ที่นี่) │     │  (ช่องทางสื่อสาร)    │
└─────────────────┘     └────────────────────┘
```

1. **McpServer** — ตัว server หลัก ที่ลงทะเบียน tools ทั้งหมด
2. **StdioServerTransport** — ช่องทางสื่อสารผ่าน stdin/stdout (เหมาะสำหรับ CLI tool)
3. **server.connect(transport)** — เชื่อมต่อทั้งสองเข้าด้วยกัน

### สร้าง McpServer
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "my-server",       // ชื่อ server
  version: "1.0.0",        // เวอร์ชัน
  description: "คำอธิบาย",  // คำอธิบาย (optional)
});
```

### เชื่อมต่อ Transport
```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);
```

> 💡 `console.error()` ใช้แทน `console.log()` เพราะ stdout ถูกใช้สำหรับ MCP protocol แล้ว

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหาช่องว่างเหล่านี้:

### ส่วนบนสุด — สร้าง McpServer

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชื่อ server | `"currency-converter"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |

### ส่วนล่างสุด — เชื่อมต่อ Transport

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_13___` | Class ของ transport | `StdioServerTransport` |
| `___BLANK_14___` | Method สำหรับเชื่อมต่อ | `connect` |

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ server ควรตั้งอย่างไร?</summary>

ชื่อ server มักใช้ kebab-case:
```typescript
name: "currency-converter"
```

</details>

<details>
<summary>Hint 2: Transport เลือกอะไร?</summary>

สำหรับ NPM package ที่รันเป็น CLI ใช้ `StdioServerTransport` (สื่อสารผ่าน stdin/stdout)

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**ส่วนบน:**
```typescript
const server = new McpServer({
  name: "currency-converter",
  version: "1.0.0",
  description: "MCP Server สำหรับแปลงสกุลเงิน",
});
```

**ส่วนล่าง:**
```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Currency Converter MCP Server is running...");
}
```

</details>

---

## ✅ ตรวจสอบ
ตอนนี้ code ควรครบทุกส่วนแล้ว! ลอง build ดู:

```bash
cd currency_converter
npm install
npm run build
```

ถ้า build สำเร็จไม่มี error แสดงว่าเติมช่องว่างถูกต้องทั้งหมด 🎉

ลองทดสอบ server:
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

ควรเห็น tools ทั้ง 3 ตัวในผลลัพธ์!

เมื่อเสร็จแล้วให้ไปทำ Puzzle 5 (VS Code Integration) ต่อได้เลย!
