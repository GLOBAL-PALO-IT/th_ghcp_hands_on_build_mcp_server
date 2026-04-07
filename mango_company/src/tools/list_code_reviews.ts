import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// ===== Puzzle 2: Tool — list_code_reviews =====
// Tool นี้แสดงรายการ Code Review ทั้งหมด
// ไม่มี input parameter
// API ที่ใช้: http://localhost:3000/api/code-reviews

export function registerListCodeReviews(server: McpServer) {
    server.registerTool(
        "___BLANK_1___",                  // ใส่ชื่อ tool เช่น "list_code_reviews"
        {
            description: "___BLANK_2___",      // ใส่คำอธิบาย tool เช่น "แสดงรายการ Code Review ทั้งหมด"
        },                                 // ไม่มี input parameters
        async () => {
            // ดึงข้อมูลจาก API เพื่อแสดงรายการ Code Review
            const response = await fetch("___BLANK_3___"); // ใส่ URL ของ API: http://localhost:3000/api/code-reviews

            // แปลง response เป็น JSON และดึงข้อมูลที่เราต้องการ
            const data = (await response.json()) as {
                result: string;
                data: Array<{
                    id: string;
                    title: string;
                    author: string;
                    date: string;
                }>;
            };
            // ตัวอย่าง response จาก API จะมีรูปแบบประมาณนี้:
            // {
            //   "result": "success",
            //   "data": [
            //     {
            //       "id": "CR001",
            //       "title": "Review Authentication System",
            //       "author": "Alice",
            //       "date": "2024-03-01"
            //     }
            //   ]
            // }

            // สร้างรายการ review จากข้อมูลที่ได้
            const reviewList = data.data
                .map((review) => `- ${review.title} (by ${review.author} on ${review.date})`)
                .join("\n");

            // ส่งกลับข้อความที่จะแสดงใน UI ของ client
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `___BLANK_4___${reviewList}`, // ใส่ข้อความนำหน้า เช่น "Code Review ทั้งหมด:\n"
                    },
                ],
            };
        }
    );
}
