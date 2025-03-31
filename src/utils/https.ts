import axios from "axios";
import { project_config } from "../project.config.js";

export const http = axios.create({
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    jwt: project_config.api_token,
  },
});

const error = (message: string) => {
  return Promise.reject(new Error(`HTTP Message:${message}`));
};

http.interceptors.response.use(
  (response) => {
    try {
      if (response.status === 200) {
        if (![0, "0"].includes(response.data?.code)) {
          return error(response.data?.message || "未知错误");
        }

        return response;
      } else {
        return error(response.status.toString() + " " + JSON.stringify(response.config.data));
      }
    } catch (e) {
      return error("未知错误");
    }
  },
  (error) => {
    return Promise.reject(`HTTP:${error}`);
  }
);
