export interface IFileListItem {
    /**
     * 盘 id
     */
    drive_id: string
    /**
     * 文件 id
     */
    file_id: string
    /**
     * 父文件 id
     */
    parent_file_id: string

    /**
     * 文件名
     */
    name: string

    /**
     * 文件大小
     */
    size: number

    /**
     * 扩展名
     */
    file_extension

    /**
     * content_hash
     */
    content_hash: string

    /**
     * 分类 
     */
    category: string

    /**
     * 文件类型
     */
    type: 'file' | 'folder'

    /**
     * 创建时间
     */
    created_at: string

    /**
     * 更新时间
     */
    updated_at: string

}

export interface IFileListResult {
    /**
     * 文件列表
     */
    items: IFileListItem[]
}

export interface IFileMoveResult {
    /**
     * 驱动盘 id
     */
    drive_id: string
    /**
     * 文件 id
     */
    file_id: string
    /**
     * 如果是异步的任务，返回异步任务 id
     */
    async_task_id: string
    /**
     * 文件是否存在
     */
    exist: boolean
}


export interface IFileCopyResult {
    /**
     * 驱动盘 id
     */
    drive_id: string
    /**
     * 文件 id
     */
    file_id: string
    /**
     * 如果是异步的任务，返回异步任务 id
     */
    async_task_id: string
}