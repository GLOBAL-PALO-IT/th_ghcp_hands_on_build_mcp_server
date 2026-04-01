# 🧩 Puzzle 5: VS Code Integration

## 📖 เป้าหมาย
เรียนรู้การเชื่อมต่อ MCP Server กับ **VS Code** เพื่อใช้งานผ่าน GitHub Copilot Chat

## 🔧 ความรู้ที่ต้องใช้

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

### ประเภทของ MCP Server ใน VS Code
| Type | คำอธิบาย |
|------|----------|
| `stdio` | สื่อสารผ่าน stdin/stdout (สำหรับ local server) |
| `sse` | สื่อสารผ่าน Server-Sent Events (สำหรับ remote server) |

### Path ของ server
เนื่องจาก TypeScript ต้อง compile เป็น JavaScript ก่อน ดังนั้น path ที่ใช้คือ:
```
currency_converter/dist/index.js
```

---

## ✏️ ช่องว่างที่ต้องเติม

สร้างไฟล์ `.vscode/mcp.json` ที่ root ของโปรเจกต์ แล้วเติมช่องว่าง:

```json
{
  "servers": {
    "currency-converter": {
      "type": "___BLANK_15___",
      "command": "___BLANK_16___",
      "args": ["___BLANK_17___"]
    }
  }
}
```

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_15___` | ประเภทการเชื่อมต่อ | `stdio` |
| `___BLANK_16___` | คำสั่งที่ใช้รัน server | `node` |
| `___BLANK_17___` | path ไปยังไฟล์ server | `currency_converter/dist/index.js` |

---

## 💡 Hints

<details>
<summary>Hint 1: Type ควรเลือกอะไร?</summary>

เนื่องจาก server ของเรารันเป็น local process และสื่อสารผ่าน stdin/stdout:
```json
"type": "stdio"
```

</details>

<details>
<summary>Hint 2: Command และ Args?</summary>

เรารัน server ด้วย Node.js:
- command: `"node"`
- args: `["currency_converter/dist/index.js"]`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

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

---

## ✅ ทดสอบการใช้งาน

1. สร้างไฟล์ `.vscode/mcp.json` ตามเฉลย
2. เปิด VS Code ใหม่ (หรือ Reload Window: `Cmd + Shift + P` → "Reload Window")
3. เปิด **Copilot Chat** (`Cmd + Shift + I` หรือคลิกไอคอน Copilot)
4. เลือกโหมด **Agent** (ไอคอนรูปคน)
5. ลองถามคำถามเหล่านี้:

```
แสดงรายการสกุลเงินที่รองรับ
```

```
อัตราแลกเปลี่ยน USD เป็น THB วันนี้เท่าไร?
```

```
แปลง 1000 USD เป็น THB
```

6. สังเกตว่า Copilot จะเรียก tool ที่เราสร้างโดยอัตโนมัติ! 🎉

---

## 🏆 สรุป Workshop

ยินดีด้วย! คุณได้เรียนรู้:

| สิ่งที่เรียนรู้ | Puzzle |
|----------------|--------|
| สร้าง MCP Tool แบบไม่มี input | Puzzle 1 |
| กำหนด Input Schema ด้วย Zod | Puzzle 2 |
| สร้าง Tool ที่มี logic ซับซ้อนขึ้น | Puzzle 3 |
| ประกอบ MCP Server + Transport | Puzzle 4 |
| เชื่อมต่อกับ VS Code | Puzzle 5 |
