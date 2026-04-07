# 🧩 Puzzle 4: เพิ่ม Tool — get_forecast

## 📖 เป้าหมาย
เรียนรู้การสร้าง tool ที่มี **logic ซับซ้อนขึ้น** — รับพิกัด + จำนวนวัน แล้วแสดงพยากรณ์อากาศล่วงหน้า

## 🔧 ความรู้ที่ต้องใช้

### Zod — ประเภท number พร้อมข้อจำกัด
```typescript
z.number()                  // ต้องเป็นตัวเลข
z.number().min(1)           // ตัวเลข >= 1
z.number().min(1).max(16)   // ตัวเลข 1-16
z.number().min(1).max(16).describe("คำอธิบาย")  // เพิ่มคำอธิบาย
```

### Open-Meteo API — พยากรณ์อากาศรายวัน
- URL: `https://api.open-meteo.com/v1/forecast?latitude=13.75&longitude=100.5&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=3`
- ส่งคืน:
```json
{
  "daily": {
    "time": ["2026-04-02", "2026-04-03", "2026-04-04"],
    "temperature_2m_max": [35.2, 34.8, 33.1],
    "temperature_2m_min": [26.1, 25.9, 26.3],
    "precipitation_sum": [0.0, 2.5, 15.3]
  }
}
```
- `precipitation_sum` = ปริมาณฝนรวมต่อวัน (มิลลิเมตร)

### การวน loop แสดงผลพยากรณ์
```typescript
data.daily.time.map((date, i) => {
  const maxTemp = data.daily.temperature_2m_max[i];
  const minTemp = data.daily.temperature_2m_min[i];
  const rain = data.daily.precipitation_sum[i];
  return `📅 ${date}: ${minTemp}°C - ${maxTemp}°C | ฝน: ${rain} mm`;
}).join("\n");
```

---

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/get_forecast.md`

เปิดไฟล์ `src/tools/get_forecast.md` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | คำตอบ |
|----------|----------|-------|
| `___BLANK_1___` | ชนิดข้อมูล Zod สำหรับ `days` | `"number"` |
| `___BLANK_2___` | ชื่อ property สำหรับปริมาณฝน | `"precipitation_sum"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 4:

```typescript
// บรรทัดบน (import)
import { registerGetForecast } from "./tools/get_forecast.js";

// บรรทัดล่าง (ลงทะเบียน)
registerGetForecast(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

รัน server ใหม่ด้วย `npm start` แล้วเปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "พยากรณ์อากาศ 5 วันที่กรุงเทพ"
- "อากาศ 3 วันข้างหน้าที่เชียงใหม่"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/get_forecast.md` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `get_forecast` ใน MCP server
- [ ] ถาม Copilot แล้วได้ข้อมูลพยากรณ์อากาศกลับมา

---

## 💡 Hints

<details>
<summary>Hint 1: ชนิดข้อมูล Zod สำหรับจำนวนวัน</summary>

จำนวนวันเป็นตัวเลข — ชนิดข้อมูลคือ `number`
โค้ดที่เหลือ `.min(1).max(16).describe(...)` เขียนให้แล้ว!

</details>

<details>
<summary>Hint 2: property ปริมาณฝนชื่ออะไร?</summary>

ดูจาก API response — ปริมาณฝนอยู่ใน `data.daily.precipitation_sum`
เติมแค่ `precipitation_sum`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

**src/tools/get_forecast.md:**
```typescript
export function registerGetForecast(server: McpServer) {
    server.tool(
        "get_forecast",
        "ดูพยากรณ์อากาศล่วงหน้าหลายวัน",
        {
            latitude: z.number().describe("ละติจูด เช่น 13.75"),
            longitude: z.number().describe("ลองจิจูด เช่น 100.5"),
            days: z.number().min(1).max(16).describe("จำนวนวันที่ต้องการพยากรณ์ (1-16)"),
        },
        async ({ latitude, longitude, days }) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${days}`;
            const response = await fetch(url);
            const data = (await response.json()) as { ... };

            const forecastList = data.daily.time
                .map((date, i) => {
                    const maxTemp = data.daily.temperature_2m_max[i];
                    const minTemp = data.daily.temperature_2m_min[i];
                    const rain = data.daily.precipitation_sum[i];
                    return `📅 ${date}: 🌡️ ${minTemp}°C - ${maxTemp}°C | 🌧️ ฝน: ${rain} mm`;
                })
                .join("\n");

            return {
                content: [{
                    type: "text" as const,
                    text: `📊 พยากรณ์อากาศ ${days} วัน (${latitude}, ${longitude}):\n${forecastList}`,
                }],
            };
        }
    );
}
```

**src/index.ts — uncomment:**
```typescript
import { registerGetForecast } from "./tools/get_forecast.js";
// ...
registerGetForecast(server);
```

</details>
