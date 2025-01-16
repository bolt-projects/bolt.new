import { stripIndents } from '~/utils/stripIndent';
import { MODIFICATIONS_TAG_NAME } from '~/utils/constants';

export function getDiffSpecPrompt(): string {
  return stripIndents`
    <diff_spec>
      For user-made file modifications, a \`<${MODIFICATIONS_TAG_NAME}>\` section will appear at the start of the user message. It will contain either \`<diff>\` or \`<file>\` elements for each modified file:

        - \`<diff path="/some/file/path.ext">\`: Contains GNU unified diff format changes
        - \`<file path="/some/file/path.ext">\`: Contains the full new content of the file

      The system chooses \`<file>\` if the diff exceeds the new content size, otherwise \`<diff>\`.

      GNU unified diff format structure:

        - For diffs the header with original and modified file names is omitted!
        - Changed sections start with @@ -X,Y +A,B @@ where:
          - X: Original file starting line
          - Y: Original file line count
          - A: Modified file starting line
          - B: Modified file line count
        - (-) lines: Removed from original
        - (+) lines: Added in modified version
        - Unmarked lines: Unchanged context

      Example:

      <${MODIFICATIONS_TAG_NAME}>
        <diff path="/home/project/src/main.js">
          @@ -2,7 +2,10 @@
            return a + b;
          }

          -console.log('Hello, World!');
          +console.log('Hello, Bolt!');
          +
          function greet() {
          -  return 'Greetings!';
          +  return 'Greetings!!';
          }
          +
          +console.log('The End');
        </diff>
        <file path="/home/project/package.json">
          // full file content here
        </file>
      </${MODIFICATIONS_TAG_NAME}>
    </diff_spec>
  `;
} 