import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Tool } from "./tools/index.js";
import { Context } from "./context.js";
import { Resource } from "./resources/index.js";

export function createMcpServer(
  name: string,
  version: string,
  tools: Tool[],
  resources: Resource[]
) {
  const server = new Server(
    {
      name: name,
      version: version,
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  const context = new Context();

  server.setRequestHandler(ListToolsRequestSchema, () => {
    return {
      tools: tools.map((tool) => tool.schema),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, (request) => {
    const tool = tools.find((tool) => tool.schema.name === request.params.name);
    if (!tool) {
      return {
        content: [
          { type: "text", text: "Tool " + request.params.name + "not found" },
        ],
        isError: true,
      };
    }

    try {
      return tool.handle(context, request.params.arguments);
    } catch (error) {
      return {
        content: [{ type: "text", text: String(error) }],
        isError: true,
      };
    }
  });

  server.setRequestHandler(ListResourcesRequestSchema, () => {
    return {
      resources: resources.map((resource) => resource.schema),
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const resource = resources.find(
      (resource) => resource.schema.uri === request.params.uri
    );
    if (!resource) return { contents: [] };

    const contents = await resource.read(context, request.params.uri);
    return { contents };
  });

  return server;
}
