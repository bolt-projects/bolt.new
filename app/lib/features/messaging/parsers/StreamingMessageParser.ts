import type { BoltAction, BoltActionData } from '~/types/actions';
import type { BoltArtifactData } from '~/types/artifact';
import { createScopedLogger } from '~/utils/logger';
import { handleActionClose, handleActionOpen } from '../handlers/ActionHandlers';
import { handleArtifactClose, handleArtifactOpen } from '../handlers/ArtifactHandlers';
import type { ActionCallbackData, ArtifactCallbackData, ParserCallbacks } from '../types/MessageTypes';

const ARTIFACT_TAG_OPEN = '<boltArtifact';
const ARTIFACT_TAG_CLOSE = '</boltArtifact>';
const ARTIFACT_ACTION_TAG_OPEN = '<boltAction';
const ARTIFACT_ACTION_TAG_CLOSE = '</boltAction>';

const logger = createScopedLogger('StreamingMessageParser');

interface MessageState {
  position: number;
  insideArtifact: boolean;
  insideAction: boolean;
  currentArtifact?: BoltArtifactData;
  currentAction: BoltActionData;
  actionId: number;
}

export interface StreamingMessageParserOptions {
  callbacks?: ParserCallbacks;
}

export class StreamingMessageParser {
  private state: MessageState = {
    position: 0,
    insideArtifact: false,
    insideAction: false,
    currentAction: {} as BoltActionData,
    actionId: 0,
  };

  constructor(private options: StreamingMessageParserOptions = {}) {}

  parse(messageId: string, input: string): string {
    let output = '';
    let currentPosition = 0;

    while (currentPosition < input.length) {
      const artifactOpenIndex = input.indexOf(ARTIFACT_TAG_OPEN, currentPosition);
      const artifactCloseIndex = input.indexOf(ARTIFACT_TAG_CLOSE, currentPosition);
      const actionOpenIndex = input.indexOf(ARTIFACT_ACTION_TAG_OPEN, currentPosition);
      const actionCloseIndex = input.indexOf(ARTIFACT_ACTION_TAG_CLOSE, currentPosition);

      if (this.state.insideAction) {
        if (actionCloseIndex === -1) {
          this.state.currentAction.content = (this.state.currentAction.content || '') + input.slice(currentPosition);
          break;
        }

        this.state.currentAction.content = (this.state.currentAction.content || '') + input.slice(currentPosition, actionCloseIndex);
        this.handleActionClose(messageId);
        currentPosition = actionCloseIndex + ARTIFACT_ACTION_TAG_CLOSE.length;
        continue;
      }

      if (this.state.insideArtifact) {
        if (artifactCloseIndex === -1) {
          break;
        }

        if (actionOpenIndex !== -1 && actionOpenIndex < artifactCloseIndex) {
          output += input.slice(currentPosition, actionOpenIndex);
          this.handleActionOpen(messageId, input.slice(actionOpenIndex, actionOpenIndex + ARTIFACT_ACTION_TAG_OPEN.length));
          currentPosition = actionOpenIndex + ARTIFACT_ACTION_TAG_OPEN.length;
          continue;
        }

        output += input.slice(currentPosition, artifactCloseIndex);
        this.handleArtifactClose(messageId);
        currentPosition = artifactCloseIndex + ARTIFACT_TAG_CLOSE.length;
        continue;
      }

      if (artifactOpenIndex === -1) {
        output += input.slice(currentPosition);
        break;
      }

      output += input.slice(currentPosition, artifactOpenIndex);
      this.handleArtifactOpen(messageId, input.slice(artifactOpenIndex, artifactOpenIndex + ARTIFACT_TAG_OPEN.length));
      currentPosition = artifactOpenIndex + ARTIFACT_TAG_OPEN.length;
    }

    return output;
  }

  private handleArtifactOpen(messageId: string, content: string) {
    this.state.insideArtifact = true;
    const artifactData: ArtifactCallbackData = {
      messageId,
      ...this.parseAttributes(content),
    };
    
    if (this.options.callbacks?.onArtifactOpen) {
      handleArtifactOpen(artifactData);
    }
  }

  private handleArtifactClose(messageId: string) {
    this.state.insideArtifact = false;
    if (this.state.currentArtifact && this.options.callbacks?.onArtifactClose) {
      handleArtifactClose({
        ...this.state.currentArtifact,
        messageId,
      });
    }
    this.state.currentArtifact = undefined;
  }

  private handleActionOpen(messageId: string, content: string) {
    this.state.insideAction = true;
    this.state.currentAction = {
      ...this.parseAttributes(content),
      content: '',
    };

    const actionData: ActionCallbackData = {
      messageId,
      artifactId: this.state.currentArtifact?.id || '',
      actionId: (this.state.actionId++).toString(),
      action: this.state.currentAction as BoltAction,
    };

    if (this.options.callbacks?.onActionOpen) {
      handleActionOpen(actionData);
    }
  }

  private handleActionClose(messageId: string) {
    this.state.insideAction = false;
    const actionData: ActionCallbackData = {
      messageId,
      artifactId: this.state.currentArtifact?.id || '',
      actionId: (this.state.actionId++).toString(),
      action: this.state.currentAction as BoltAction,
    };

    if (this.options.callbacks?.onActionClose) {
      handleActionClose(actionData);
    }
    this.state.currentAction = {} as BoltActionData;
  }

  private parseAttributes(content: string): Record<string, string> {
    const attributes: Record<string, string> = {};
    const matches = content.matchAll(/(\w+)="([^"]+)"/g);
    
    for (const match of matches) {
      const [, key, value] = match;
      attributes[this.camelCase(key)] = value;
    }
    
    return attributes;
  }

  private camelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  reset() {
    this.state = {
      position: 0,
      insideArtifact: false,
      insideAction: false,
      currentAction: {} as BoltActionData,
      actionId: 0,
    };
  }
} 