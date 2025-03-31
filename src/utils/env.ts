export type ENV = {
  APP_ID: string
  APP_SECRET: string
};

export const env: ENV = {
  APP_ID: process.env.APP_ID || "",
  APP_SECRET: process.env.APP_SECRET || "",
};
