import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCodeReviews(server: McpServer) {
    server.registerTool(
        "list_code_reviews",
        {
            description: "แสดงรายการ Code Review ทั้งหมด",
        },
        async () => {
            const response = await fetch("http://localhost:3000/api/code-reviews");
            const data = (await response.json()) as {
                result: string;
                data: Array<{
                    id: string;
                    title: string;
                    author: string;
                    date: string;
                }>;
            };

            const reviewList = data.data
                .map((review) => `- ${review.title} (by ${review.author} on ${review.date})`)
                .join("\n");

            return {
                content: [
                    {
                        type: "text" as const,
                        text: `Code Review ทั้งหมด:\n${reviewList}`,
                    },
                ],
            };
        }
    );
}
