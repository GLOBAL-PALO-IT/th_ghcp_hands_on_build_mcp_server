# 🧩 Puzzle 4: เพิ่ม Tool — get_team_member

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

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_team_member.ts`

เปิดไฟล์ `src/tools/get_team_member.ts` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อ tool | `"get_team_member"` |
| `___BLANK_2___` | คำอธิบาย tool | `"ดูข้อมูลสมาชิกทีม Mango Company"` |
| `___BLANK_3___` | ชนิดข้อมูล Zod | `string` |
| `___BLANK_4___` | คำอธิบาย parameter | `"ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"` |
| `___BLANK_5___` | API endpoint | `"team"` |
| `___BLANK_6___` | property ของ response data | `"member"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 4:

```typescript
// บรรทัดบน (import)
import { registerGetTeamMember } from "./tools/get_team_member.js";

// บรรทัดล่าง (ลงทะเบียน)
registerGetTeamMember(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

เปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "ข้อมูลของ john_dev"
- "สมาชิก T001 เป็นใคร?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/get_team_member.ts` เติมช่องว่างครบ 6 ช่องแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_team_member` ใน MCP server
- [ ] ถาม Copilot แล้วได้ข้อมูลสมาชิกทีมกลับมา

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

**src/tools/get_team_member.ts:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGetTeamMember(server: McpServer) {
    server.registerTool(
        "get_team_member",
        {
            description: "ดูข้อมูลสมาชิกทีม Mango Company",
            inputSchema: {
                member: z.string().describe("ชื่อหรือ ID ของสมาชิกทีม เช่น john_dev หรือ T001"),
            },
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
}
```

**src/index.ts — uncomment:**
```typescript
import { registerGetTeamMember } from "./tools/get_team_member.js";
// ...
registerGetTeamMember(server);
```

</details>
