// ===== Puzzle 2: Tool — list_currencies =====
// Tool นี้แสดงรายการสกุลเงินทั้งหมดที่ API รองรับ
// ไม่มี input parameter
// API ที่ใช้: https://open.er-api.com/v6/latest/USD (ดึง key จาก rates มาแสดง)
export function registerListCurrencies(server) {
    server.registerTool("list_currencies", // ใส่ชื่อ tool เช่น "list_currencies"
    {
        description: "แสดงรายการสกุลเงินทั้งหมดที่รองรับ", // ใส่คำอธิบาย tool เช่น "แสดงรายการสกุลเงินทั้งหมดที่รองรับ"
    }, // ไม่มี input parameters
    async () => {
        // ดึงข้อมูลจาก API เพื่อแสดงรายการสกุลเงิน
        const response = await fetch("https://open.er-api.com/v6/latest/USD"); // ใส่ URL ของ API: https://open.er-api.com/v6/latest/USD
        // แปลง response เป็น JSON และดึงข้อมูลที่เราต้องการ
        const data = (await response.json());
        // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
        // {
        //   "result": "success",
        //   "base_code": "USD",
        //   "rates": {
        //     "USD": 1,
        //     "EUR": 0.85,
        //     "GBP": 0.75,
        //     ...
        //   }
        // }
        // แปลง rates ทั้งหมดที่ได้ เป็น string แสดงผล
        // ค่าที่ได้จะเป็น "USD, EUR, GBP, ..." เป็นต้น
        const currencyList = Object.keys(data.rates).join(", ");
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    text: `สกุลเงินที่รองรับ:\n${currencyList}`, // ใส่ข้อความนำหน้า เช่น "สกุลเงินที่รองรับ:"
                },
            ],
        };
    });
}
