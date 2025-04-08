import { IUserDriveInfo } from "../typings/auth.js"
import { IFileListItem } from "../typings/file.js"


export const FileTypeText = {
    'all': '所有文件',
    'file': '文件',
    'folder': '文件夹'
}


export const GenerateFileInfoText = (res : IFileListItem) => {
    return `文件id：${res.file_id}, 父文件id：${res.parent_file_id},文件名：${res.name},文件大小：${res.size},文件类型：${FileTypeText[res.type]},创建时间：${res.created_at},更新时间：${res.updated_at}, 文件hash：${res.content_hash} , 文件扩展名：${res.file_extension}`
}


export const GenerateAdriveInfoText = (driveInfo : IUserDriveInfo) => {
    return `当前用户名 id : ${driveInfo.user_id}, 昵称: ${driveInfo.name}, avatar: ${driveInfo.avatar}, 默认盘id: ${driveInfo.default_drive_id}, 资源盘 id: ${driveInfo.resource_drive_id}, 资源云盘名称: ${driveInfo.resource_drive_name}, 备份盘 id: ${driveInfo.backup_drive_id}, 目录 id: ${driveInfo.folder_id}`
}