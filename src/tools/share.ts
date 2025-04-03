import { createTryCatchBlock } from "../utils/catch-block.js";
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
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("云盘ID , 默认为默认驱动盘"),
        file_list: z.array(z.string()).describe("文件ID列表"),
        expire_day: z.number().default(7).describe("分享过期天数, 默认为 7 天"),
        sharePwd: z.string().describe("分享密码，可以不填"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.share.CreateShare(params as any);
      return {
        content: [
          {
            type: "text",
            text: `已经分享文件，分享记录id：${res.data.shareId}，提取码为：${res.data.sharePwd}，分享链接为：${res.data.shareUrl}`,
          },
        ],
        isError: false,
      };
    });
  },
};

export const tools: Tool[] = [ShareFileTool];
