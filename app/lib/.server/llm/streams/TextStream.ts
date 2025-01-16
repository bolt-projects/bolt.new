import { streamText as aiStreamText } from 'ai';
import { getAPIKey } from '~/lib/.server/llm/core/api-key';
import { getAnthropicModel } from '~/lib/.server/llm/core/model';
import { MAX_TOKENS, ANTHROPIC_BETA_HEADER } from '~/lib/.server/llm/config/constants';
import { getSystemPrompt } from '~/lib/.server/llm/config/prompts';
import type { Message, StreamingOptions } from './types';

export type Messages = Message[];

export function streamText(messages: Messages, env: Env, options?: Omit<StreamingOptions, 'messages'>) {
  const apiKey = getAPIKey(env);
  const model = getAnthropicModel(apiKey);
  const systemPrompt = getSystemPrompt();

  return aiStreamText({
    model,
    system: systemPrompt,
    maxTokens: MAX_TOKENS,
    headers: {
      'anthropic-beta': ANTHROPIC_BETA_HEADER,
    },
    messages,
    ...options,
  });
} 