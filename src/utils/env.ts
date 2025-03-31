export type ENV = {
  base_url: string;
  api_token: string;
  setup_base_url: string;
};

export const env: ENV = {
  base_url: process.env.CYBERCLOUD_BASE_URL as string,
  setup_base_url: process.env.CYBERCLOUD_SETUP_BASE_URL as string,
  api_token: process.env.CYBERCLOUD_API_TOKEN as string,
};
