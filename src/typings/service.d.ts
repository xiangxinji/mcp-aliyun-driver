

export interface IUserInfo {
    id: string;
    name: string;
    avatar: string;
    phone?: string
}


export interface IUserDriverInfo {
    user_id : string;
    name : string 
    avatar : string
    default_drive_id : string
    resource_drive_id  ?: string
    resource_drive_name ?: string
    backup_drive_id ?: string
    folder_id ?: string
}