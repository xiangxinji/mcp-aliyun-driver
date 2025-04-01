import { http } from "../utils/https.js";
import { BaseService } from "./base.service.js";
import { IFileListResult } from "../typings/file.js";


export class FileService extends BaseService {

    /**
     * 文件列表
     * @param param0 
     * @returns 
     */
    async GetFileList({
        drive_id,
        limit = 100,
        type = 'all',
        parent_file_id = 'root',
    }: {
        drive_id: string
        limit?: number
        parent_file_id?: string
        type?: 'all' | 'file' | 'folder'
    }) {
        const response = await http.post<IFileListResult>('/adrive/v1.0/openFile/list', {
            drive_id,
            limit,
            type,
            parent_file_id
        })

        return response.data
    }


    /**
     * 搜索文件列表
     */
    async SearchFileList({
        drive_id,
        limit = 100,
        query
    }: {
        drive_id: string
        limit?: number
        query: string
    }) {
        const response = await http.post<IFileListResult>('/adrive/v1.0/openFile/search', {
            drive_id,
            limit,
            return_total_count: true,
            query
        })
        return response.data
    }


}




