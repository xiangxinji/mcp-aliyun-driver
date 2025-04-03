import { env } from "./utils/env.js";



export const project_config = {
  app_id: env.APP_ID || '41300ecb11924544b0e10911d5e087ea',
  app_secret: env.APP_SECRET || 'af8e4207e50b4fdbb910909e405efeb5',
  authorization: 'Bearer eyJraWQiOiJLcU8iLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NDNjOWE4YzExMTc0Y2U2YTkxYjdiNDg0NmRjNjlkMCIsImF1ZCI6IjQxMzAwZWNiMTE5MjQ1NDRiMGUxMDkxMWQ1ZTA4N2VhIiwicyI6ImNkYSIsImQiOiIxMDUyNzMwMSw5NTExMDQyODIiLCJpc3MiOiJhbGlwYW4iLCJleHAiOjE3NDYwNzY1MDMsImlhdCI6MTc0MzQ4NDUwMCwianRpIjoiMzZlNjk3NTkyYWFkNGQ2MTlkNDVmYTViNjY1OWU4YmUifQ.k9jpni7V24-LPzxMz4fhYUVG2iClA42uZPzfB3sLOlA',
  api_url: 'https://openapi.alipan.com',

  default_share_code : 'Aa123456'
  
};


//  sid : 174342752024193c6468784c81905d367e5c36af23