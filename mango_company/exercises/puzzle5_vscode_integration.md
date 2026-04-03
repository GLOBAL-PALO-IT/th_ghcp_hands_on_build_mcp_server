# 🧩 Puzzle 5: เชื่อมต่อ Server Transport

## 📖 เป้าหมาย
เรียนรู้วิธีเชื่อมต่อ MCP Server กับ `StdioServerTransport` เพื่อให้ server สามารถรับ-ส่งข้อมูล

## 🔧 ความรู้ที่ต้องใช้

### Server Transport คืออะไร?
เป็นชั้นกลางที่ทำให้ MCP Server สามารถติดต่อกับ Client ผ่าน stdio (stdin/stdout)

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server is running...");
}

main().catch(console.error);
```

ใน `main()` function ต้อง:
1. สร้าง instance ของ `StdioServerTransport`
2. เรียก `server.connect()` และส่ง transport ไปเป็น parameter
3. เรียก `main()` function

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 5 และเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_13___` | Class สำหรับ transport | `StdioServerTransport` |
| `___BLANK_14___` | Method สำหรับเชื่อมต่อ | `connect` |

---

## 💡 Hints

<details>
<summary>Hint 1: Class ชื่ออะไร?</summary>

ที่ import มาจากที่ไหน? ดูบรรทัด import ด้านบนของไฟล์
```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
```

</details>

<details>
<summary>Hint 2: Method ชื่ออะไร?</summary>

ใช้ method ที่ชื่อ `connect` เพื่อเชื่อมต่อ server กับ transport

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mango Company MCP Server is running...");
}

main().catch(console.error);
```

</details>

---

## 🚀 ตรวจสอบครบทั้ง 5 Puzzles

ตอนนี้คุณได้เติมทั้ง 5 puzzles เรียบร้อยแล้ว! ถึงเวลาที่จะ:

1. **Build** project:
   ```bash
   npm install
   npm run build
   ```

2. **ทดสอบ** ว่า server ทำงานกระดับพื้นฐาน:
   ```bash
   npm start
   ```
   Server ควรแสดง "Mango Company MCP Server is running..." ใน stderr

3. **ทดสอบ Tools** ด้วย Claude:
   - ติดตั้ง Mango Company เป็น MCP Server ใน Claude
   - ลองใช้ tools: `list_code_reviews`, `get_project_structure`, `get_team_member`

---

## ℹ️ ข้อมูลเพิ่มเติม

### คำอธิบายแต่ละ Tool:
- **list_code_reviews**: ดึงรายการ Code Review ทั้งหมด (ไม่ต้องรับ parameter)
- **get_project_structure**: ดึงโครงสร้าง Project ตามภาษา (parameter: language)
- **get_team_member**: ดึงข้อมูลสมาชิกทีม (parameter: member)

### สำคัญ:
- ต้องมี HTTP Server ที่ทำงานบน `http://localhost:3000` เพื่อให้ API calls ทำงาน
- ดู `/solutions` folder เพื่อเห็นเฉลยเต็มทั้งไฟล์
