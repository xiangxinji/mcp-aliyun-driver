//@ts-ignore
import notifier from "node-notifier";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

export function notify(title: string, message: string) {
  // 发送通知
  notifier.notify(
    {
      title, // 通知的标题
      message, // 通知的正文
      icon: path.join(__dirname, "../assets/logo.png"),
    },
    function (err: any, response: any) {
      // 响应处理
      if (err) {
        console.error(err);
        return;
      }
      console.log(response); // 响应对象
    }
  );
}
