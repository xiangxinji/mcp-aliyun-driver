import { GenerateAdriveInfoText } from "../utils/text.js";
import { Resource } from "./index.js"


const ResourceAdriveID: Resource = {
    schema: {
        uri: "adrive://user-adrive/resource/info_get",
        name: "GetResourceAdriveID",
        description: "获取当前用户云盘信息资源盘的ID",
        mimeType: "text/plain",
    },
    read: async (context, uri) => {
        const driveInfo = await context.services.auth.GetUserDriveInfo();
        return [{ uri, mimeType: "text/plain", text: `资源盘ID为：${driveInfo.resource_drive_id}` }]
    }
}

const BackupAdriveID: Resource = {
    schema: {
        uri: "adrive://user-adrive/backup/info_get",
        name: "GetBackupAdriveID",
        description: "获取当前用户云盘信息备份盘的ID",
        mimeType: "application/json",
    },
    read: async (context, uri) => {
        const driveInfo = await context.services.auth.GetUserDriveInfo();
        return [{ uri, mimeType: "text/plain", text: `备份盘ID为：${driveInfo.backup_drive_id}` }]
    }
}


export const resources = [
    ResourceAdriveID,
    BackupAdriveID
]