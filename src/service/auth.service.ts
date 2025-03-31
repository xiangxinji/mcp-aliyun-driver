import { IUserDriverInfo, IUserInfo } from "src/typings/service.js";
import { http } from "../utils/https.js";

export class AuthService {
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
    async GetUserDriverInfo(): Promise<IUserDriverInfo> {
        return null as any 
    }
}


const au = new AuthService()
au.GetUserInfo().then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})