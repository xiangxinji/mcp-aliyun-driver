import { Tool } from "./index.js";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const GetCurrentDriveUserTool: Tool = {
    schema: {
        name: 'GetCurrentDriverUser',
        description: '获取当前云盘用户信息',
        inputSchema: zodToJsonSchema(z.object({}))
    },
    handle: async (context, params) => {
        const driverInfo = await context.services.auth.GetUserInfo();
        return {
            content: [
                {
                    type: 'text',
                    text: `当前云盘用户信息: 用户名: ${driverInfo.name}, 用户ID: ${driverInfo.id} , 手机号: ${driverInfo.phone} 头像: ${driverInfo.avatar}`
                }
            ],
            isError: false
        }
    }
}


const GetCurrentDriveTool: Tool = {
    schema: {
        name: 'GetCurrentDrive',
        description: '获取当前云盘信息',
        inputSchema: zodToJsonSchema(z.object({}))
    },
    handle: async (context, params) => {
        const driveInfo = await context.services.auth.GetUserDriveInfo();
        return {
            content: [
                {
                    type: 'text',
                    text: `当前用户名 id : ${driveInfo.user_id}, 昵称: ${driveInfo.name}, avatar: ${driveInfo.avatar}, 默认盘id: ${driveInfo.default_drive_id}, 资源盘 id: ${driveInfo.resource_drive_id}, 资源云盘名称: ${driveInfo.resource_drive_name}, 备份盘 id: ${driveInfo.backup_drive_id}, 目录 id: ${driveInfo.folder_id}`
                }
            ],
            isError: false
        }
    }
}


const GetUserSpaceInfoTool: Tool = {
    schema: {
        name: 'GetUserSpaceInfo',
        description: '获取当前用户网盘空间信息',
        inputSchema: zodToJsonSchema(z.object({}))
    },
    handle: async (context, params) => {
        const spaceInfo = await context.services.auth.GetUserSpaceInfo();
        const { total_size, used_size } = spaceInfo.personal_space_info
        return {
            content: [
                {
                    type: 'text',
                    text: '当前用户网盘空间信息: 总空间: ' + total_size + '字节 , 已使用空间: ' + used_size + '字节'
                }
            ],
            isError: false
        }
    }
}

const GetCurrentUserVipTool: Tool = {
    schema: {
        name: 'GetCurrentUserVip',
        description: '获取当前用户 VIP 信息',
        inputSchema: zodToJsonSchema(z.object({}))
    },
    handle: async (context, params) => {
        const vipInfo = await context.services.auth.GetUserVipInfo();

        const vipText = {
            'member': '普通会员',
            'vip': 'VIP',
            'svip': 'SVIP'
        }
        return {
            content: [
                {
                    type: 'text',
                    text: `当前用户 VIP 信息: ${vipText[vipInfo.identity]} , vip 到期时间: ${vipInfo.expire}, vip 等级: ${vipInfo.level}`
                }
            ],
            isError: false
        }
    }
}


export const tools: Tool[] = [
    GetCurrentDriveUserTool,
    GetCurrentDriveTool,
    GetCurrentUserVipTool,
    GetUserSpaceInfoTool
]