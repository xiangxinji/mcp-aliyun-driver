import { IUserInfo, IUserSpaceInfo, IUserVipInfo , IUserDriveInfo} from "../typings/auth.js";
import { http } from "../utils/https.js";
import { BaseService } from "./base.service.js";
export class AuthService extends BaseService {


    /**
     * 获取用户信息
     * @param token 
     */
    async GetUserInfo(): Promise<IUserInfo> {
        const response = await http.get<IUserInfo>('/oauth/users/info')
        return response.data
    }

    /**
     * 获取用户网盘信息
     * @param token
     * @returns
     */
    async GetUserDriveInfo(): Promise<IUserDriveInfo> {
        const response = await http.post<IUserDriveInfo>('/adrive/v1.0/user/getDriveInfo')
        return response.data
    }

    /**
     * 获取用户网盘空间信息
     */
    async GetUserSpaceInfo() {
        const response = await http.post<IUserSpaceInfo>('/adrive/v1.0/user/getSpaceInfo')
        return response.data
    }


    /**
     * 获取 用户 VIP 信息
     */
    async GetUserVipInfo() {
        const response = await http.post<IUserVipInfo>('/business/v1.0/user/getVipInfo')
        return response.data
    }
}


