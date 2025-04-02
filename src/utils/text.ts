import { IFileListItem } from "../typings/file.js"


export const FileTypeText = {
    'all': '所有文件',
    'file': '文件',
    'folder': '文件夹'
}


export const GenerateFileInfoText = (res : IFileListItem) => {
    return `文件id：${res.file_id}, 父文件id：${res.parent_file_id},文件名：${res.name},文件大小：${res.size},文件类型：${FileTypeText[res.type]},创建时间：${res.created_at},更新时间：${res.updated_at}, 文件hash：${res.content_hash} , 文件扩展名：${res.file_extension}`
}