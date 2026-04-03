// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
export {};
// // ===== Puzzle 2: Tool — list_currencies =====
// // Tool นี้แสดงรายการสกุลเงินทั้งหมดที่ API รองรับ
// // ไม่มี input parameter
// // API ที่ใช้: https://open.er-api.com/v6/latest/USD (ดึง key จาก rates มาแสดง)
// export function registerListCurrencies(server: McpServer) {
//     server.tool(
//         "___BLANK_1___",           // ใส่ชื่อ tool เช่น "list_currencies"
//         "___BLANK_2___",           // ใส่คำอธิบาย tool เช่น "แสดงรายการสกุลเงินทั้งหมดที่รองรับ"
//         {},                        // ไม่มี input parameters
//         async () => {
//             const response = await fetch("___BLANK_3___"); // ใส่ URL ของ API: https://open.er-api.com/v6/latest/USD
//             const data = (await response.json()) as {
//                 result: string;
//                 base_code: string;
//                 rates: Record<string, number>;
//             };
//             // แปลง rates keys เป็น string แสดงผล
//             const currencyList = Object.keys(data.rates).join(", ");
//             return {
//                 content: [
//                     {
//                         type: "text" as const,
//                         text: `___BLANK_4___${currencyList}`, // ใส่ข้อความนำหน้า เช่น "สกุลเงินที่รองรับ:\n"
//                     },
//                 ],
//             };
//         }
//     );
// }
