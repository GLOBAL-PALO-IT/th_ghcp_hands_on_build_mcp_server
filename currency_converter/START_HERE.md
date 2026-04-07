# 💱 เริ่มต้นที่นี่ — Currency Converter MCP Server

ยินดีต้อนรับเข้าสู่โปรเจกต์ **Currency Converter** — โปรเจกต์ฝึกสร้าง MCP Server ด้วย TypeScript!

---

## 🎯 สิ่งที่คุณจะได้เรียนรู้

- ✅ สร้าง MCP Server เปล่า + เชื่อมต่อ VS Code
- ✅ สร้าง MCP Tool แบบง่าย ๆ (ไม่มี input)
- ✅ ใช้ Zod schema สำหรับ input validation
- ✅ เรียก Public API (ExchangeRate-API)
- ✅ แยก Tool เป็นไฟล์แยก (register pattern)

---

## 📚 ไฟล์ที่ต้องอ่านตามลำดับ

### 1️⃣ **อ่านก่อนเสมอ** — `README.md`
อธิบายโปรเจกต์ทั้งหมดและวิธีใช้

### 2️⃣ **ทำงานตาม** — `exercises/puzzle?.md`
- 📝 `puzzle1_server_setup.md`
- 📝 `puzzle2_list_currencies.md`
- 📝 `puzzle3_get_rate.md`
- 📝 `puzzle4_convert.md`
- 📝 `puzzle5_review.md`

**สำคัญ:** อ่านตามลำดับ Puzzle 1-5 และทำตามขั้นตอนในแต่ละ puzzle

### 3️⃣ **ดูเฉลยหากติดขัด** — `solutions/`
- `solutions/index.ts` — เฉลย Server หลัก
- `solutions/tools/*.ts` — เฉลยแต่ละ Tool

---

## 🚀 ขั้นตอนการทำ

### ขั้นตอน 1: ติดตั้ง (Install Dependencies)
```bash
cd currency_converter
npm install
```

### ขั้นตอน 2: ทำ Puzzles (สำคัญที่สุด!)

**Puzzle 1** — อ่าน `exercises/puzzle1_server_setup.md`
- เปิดไฟล์ `src/index.ts`
- เรื่องนี้ไม่ต้องเติมช่องว่าง — server เขียนให้แล้ว
- สร้าง `.vscode/mcp.json` เพื่อเชื่อมต่อ VS Code
- Build + ทดสอบว่า server เชื่อมต่อได้

**Puzzle 2** — อ่าน `exercises/puzzle2_list_currencies.md`
- สร้างไฟล์ `src/tools/list_currencies.ts` จาก template `src/tools/list_currencies.md`
- เติม `___BLANK_1___` ถึง `___BLANK_4___`
- Uncomment import + register ใน `src/index.ts`

**Puzzle 3** — อ่าน `exercises/puzzle3_get_rate.md`
- สร้างไฟล์ `src/tools/get_exchange_rate.ts` จาก template `src/tools/get_exchange_rate.md`
- เติม `___BLANK_1___` ถึง `___BLANK_4___`
- Uncomment import + register ใน `src/index.ts`

**Puzzle 4** — อ่าน `exercises/puzzle4_convert.md`
- สร้างไฟล์ `src/tools/convert_currency.ts` จาก template `src/tools/convert_currency.md`
- เติม `___BLANK_1___` ถึง `___BLANK_2___`
- Uncomment import + register ใน `src/index.ts`

**Puzzle 5** — อ่าน `exercises/puzzle5_review.md`
- ทบทวนภาพรวมและสถาปัตยกรรมทั้งหมด

### ขั้นตอน 3: Build (ทำหลังแต่ละ Puzzle)
```bash
npm run build
```

### ขั้นตอน 4: รัน MCP Server
```bash
npm start
```

Output:
```
Currency Converter MCP Server is running...
```

✅ **แสดงว่าเสร็จแล้ว!**

---

## 💡 Tips & Tricks

### ❌ สิ่งที่ต้องหลีก
- ❌ อย่ากรอก blanks ตามใจชอบ — ตามไฟล์ exercises ให้ตรง
- ❌ อย่าลืม `npm install` ก่อน build
- ❌ อย่าลืม uncomment import + register ใน `src/index.ts` หลังสร้างแต่ละ tool

### ✅ สิ่งที่ควรทำ
- ✅ ติดตั้ง dependencies ก่อน `npm install`
- ✅ Build + ทดสอบหลังทำแต่ละ puzzle
- ✅ มองดู hints ใน puzzle file หากติดขัด

### 🔍 การ Debug
ถ้า tools ล้มเหลว:
1. ✅ ตรวจสอบ blanks ที่เติมตรงกับตัวอย่าง
2. ✅ ตรวจสอบว่า uncomment import + register แล้ว
3. ✅ ตรวจสอบว่า build ผ่านไม่มี error
4. ✅ ตรวจสอบ internet connection (API ต้องเรียกผ่าน internet)

---

## 🎓 ความรู้ที่เกี่ยวข้อง

### Concepts ที่ต้องรู้
- `async/await` — การสั่ง Promises
- `fetch()` — HTTP requester
- `Zod` — Type validation library
- `MCP Server` — Model Context Protocol

### ไฟล์ที่ต้องแก้ไข
- `src/index.ts` — uncomment imports + registers
- `src/tools/list_currencies.ts` — สร้างจาก `.md` template
- `src/tools/get_exchange_rate.ts` — สร้างจาก `.md` template
- `src/tools/convert_currency.ts` — สร้างจาก `.md` template

### ไฟล์ที่ไม่ต้องแก้
- `package.json` ✅ (ไม่ต้องแก้)
- `tsconfig.json` ✅ (ไม่ต้องแก้)

---

## 🤔 ถ้าติดปัญหา

| ปัญหา | วิธีแก้ |
|-------|--------|
| `npm install` fails | ตรวจสอบ Node.js version >= 16 |
| Blank ไม่รู้เติมอะไร | ดูในไฟล์ exercise ของ puzzle นั้น |
| Build fails | ตรวจสอบ syntax ของช่องว่างที่เติม |
| API returns error | ตรวจสอบ internet connection |
| MCP Server crashes | ดูเฉลย `solutions/` |
| Tool ไม่ปรากฏใน VS Code | ตรวจสอบ `.vscode/mcp.json` |

---

## 📞 ติดต่อขอความช่วยเหลือ

- 📖 ดูเฉลยใน `solutions/`
- 📝 อ่านหมายเหตุใน hint ของแต่ละ puzzle
- 👨‍🏫 ถามผู้สอน / ผู้ฝึกอบรม

---

## ✨ เมื่อเสร็จแล้ว

🎉 **ยินดีด้วย!** คุณเรียนรู้วิธีสร้าง MCP Server ที่เรียก Public API แล้ว!

สิ่งต่อไป:
- 🔄 ลองสร้าง tool เพิ่มเติม
- 🌐 ลองใช้ API อื่น
- 🚀 ลองสร้าง HTTP Remote Server (ดู workshop `mango_company`)

---

## 📋 Checklist

เมื่อเสร็จแต่ละ puzzle ให้ checklist:

- [ ] Puzzle 1 — Blank Server + VS Code Connection เสร็จ
- [ ] Puzzle 2 — list_currencies เสร็จ
- [ ] Puzzle 3 — get_exchange_rate เสร็จ
- [ ] Puzzle 4 — convert_currency เสร็จ
- [ ] Puzzle 5 — Review & ทบทวนเสร็จ
- [ ] npm run build สำเร็จ
- [ ] npm start ทำงานปกติ
- [ ] ทุก tool ปรากฏใน VS Code MCP server

✅ **ทุกอย่างเสร็จแล้ว!**

---

**Good luck! 🚀**
