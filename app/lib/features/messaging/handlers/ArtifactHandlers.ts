import { createScopedLogger } from '~/utils/logger';
import { workbenchStore } from '~/lib/stores/workbench';
import type { ArtifactCallbackData } from '../types/MessageTypes';

const logger = createScopedLogger('ArtifactHandlers');

export function handleArtifactOpen(data: ArtifactCallbackData): void {
  logger.trace('onArtifactOpen', data);

  workbenchStore.showWorkbench.set(true);
  workbenchStore.addArtifact(data);
}

export function handleArtifactClose(data: ArtifactCallbackData): void {
  logger.trace('onArtifactClose');

  workbenchStore.updateArtifact(data, { closed: true });
} 