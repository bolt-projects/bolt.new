import type { Message } from 'ai';
import type { BoltAction, BoltActionData } from '~/types/actions';
import type { BoltArtifactData } from '~/types/artifact';

export interface ArtifactCallbackData extends BoltArtifactData {
  messageId: string;
}

export interface ActionCallbackData {
  artifactId: string;
  messageId: string;
  actionId: string;
  action: BoltAction;
}

export interface ParserCallbacks {
  onArtifactOpen?: (data: ArtifactCallbackData) => void;
  onArtifactClose?: (data: ArtifactCallbackData) => void;
  onActionOpen?: (data: ActionCallbackData) => void;
  onActionClose?: (data: ActionCallbackData) => void;
}

export interface ParsedMessages {
  [key: number]: string;
} 