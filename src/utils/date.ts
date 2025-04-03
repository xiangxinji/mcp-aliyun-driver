/**
 * 获取多少天之后的 ISO 时间
 */
export function getExpireDate(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}
