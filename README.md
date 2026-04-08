# 🧩 Build MCP Server — Hands-on Workshop

เรียนรู้การสร้าง **Model Context Protocol (MCP) Server** ผ่านการทำ workshop แบบ hands-on ด้วย TypeScript + MCP SDK มี 3 โปรเจกต์ให้เลือกฝึก:

| โปรเจกต์ | Transport | ระดับ | คำอธิบาย |
|----------|-----------|-------|----------|
| 🔄 [Currency Converter](#-currency-converter--stdio-mcp-server) | Stdio | Beginner | แปลงสกุลเงินด้วย frankfurter.app API |
| 🌤️ [Weather Checker](#️-weather-checker--stdio-mcp-server) | HTTP Remote | Beginner | ค้นหาสภาพอากาศด้วย Open-Meteo API |
| 🥭 [Mango Company](#-mango-company--http-remote-mcp-server) | HTTP Remote | Intermediate | จัดการข้อมูลบริษัทด้วย Mock API |

## 🛠️ Pre-requisites

- **Node.js 18+** — [ดาวน์โหลด](https://nodejs.org/)
- **VS Code** + **GitHub Copilot extension**
- ความรู้ JavaScript/TypeScript เบื้องต้น

---

## 🔄 Currency Converter — Stdio MCP Server

สร้าง MCP Server สำหรับแปลงสกุลเงิน ด้วย TypeScript + MCP SDK + frankfurter.app API

### 📋 สิ่งที่จะได้เรียนรู้

| Puzzle | หัวข้อ | สิ่งที่เรียนรู้ |
|--------|--------|----------------|
| 1 | Server Setup | ประกอบ MCP Server + Transport |
| 2 | list_currencies | สร้าง MCP Tool แบบไม่มี input |
| 3 | get_exchange_rate | กำหนด Input Schema ด้วย Zod |
| 4 | convert_currency | Tool ที่มี logic ซับซ้อนขึ้น |

### 🚀 เริ่มต้น

```bash
cd currency_converter
npm install
```

ทำ Puzzle ตามลำดับ — เปิดไฟล์ `src/index.ts` แล้วเติมช่องว่าง (`___BLANK___`):

1. [exercises/puzzle1_server_setup.md](currency_converter/exercises/puzzle1_server_setup.md) — ตั้งค่า MCP Server
2. [exercises/puzzle2_list_currencies.md](currency_converter/exercises/puzzle2_list_currencies.md) — สร้าง tool `list_currencies`
3. [exercises/puzzle3_get_rate.md](currency_converter/exercises/puzzle3_get_rate.md) — สร้าง tool `get_exchange_rate`
4. [exercises/puzzle4_convert.md](currency_converter/exercises/puzzle4_convert.md) — สร้าง tool `convert_currency`

### Build & ทดสอบ

```bash
npm run build
```

ทดสอบว่า server แสดง tools ถูกต้อง:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
{"jsonrpc":"2.0","method":"notifications/initialized"}
{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | node dist/index.js
```

### ใช้งานกับ VS Code

1. สร้างไฟล์ `.vscode/mcp.json`
2. Reload VS Code
3. เปิด Copilot Chat → เลือก Agent mode
4. ลองถาม: **"แปลง 1000 USD เป็น THB"**

### 📂 โครงสร้างโปรเจกต์

```
currency_converter/
├── src/
│   ├── index.ts                      # 📝 Puzzle template — เติมช่องว่างที่นี่
│   └── tools/
│       ├── list_currencies.ts
│       ├── get_exchange_rate.ts
│       └── convert_currency.ts
├── exercises/
│   ├── puzzle1_server_setup.md        # 📖 คำแนะนำ Puzzle 1
│   ├── puzzle2_list_currencies.md     # 📖 คำแนะนำ Puzzle 2
│   ├── puzzle3_get_rate.md            # 📖 คำแนะนำ Puzzle 3
│   └── puzzle4_convert.md             # 📖 คำแนะนำ Puzzle 4
├── solutions/
├── package.json
└── tsconfig.json
```

### 🌐 API ที่ใช้

**[frankfurter.app](https://www.frankfurter.app/)** — API อัตราแลกเปลี่ยนฟรี ไม่ต้องใช้ API key

| Endpoint | ตัวอย่าง |
|----------|---------|
| รายการสกุลเงิน | `https://api.frankfurter.app/currencies` |
| อัตราแลกเปลี่ยน | `https://api.frankfurter.app/latest?from=USD&to=THB` |
| แปลงเงิน | `https://api.frankfurter.app/latest?amount=100&from=USD&to=THB` |

---

## 🌤️ Weather Checker — Stdio MCP Server

สร้าง MCP Server สำหรับค้นหาสภาพอากาศ ด้วย Open-Meteo API

### 📋 สิ่งที่จะได้เรียนรู้

| Puzzle | หัวข้อ | สิ่งที่เรียนรู้ |
|--------|--------|----------------|
| 1 | Server Setup | ประกอบ MCP Server + Transport |
| 2 | search_location | ค้นหาพิกัดสถานที่ |
| 3 | get_current_weather | ดึงสภาพอากาศปัจจุบัน |
| 4 | get_forecast | ดึงพยากรณ์อากาศ |

### 🚀 เริ่มต้น

```bash
cd weather_checker
npm install
```

ทำ Puzzle ตามลำดับ — เปิดไฟล์ `src/index.ts` แล้วเติมช่องว่าง:

1. [exercises/puzzle1_server_setup.md](weather_checker/exercises/puzzle1_server_setup.md) — ตั้งค่า MCP Server
2. [exercises/puzzle2_search_location.md](weather_checker/exercises/puzzle2_search_location.md) — สร้าง tool `search_location`
3. [exercises/puzzle3_get_current_weather.md](weather_checker/exercises/puzzle3_get_current_weather.md) — สร้าง tool `get_current_weather`
4. [exercises/puzzle4_get_forecast.md](weather_checker/exercises/puzzle4_get_forecast.md) — สร้าง tool `get_forecast`

### Build & ทดสอบ

```bash
npm run build
```

### 📂 โครงสร้างโปรเจกต์

```
weather_checker/
├── src/
│   ├── index.ts                          # 📝 Puzzle template
│   └── tools/
│       ├── search_location.ts
│       ├── get_current_weather.ts
│       └── get_forecast.ts
├── exercises/
│   ├── puzzle1_server_setup.md
│   ├── puzzle2_search_location.md
│   ├── puzzle3_get_current_weather.md
│   └── puzzle4_get_forecast.md
├── solutions/
├── package.json
└── tsconfig.json
```

---

## 🥭 Mango Company — HTTP Remote MCP Server

**ระดับ**: Intermediate 📚

โปรเจกต์ที่ใช้ **HTTP Remote** แทน Stdio — เรียนรู้การสร้าง MCP Server ที่เชื่อมต่อกับ Mock HTTP API

### 📋 สิ่งที่จะได้เรียนรู้

| Puzzle | หัวข้อ | สิ่งที่เรียนรู้ |
|--------|--------|----------------|
| 1 | Server Setup | ตั้งค่า MCP Server |
| 2 | Mock Server | ตั้งค่า Mock HTTP Server |
| 3 | list_code_reviews | ดึงรายการ code review |
| 4 | get_project_structure | ดึงโครงสร้างโปรเจค |
| 5 | get_team_member | ดึงข้อมูลสมาชิกทีม |

### 🚀 เริ่มต้น

```bash
cd mango_company
npm install
```

ทำ Puzzle ตามลำดับ — เปิดไฟล์ `src/index.ts` แล้วเติมช่องว่าง:

1. [exercises/puzzle1_server_setup.md](mango_company/exercises/puzzle1_server_setup.md) — ตั้งค่า MCP Server
2. [exercises/puzzle2_mock_server.md](mango_company/exercises/puzzle2_mock_server.md) — ตั้งค่า Mock HTTP Server
3. [exercises/puzzle3_list_code_reviews.md](mango_company/exercises/puzzle3_list_code_reviews.md) — สร้าง tool `list_code_reviews`
4. [exercises/puzzle4_get_project_structure.md](mango_company/exercises/puzzle4_get_project_structure.md) — สร้าง tool `get_project_structure`
5. [exercises/puzzle5_get_team_member.md](mango_company/exercises/puzzle5_get_team_member.md) — สร้าง tool `get_team_member`

### Build & ทดสอบ

```bash
npm run build
npm start
```

### 📂 โครงสร้างโปรเจกต์

```
mango_company/
├── src/
│   ├── index.ts                       # 📝 Puzzle template
│   └── tools/
│       ├── list_code_reviews.ts
│       ├── get_project_structure.ts
│       └── get_team_member.ts
├── exercises/
│   ├── puzzle1_server_setup.md
│   ├── puzzle2_mock_server.md
│   ├── puzzle3_list_code_reviews.md
│   ├── puzzle4_get_project_structure.md
│   └── puzzle5_get_team_member.md
├── solutions/
│   ├── index.ts
│   └── tools/
├── package.json
└── tsconfig.json
```

📖 ศึกษารายละเอียดเพิ่มเติมใน [mango_company/README.md](mango_company/README.md)
