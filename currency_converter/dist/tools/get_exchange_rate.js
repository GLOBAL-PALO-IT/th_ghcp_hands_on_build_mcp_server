// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { z } from "zod";
export {};
// // ===== Puzzle 3: Tool — get_exchange_rate =====
// // Tool นี้ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน
// // ต้องมี input: from (สกุลเงินต้นทาง) และ to (สกุลเงินปลายทาง)
// // API ที่ใช้: https://open.er-api.com/v6/latest/{from}
// export function registerGetExchangeRate(server: McpServer) {
//     server.tool(
//         "get_exchange_rate",
//         "ดูอัตราแลกเปลี่ยนระหว่างสกุลเงิน",
//         {
//             from: z.___BLANK_1___().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"),   // ใส่ชนิดข้อมูล Zod เช่น "string"
//             to: z.___BLANK_2___().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"),     // ใส่ชนิดข้อมูล Zod เช่น "string"
//         },
//         async ({ from, to }) => {
//             // สร้าง URL สำหรับเรียก API
//             const url = `https://open.er-api.com/v6/___BLANK_3___/${encodeURIComponent(from)}`; // ใส่ API endpoint เช่น "latest"
//             const response = await fetch(url);
//             const data = (await response.json()) as {
//                 result: string;
//                 base_code: string;
//                 time_last_update_utc: string;
//                 rates: Record<string, number>;
//             };
//             const rate = data.___BLANK_4___[to.toUpperCase()]; // ใส่ชื่อ property ที่เก็บอัตราแลกเปลี่ยน เช่น "rates"
//             return {
//                 content: [
//                     {
//                         type: "text" as const,
//                         text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (อัปเดตล่าสุด: ${data.time_last_update_utc})`,
//                     },
//                 ],
//             };
//         }
//     );
// }
