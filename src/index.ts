import { createMcpServer } from "./server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Resource } from "./resources/index.js";

import { Tool } from "./tools/index.js";

const tools = [] as Tool[];
const resources = [] as Resource[];

export default async function run() {
  const transport = new StdioServerTransport();
  const server = createMcpServer(
    "cybercloud-server",
    "0.0.1",
    tools,
    resources
  );
  await server.connect(transport);
}

run();
