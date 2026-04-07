# 💱 Currency Converter — MCP Server Hands-on Project

เป็น MCP Server สำหรับแปลงสกุลเงินด้วย Public API (ExchangeRate-API)

## 📚 โครงการนี้เรียนรู้!

- ✅ สร้าง MCP Server เปล่า + เชื่อมต่อ VS Code
- ✅ สร้าง MCP Tool ด้วย `server.tool()`
- ✅ รับ input parameters ด้วย Zod schema
- ✅ เรียก Public API เพื่อดึงอัตราแลกเปลี่ยน
- ✅ แยก Tool เป็นไฟล์แยก (register pattern)

## 📁 โครงสร้างโปรเจกต์

```
currency_converter/
├── src/
│   ├── index.ts                      # Server หลัก (Puzzle 1)
│   └── tools/
│       ├── list_currencies.md        # Template Tool 1 (Puzzle 2)
│       ├── get_exchange_rate.md      # Template Tool 2 (Puzzle 3)
│       └── convert_currency.md       # Template Tool 3 (Puzzle 4)
├── exercises/
│   ├── puzzle1_server_setup.md
│   ├── puzzle2_list_currencies.md
│   ├── puzzle3_get_rate.md
│   ├── puzzle4_convert.md
│   └── puzzle5_review.md
├── solutions/
│   ├── index.ts                      # เฉลย Server หลัก
│   └── tools/
│       ├── list_currencies.ts        # เฉลย Tool 1
│       ├── get_exchange_rate.ts      # เฉลย Tool 2
│       └── convert_currency.ts       # เฉลย Tool 3
├── package.json
└── tsconfig.json
```

## 🎯 วิธีทำ

### ขั้นตอน 1: ติดตั้ง Dependencies
```bash
cd currency_converter
npm install
```

### ขั้นตอน 2: ทำ Puzzles ตามลำดับ
อ่านไฟล์ exercises และทำตามขั้นตอนแต่ละ puzzle:

1. **Puzzle 1**: `puzzle1_server_setup.md` — สร้าง Blank Server + เชื่อมต่อ VS Code
2. **Puzzle 2**: `puzzle2_list_currencies.md` — เพิ่ม tool `list_currencies`
3. **Puzzle 3**: `puzzle3_get_rate.md` — เพิ่ม tool `get_exchange_rate`
4. **Puzzle 4**: `puzzle4_convert.md` — เพิ่ม tool `convert_currency`
5. **Puzzle 5**: `puzzle5_review.md` — ภาพรวม & Review

### ขั้นตอน 3: Build & Test
```bash
npm run build
npm start
```

Server ควรแสดง: `Currency Converter MCP Server is running...`

## 📡 API ที่ใช้

Server จะเรียก ExchangeRate-API (Public API ฟรี) ในรูปแบบนี้:

### 1. List Currencies
```
GET https://open.er-api.com/v6/latest/USD
Response: { "result": "success", "base_code": "USD", "rates": { "USD": 1, "THB": 34.5, ... } }
```
- ดึง key จาก `rates` มาแสดงเป็นรายการสกุลเงิน

### 2. Get Exchange Rate
```
GET https://open.er-api.com/v6/latest/{from}
Response: { "result": "success", "base_code": "USD", "time_last_update_utc": "...", "rates": { "THB": 34.5, ... } }
```
- `from`: รหัสสกุลเงินต้นทาง เช่น USD, EUR, THB

### 3. Convert Currency
```
GET https://open.er-api.com/v6/latest/{from}
```
- API ไม่รองรับ `amount` — ต้องคำนวณเอง: `amount * rate`

---

## 🎓 เรียนรู้สิ่งต่างๆ

### สิ่งที่แตกต่างจาก Mango Company:
- **Currency Converter**: ใช้ Public API บน web (open.er-api.com) — ไม่ต้องติดตั้ง server แยก
- **Mango Company**: ใช้ HTTP Remote API บน localhost (ต้องติดตั้ง mock server แยกต่างหาก)

### แนวทาง Server-First:
- สร้าง server เปล่าก่อน → ยืนยัน handshake กับ VS Code → แล้วค่อยเพิ่ม tools ทีละตัว

### Separate File Pattern:
- แต่ละ tool อยู่ในไฟล์แยก (`src/tools/*.ts`)
- ใช้ `register` function: `export function registerXxx(server: McpServer)`

### ความรู้ที่ต้องใช้:
- `server.tool()` — ลงทะเบียน tool ใน MCP Server
- `z.string()`, `z.number()` — Zod schema สำหรับ input validation
- `fetch()` — เรียก HTTP API
- `async/await` — การโปรแกรมแบบ asynchronous

---

## 🚀 Tips

- ดูเฉลย: `solutions/index.ts` และ `solutions/tools/*.ts`
- ถ้าติดขัดหรือสับสน ให้อ่าน hints ในไฟล์ exercise
- API นี้ใช้ฟรีได้ ไม่ต้องสมัคร API key
