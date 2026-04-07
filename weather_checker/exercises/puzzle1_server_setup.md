# 🧩 Puzzle 1: สร้าง Blank Server + เชื่อมต่อ VS Code

## 📖 เป้าหมาย
สร้าง MCP Server เปล่าๆ (ไม่มี tool) แล้ว**เชื่อมต่อกับ VS Code** เพื่อพิสูจน์ว่า MCP protocol ทำงานได้ก่อนที่จะเริ่มเขียน business logic

## 🔧 ความรู้ที่ต้องใช้

### MCP Server แบบ HTTP Remote ประกอบด้วยอะไร?

```
┌─────────────────┐     ┌────────────────────┐     ┌──────────┐
│   McpServer     │────▶│ SSEServerTransport  │────▶│ Express  │──▶ HTTP
│  (tools อยู่ที่นี่) │     │  (ช่องทางสื่อสาร)    │     │  Server   │
└─────────────────┘     └────────────────────┘     └──────────┘
```

1. **McpServer** — ตัว server หลัก ที่ลงทะเบียน tools ทั้งหมด
2. **SSEServerTransport** — ช่องทางสื่อสารผ่าน Server-Sent Events (เหมาะสำหรับ HTTP Remote)
3. **Express.js** — HTTP server ที่รองรับ SSE endpoint
4. **server.connect(transport)** — เชื่อมต่อทั้งสองเข้าด้วยกัน

### ความแตกต่าง: Stdio vs HTTP Remote (SSE)

| Feature | Stdio | HTTP Remote (SSE) |
|---------|-------|-------------------|
| การ deploy | ต้องติดตั้ง local | deploy เป็น web service ได้ |
| การเข้าถึง | เฉพาะเครื่องที่ติดตั้ง | เข้าถึงผ่าน URL จากที่ไหนก็ได้ |
| หลาย client | 1 client ต่อ 1 process | หลาย client พร้อมกัน |
| เหมาะกับ | Dev tools, local CLI | Shared services, team tools |

### สร้าง McpServer
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "my-server",       // ชื่อ server (kebab-case)
  version: "1.0.0",        // เวอร์ชัน
  description: "คำอธิบาย",  // คำอธิบาย (optional)
});
```

### เชื่อมต่อ HTTP Transport (SSE) ด้วย Express

```typescript
import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();
const transports: Record<string, SSEServerTransport> = {};

// GET /sse — client เชื่อมต่อ SSE ที่นี่
app.get("/sse", async (_req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;
  res.on("close", () => { delete transports[transport.sessionId]; });
  await server.connect(transport);
});

// POST /messages — client ส่ง message มาที่นี่
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (!transport) { res.status(400).json({ error: "Invalid session ID" }); return; }
  await transport.handlePostMessage(req, res);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
```

> 💡 ต่างจาก Stdio ที่ใช้ `console.error()` — HTTP Remote ใช้ `console.log()` ได้ปกติเพราะไม่ได้ใช้ stdout เป็น protocol

### `.vscode/mcp.json` สำหรับ HTTP Remote
เป็นไฟล์ config ที่บอก VS Code ว่ามี MCP Server อะไรบ้าง และจะเชื่อมต่อยังไง

```json
{
  "servers": {
    "server-name": {
      "type": "sse",
      "url": "http://localhost:3001/sse"
    }
  }
}
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

### สร้าง McpServer

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ server | `"weather-checker"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |
| `___BLANK_3___` | คำอธิบาย server | `"MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)"` |

### สร้าง HTTP Server (Express + SSE)

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_4___` | ฟังก์ชันสร้าง Express app | `express` |
| `___BLANK_5___` | path สำหรับรับ message | `messages` |
| `___BLANK_6___` | method สำหรับเชื่อมต่อ server กับ transport | `connect` |
| `___BLANK_7___` | port number | `3001` |

---

## ✏️ ส่วนที่ 2: Build และทดสอบ

```bash
# 1. ติดตั้ง dependencies (ถ้ายังไม่ได้ทำ)
npm install

# 2. Build TypeScript → JavaScript
npm run build

# 3. ทดสอบรัน (ควรเห็นข้อความใน console)
npm start
# กด Ctrl+C เพื่อหยุด
```

ถ้าเห็นข้อความ `Weather Checker MCP Server is running on http://localhost:3001` แสดงว่าสำเร็จ!

---

## ✏️ ส่วนที่ 3: สร้าง `.vscode/mcp.json`

สร้างไฟล์ `.vscode/mcp.json` ที่ **root ของโปรเจกต์** (ระดับเดียวกับ `weather_checker/`) แล้วเติมช่องว่าง:

```json
{
  "servers": {
    "weather-checker": {
      "type": "___BLANK_8___",
      "url": "___BLANK_9___"
    }
  }
}
```

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_8___` | ประเภทการเชื่อมต่อ | `"sse"` |
| `___BLANK_9___` | URL ของ SSE endpoint | `"http://localhost:3001/sse"` |

---

## ✅ ตรวจสอบ

เมื่อเติมช่องว่างและ build เสร็จ:

1. รัน server ด้วย `npm start` ใน folder `weather_checker/`
2. เปิด VS Code → GitHub Copilot Chat
3. MCP Server "weather-checker" ควรปรากฏในรายการ MCP servers
4. เซิร์ฟเวอร์ควรเชื่อมต่อได้สำเร็จ (แม้ยังไม่มี tool ใดๆ)

> 🎉 ถ้าเห็น server เชื่อมต่อสำเร็จ แสดงว่า MCP plumbing ทำงานได้! พร้อมไปต่อ Puzzle 2

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ server ควรตั้งอย่างไร?</summary>

ชื่อ server มักใช้ kebab-case:
```typescript
name: "weather-checker"
```

</details>

<details>
<summary>Hint 2: Transport เลือกอะไร?</summary>

สำหรับ HTTP Remote Server ใช้ `SSEServerTransport` (สื่อสารผ่าน Server-Sent Events)

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/index.ts:**
```typescript
const server = new McpServer({
  name: "weather-checker",
  version: "1.0.0",
  description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});

// ...

const app = express();
const transports: Record<string, SSEServerTransport> = {};

app.get("/sse", async (_req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;
  res.on("close", () => { delete transports[transport.sessionId]; });
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (!transport) { res.status(400).json({ error: "Invalid session ID" }); return; }
  await transport.handlePostMessage(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});
```

**.vscode/mcp.json:**
```json
{
  "servers": {
    "weather-checker": {
      "type": "sse",
      "url": "http://localhost:3001/sse"
    }
  }
}
```

</details>
