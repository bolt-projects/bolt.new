import { createScopedLogger } from '~/utils/logger';
import { workbenchStore } from '~/lib/stores/workbench';
import type { ActionCallbackData } from '../types/MessageTypes';

const logger = createScopedLogger('ActionHandlers');

export function handleActionOpen(data: ActionCallbackData): void {
  logger.trace('onActionOpen', data.action);

  if (data.action.type !== 'shell') {
    workbenchStore.addAction(data);
  }
}

export function handleActionClose(data: ActionCallbackData): void {
  logger.trace('onActionClose', data.action);

  if (data.action.type === 'shell') {
    workbenchStore.addAction(data);
  }

  workbenchStore.runAction(data);
} 