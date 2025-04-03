import { http } from "src/utils/https.js";
import { BaseService } from "./base.service.js";
import { project_config } from "../project.config.js";
import { getExpireDate } from "src/utils/date.js";

export class ShareService extends BaseService {
  /**
   * 创建分享 , 默认 7 天过期
   * @param param0
   */
  CreateShare({
    driveId,
    fileIdList,
    expireDay = 7,
    sharePwd = project_config.default_share_code,
  }: {
    driveId: string;
    fileIdList: string[];
    expireDay: number;
    sharePwd: string;
  }) {
    return http.post("/adrive/v1.0/openFile/createShare", {
      driveId,
      fileIdList,
      expiration: getExpireDate(expireDay),
      sharePwd,
    });
  }
}
