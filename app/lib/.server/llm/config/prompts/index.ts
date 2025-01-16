import { WORK_DIR } from '~/utils/constants';
import { getCoreSystemPrompt } from './system';
import { getConstraintsPrompt } from './constraints';
import { getFormattingPrompt } from './formatting';
import { getDiffSpecPrompt } from './diff-spec';

export function getSystemPrompt(cwd: string = WORK_DIR): string {
  return [
    getCoreSystemPrompt(),
    getConstraintsPrompt(),
    getFormattingPrompt(),
    getDiffSpecPrompt(),
  ].join('\n\n');
} 