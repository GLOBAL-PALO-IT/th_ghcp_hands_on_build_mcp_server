# 🧩 Puzzle 3: สร้าง Tool — get_team_member

## 📖 เป้าหมาย
สร้าง Tool ที่**ดึงข้อมูลสมาชิกทีม** Mango Company ตามชื่อหรือ ID
Tool นี้ต้องรับ input parameter ชื่อ `member`

## 🔧 ความรู้ที่ต้องใช้

### Accessing Response Data
เมื่อ fetch ข้อมูลจาก API ต้องทำการ type casting ให้ถูกต้อง:

```typescript
const response = await fetch(url);
const data = (await response.json()) as {
  // ใส่ type ของ response structure
  member: {
    id: string;
    name: string;
    role: string;
    // ... more fields
  };
};

// ใช้ data.member.name เพื่อเข้าถึง field
```

### Mango Company API — Team Member
- URL: `http://localhost:3000/api/team/{member}`
- ส่งคืน JSON object เช่น:
```json
{
  "result": "success",
  "member": {
    "id": "T001",
    "name": "John Developer",
    "role": "Senior React Developer",
    "email": "john@mangodev.com",
    "skills": ["React", "TypeScript", "Node.js"],
    "projects": ["Frontend App", "Admin Dashboard"]
  }
}
```

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 3 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_10___` | ชนิดข้อมูล Zod | `string` |
| `___BLANK_11___` | API endpoint | `"team"` |
| `___BLANK_12___` | property ของ response data | `"member"` |

---

## 💡 Hints

<details>
<summary>Hint 1: ต้องใช้ Zod ชนิดใด?</summary>

ต้องรับ member ที่เป็น string ดังนั้นใช้ `z.string()`

</details>

<details>
<summary>Hint 2: API endpoint ชื่ออะไร?</summary>

เราต้องเรียก endpoint ที่เก็บข้อมูลทีม ดังนั้นใช้ `"team"`

</details>

<details>
<summary>Hint 3: Property ของ response ชื่ออะไร?</summary>

ดูจากตัวอย่าง response JSON — มีชื่อว่า `"member"`

</details>

<details>
<summary>Hint 4: ดูเฉลยเต็ม</summary>

```typescript
server.tool(
  "get_team_member",
  "ดูข้อมูลสมาชิกทีม Mango Company",
  {
    member: z.string().describe("ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"),
  },
  async ({ member }) => {
    const url = `http://localhost:3000/api/team/${encodeURIComponent(member)}`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      result: string;
      member: {
        id: string;
        name: string;
        role: string;
        email: string;
        skills: string[];
        projects: string[];
      };
    };

    const skillsList = data.member.skills.join(", ");
    const projectsList = data.member.projects.join(", ");

    return {
      content: [
        {
          type: "text" as const,
          text: `👤 ${data.member.name}\n📧 Email: ${data.member.email}\n💼 Role: ${data.member.role}\n🛠️ Skills: ${skillsList}\n📌 Projects: ${projectsList}`,
        },
      ],
    };
  }
);
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมเสร็จแล้ว ให้ไปทำ Puzzle 4 ต่อได้เลย!
