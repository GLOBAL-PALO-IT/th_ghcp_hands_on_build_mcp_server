import { z } from "zod";
// ===== Puzzle 4: Tool — convert_currency =====
// Tool นี้แปลงจำนวนเงินจากสกุลหนึ่งไปอีกสกุลหนึ่ง
// ต้องมี input: amount (จำนวนเงิน), from (สกุลเงินต้นทาง), to (สกุลเงินปลายทาง)
// API ที่ใช้: https://open.er-api.com/v6/latest/{from}
// หมายเหตุ: API นี้ไม่รองรับ amount parameter — ต้องคำนวณเอง: amount * rate
export function registerConvertCurrency(server) {
    server.registerTool("convert_currency", // ใส่ชื่อ tool เช่น "convert_currency"
    {
        description: "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง", // ใส่คำอธิบาย tool เช่น "แปลงจำนวนเงินจากสกุลเงินหนึ่งไปยังอีกสกุลเงินหนึ่ง"
        inputSchema: {
            // amount คือ จำนวนเงินที่ต้องการแปลง เช่น 100
            amount: z.number().positive().describe("จำนวนเงินที่ต้องการแปลง"), // ใส่คำอธิบาย parameter เช่น "จำนวนเงินที่ต้องการแปลง"
            // from คือ สกุลเงินต้นทาง เช่น USD
            from: z.string().length(3).describe("รหัสสกุลเงินต้นทาง เช่น USD"), // ใส่คำอธิบาย parameter เช่น "รหัสสกุลเงินต้นทาง เช่น USD"
            // to คือ สกุลเงินปลายทาง เช่น THB
            to: z.string().length(3).describe("รหัสสกุลเงินปลายทาง เช่น THB"), // ใส่คำอธิบาย parameter เช่น "รหัสสกุลเงินปลายทาง เช่น THB"
        },
    }, async ({ amount, from, to }) => {
        // สร้าง URL สำหรับเรียก API
        const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;
        const response = await fetch(url);
        // ดึงอัตราแลกเปลี่ยนจาก response
        const data = (await response.json());
        // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
        // {
        //   "result": "success",
        //   "base_code": "USD",
        //   "time_last_update_utc": "2021-09-01T00:00:00Z",
        //   "rates": {
        //     "USD": 1,
        //     "THB": 34.5,
        //     "EUR": 0.85,
        //     ...
        //   }
        // }
        // ดึงอัตราแลกเปลี่ยนจาก response โดยใช้ key จาก parameter "to"
        // ถ้าไม่มี key ที่ต้องการใน rates ให้ส่งกลับข้อความว่าไม่พบอัตราแลกเปลี่ยน
        // เติมข้อความนำหน้า เช่น "ไม่พบอัตราแลกเปลี่ยนสำหรับ" ลงในช่อง ___BLANK_6___
        if (!data.rates[to.toUpperCase()]) {
            return {
                content: [
                    {
                        type: "text",
                        text: `ไม่พบอัตราแลกเปลี่ยนสำหรับ ${to.toUpperCase()}`,
                        // ตัวอย่างข้อความที่ส่งกลับ เช่น "___BLANK_6___ EUR"
                    },
                ],
            };
        }
        const rate = data.rates[to.toUpperCase()];
        // คำนวณผลลัพธ์โดยเอาจำนวนเงินคูณกับอัตราแลกเปลี่ยน
        // ตัวอย่าง: ถ้า amount = 100, rate = 34.5 → result = 100 * 34.5 = 3450
        const result = amount * rate; // ใส่ตัวแปรที่เก็บจำนวนเงิน เช่น "amount"
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    // ตัวอย่างข้อความที่ส่งกลับ เช่น "💰 100 USD = 3450 THB\n📅 อัปเดตล่าสุด: 2021-09-01T00:00:00Z"
                    text: `💰 ${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}\n📅 อัปเดตล่าสุด: ${data.time_last_update_utc}`,
                },
            ],
        };
    });
}
