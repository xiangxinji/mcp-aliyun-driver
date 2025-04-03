/**
 * 分享结果
 */
export interface IShareFileResult {
  /** 分享ID */
  shareId: string;
  /** 过期时间 */
  expiration: string;
  /** 是否过期 */
  expired: boolean;
  /** 分享码 */
  sharePwd: string;
  /** 分享链接 */
  shareUrl: string;
  /** 创建人 */
  creator: string;
  /** 状态 */
  status: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}
