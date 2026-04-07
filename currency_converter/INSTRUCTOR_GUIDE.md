# 📋 Currency Converter — Project Overview

## ภาพรวมของโปรเจกต์

**Currency Converter** เป็นการฝึกสร้าง MCP Server ที่ใช้ **Public API** (ExchangeRate-API) สำหรับดึงอัตราแลกเปลี่ยนและแปลงสกุลเงิน

---

## 🎯 จุดมุ่งหมาย

เรียนรู้:
1. ✅ สร้าง MCP Server เปล่า + เชื่อมต่อ VS Code (Server-First Approach)
2. ✅ สร้าง MCP Tool ด้วย `server.tool()`
3. ✅ รับ Input parameters ด้วย Zod schema
4. ✅ เรียก **Public API** (open.er-api.com)
5. ✅ แยก Tool เป็นไฟล์แยก (register pattern)

---

## 📐 ความแตกต่างกับ Mango Company

| ลักษณะ | Currency Converter | Mango Company |
|--------|-------------------|---------------|
| **ประเภท API** | Public API (open.er-api.com) | HTTP Remote (localhost:3000) |
| **ข้อมูล** | อัตราแลกเปลี่ยนสกุลเงิน | Code Reviews, Project Structure, Team Info |
| **Tools** | 3 tools | 3 tools |
| **โครงสร้างโค้ด** | แยกไฟล์ต่อ Tool (modular) | ทุกอย่างใน index.ts (all-in-one) |
| **ลำดับ Puzzle** | Server ก่อน → แล้วเพิ่ม Tools | Tools ก่อน → แล้ว Setup Server |
| **Prerequisite** | Internet connection | Local Mock Server |

---

## 🧩 Puzzle Structure

| Puzzle | เรื่อง | ไฟล์ที่ต้องแก้ | Blank จำนวน |
|--------|-------|--------------|-----------|
| 1 | Blank Server + VS Code | `src/index.ts` + `.vscode/mcp.json` | 7 |
| 2 | list_currencies | `src/tools/list_currencies.ts` + uncomment | 4 |
| 3 | get_exchange_rate | `src/tools/get_exchange_rate.ts` + uncomment | 4 |
| 4 | convert_currency | `src/tools/convert_currency.ts` + uncomment | 2 |
| 5 | Review & ภาพรวม | (ไม่ต้องแก้ไฟล์) | 0 |
| **รวม** | | | **17** |

---

## 📂 ไฟล์ที่ต้องเติม

### `src/index.ts` — Server หลัก (Puzzle 1)

Server เขียนให้แล้ว — ผู้เรียนต้อง:
- ทำความเข้าใจโค้ด
- สร้าง `.vscode/mcp.json`
- Uncomment import + register ตามลำดับ Puzzle 2-4

### `src/tools/list_currencies.md` → สร้างเป็น `.ts` (Puzzle 2)

Blanks ที่ต้องเติม:
```
BLANK_1  → Tool name (list_currencies)
BLANK_2  → Tool description (แสดงรายการสกุลเงินทั้งหมดที่รองรับ)
BLANK_3  → API URL (https://open.er-api.com/v6/latest/USD)
BLANK_4  → Text prefix (สกุลเงินที่รองรับ:\n)
```

### `src/tools/get_exchange_rate.md` → สร้างเป็น `.ts` (Puzzle 3)

Blanks ที่ต้องเติม:
```
BLANK_1  → Zod type (string)
BLANK_2  → Zod type (string)
BLANK_3  → API endpoint (latest)
BLANK_4  → Response property (rates)
```

### `src/tools/convert_currency.md` → สร้างเป็น `.ts` (Puzzle 4)

Blanks ที่ต้องเติม:
```
BLANK_1  → Zod type (number)
BLANK_2  → Variable name (amount)
```

---

## 🚀 วิธีใช้สำหรับผู้เรียน

### ขั้นตอน 1: ดูภาพรวม
```bash
cd currency_converter
cat README.md
```

### ขั้นตอน 2: เริ่มทำ Puzzles
```
1. อ่าน exercises/puzzle1_server_setup.md
2. Build + เชื่อมต่อ VS Code
3. อ่าน exercises/puzzle2_list_currencies.md
4. สร้างไฟล์ src/tools/list_currencies.ts จาก template .md → เติม BLANKs
5. Uncomment import + register ใน src/index.ts
6. Build + ทดสอบ
7. ทำ puzzle 3, 4 แบบเดียวกัน
8. ทบทวนด้วย puzzle 5
```

### ขั้นตอน 3: Build & Test
```bash
npm install
npm run build
npm start
```

---

## 📚 ไฟล์สำหรับผู้เรียน

- ✅ `src/index.ts` — Server หลัก (uncomment ตามลำดับ)
- ✅ `src/tools/*.md` — Templates สำหรับสร้างไฟล์ `.ts`
- ✅ `exercises/puzzle*.md` — อ่านเพื่อทำแต่ละ puzzle
- ✅ `solutions/` — ดูเฉลยหากติดขัด

---

## 🌐 Public API — ExchangeRate-API

API ที่ใช้เป็น **Public API ฟรี** ไม่ต้องสมัคร API key:

```bash
# แสดงอัตราแลกเปลี่ยน (base: USD)
curl https://open.er-api.com/v6/latest/USD

# แสดงอัตราแลกเปลี่ยน (base: THB)
curl https://open.er-api.com/v6/latest/THB
```

Response ตัวอย่าง:
```json
{
  "result": "success",
  "base_code": "USD",
  "time_last_update_utc": "Mon, 31 Mar 2025 00:00:01 +0000",
  "rates": {
    "USD": 1,
    "THB": 34.5,
    "EUR": 0.92,
    "JPY": 149.8
  }
}
```

---

## 💡 ประเด็นสำคัญ

1. **ไม่ต้องมี Mock Server**
   - ใช้ Public API บน internet ได้เลย
   - ต้องมี internet connection

2. **Input Parameters เป็น Zod**
   - `z.string()` — สำหรับ text input
   - `z.number()` — สำหรับ number input
   - `z.string().length(3)` — รหัสสกุลเงิน 3 ตัวอักษร
   - ต้องให้คำอธิบาย `.describe(...)`

3. **Server-First Approach**
   - Puzzle 1 สร้าง server เปล่าก่อน → ยืนยัน handshake
   - แล้วค่อยเพิ่ม tools ทีละตัว (Puzzle 2-4)

4. **Separate File Pattern**
   - แต่ละ tool อยู่ในไฟล์แยก `src/tools/*.ts`
   - ใช้ `register` function pattern
   - Import + register ใน `src/index.ts`

---

## 🎓 เรียนรู้ที่ได้

1. MCP Server structure ✅
2. Server-First Approach (blank server → add tools) ✅
3. Tool registration (separate file pattern) ✅
4. Input schema (Zod) ✅
5. Async/await with fetch ✅
6. Public API integration ✅
7. VS Code MCP integration (.vscode/mcp.json) ✅
8. Server transport (stdio) ✅

---

## 📝 เอกสารอ้างอิง

- `README.md` — Project overview
- `START_HERE.md` — Step-by-step guide
- `exercises/puzzle*.md` — Exercise guides
- `solutions/` — Complete solutions
