import { createTryCatchBlock } from "../utils/catch-block.js";
import { FileTypeText, GenerateFileInfoText } from "../utils/text.js";
import { Tool, ToolResult } from "./index.js";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const tryCatch = createTryCatchBlock<Promise<ToolResult>>((e) => {
  return {
    content: [
      {
        type: "text",
        text: "执行出错" + e,
      },
    ],
    isError: true,
  };
});

const ShareFileTool: Tool = {
  schema: {
    name: "ShareFile",
    description: "分享一个或多个云盘文件",
    inputSchema: zodToJsonSchema(z.object({})),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.share.CreateShare(params as any);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(res),
          },
        ],
        isError: false,
      };
    });
  },
};

export const tools: Tool[] = [ShareFileTool];
