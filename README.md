# 🔄 Currency Converter MCP Server — Hands-on Workshop

สร้าง MCP Server สำหรับแปลงสกุลเงิน ด้วย TypeScript + MCP SDK + frankfurter.app API

## 📋 สิ่งที่จะได้เรียนรู้

| Puzzle | หัวข้อ | สิ่งที่เรียนรู้ |
|--------|--------|----------------|
| 1 | list_currencies | สร้าง MCP Tool แบบไม่มี input |
| 2 | get_exchange_rate | กำหนด Input Schema ด้วย Zod |
| 3 | convert_currency | Tool ที่มี logic ซับซ้อนขึ้น |
| 4 | Server Setup | ประกอบ MCP Server + Transport |
| 5 | VS Code Integration | เชื่อมต่อกับ VS Code Copilot |

## 🛠️ Pre-requisites

- **Node.js 18+** — [ดาวน์โหลด](https://nodejs.org/)
- **VS Code** + **GitHub Copilot extension**
- ความรู้ JavaScript/TypeScript เบื้องต้น

## 🚀 เริ่มต้น

### 1. ติดตั้ง Dependencies

```bash
cd currency_converter
npm install
```

### 2. ทำ Puzzle ตามลำดับ

เปิดไฟล์ `src/index.ts` — นี่คือไฟล์หลักที่มีช่องว่าง (`___BLANK___`) ให้เติม

อ่านคำแนะนำแต่ละ puzzle ได้ที่:

1. [exercises/puzzle1_list_currencies.md](currency_converter/exercises/puzzle1_list_currencies.md)
2. [exercises/puzzle2_get_rate.md](currency_converter/exercises/puzzle2_get_rate.md)
3. [exercises/puzzle3_convert.md](currency_converter/exercises/puzzle3_convert.md)
4. [exercises/puzzle4_server_setup.md](currency_converter/exercises/puzzle4_server_setup.md)
5. [exercises/puzzle5_vscode_integration.md](currency_converter/exercises/puzzle5_vscode_integration.md)

### 3. Build & ทดสอบ

```bash
cd currency_converter
npm run build
```

ทดสอบว่า server แสดง tools ถูกต้อง:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
{"jsonrpc":"2.0","method":"notifications/initialized"}
{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | node dist/index.js
```

### 4. ใช้งานกับ VS Code

1. สร้างไฟล์ `.vscode/mcp.json` (ตาม Puzzle 5)
2. Reload VS Code
3. เปิด Copilot Chat → เลือก Agent mode
4. ลองถาม: **"แปลง 1000 USD เป็น THB"**

## 📂 โครงสร้างโปรเจกต์

```
currency_converter/
├── src/
│   └── index.ts                      # 📝 Puzzle template — เติมช่องว่างที่นี่
├── exercises/
│   ├── puzzle1_list_currencies.md     # 📖 คำแนะนำ Puzzle 1
│   ├── puzzle2_get_rate.md            # 📖 คำแนะนำ Puzzle 2
│   ├── puzzle3_convert.md             # 📖 คำแนะนำ Puzzle 3
│   ├── puzzle4_server_setup.md        # 📖 คำแนะนำ Puzzle 4
│   └── puzzle5_vscode_integration.md  # 📖 คำแนะนำ Puzzle 5
├── solutions/
│   └── index.ts                       # ✅ เฉลย (ดูเมื่อทำเสร็จ)
├── package.json
└── tsconfig.json
```

## 🌐 API ที่ใช้

**[frankfurter.app](https://www.frankfurter.app/)** — API อัตราแลกเปลี่ยนฟรี ไม่ต้องใช้ API key

| Endpoint | ตัวอย่าง |
|----------|---------|
| รายการสกุลเงิน | `https://api.frankfurter.app/currencies` |
| อัตราแลกเปลี่ยน | `https://api.frankfurter.app/latest?from=USD&to=THB` |
| แปลงเงิน | `https://api.frankfurter.app/latest?amount=100&from=USD&to=THB` |
