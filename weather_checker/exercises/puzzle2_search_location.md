# 🧩 Puzzle 2: เพิ่ม Tool — search_location

### `server.registerTool()` คืออะไร?
เป็น method สำหรับลงทะเบียน tool ใน MCP Server โดยรับ 3 parameters:

```typescript
server.registerTool(
  "tool_name",                        // 1. ชื่อ tool (string)
  {
    description: "tool description",  // 2. คำอธิบาย tool
    inputSchema: { /* schema */ },    // 3. Input schema (Zod object, optional)
  },
  async (input) => {                  // 4. Handler function (async)
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

## ✏️ ส่วนที่ 1: เติมช่องว่างใน `src/tools/search_location.md`

เปิดไฟล์ `src/tools/search_location.md` แล้วเติมช่องว่างเหล่านี้:

| ช่องว่าง | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `___BLANK_1___` | ชื่อของ tool | `"search_location"` |
| `___BLANK_2___` | คำอธิบาย tool | `"ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude"` |
| `___BLANK_3___` | ข้อความนำหน้ารายการ | `"ผลการค้นหาตำแหน่ง:\n"` |

---

## ✏️ ส่วนที่ 2: ลงทะเบียน Tool ใน `src/index.ts`

เปิดไฟล์ `src/index.ts` แล้ว **ลบ comment** (uncomment) 2 บรรทัดของ Puzzle 2:

```typescript
// บรรทัดบน (import)
import { registerSearchLocation } from "./tools/search_location.js";

// บรรทัดล่าง (ลงทะเบียน)
registerSearchLocation(server);
```

---

## ✏️ ส่วนที่ 3: Build + ทดสอบ

```bash
npm run build
```

รัน server ใหม่ด้วย `npm start` แล้วเปิด VS Code → GitHub Copilot Chat → ลองถาม:
- "ค้นหาตำแหน่งกรุงเทพ"
- "หาพิกัดของเชียงใหม่"

---

## ✅ ตรวจสอบ

- [ ] ไฟล์ `src/tools/search_location.md` เติมช่องว่างครบแล้ว
- [ ] `src/index.ts` uncomment import + register แล้ว
- [ ] `npm run build` ผ่านไม่มี error
- [ ] ทดสอบใน VS Code แล้วเห็น tool `search_location` ใน MCP server
- [ ] ถาม Copilot แล้วได้รายการตำแหน่งกลับมา

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

**src/tools/search_location.md:**
```typescript
export function registerSearchLocation(server: McpServer) {
    server.registerTool(
        "search_location",
        {
            description: "ค้นหาตำแหน่งเมืองเพื่อรับพิกัด latitude/longitude",
            inputSchema: {
                query: z.string().describe("ชื่อเมืองที่ต้องการค้นหา เช่น Bangkok"),
            },
        },
        async ({ query }) => {
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=th`;
            const response = await fetch(url);
            const data = (await response.json()) as { ... };

            const locationList = data.results
                .map((loc, i) => `${i + 1}. ${loc.name}, ${loc.admin1 ?? ""} ${loc.country} (lat: ${loc.latitude}, lon: ${loc.longitude})`)
                .join("\n");

            return {
                content: [{
                    type: "text" as const,
                    text: `ผลการค้นหาตำแหน่ง:\n${locationList}`,
                }],
            };
        }
    );
}
```

**src/index.ts — uncomment:**
```typescript
import { registerSearchLocation } from "./tools/search_location.js";
// ...
registerSearchLocation(server);
```

</details>
