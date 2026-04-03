# 🧩 Puzzle 4: ประกอบ HTTP Remote MCP Server

## 📖 เป้าหมาย
เรียนรู้ **server lifecycle** แบบ HTTP Remote — การสร้าง MCP Server instance และเชื่อมต่อกับ **SSE Transport** ผ่าน Express.js

## 🔧 ความรู้ที่ต้องใช้

### ความแตกต่าง: Stdio vs HTTP Remote (SSE)

```
┌─── Stdio (NPM Package) ───────────────────────┐
│                                                 │
│  McpServer ──▶ StdioServerTransport ──▶ stdin/stdout
│                                                 │
└─────────────────────────────────────────────────┘

┌─── HTTP Remote (SSE) ─────────────────────────────────┐
│                                                        │
│  McpServer ──▶ SSEServerTransport ──▶ Express.js ──▶ HTTP
│                                                        │
│  Client เชื่อมต่อ:                                      │
│    GET  /sse      → เปิด SSE connection                 │
│    POST /messages → ส่ง message กลับมา                   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### ทำไมต้อง HTTP Remote?
| Feature | Stdio | HTTP Remote (SSE) |
|---------|-------|-------------------|
| การ deploy | ต้องติดตั้ง local | deploy เป็น web service ได้ |
| การเข้าถึง | เฉพาะเครื่องที่ติดตั้ง | เข้าถึงผ่าน URL จากที่ไหนก็ได้ |
| หลาย client | 1 client ต่อ 1 process | หลาย client พร้อมกัน |
| เหมาะกับ | Dev tools, local CLI | Shared services, team tools |

### สร้าง HTTP Server ด้วย Express + SSE

```typescript
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });
const app = express();

// เก็บ transport สำหรับแต่ละ session
const transports: Record<string, SSEServerTransport> = {};

// GET /sse — client เชื่อมต่อ SSE ที่นี่
app.get("/sse", async (_req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;

  res.on("close", () => {
    delete transports[transport.sessionId];
  });

  await server.connect(transport);
});

// POST /messages — client ส่ง message มาที่นี่
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (!transport) {
    res.status(400).json({ error: "Invalid session ID" });
    return;
  }
  await transport.handlePostMessage(req, res);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
```

> 💡 ต่างจาก Stdio ที่ใช้ `console.error()` — HTTP Remote ใช้ `console.log()` ได้ปกติเพราะไม่ได้ใช้ stdout เป็น protocol

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหาช่องว่างเหล่านี้:

### ส่วนบนสุด — สร้าง McpServer

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชื่อ server | `"weather-checker"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |

### ส่วนล่างสุด — สร้าง HTTP Server

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_13___` | ฟังก์ชันสร้าง Express app | `express` |
| `___BLANK_14___` | path สำหรับรับ message | `messages` |
| `___BLANK_15___` | method สำหรับเชื่อมต่อ server กับ transport | `connect` |
| `___BLANK_16___` | port number | `3001` |

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
<summary>Hint 2: Express app สร้างยังไง?</summary>

```typescript
const app = express();
```
เติมแค่ `express`

</details>

<details>
<summary>Hint 3: SSEServerTransport ต้องการอะไร?</summary>

SSEServerTransport ต้องการ path ที่ client จะส่ง message มา:
```typescript
new SSEServerTransport("/messages", res);
```
เติมแค่ `messages`

</details>

<details>
<summary>Hint 4: ดูเฉลยเต็ม</summary>

**ส่วนบน:**
```typescript
const server = new McpServer({
  name: "weather-checker",
  version: "1.0.0",
  description: "MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)",
});
```

**ส่วนล่าง:**
```typescript
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
});
```

</details>

---

## ✅ ตรวจสอบ
```bash
npm run build && npm start
```
ถ้าเห็นข้อความ `Weather Checker MCP Server is running on http://localhost:3001` แสดงว่าสำเร็จ!
