import { http } from "../utils/https.js";
import { BaseService } from "./base.service.js";
import { project_config } from "../project.config.js";
import { getExpireDate } from "../utils/date.js";
import { IShareFileResult } from "../typings/share.js";

export class ShareService extends BaseService {
  /**
   * 创建分享 , 默认 7 天过期
   * @param param0
   */
  CreateShare({
    drive_id,
    file_list = [],
    expire_day = 7,
    sharePwd = project_config.default_share_code,
  }: {
    drive_id: string;
    file_list: string[];
    expire_day: number;
    sharePwd: string;
  }) {
    return http.post<IShareFileResult>("/adrive/v1.0/openFile/createShare", {
      drive_id,
      file_list,
      expiration: getExpireDate(expire_day),
      sharePwd,
    });
  }
}
