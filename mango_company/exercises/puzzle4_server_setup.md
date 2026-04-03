# 🧩 Puzzle 4: ตั้งค่า MCP Server

## 📖 เป้าหมาย
เรียนรู้วิธีสร้าง MCP Server instance และตั้งค่าชื่อ เวอร์ชัน และคำอธิบาย

## 🔧 ความรู้ที่ต้องใช้

### McpServer Constructor
เมื่อสร้าง MCP Server ต้องส่ง object ที่มี 3 properties ที่สำคัญ:

```typescript
const server = new McpServer({
  name: "server-name",        // ชื่อของ server (ต้องเป็น lowercase-with-dashes)
  version: "1.0.0",           // เวอร์ชัน (semantic versioning)
  description: "คำอธิบาย",    // คำอธิบายสั้นๆ ว่า server ทำอะไร
});
```

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 4 และเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ server | `"mango-company"` |
| `___BLANK_2___` | เวอร์ชัน | `"1.0.0"` |

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ server ควรเป็นแบบไหน?</summary>

ชื่อ server ควรเป็น lowercase และใช้ dashes ในการแยกคำ เช่น `mango-company`

</details>

<details>
<summary>Hint 2: เวอร์ชันควรเป็นแบบไหน?</summary>

ใช้ semantic versioning: `major.minor.patch` เช่น `1.0.0`, `2.1.3`, etc.

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

```typescript
const server = new McpServer({
  name: "mango-company",
  version: "1.0.0",
  description: "MCP Server สำหรับเก็บข้อมูล Mango Company",
});
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมเสร็จแล้ว ให้ไปทำ Puzzle 5 ต่อได้เลย!
