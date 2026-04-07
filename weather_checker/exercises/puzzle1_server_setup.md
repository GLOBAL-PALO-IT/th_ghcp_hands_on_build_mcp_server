# 🧩 Puzzle 1: สร้าง Blank Server + เชื่อมต่อ VS Code

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

### สร้าง McpServer

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ server | `"weather-checker"` |
| `___BLANK_2___` | เวอร์ชัน server | `"1.0.0"` |
| `___BLANK_3___` | คำอธิบาย server | `"MCP Server สำหรับเช็คสภาพอากาศ (HTTP Remote)"` |
| `___BLANK_4___` | server port | `3001` |

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
| `___BLANK_8___` | ประเภทการเชื่อมต่อ | `"http"` |
| `___BLANK_9___` | URL ของ MCP endpoint | `"http://localhost:3001/mcp"` |

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

สำหรับ HTTP Remote Server ใช้ `StreamableHTTPServerTransport` (สื่อสารผ่าน Streamable HTTP)

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

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
});

await server.connect(transport);

app.all("/mcp", async (req, res) => {
  await transport.handleRequest(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Weather Checker MCP Server is running on http://localhost:${PORT}`);
  console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
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
