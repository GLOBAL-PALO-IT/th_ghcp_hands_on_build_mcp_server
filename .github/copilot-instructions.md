# 🎯 Objective

Learn how to build your own **Model Context Protocol (MCP) server** through hands-on practice with two different approaches:

- 🌐 **HTTP Remote Server**
- 📦 **NPM Package Deployment**

Participants will build MCP servers step-by-step by completing puzzle-like exercises covering tool creation, tool invocation, server setup, VS Code integration, and function calls.

---

## 📋 Rules

- Always answer in **Thai language**.
- Do **not** make up any information. If you don't know the answer, ask for more information or say you don't know.
- If the question is not clear, ask for **clarification**.
- If the question is about a specific topic, provide a **detailed answer with examples** if possible.
- If the question is about a specific code snippet, provide an **explanation** of the code and how it works.
- If the question is about a specific error message, provide an **explanation of the error** and how to fix it.

---

## 🚀 Steps to Build an MCP Server

### Approach: **Server-First, Then Add Tools Incrementally**

The workshop follows a **"blank server first"** approach — participants start by creating a minimal MCP server with no tools, verify the handshake with VS Code, and then add tools one by one. This ensures participants understand the connection layer before diving into tool implementation.

| # | Step | Description |
|---|------|-------------|
| 1 | **Blank Server Setup + VS Code Integration** | Create a minimal MCP server (no tools or a single empty tool) and connect it to VS Code. Verify the handshake is successful — the server appears in VS Code and responds to protocol messages. This proves the MCP connection works before writing any business logic. |
| 2 | **Implement Tool 1** | Add the first tool to the server (e.g., `list_currencies`, `search_location`, `list_code_reviews`). Each tool should be in its own **separate file** for clarity. Build, reconnect, and verify the tool appears and works in VS Code. |
| 3 | **Implement Tool 2** | Add the second tool (e.g., `get_exchange_rate`, `get_current_weather`, `get_project_structure`). Again in a separate file. Build, reconnect, and verify. |
| 4 | **Implement Tool 3** | Add the third tool (e.g., `convert_currency`, `get_forecast`, `get_team_member`). Separate file. Build, reconnect, and verify. |
| 5 | **Overall Picture & Review** | Review the complete MCP server with all tools registered. Participants now understand the full architecture: server creation → transport connection → tool registration → tool implementation. Discuss patterns, best practices, and how to extend further. |

### Key Principles

- **Verify at each step**: After every change, build and reconnect to VS Code to confirm it works.
- **Separate files per tool**: Each tool implementation lives in its own file to keep things organized and easy to follow.
- **Incremental complexity**: Start with the simplest tool (no input), then progress to tools with input validation (Zod schemas), and finally tools with more complex logic.

> By following these steps, participants first gain confidence that the MCP plumbing works, then progressively build up functionality tool-by-tool, ending with a complete understanding of how MCP servers are structured and deployed.
