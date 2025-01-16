import type { Message as AIMessage, ToolInvocation } from 'ai';

export type ToolResult = ToolInvocation & {
  state: 'result';
  toolCallId: string;
  toolName: string;
  args: unknown;
  result: unknown;
};

export interface Message extends AIMessage {
  toolInvocations?: ToolResult[];
}

export type Messages = Message[];

export interface StreamingOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  headers?: Record<string, string>;
  messages: Messages;
  [key: string]: unknown;
} 