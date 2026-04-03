# 🥭 เริ่มต้นที่นี่ — Mango Company MCP Server

ยินดีต้อนรับเข้าสู่โปรเจกต์ **Mango Company** — โปรเจกต์ฝึกสร้าง MCP Server ด้วย TypeScript!

---

## 🎯 สิ่งที่คุณจะได้เรียนรู้

- ✅ สร้าง MCP Tool แบบง่าย ๆ
- ✅ ใช้ Zod schema สำหรับ input validation
- ✅ เรียก HTTP API (HTTP Remote)
- ✅ ตั้งค่า MCP Server แบบเสร็จสมบูรณ์

---

## 📚 ไฟล์ที่ต้องอ่านตามลำดับ

### 1️⃣ **อ่านก่อนเสมอ** — `README.md`
อธิบายโปรเจกต์ทั้งหมดและวิธีใช้

### 2️⃣ **ทำงานขณะ** — `exercises/puzzle?.md`
- 📝 `puzzle1_list_code_reviews.md`
- 📝 `puzzle2_get_project_structure.md`
- 📝 `puzzle3_get_team_member.md`
- 📝 `puzzle4_server_setup.md`
- 📝 `puzzle5_vscode_integration.md`

**สำคัญ:** อ่านตามลำดับ Puzzle 1-5 และเติมช่องว่างใน `src/index.ts`

### 3️⃣ **ดูเฉลยหากติดขัด** — `solutions/index.ts`
เฉลยแบบเต็มของไฟล์ main

### 4️⃣ **ต้องบนเพิ่มเติม** — `MOCK_SERVER.md`
ซ่อมหน้าต่างใหม่เพื่อรัน mock API server บน localhost:3000

---

## 🚀 ขั้นตอนการทำ

### ขั้นตอน 1: ติดตั้ง (Install Dependencies)
```bash
cd mango_company
npm install
```

### ขั้นตอน 2: ทำ Puzzles (สำคัญที่สุด!)

เปิดไฟล์ `src/index.ts` แล้ว:

1. **Puzzle 1** — อ่าน `exercises/puzzle1_list_code_reviews.md`
   - เติม `___BLANK_3___` ถึง `___BLANK_6___`

2. **Puzzle 2** — อ่าน `exercises/puzzle2_get_project_structure.md`
   - เติม `___BLANK_7___` ถึง `___BLANK_9___`

3. **Puzzle 3** — อ่าน `exercises/puzzle3_get_team_member.md`
   - เติม `___BLANK_10___` ถึง `___BLANK_12___`

4. **Puzzle 4** — อ่าน `exercises/puzzle4_server_setup.md`
   - เติม `___BLANK_1___` ถึง `___BLANK_2___`

5. **Puzzle 5** — อ่าน `exercises/puzzle5_vscode_integration.md`
   - เติม `___BLANK_13___` ถึง `___BLANK_14___`

### ขั้นตอน 3: Build
```bash
npm run build
```

### ขั้นตอน 4: รัน Mock API Server (ที่หน้าต่างใหม่)

สร้างไฟล์ `mock-server.js` ตามที่อยู่ใน `MOCK_SERVER.md` แล้วรัน:
```bash
node mock-server.js
```

Output:
```
Mock Mango Company API running on http://localhost:3000
```

### ขั้นตอน 5: รัน MCP Server (ที่หน้าต่างปัจจุบัน)
```bash
npm start
```

Output:
```
Mango Company MCP Server is running...
```

✅ **แสดงว่าเสร็จแล้ว!**

---

## 💡 Tips & Tricks

### ❌ สิ่งที่ต้องหลีก
- ❌ อย่ากรอก blanks ตามใจชอบ — ตามไฟล์ exercises ให้ตรง
- ❌ อย่าลืมติดตั้ง mock API server ก่อนรัน
- ❌ อย่าลืม `npm install` ก่อน build

### ✅ สิ่งที่ควรทำ
- ✅ ติดตั้ง dependencies ก่อน `npm install`
- ✅ เปิด mock server ก่อน npm start
- ✅ มองดู hints ใน puzzle file หากติดขัด

### 🔍 การ Debug
ถ้า API calls ล้มเหลว:
1. ✅ ตรวจสอบ mock server กำลังรัน (`localhost:3000`)
2. ✅ ตรวจสอบ URL ถูกต้องหรือไม่
3. ✅ ตรวจสอบ blanks ที่เติมต้องกับตัวอย่าง

---

## 🎓 ความรู้ที่เกี่ยวข้อง

### Concepts ที่ต้องรู้
- `async/await` — การสั่ง Promises
- `fetch()` — HTTP requester
- `Zod` — Type validation library
- `MCP Server` — Model Context Protocol

### ไฟล์ที่ต้องแก้ไข
- `src/index.ts` (ไฟล์หลักเท่านั้น)

### ไฟล์ที่ไม่ต้องแก้
- `package.json` ✅ (ไม่ที่ต้องแก้)
- `tsconfig.json` ✅ (ไม่ต้องแก้)

---

## 🤔 ถ้าติดปัญหา

| ปัญหา | วิธีแก้ |
|-------|--------|
| `npm install` fails | ตรวจสอบ Node.js version >= 16 |
| Blank ไม่รู้เติมอะไร | ดูในไฟล์ exercise ของ puzzle นั้น |
| API returns 404 | ตรวจสอบ mock-server กำลังรัน |
| Build fails | ตรวจสอบ syntax ของช่องว่างที่เติม |
| MCP Server crashes | ดูเฉลย `solutions/index.ts` |

---

## 📞 ติดต่อขอความช่วยเหลือ

- 📖 ดูเฉลยใน `solutions/index.ts`
- 📝 อ่านหมายเหตุใน hint ของแต่ละ puzzle
- 👨‍🏫 ถามผู้สอน / ผู้ฝึกอบรม

---

## ✨ เมื่อเสร็จแล้ว

🎉 **ยินดีด้วย!** คุณเรียนรู้วิธีสร้าง MCP Server ที่เรียก HTTP Remote API แล้ว!

สิ่งต่อไป:
- 🔄 ลองสร้าง tool เพิ่มเติม
- 🌐 ติดต่อ API จริง (มิใช่ mock)
- 🚀 ติดตั้งเป็น Claude integration

---

## 📋 Checklist

เมื่อเสร็จแต่ละ puzzle ให้ checklist:

- [ ] Puzzle 1 — list_code_reviews เสร็จ
- [ ] Puzzle 2 — get_project_structure เสร็จ
- [ ] Puzzle 3 — get_team_member เสร็จ
- [ ] Puzzle 4 — Server setup เสร็จ
- [ ] Puzzle 5 — Transport connection เสร็จ
- [ ] npm run build สำเร็จ
- [ ] npm start ทำงานปกติ

✅ **ทุกอย่างเสร็จแล้ว!**

---

**Good luck! 🚀**
