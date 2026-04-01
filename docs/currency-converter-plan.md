# Plan: Currency Converter MCP Server Workshop

## TL;DR
สร้าง hands-on workshop แบบ Puzzle/Fill-in-the-blank ให้ผู้เรียน beginner สร้าง Currency Converter MCP Server เป็น NPM package โดยใช้ TypeScript + MCP SDK + frankfurter.app API มี 3 tools (convert, get_rate, list_currencies) แบ่งเป็น 5 phases ตาม copilot-instructions.md

## Workshop Structure

### Pre-requisites
- Node.js 18+
- VS Code + GitHub Copilot extension
- ความรู้ JavaScript/TypeScript เบื้องต้น

### API: frankfurter.app (ฟรี ไม่ต้อง API key)
- Convert: `https://api.frankfurter.app/latest?amount=100&from=USD&to=THB`
- List: `https://api.frankfurter.app/currencies`

---

## Steps

### Phase 1: Project Setup (ไม่ใช่ puzzle — guide ผู้เรียนทำ)
1. สร้าง `package.json` ด้วย `npm init -y`
2. ตั้งค่า TypeScript: `tsconfig.json`
3. ติดตั้ง dependencies: `@modelcontextprotocol/sdk`, `zod`
4. สร้างโครงสร้างโฟลเดอร์:
   ```
   currency_converter/
   ├── src/
   │   └── index.ts        # Entry point - puzzle file
   ├── package.json
   └── tsconfig.json
   ```

**Files to create:**
- `currency_converter/package.json` — pre-configured (type: "module", bin field, scripts)
- `currency_converter/tsconfig.json` — pre-configured

### Phase 2: Tool Creation (Puzzle 1-3)

**Puzzle 1**: `list_currencies` tool
- ให้ code skeleton ที่มี `___BLANK___` ให้เติม
- ช่องว่าง: tool name, description, fetch URL, return format
- เป้าหมาย: เข้าใจ `server.tool()` pattern

**Puzzle 2**: `get_exchange_rate` tool  
- ช่องว่าง: Zod schema (from, to params), API URL construction
- เป้าหมาย: เข้าใจ input schema ด้วย Zod

**Puzzle 3**: `convert_currency` tool
- ช่องว่าง: Zod schema เพิ่ม amount, API call, formatting result
- เป้าหมาย: เข้าใจ tool ที่มี logic มากขึ้น

### Phase 3: Server Setup (Puzzle 4)

**Puzzle 4**: ประกอบ MCP Server
- ให้ code ที่มีช่องว่าง: McpServer creation, StdioServerTransport, server.connect()
- เป้าหมาย: เข้าใจ server lifecycle

### Phase 4: Build & Test
5. Build TypeScript → JavaScript: `npm run build`
6. ทดสอบรัน server ด้วย: `node dist/index.js`

### Phase 5: VS Code Integration (Puzzle 5)

**Puzzle 5**: สร้าง `.vscode/mcp.json`
- ช่องว่าง: server type, command, args
- เป้าหมาย: เข้าใจการเชื่อมต่อ VS Code กับ MCP Server

### Phase 6: Function Calls (Demo/Test)
7. เปิด Copilot Chat ใน VS Code
8. ทดสอบถาม: "แปลง 1000 USD เป็น THB"
9. ดู tool invocation ผ่าน Copilot

---

## File Structure (สิ่งที่จะสร้าง)

```
currency_converter/
├── src/
│   └── index.ts                    # Main file — มี answer key version และ puzzle version
├── exercises/
│   ├── puzzle1_list_currencies.md  # Puzzle instructions + skeleton
│   ├── puzzle2_get_rate.md         # Puzzle instructions + skeleton
│   ├── puzzle3_convert.md          # Puzzle instructions + skeleton
│   ├── puzzle4_server_setup.md     # Puzzle instructions + skeleton
│   └── puzzle5_vscode_integration.md
├── solutions/
│   └── index.ts                    # Complete working solution
├── package.json
└── tsconfig.json
```

## Relevant files
- `currency_converter/package.json` — NPM config (type: "module", bin, scripts: build/start)
- `currency_converter/tsconfig.json` — TypeScript config (ES2022, NodeNext module)
- `currency_converter/src/index.ts` — Puzzle template ที่ผู้เรียนจะเติม code
- `currency_converter/solutions/index.ts` — Complete solution reference
- `currency_converter/exercises/*.md` — Puzzle instructions แต่ละ step
- `.vscode/mcp.json` — VS Code integration config (Puzzle 5)

## Verification
1. `npm run build` สำเร็จไม่มี TypeScript error
2. `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js` — แสดง 3 tools
3. ทดสอบผ่าน VS Code Copilot Chat ถาม "แปลง 100 USD เป็น THB" ได้ผลลัพธ์ถูกต้อง
4. แต่ละ puzzle compile ได้หลังเติมช่องว่างถูกต้อง

## Decisions
- ใช้ **frankfurter.app** เป็น API (ฟรี, ไม่ต้อง key, reliable)
- ใช้ **single file** `src/index.ts` เพื่อให้ beginner ไม่สับสนเรื่อง imports
- Puzzle เป็นไฟล์ markdown แยก มี instructions + code skeleton
- Solutions แยกเป็นโฟลเดอร์ต่างหาก
- ภาษาใน puzzle/instructions ทั้งหมดเป็น **ภาษาไทย**
- Target: Beginner — อธิบาย TypeScript syntax เบื้องต้นในแต่ละ puzzle

## Further Considerations
1. **README.md** — ควรมี README อธิบายภาพรวม workshop + วิธี setup ไหม? แนะนำว่าควรมี
2. **Difficulty progression** — Puzzle 1 ง่ายสุด (ไม่มี input) → Puzzle 3 ยากสุด (มี input + format) เหมาะกับ beginner flow
3. **Hint system** — ในแต่ละ puzzle ควรมี hint (เฉลยบางส่วน) สำหรับคนที่ติดไหม? แนะนำว่าควรมี
