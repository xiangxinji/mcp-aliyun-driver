

export interface IUserInfo {
    /**
     * 用户id
     */
    id: string;
    /**
     * 用户名
     */
    name: string;
    /**
     * 用户头像
     */
    avatar: string;
    /**
     * 用户手机号
     */
    phone?: string
}



export interface IUserVipInfo {
    /**
     * 用户等级枚举
     */
    identity: 'member' | 'vip' | 'svip'
    /**
     * 用户等级名称
     */
    level: '20TB' | '8TB'
    /**
     *  vip 过期时间
     */
    expire: number
    /**
     * “三方权益包”是否生效
     */
    thirdPartyVip: boolean
    /**
     *  “三方权益包”过期时间
     */
    thirdPartyVipExpire: number
}


export interface IUserSpaceInfo {
    personal_space_info: {
        /**
         * 已经使用的空间大小
         */
        used_size: number
        /**
         * 总的空间大小
         */
        total_size: number
    }

}



export interface IUserDriveInfo {
    /**
     * 用户id
     */
    user_id: string;
    /**
     * 用户名
     */
    name: string
    /**
     * 用户头像
     */
    avatar: string
    /**
     * 默认云盘id
     */
    default_drive_id: string
    /**
     * 资源云盘id
     */
    resource_drive_id?: string
    /**
     * 资源云盘名称
     */
    resource_drive_name?: string
    /**
     * 备份盘 id 
     */
    backup_drive_id?: string
    /**
     * 目录 id 
     */
    folder_id?: string
}
