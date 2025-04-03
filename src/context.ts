import { AuthService } from "./service/index.js";
import { FileService } from "./service/file.service.js";
import { ShareService } from "./service/share.service.js";

export class Context {
  services = {
    auth: new AuthService(),
    file: new FileService(),
    share: new ShareService(),
  };
}
