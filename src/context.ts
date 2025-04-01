import { AuthService } from "./service/index.js";

export class Context {

    services = {
        auth: new AuthService()
    }
}
