import type { Context } from "../context.js";

export type ResourceSchema = {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
};

export type ResourceResult = {
  uri: string;
  mimeType?: string;
  text?: string;
  blob?: string;
};

export type Resource = {
  schema: ResourceSchema;
  read: (context: Context, uri: string) => Promise<ResourceResult[]>;
};
