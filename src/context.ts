import { AuthService } from "./service/index.js";
import { FileService } from "./service/file.service.js";

export class Context {

    services = {
        auth: new AuthService(),
        file : new FileService()
    }
}
