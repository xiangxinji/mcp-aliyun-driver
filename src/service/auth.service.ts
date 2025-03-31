import { IUserDriverInfo, IUserInfo } from "src/typings/service.js";

export class AuthService {
    /**
     * 获取用户信息
     * @param token 
     */
    async GetUserInfo(): Promise<IUserInfo> {

    }

    /**
     * 获取用户网盘信息
     * @param token
     * @returns
     */
    async GetUserDriverInfo(): Promise<IUserDriverInfo> {

    }
}