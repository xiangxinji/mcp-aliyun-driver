import fs from "fs";
import path from "path";
import axios from "axios";

export function readAssetStream(filename: string) {
  return fs.createReadStream(path.resolve("lib/assets/" + filename));
}




/**
 * 根据一个网络url 下载文件到本地
 * @param url 网络地址
 * @param filename 文件名
 * @param dir 文件存放目录
 * @returns
 */
export async function downloadFile(url: string, filepath: string) {
  return axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  })
    .then((response) => {
      const writeStream = fs.createWriteStream(filepath);
      response.data.pipe(writeStream);

      writeStream.on('finish', () => {
        console.log('文件保存成功！');
      });

      writeStream.on('error', (err) => {
        console.error('写入失败:', err);
        fs.unlink(filepath, () => { });
      });
    })
    .catch((err) => {
      console.error('请求失败:', err);
    });
}






