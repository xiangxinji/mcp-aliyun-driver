import { FileTypeText, GenerateFileInfoText } from "../utils/text.js";
import { Tool, ToolResult } from "./index.js";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTryCatchBlock } from "../utils/catch-block.js";
import { downloadFile } from "../utils/file.js";
import { toDesktop } from "../utils/path.js";

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

const GetFileListTool: Tool = {
  schema: {
    name: "GetFileList",
    description: "获取云盘内的文件列表",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        limit: z.number().default(100).describe("查询数量, 默认为 100"),
        parent_file_id: z.string().describe("父文件ID").default("root"),
        type: z.enum(["all", "file", "folder"]).default("all"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.GetFileList(params as any);
      const text = res.items
        .map((i) => {
          return `文件id：${i.file_id},文件名：${i.name},文件大小：${
            i.size
          },文件类型：${FileTypeText[i.type]},创建时间：${
            i.created_at
          },更新时间：${i.updated_at}`;
        })
        .join("\r\n");

      return {
        content: [
          {
            type: "text",
            text,
          },
        ],
        isError: false,
      };
    });
  },
};

const SearchFileListTool: Tool = {
  schema: {
    name: "SearchFileList",
    description: "搜索云盘内的文件列表",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        limit: z.number().default(100).describe("查询数量, 默认为 100"),
        query: z.string().describe(`查询语句，例如：精确查询 name = '123'
模糊匹配 name match "123"
搜索指定后缀文件 file_extension = 'apk' 
范围查询 created_at < "2019-01-14T00:00:00"
复合查询：
type = 'folder' or name = '123'
parent_file_id = 'root' and name = '123' and category = 'video'`),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.SearchFileList(params as any);
      const text = res.items
        .map((i) => {
          return `文件id：${i.file_id},文件名：${i.name},文件大小：${
            i.size
          },文件类型：${FileTypeText[i.type]},创建时间：${
            i.created_at
          },更新时间：${i.updated_at}`;
        })
        .join("\r\n");

      return {
        content: [
          {
            type: "text",
            text,
          },
        ],
        isError: false,
      };
    });
  },
};

const GetFileInfoTool: Tool = {
  schema: {
    name: "GetFileInfo",
    description: "获取云盘文件信息",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        file_id: z.string().describe("文件ID"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.GetFileInfo(params as any);
      return {
        content: [
          {
            type: "text",
            text: GenerateFileInfoText(res),
          },
        ],
        isError: false,
      };
    });
  },
};

const GetFileInfoByPathTool: Tool = {
  schema: {
    name: "GetFileInfoByPath",
    description: "获取云盘文件信息",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        path: z.string().describe("文件路径"),
      })
    ),
  },

  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.GetFileInfoByPath(params as any);
      return {
        content: [
          {
            type: "text",
            text: GenerateFileInfoText(res),
          },
        ],
        isError: false,
      };
    });
  },
};

const MoveFileTool: Tool = {
  schema: {
    name: "MoveFile",
    description: "移动云盘文件",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        file_id: z.string().describe("文件ID"),
        to_parent_file_id: z.string().describe("目标文件夹ID"),
        check_name_mode: z
          .enum(["ignore", "rename", "refuse"])
          .default("ignore"),
        new_name: z.string().describe("新文件名"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.MoveFile(params as any);
      return {
        content: [
          {
            type: "text",
            text: res.async_task_id
              ? `文件正在移动， 任务ID：${res.async_task_id}`
              : `文件移动成功，驱动盘ID ：${res.drive_id}，文件ID：${res.file_id}`,
          },
        ],
        isError: false,
      };
    });
  },
};

const CopyFileTool: Tool = {
  schema: {
    name: "CopyFile",
    description: "复制云盘文件",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        file_id: z.string().describe("文件ID"),
        to_drive_id: z.string().describe("目标资源盘ID或者备份盘ID,默认用资源盘ID"),
        to_parent_file_id: z.string().describe("目标文件夹ID"),
        auto_rename: z.boolean().default(true),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.CopyFile(params as any);
      return {
        content: [
          {
            type: "text",
            text: res.async_task_id
              ? `文件正在复制， 任务ID：${res.async_task_id}`
              : `文件复制成功，驱动盘ID ：${res.drive_id}，文件ID：${res.file_id}`,
          },
        ],
      };
    });
  },
};

const GetStarredFileList: Tool = {
  schema: {
    name: "GetStarredFileList",
    description: "获取云盘收藏的文件列表",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        limit: z.number().default(100).describe("查询数量, 默认为 100"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.GetStarredFileList(params as any);
      const text = res.items
        .map((i) => {
          return GenerateFileInfoText(i);
        })
        .join("\r\n");

      return {
        content: [
          {
            type: "text",
            text,
          },
        ],
        isError: false,
      };
    });
  },
};

const GetFileDownloadUrlTool: Tool = {
  schema: {
    name: "GetFileDonwloadUrl",
    description: "获取云盘文件下载链接",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        file_id: z.string().describe("文件ID"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const res = await context.services.file.GetDownloadUrl(params as any);
      return {
        content: [
          {
            type: "text",
            text: `下载链接：${res.url} ，过期时间：${res.expiration}， 描述：${res.description}`,
          },
        ],
        isError: false,
      };
    });
  },
};

const DownloadFileTool: Tool = {
  schema: {
    name: "DownloadFileByFileID",
    description: "根据文件ID和驱动盘ID下载云盘文件到本地桌面上",
    inputSchema: zodToJsonSchema(
      z.object({
        drive_id: z.string().describe("资源盘ID或者备份盘ID,默认用资源盘ID"),
        file_id: z.string().describe("文件ID"),
      })
    ),
  },
  handle: async (context, params) => {
    return tryCatch(async () => {
      const fileInfo = await context.services.file.GetFileInfo(params as any);
      const res = await context.services.file.GetDownloadUrl(params as any);
      downloadFile(res.url, toDesktop(fileInfo.name));
      return {
        content: [
          {
            type: "text",
            text: `文件下载成功，文件名：${fileInfo.name}，文件大小：${fileInfo.size}`,
          },
        ],
        isError: false,
      };
    });
  },
};

export const tools: Tool[] = [
  GetFileListTool,
  SearchFileListTool,
  GetFileInfoTool,
  GetFileInfoByPathTool,
  MoveFileTool,
  CopyFileTool,
  GetStarredFileList,
  GetFileDownloadUrlTool,
  DownloadFileTool,
];
