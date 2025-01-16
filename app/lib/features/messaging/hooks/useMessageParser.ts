import type { Message } from 'ai';
import { useCallback, useState } from 'react';
import { StreamingMessageParser } from '../parsers/StreamingMessageParser';
import type { ParsedMessages } from '../types/MessageTypes';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('useMessageParser');

const messageParser = new StreamingMessageParser({
  callbacks: {
    onArtifactOpen: (data) => {
      logger.trace('onArtifactOpen', data);
    },
    onArtifactClose: (data) => {
      logger.trace('onArtifactClose', data);
    },
    onActionOpen: (data) => {
      logger.trace('onActionOpen', data.action);
    },
    onActionClose: (data) => {
      logger.trace('onActionClose', data.action);
    },
  },
});

export function useMessageParser() {
  const [parsedMessages, setParsedMessages] = useState<ParsedMessages>({});

  const parseMessages = useCallback((messages: Message[], isLoading: boolean) => {
    let reset = false;

    if (import.meta.env.DEV && !isLoading) {
      reset = true;
      messageParser.reset();
    }

    for (const [index, message] of messages.entries()) {
      if (message.role === 'assistant') {
        const newParsedContent = messageParser.parse(message.id, message.content);

        setParsedMessages((prevParsed) => ({
          ...prevParsed,
          [index]: !reset ? (prevParsed[index] || '') + newParsedContent : newParsedContent,
        }));
      }
    }
  }, []);

  return { parsedMessages, parseMessages };
} 