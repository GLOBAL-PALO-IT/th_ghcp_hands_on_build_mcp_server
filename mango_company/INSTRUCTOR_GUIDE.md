# 📋 Mango Company — Project Overview

## ภาพรวมของโปรเจกต์

**Mango Company** เป็นการฝึกสร้าง MCP Server ที่คล้ายกับ Currency Converter แต่ใช้ **HTTP Remote API** แทนการเรียก API ที่อยู่บน web

---

## 🎯 จุดมุ่งหมาย

เรียนรู้:
1. ✅ สร้าง MCP Tool ด้วย `server.tool()`
2. ✅ รับ Input parameters ด้วย Zod schema
3. ✅ เรียก **HTTP Remote API** (localhost:3000)
4. ✅ ตั้งค่า MCP Server และ Transport

---

## 📐 ความแตกต่างกับ Currency Converter

| ลักษณะ | Currency Converter | Mango Company |
|--------|-------------------|---------------|
| **ประเภท API** | Public API (open.er-api.com) | HTTP Remote (localhost:3000) |
| **ข้อมูล** | อัตราแลกเปลี่ยนสกุลเงิน | Code Reviews, Project Structure, Team Info |
| **Tools** | 3 tools | 3 tools |
| **Complexity** | ต่ำ (fetch + parse) | ต่ำ-กลาง (HTTP remote) |

---

## 🧩 Puzzle Structure

| Puzzle | เรื่อง | Blank จำนวน |
|--------|-------|-----------|
| 1 | list_code_reviews | 4 |
| 2 | get_project_structure | 3 |
| 3 | get_team_member | 3 |
| 4 | Server Setup | 2 |
| 5 | Transport Connection | 2 |
| **รวม** | | **14** |

---

## 📂 ไฟล์ที่ต้องเติม

### `src/index.ts` — ไฟล์หลัก (ต้องเติมช่องว่าง)

Blanks ที่ต้องเติม:
```
BLANK_1  → Server name (mango-company)
BLANK_2  → Version (1.0.0)
BLANK_3  → Tool name (list_code_reviews)
BLANK_4  → Tool description
BLANK_5  → API URL (http://localhost:3000/api/code-reviews)
BLANK_6  → Text prefix
BLANK_7  → Zod type (string)
BLANK_8  → API endpoint (projects)
BLANK_9  → Response property (structure)
BLANK_10 → Zod type (string)
BLANK_11 → API endpoint (team)
BLANK_12 → Response property (member)
BLANK_13 → Transport class (StdioServerTransport)
BLANK_14 → Connect method (connect)
```

---

## 🚀 วิธีใช้สำหรับเด็กเรียน

### ขั้นตอน 1: ดูรวมแรก
```bash
cd mango_company
cat README.md
```

### ขั้นตอน 2: เริ่มทำ Puzzles
```bash
1. อ่าน exercises/puzzle1_list_code_reviews.md
2. เติมช่องว่าง BLANK_3, BLANK_4, BLANK_5, BLANK_6 ใน src/index.ts
3. ทำ puzzle 2, 3, 4, 5 ตามลำดับ
4. เมื่อเสร็จทั้งหมด → build & test
```

### ขั้นตอน 3: Build & Test
```bash
npm install
npm run build
npm start
```

### ขั้นตอน 4: ทดสอบ API (อีกหน้าต่าง)
```bash
# ก่อนขั้นตอน 3 ให้เปิดหน้าต่างใหม่
node MOCK_SERVER.md  # ดูไฟล์ดังกล่าว
```

---

## 📚 ไฟล์ที่ต้องสำเร็จ

- ✅ `src/index.ts` — เติมช่องว่าง
- ✅ `exercises/puzzle*.md` — อ่านเธอเพื่อหา blanks
- ✅ `solutions/index.ts` — ดูเฉลยหากติดขัด

---

## 🌐 HTTP API มocked data

Mock server ที่เสมือนขึ้นมาด้วย Node.js:

```javascript
// mock-server.js — create this file to run locally
const http = require('http');
const server = http.createServer((req, res) => {
  // ... handle /api/code-reviews, /api/projects/{lang}, /api/team/{member}
});
server.listen(3000);
```

ดู `MOCK_SERVER.md` สำหรับคำแนะนำเต็ม

---

## 💡 ประเด็นสำคัญ

1. **ต้องติดตั้ง Mock Server ก่อน**
   - MCP Server จะเรียก HTTP API บน localhost:3000
   - หากไม่มี mock server, MCP server จะ crash

2. **Input Parameters เป็น Zod**
   - `z.string()` — สำหรับ text input
   - `z.number()` — สำหรับ number input
   - ต้องให้คำอธิบาย `.describe(...)`

3. **HTTP Remote vs Public API**
   - Currency Converter ใช้ API จากเน็ต (open.er-api.com)
   - Mango Company ต้องมี local server (localhost:3000)

---

## 🎓 เรียนรู้ที่ได้

1. MCP Server structure ✅
2. Tool registration ✅
3. Input schema (Zod) ✅
4. Async/await with fetch ✅
5. HTTP Remote API integration ✅
6. Server transport (stdio) ✅

---

## 📝 เอกสารอ้างอิง

- `README.md` — Project overview
- `exercises/puzzle*.md` — Step-by-step guides
- `solutions/index.ts` — Complete solution
- `MOCK_SERVER.md` — Mock API setup
