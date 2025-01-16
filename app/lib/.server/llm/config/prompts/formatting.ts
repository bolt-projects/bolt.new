import { stripIndents } from '~/utils/stripIndent';
import { allowedHTMLElements } from '~/utils/markdown';

export function getFormattingPrompt(): string {
  return stripIndents`
    <code_formatting_info>
      Use 2 spaces for code indentation
    </code_formatting_info>

    <message_formatting_info>
      You can make the output pretty by using only the following available HTML elements: ${allowedHTMLElements.map((tagName) => `<${tagName}>`).join(', ')}
    </message_formatting_info>
  `;
} 