import { env } from "./utils/env.js";

const TENANT = 'testcybercloud';
const PLATFORM_ENV = 'dev'

export const project_config = {
  base_url: `https://${TENANT}-${PLATFORM_ENV}-app.cybercloud.loghub.com/api` as string,
  setup_base_url: `https://${TENANT}-${PLATFORM_ENV}-setup.cybercloud.loghub.com/api` as string,
  auth_base_url: `https://${TENANT}-${PLATFORM_ENV}-auth.cybercloud.loghub.com/api` as string,
  api_token: env.api_token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJ0ZXN0Y3liZXJjbG91ZF9kZXZfd2ViXzEwMSIsInJuU3RyIjoiWXB6ME11T1FwcG5ianRIclAzOWQ4V3Y2aGt2S3NLdGkiLCJrZXkiOiJ0ZXN0Y3liZXJjbG91ZF9kZXYiLCJ0ZW5hbnRDb2RlIjoidGVzdGN5YmVyY2xvdWQifQ.RYRoyFxmekhwiLYlnmlfwoHfGEa0pWGK1koLwV9A3Js',
};
