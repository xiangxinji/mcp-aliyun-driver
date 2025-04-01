import { FileTypeText } from "../utils/text.js";
import { Tool } from "./index.js";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


const GetFileListTool: Tool = {
    schema: {
        name: 'GetFileList',
        description: '获取网盘内的文件列表',
        inputSchema: zodToJsonSchema(z.object({
            drive_id: z.string().describe('云盘ID , 默认为默认驱动盘'),
            limit: z.number().default(100).describe('查询数量, 默认为 100'),
            parent_file_id: z.string().describe('父文件ID').default('root'),
            type: z.enum(['all', 'file', 'folder']).default('all')
        }))
    },
    handle: async (context, params) => {
        const res = await context.services.file.GetFileList(params as any);
        const text = res.items.map(i => {
            return `文件id：${i.file_id},文件名：${i.name},文件大小：${i.size},文件类型：${FileTypeText[i.type]},创建时间：${i.created_at},更新时间：${i.updated_at}`
        }).join('\r\n')

        return {
            content: [
                {
                    type: 'text',
                    text
                }
            ],
            isError: false
        }
    }
}


const SearchFileList: Tool = {
    schema: {
        name: 'SearchFileList',
        description: '搜索网盘内的文件列表',
        inputSchema: zodToJsonSchema(z.object({
            drive_id: z.string().describe('云盘ID , 默认为默认驱动盘'),
            limit: z.number().default(100).describe('查询数量, 默认为 100'),
            query: z.string().describe(`查询语句，例如：精确查询 name = '123'
模糊匹配 name match "123"
搜索指定后缀文件 file_extension = 'apk' 
范围查询 created_at < "2019-01-14T00:00:00"
复合查询：
type = 'folder' or name = '123'
parent_file_id = 'root' and name = '123' and category = 'video'`)
        }))
    },
    handle: async (context, params) => {
        const res = await context.services.file.SearchFileList(params as any);
        const text = res.items.map(i => {
            return `文件id：${i.file_id},文件名：${i.name},文件大小：${i.size},文件类型：${FileTypeText[i.type]},创建时间：${i.created_at},更新时间：${i.updated_at}`
        }).join('\r\n')

        return {
            content: [
                {
                    type: 'text',
                    text
                }
            ],
            isError: false
        }
    }
}

export const tools: Tool[] = [
    GetFileListTool,
    SearchFileList
]