// ===== Puzzle 2: Tool — list_currencies =====
// Tool นี้แสดงรายการสกุลเงินทั้งหมดที่ API รองรับ
// ไม่มี input parameter
// API ที่ใช้: https://open.er-api.com/v6/latest/USD (ดึง key จาก rates มาแสดง)
export function registerListCurrencies(server) {
    server.tool("list_currencies", // ใส่ชื่อ tool เช่น "list_currencies"
    "แสดงรายการสกุลเงินทั้งหมดที่รองรับ", // ใส่คำอธิบาย tool เช่น "แสดงรายการสกุลเงินทั้งหมดที่รองรับ"
    {}, // ไม่มี input parameters
    async () => {
        const response = await fetch("___BLANK_3___"); // ใส่ URL ของ API: https://open.er-api.com/v6/latest/USD
        const data = (await response.json());
        // แปลง rates keys เป็น string แสดงผล
        const currencyList = Object.keys(data.rates).join(", ");
        return {
            content: [
                {
                    type: "text",
                    text: `___BLANK_4___${currencyList}`, // ใส่ข้อความนำหน้า เช่น "สกุลเงินที่รองรับ:\n"
                },
            ],
        };
    });
}
