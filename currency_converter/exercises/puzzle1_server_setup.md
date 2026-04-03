# 🧩 Puzzle 1: สร้าง Blank Server + เชื่อมต่อ VS Code

## 📖 เป้าหมาย
สร้าง MCP Server เปล่าๆ (ไม่มี tool) แล้ว**เชื่อมต่อกับ VS Code** เพื่อพิสูจน์ว่า MCP protocol ทำงานได้ก่อนที่จะเริ่มเขียน business logic

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
  name: "my-server",       // ชื่อ server (kebab-case)
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

### `.vscode/mcp.json` คืออะไร?
เป็นไฟล์ config ที่บอก VS Code ว่ามี MCP Server อะไรบ้าง และจะเชื่อมต่อยังไง

```json
{
  "servers": {
    "server-name": {
      "type": "stdio",
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

### ส่วนบน — สร้าง McpServer

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ server | `"currency-converter"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |

### ส่วนล่าง — เชื่อมต่อ Transport

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_3___` | Class ของ transport | `StdioServerTransport` |
| `___BLANK_4___` | Method สำหรับเชื่อมต่อ | `connect` |

---

## ✏️ ส่วนที่ 2: Build และทดสอบ

```bash
# 1. ติดตั้ง dependencies (ถ้ายังไม่ได้ทำ)
npm install

# 2. Build TypeScript → JavaScript
npm run build

# 3. ทดสอบรัน (ควรเห็นข้อความใน stderr)
npm start
# กด Ctrl+C เพื่อหยุด
```

---

## ✏️ ส่วนที่ 3: สร้าง `.vscode/mcp.json`

สร้างไฟล์ `.vscode/mcp.json` ที่ **root ของโปรเจกต์** (ระดับเดียวกับ `currency_converter/`) แล้วเติมช่องว่าง:

```json
{
  "servers": {
    "currency-converter": {
      "type": "___BLANK_5___",
      "command": "___BLANK_6___",
      "args": ["___BLANK_7___"]
    }
  }
}
```

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_5___` | ประเภทการเชื่อมต่อ | `"stdio"` |
| `___BLANK_6___` | คำสั่งที่ใช้รัน server | `"node"` |
| `___BLANK_7___` | path ไปยังไฟล์ server | `"currency_converter/dist/index.js"` |

---

## ✅ ตรวจสอบ

เมื่อเติมช่องว่างและ build เสร็จ:

1. เปิด VS Code → GitHub Copilot Chat
2. MCP Server "currency-converter" ควรปรากฏในรายการ MCP servers
3. เซิร์ฟเวอร์ควรเชื่อมต่อได้สำเร็จ (แม้ยังไม่มี tool ใดๆ)

> 🎉 ถ้าเห็น server เชื่อมต่อสำเร็จ แสดงว่า MCP plumbing ทำงานได้! พร้อมไปต่อ Puzzle 2

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

**src/index.ts:**
```typescript
const server = new McpServer({
  name: "currency-converter",
  version: "1.0.0",
  description: "MCP Server สำหรับแปลงสกุลเงิน",
});

// ...

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Currency Converter MCP Server is running...");
}
```

**.vscode/mcp.json:**
```json
{
  "servers": {
    "currency-converter": {
      "type": "stdio",
      "command": "node",
      "args": ["currency_converter/dist/index.js"]
    }
  }
}
```

</details>
