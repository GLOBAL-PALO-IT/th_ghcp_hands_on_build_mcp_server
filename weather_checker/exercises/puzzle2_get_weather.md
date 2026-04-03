# 🧩 Puzzle 2: สร้าง Tool — get_current_weather

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

### `server.tool()` กับ Input Schema
```typescript
server.tool(
  "tool_name",
  "description",
  {
    param1: z.number().describe("คำอธิบาย param1"),
    param2: z.number().describe("คำอธิบาย param2"),
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

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 2 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_7___` | ชนิดข้อมูล Zod สำหรับ `latitude` | `"number"` |
| `___BLANK_8___` | ชนิดข้อมูล Zod สำหรับ `longitude` | `"number"` |
| `___BLANK_9___` | API endpoint | `"forecast"` |
| `___BLANK_10___` | ชื่อ property ที่เก็บข้อมูลอากาศ | `"current_weather"` |

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

```typescript
server.tool(
  "get_current_weather",
  "ดูสภาพอากาศปัจจุบันจากพิกัด latitude/longitude",
  {
    latitude: z.number().describe("ละติจูด เช่น 13.75"),
    longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
  },
  async ({ latitude, longitude }) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        weathercode: number;
        time: string;
      };
    };

    const weather = data.current_weather;

    return {
      content: [
        {
          type: "text" as const,
          text: `🌡️ สภาพอากาศปัจจุบัน (${latitude}, ${longitude}):\n🌡️ อุณหภูมิ: ${weather.temperature}°C\n💨 ลม: ${weather.windspeed} km/h\n🧭 ทิศทางลม: ${weather.winddirection}°\n🕐 เวลา: ${weather.time}`,
        },
      ],
    };
  }
);
```

</details>

---

## ✅ ตรวจสอบ
เมื่อเติมช่องว่างครบแล้ว ลองรัน `npm run build` เพื่อตรวจสอบว่าไม่มี error
