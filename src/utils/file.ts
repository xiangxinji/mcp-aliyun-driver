import fs from "fs";
import path from "path";
import axios from "axios";
import { notify } from "./notifier.js";

export function readAssetStream(filename: string) {
  return fs.createReadStream(path.resolve("lib/assets/" + filename));
}

/**
 * 根据一个网络url 下载文件到本地
 * @param url 网络地址
 * @param filepath 文件全路径
 * @returns
 */
export async function downloadFile(url: string, filepath: string) {
  return axios({
    method: "get",
    url: url,
    responseType: "stream",
  })
    .then((response) => {
      const writeStream = fs.createWriteStream(filepath);
      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        notify("文件保存成功", `文件路径:${filepath}`);
      });

      writeStream.on("error", (err) => {
        notify("文件保存失败", `文件路径:${filepath}`);
        fs.unlink(filepath, () => {});
      });
    })
    .catch((err) => {
      console.error("请求失败:", err);
    });
}
