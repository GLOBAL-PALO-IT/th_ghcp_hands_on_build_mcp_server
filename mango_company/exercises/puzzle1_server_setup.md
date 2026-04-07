# 🧩 Puzzle 1: สร้าง Blank Server + เชื่อมต่อ VS Code

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

### สร้าง McpServer

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ server | `"mango-company"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |
| `___BLANK_3___` | คำอธิบาย server | `"MCP Server สำหรับเก็บข้อมูล Mango Company"` |
| `___BLANK_4___` | ข้อความแจ้งว่า server พร้อม | `"Mango Company MCP Server is running..."` |


## ✏️ ส่วนที่ 2: Build และทดสอบ

```bash
# 1. ติดตั้ง dependencies (ถ้ายังไม่ได้ทำ)
npm install

# 2. Build TypeScript → JavaScript
npm run build

```

---

## ✏️ ส่วนที่ 3: สร้าง `.vscode/mcp.json`

สร้างไฟล์ `.vscode/mcp.json` ที่ **root ของโปรเจกต์** แล้วเติมช่องว่าง:

```json
{
  "servers": {
    "mango-company": {
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
| `___BLANK_7___` | path ไปยังไฟล์ server | `"mango_company/dist/index.js"` |

---

## ✅ ตรวจสอบ

เมื่อเติมช่องว่างและ build เสร็จ:

1. เปิด VS Code → GitHub Copilot Chat
2. MCP Server "mango-company" ควรปรากฏในรายการ MCP servers
3. เซิร์ฟเวอร์ควรเชื่อมต่อได้สำเร็จ (แม้ยังไม่มี tool ใดๆ)

> 🎉 ถ้าเห็น server เชื่อมต่อสำเร็จ แสดงว่า MCP plumbing ทำงานได้! พร้อมไปต่อ Puzzle 2

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ server ควรตั้งอย่างไร?</summary>

ชื่อ server มักใช้ kebab-case:
```typescript
name: "mango-company"
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
  name: "mango-company",
  version: "1.0.0",
  description: "MCP Server สำหรับเก็บข้อมูล Mango Company",
});

// ...

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mango Company MCP Server is running...");
}
```

**.vscode/mcp.json:**
```json
{
  "servers": {
    "mango-company": {
      "type": "stdio",
      "command": "node",
      "args": ["mango_company/dist/index.js"]
    }
  }
}
```

</details>
