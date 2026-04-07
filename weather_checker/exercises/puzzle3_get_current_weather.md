# 🧩 Puzzle 3: เพิ่ม Tool — get_current_weather

## 📖 เป้าหมาย
เรียนรู้การกำหนด **input schema ด้วย Zod** — Tool นี้รับพิกัด latitude/longitude แล้วแสดงสภาพอากาศปัจจุบัน

## 🔧 ความรู้ที่ต้องใช้

### Zod คืออะไร?
Zod เป็น library สำหรับกำหนด schema (รูปแบบข้อมูล) ใน TypeScript ใช้กับ MCP เพื่อบอกว่า tool รับ input อะไรบ้าง

```typescript
import { z } from "zod";

// ตัวอย่าง Zod schema
z.string()                          // ต้องเป็น string
z.string().describe("คำอธิบาย")     // เพิ่มคำอธิบายให้ LLM เข้าใจ
z.number()                          // ต้องเป็นตัวเลข
z.number().min(1).max(16)           // ตัวเลขในช่วง 1-16
```

### `server.registerTool()` กับ Input Schema
```typescript
server.registerTool(
  "tool_name",
  {
    description: "description",
    inputSchema: {
      param1: z.number().describe("คำอธิบาย param1"),
      param2: z.number().describe("คำอธิบาย param2"),
    },
  },
  async ({ param1, param2 }) => {
    return { content: [{ type: "text", text: "ผลลัพธ์" }] };
  }
);
```

### Open-Meteo Weather API — สภาพอากาศปัจจุบัน
- URL: `https://api.open-meteo.com/v1/forecast?latitude=13.75&longitude=100.5&current_weather=true`
- ส่งคืน:
```json
{
  "current_weather": {
    "temperature": 32.5,
    "windspeed": 8.2,
    "winddirection": 180,
    "weathercode": 1,
    "time": "2026-04-02T14:00"
  }
}
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_current_weather.md`

เปิดไฟล์ `src/tools/get_current_weather.md` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชนิดข้อมูล Zod สำหรับ `latitude` | `"number"` |
| `___BLANK_2___` | ชนิดข้อมูล Zod สำหรับ `longitude` | `"number"` |
| `___BLANK_3___` | API endpoint | `"forecast"` |
| `___BLANK_4___` | ชื่อ property ที่เก็บข้อมูลอากาศ | `"current_weather"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 3:

```typescript
// บรรทัดบน (import)
import { registerGetCurrentWeather } from "./tools/get_current_weather.js";

// บรรทัดล่าง (ลงทะเบียน)
registerGetCurrentWeather(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

รัน server ใหม่ด้วย `npm start` แล้วเปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "สภาพอากาศปัจจุบันที่พิกัด 13.75, 100.5"
- "อากาศที่กรุงเทพตอนนี้เป็นยังไง?"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/get_current_weather.md` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_current_weather` ใน MCP server
- [ ] ถาม Copilot แล้วได้ข้อมูลสภาพอากาศกลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชนิดข้อมูล Zod เขียนยังไง?</summary>

พิกัด latitude/longitude เป็นตัวเลขทศนิยม — ชนิดข้อมูลคือ `number`
โค้ดที่เหลือ `.describe(...)` เขียนให้แล้ว!

</details>

<details>
<summary>Hint 2: API endpoint คืออะไร?</summary>

URL เต็มคือ `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current_weather=true`
ส่วน `https://api.open-meteo.com/v1/` เขียนให้แล้ว — เติมแค่ `forecast`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/get_current_weather.md:**
```typescript
export function registerGetCurrentWeather(server: McpServer) {
    server.registerTool(
        "get_current_weather",
        {
            description: "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
            inputSchema: {
                latitude: z.number().describe("ละติจูด เช่น 13.75"),
                longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
            },
        },
        async ({ latitude, longitude }) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const response = await fetch(url);
            const data = (await response.json()) as { ... };

            const weather = data.current_weather;

            return {
                content: [{
                    type: "text" as const,
                    text: `🌡️ สภาพอากาศปัจจุบัน (${latitude}, ${longitude}):\n🌡️ อุณหภูมิ: ${weather.temperature}°C\n💨 ลม: ${weather.windspeed} km/h\n🧭 ทิศทางลม: ${weather.winddirection}°\n🕐 เวลา: ${weather.time}`,
                }],
            };
        }
    );
}
```

**src/index.ts — uncomment:**
```typescript
import { registerGetCurrentWeather } from "./tools/get_current_weather.js";
// ...
registerGetCurrentWeather(server);
```

</details>
