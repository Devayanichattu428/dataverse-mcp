import express from "express";
import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerStudentTools } from "./tools/studentTools.js";
import { registerFacultyTools } from "./tools/facultyTools.js";

dotenv.config();

const server = new McpServer({
    name: "dataverse-mcp",
    version: "1.0.0"
});

registerStudentTools(server);
registerFacultyTools(server);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.post("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    });

    res.on("close", () => {
        transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

app.listen(PORT, () => {
    console.log(`MCP Server running`);
    console.log(`PORT: ${PORT}`);
});