# 🧩 Puzzle 1: สร้าง Tool — search_location

## 📖 เป้าหมาย
เรียนรู้การสร้าง MCP Tool ด้วย `server.tool()` — Tool แรกของเรา!
Tool นี้จะ**ค้นหาตำแหน่งเมือง**เพื่อรับพิกัด latitude/longitude จาก Open-Meteo Geocoding API

## 🔧 ความรู้ที่ต้องใช้

### `server.tool()` คืออะไร?
เป็น method สำหรับลงทะเบียน tool ใน MCP Server โดยรับ 4 parameters:

```typescript
server.tool(
  "tool_name",        // 1. ชื่อ tool (string)
  "tool description", // 2. คำอธิบาย tool (string)
  { /* schema */ },   // 3. Input schema (Zod object หรือ {} ถ้าไม่มี input)
  async (input) => {  // 4. Handler function (async)
    // ... logic ...
    return {
      content: [{ type: "text", text: "ผลลัพธ์" }]
    };
  }
);
```

### Open-Meteo Geocoding API
- URL สำหรับค้นหาเมือง: `https://geocoding-api.open-meteo.com/v1/search?name=Bangkok&count=5&language=th`
- ส่งคืน JSON object เช่น:
```json
{
  "results": [
    {
      "name": "กรุงเทพมหานคร",
      "latitude": 13.7525,
      "longitude": 100.49361,
      "country": "Thailand",
      "admin1": "Bangkok"
    }
  ]
}
```
- เราจะดึงข้อมูลจาก `results` มาแสดงเป็นรายการตำแหน่ง

---

## ✏️ ช่องว่างที่ต้องเติม

เปิดไฟล์ `src/index.ts` แล้วหา Puzzle 1 เติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_3___` | ชื่อของ tool | `"search_location"` |
| `___BLANK_4___` | คำอธิบาย tool | `"ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude"` |
| `___BLANK_5___` | API endpoint | `"search"` |
| `___BLANK_6___` | ข้อความนำหน้ารายการ | `"ผลการค้นหาตำแหน่ง:\n"` |

---

## 💡 Hints

<details>
<summary>Hint 1: ชื่อ tool ควรตั้งอย่างไร?</summary>

ชื่อ tool ควรเป็น snake_case และบอกได้ว่า tool ทำอะไร
เช่น `search_location` หมายถึง "ค้นหาตำแหน่ง"

</details>

<details>
<summary>Hint 2: URL endpoint ต้องใส่อะไร?</summary>

Open-Meteo Geocoding API — endpoint สำหรับค้นหาเมือง:
```
https://geocoding-api.open-meteo.com/v1/search?name=...
```
ส่วน `https://geocoding-api.open-meteo.com/v1/` เขียนให้แล้ว — เติมแค่ `search`

</details>

<details>
<summary>Hint 3: ดูเฉลยเต็ม</summary>

```typescript
server.tool(
  "search_location",
  "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude",
  {
    query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
  },
  async ({ query }) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=th`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      results?: Array<{
        name: string;
        latitude: number;
        longitude: number;
        country: string;
        admin1?: string;
      }>;
    };

    if (!data.results || data.results.length === 0) {
      return {
        content: [{ type: "text" as const, text: `ไม่พบตำแหน่งสำหรับ "${query}"` }],
      };
    }

    const locationList = data.results
      .map((loc, i) => `${i + 1}. ${loc.name}, ${loc.admin1 ?? ""} ${loc.country} (lat: ${loc.latitude}, lon: ${loc.longitude})`)
      .join("\n");

    return {
      content: [
        {
          type: "text" as const,
          text: `ผลการค้นหาตำแหน่ง:\n${locationList}`,
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
