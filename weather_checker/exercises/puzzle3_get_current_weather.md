# 🧩 Puzzle 3: เพิ่ม Tool — get_current_weather

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
| `___BLANK_1___` | คำอธิบาย parameter `latitude` | `"ละติจูด เช่น 13.75"` |
| `___BLANK_2___` | คำอธิบาย parameter `longitude` | `"ลองจิจูด เช่น 100.5"` |
| `___BLANK_3___` | ตัวแปรที่เก็บค่า latitude ใน URL | `latitude` |
| `___BLANK_4___` | ตัวแปรที่เก็บค่า longitude ใน URL + ข้อความนำหน้า | `longitude` / `"สภาพอากาศปัจจุบันที่พิกัด"` |
| `___BLANK_5___` | ข้อความนำหน้า | `"สภาพอากาศปัจจุบันที่พิกัด"` |

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
<summary>Hint 1: คำอธิบาย parameter เขียนยังไง?</summary>

`.describe()` คือคำอธิบายที่บอก LLM ว่า parameter นี้คืออะไร ควรเขียนสั้นๆ และให้ตัวอย่าง
เช่น `"ละติจูด เช่น 13.75"` หรือ `"ลองจิจูด เช่น 100.5"`

</details>

<details>
<summary>Hint 2: ตัวแปรใน URL คืออะไร?</summary>

ใน template literal เราต้องใส่ตัวแปรที่รับมาจาก parameter ลงไปใน URL
เช่น `latitude` และ `longitude` เพื่อสร้าง URL สำหรับเรียก API

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/get_current_weather.ts:**
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
                    text: `🌡️ สภาพอากาศปัจจุบันที่พิกัด (${latitude}, ${longitude}):\n🌡️ อุณหภูมิ: ${weather.temperature}°C\n💨 ลม: ${weather.windspeed} km/h\n🧭 ทิศทางลม: ${weather.winddirection}°\n🕐 เวลา: ${weather.time}`,
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
