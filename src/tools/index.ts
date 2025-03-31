


import { ImageContent, TextContent } from '@modelcontextprotocol/sdk/types.js';
import type { JsonSchema7Type } from 'zod-to-json-schema';
import { Context } from '../context.js';

export type ToolSchema = {
    name: string;
    description: string;
    inputSchema: JsonSchema7Type;
};

export type ToolResult = {
    content: (ImageContent | TextContent)[];
    isError?: boolean;
};

export type Tool = {
    schema: ToolSchema;
    handle: (context: Context, params?: Record<string, any>) => Promise<ToolResult>;
};
