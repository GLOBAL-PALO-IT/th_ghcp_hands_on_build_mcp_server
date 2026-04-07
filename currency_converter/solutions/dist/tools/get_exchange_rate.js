import { z } from "zod";
// ===== Puzzle 3: Tool — get_exchange_rate =====
// Tool นี้ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน
// ต้องมี input: from (สกุลเงินต้นทาง) และ to (สกุลเงินปลายทาง)
// API ที่ใช้: https://open.er-api.com/v6/latest/{from}
export function registerGetExchangeRate(server) {
    server.registerTool("get_exchange_rate", // ใส่ชื่อ tool เช่น "get_exchange_rate"
    {
        description: "ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน", // ใส่คำอธิบาย tool เช่น "ดูอัตราแลกเปลี่ยนระหว่าง 2 สกุลเงิน"
        inputSchema: {
            // from คือ สกุลเงินต้นทาง เช่น USD
            from: z.string().length(3).describe("สกุลเงินต้นทาง (เช่น USD)"), // ใส่คำอธิบาย parameter เช่น "สกุลเงินต้นทาง (เช่น USD)"
            // to คือสกุลเงินปลายทาง เช่น EUR
            to: z.string().length(3).describe("สกุลเงินปลายทาง (เช่น EUR)"), // ใส่คำอธิบาย parameter เช่น "สกุลเงินปลายทาง (เช่น EUR)"
        },
    }, async ({ from, to }) => {
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
        //     "EUR": 0.85,
        //     "GBP": 0.75,
        //     ...
        //   }
        // }
        // ดึงอัตราแลกเปลี่ยนจาก response โดยใช้ key จาก parameter "to"
        // ถ้าไม่มี key ที่ต้องการใน rates ให้ส่งกลับข้อความว่าไม่พบอัตราแลกเปลี่ยน
        // เช่น ถ้า to คือ "EUR" แต่ใน rates ไม่มี "EUR" ให้ส่งกลับข้อความว่า "ไม่พบอัตราแลกเปลี่ยนสำหรับ EUR"
        // เติมข้อความนำหน้า เช่น "ไม่พบอัตราแลกเปลี่ยนสำหรับ" ลงในช่อง ___BLANK_5___
        if (!data.rates[to.toUpperCase()]) {
            return {
                content: [
                    {
                        type: "text",
                        text: `ไม่พบอัตราแลกเปลี่ยนสำหรับ ${to.toUpperCase()}`,
                        // ตัวอย่างข้อความที่ส่งกลับ เช่น "___BLANK_5___ EUR"
                    },
                ],
            };
        }
        const rate = data.rates[to.toUpperCase()];
        // ส่งกลับข้อความที่จะแสดงใน UI ของ client
        return {
            content: [
                {
                    type: "text",
                    // ตัวอย่างข้อความที่ส่งกลับ เช่น "อัตราแลกเปลี่ยน: 1 USD = 0.85 EUR (อัปเดตล่าสุด: 2021-09-01T00:00:00Z)"
                    // เติมข้อความนำหน้า เช่น "อัตราแลกเปลี่ยน:" ลงในช่อง ___BLANK_6___
                    text: `อัตราแลกเปลี่ยน: 1 ${from.toUpperCase()} = ${rate} ${to.toUpperCase()} (อัปเดตล่าสุด: ${data.time_last_update_utc})`,
                },
            ],
        };
    });
}
