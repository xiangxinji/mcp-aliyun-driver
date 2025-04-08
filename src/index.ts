import { createMcpServer } from "./server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools/index.js";
import { resources } from "./resources/index.js";


export default async function run() {
  const transport = new StdioServerTransport();
  const server = createMcpServer(
    "alidrive-server",
    "0.0.1",
    tools,
    resources
  );
  await server.connect(transport);
}

run();
