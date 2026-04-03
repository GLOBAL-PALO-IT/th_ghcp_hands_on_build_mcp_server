# 🧩 Puzzle 5: VS Code Integration (HTTP Remote)

## 📖 เป้าหมาย
เรียนรู้การเชื่อมต่อ **HTTP Remote MCP Server** กับ **VS Code** เพื่อใช้งานผ่าน GitHub Copilot Chat

## 🔧 ความรู้ที่ต้องใช้

### `.vscode/mcp.json` คืออะไร?
เป็นไฟล์ config ที่บอก VS Code ว่ามี MCP Server อะไรบ้าง และจะเชื่อมต่อยังไง

### ความแตกต่างของ type ใน mcp.json

```json
// แบบ Stdio (NPM Package — รัน local process)
{
  "servers": {
    "my-server": {
      "type": "stdio",
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}

// แบบ SSE (HTTP Remote — เชื่อมต่อผ่าน URL)
{
  "servers": {
    "my-server": {
      "type": "sse",
      "url": "http://localhost:3001/sse"
    }
  }
}
```

| Type | คำอธิบาย | ใช้เมื่อ |
|------|----------|---------|
| `stdio` | สื่อสารผ่าน stdin/stdout | local server (NPM package) |
| `sse` | สื่อสารผ่าน Server-Sent Events | remote server (HTTP) |

### สำหรับ HTTP Remote
- ต้อง **รัน server ก่อน** ด้วย `npm start`
- VS Code จะเชื่อมต่อผ่าน URL ที่กำหนด
- ไม่ต้องระบุ `command` หรือ `args` — ระบุแค่ `url`

---

## ✏️ ช่องว่างที่ต้องเติม

สร้างไฟล์ `.vscode/mcp.json` ที่ root ของโปรเจกต์ แล้วเติมช่องว่าง:

```json
{
  "servers": {
    "weather-checker": {
      "type": "___BLANK_17___",
      "url": "___BLANK_18___"
    }
  }
}
```

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_17___` | ประเภทการเชื่อมต่อ | `sse` |
| `___BLANK_18___` | URL ของ SSE endpoint | `http://localhost:3001/sse` |

---

## 💡 Hints

<details>
<summary>Hint 1: Type ควรเลือกอะไร?</summary>

เนื่องจาก server ของเราเป็น HTTP Remote ที่สื่อสารผ่าน Server-Sent Events:
```json
"type": "sse"
```

</details>

<details>
<summary>Hint 2: URL ต้องใส่อะไร?</summary>

URL ต้องชี้ไปที่ SSE endpoint ของ server:
```json
"url": "http://localhost:3001/sse"
```

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

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

---

## ✅ วิธีทดสอบ

1. **รัน server ก่อน:**
```bash
cd weather_checker
npm run build && npm start
```

2. **เปิด VS Code** แล้วตรวจสอบว่า `.vscode/mcp.json` ถูกต้อง

3. **เปิด GitHub Copilot Chat** แล้วลองถาม:
   - "ค้นหาตำแหน่งกรุงเทพ"
   - "สภาพอากาศปัจจุบันที่พิกัด 13.75, 100.5"
   - "พยากรณ์อากาศ 5 วันที่กรุงเทพ"

4. Copilot จะเรียกใช้ tools จาก Weather Checker MCP Server ของเราผ่าน HTTP!

---

## 🎯 สรุปความแตกต่าง Stdio vs HTTP Remote

| | Currency Converter (Stdio) | Weather Checker (HTTP Remote) |
|---|---|---|
| Transport | `StdioServerTransport` | `SSEServerTransport` + Express |
| การสื่อสาร | stdin/stdout | HTTP (GET /sse + POST /messages) |
| mcp.json type | `"stdio"` | `"sse"` |
| mcp.json config | `command` + `args` | `url` |
| การรัน | VS Code รันให้อัตโนมัติ | ต้องรัน server เองก่อน |
| เข้าถึง | เฉพาะเครื่องนี้ | จากที่ไหนก็ได้ (ถ้า deploy) |
