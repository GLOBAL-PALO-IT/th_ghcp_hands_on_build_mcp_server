# 🥭 Mango Company — MCP Server Hands-on Project

เป็น MCP Server สำหรับจัดเก็บข้อมูล Mango Company ด้วย HTTP Remote API

## 📚 โครงการนี้เรียนรู้!

- ✅ สร้าง MCP Tool ด้วย `server.tool()`
- ✅ รับ input parameters ด้วย Zod schema
- ✅ เรียก HTTP API remote เพื่อดึงข้อมูล
- ✅ ตั้งค่า MCP Server และเชื่อมต่อ transport

## 📁 โครงสร้างโปรเจกต์

```
mango_company/
├── src/
│   ├── index.ts              # ไฟล์หลักที่มี puzzles ให้เติมช่องว่าง
│   └── tools/
│       ├── list_code_reviews.ts
│       ├── get_project_structure.ts
│       └── get_team_member.ts
├── exercises/
│   ├── puzzle1_server_setup.md
│   ├── puzzle2_mock_server.md
│   ├── puzzle3_list_code_reviews.md
│   ├── puzzle4_get_project_structure.md
│   └── puzzle5_get_team_member.md
├── solutions/
│   └── index.ts              # เฉลยเต็มของไฟล์ src/index.ts
├── package.json
└── tsconfig.json
```

## 🎯 วิธีทำ

### ขั้นตอน 1: ติดตั้ง Dependencies
```bash
cd mango_company
npm install
```

### ขั้นตอน 2: ทำ Puzzles ตามลำดับ
อ่านไฟล์ exercises และเติมช่องว่าง `___BLANK_X___` ใน `src/index.ts`:

1. **Puzzle 1**: `puzzle1_server_setup.md` — ตั้งค่า MCP Server
2. **Puzzle 2**: `puzzle2_mock_server.md` — ตั้งค่า Mock HTTP Server
3. **Puzzle 3**: `puzzle3_list_code_reviews.md` — สร้าง tool `list_code_reviews`
4. **Puzzle 4**: `puzzle4_get_project_structure.md` — สร้าง tool `get_project_structure`
5. **Puzzle 5**: `puzzle5_get_team_member.md` — สร้าง tool `get_team_member`

### ขั้นตอน 3: Build & Test
```bash
npm run build
npm start
```

Server ควรแสดง: `Mango Company MCP Server is running...`

## 📡 API ที่ใช้

Server จะเรียก HTTP API ในรูปแบบนี้:

### 1. List Code Reviews
```
GET http://localhost:3000/api/code-reviews
Response: { "result": "success", "data": [...] }
```

### 2. Get Project Structure
```
GET http://localhost:3000/api/projects/{language}
Response: { "result": "success", "structure": {...} }
```
- `language`: Java, React, หรือ Flutter

### 3. Get Team Member
```
GET http://localhost:3000/api/team/{member}
Response: { "result": "success", "member": {...} }
```
- `member`: ชื่อหรือ ID ของสมาชิก

---

## 🎓 เรียนรู้สิ่งต่างๆ

### สิ่งที่แตกต่างจาก Currency Converter:
- **Currency Converter**: ใช้ API บน web (open.er-api.com)
- **Mango Company**: ใช้ HTTP Remote API บน localhost (ต้องติดตั้ง server แยกต่างหาก)

### ความรู้ที่ต้องใช้:
- `server.tool()` — สมัครสมาชิก tool ใน MCP Server
- `z.string()`, `z.number()` — Zod schema สำหรับ input validation
- `fetch()` — เรียก HTTP API
- `async/await` — การโปรแกรมแบบ asynchronous

---

## 🚀 Tips

- ดูเฉลย: `solutions/index.ts`
- ถ้าติดป้ายหรือสับสน่อน ให้อ่าน hints ในไฟล์ exercise
- ตรวจสอบให้แน่ใจว่า HTTP Server ทำงานบน `localhost:3000` ก่อน

---

## 📝 หมายเหตุ

โปรเจกต์นี้เป็นส่วนของ Hands-on Workshop สำหรับเรียนรู้การสร้าง MCP Servers ด้วย Node.js/TypeScript
