/**
 * Formula delimiter parser for KaTeX expressions.
 * Splits text into segments: inline formulas ($...$), block formulas ($$...$$), and plain text.
 */

export type SegmentType = 'inline' | 'block' | 'text';

export interface FormulaSegment {
  type: SegmentType;
  content: string;
}

/**
 * Parses text containing KaTeX formula delimiters into typed segments.
 *
 * - Block formulas are delimited by `$$...$$`
 * - Inline formulas are delimited by `$...$`
 * - Everything else is plain text
 *
 * Block delimiters take precedence over inline (parsed first).
 * Unclosed delimiters are treated as plain text.
 * Empty formula segments (e.g., `$$$$`) are excluded from output.
 *
 * @param text - The input text possibly containing formula delimiters
 * @returns An array of FormulaSegment objects
 */
export function parseFormulas(text: string): FormulaSegment[] {
  if (!text) {
    return [];
  }

  const segments: FormulaSegment[] = [];
  let i = 0;
  let currentText = '';

  while (i < text.length) {
    // Check for escaped dollar sign
    if (text[i] === '\\' && i + 1 < text.length && text[i + 1] === '$') {
      currentText += '\\$';
      i += 2;
      continue;
    }

    // Check for block formula ($$...$$)
    if (text[i] === '$' && i + 1 < text.length && text[i + 1] === '$') {
      // Find the closing $$
      const start = i + 2;
      let end = -1;
      let j = start;

      while (j < text.length) {
        // Skip escaped dollar signs inside formula
        if (text[j] === '\\' && j + 1 < text.length && text[j + 1] === '$') {
          j += 2;
          continue;
        }
        if (text[j] === '$' && j + 1 < text.length && text[j + 1] === '$') {
          end = j;
          break;
        }
        j++;
      }

      if (end !== -1) {
        // Found closing $$ — flush text and add block segment
        if (currentText) {
          segments.push({ type: 'text', content: currentText });
          currentText = '';
        }
        const content = text.slice(start, end);
        // Only add non-empty formula segments
        if (content.length > 0) {
          segments.push({ type: 'block', content });
        }
        i = end + 2;
      } else {
        // No closing $$ found — treat as plain text
        currentText += '$$';
        i += 2;
      }
      continue;
    }

    // Check for inline formula ($...$)
    if (text[i] === '$') {
      // Find the closing $
      const start = i + 1;
      let end = -1;
      let j = start;

      while (j < text.length) {
        // Skip escaped dollar signs inside formula
        if (text[j] === '\\' && j + 1 < text.length && text[j + 1] === '$') {
          j += 2;
          continue;
        }
        // A single $ is the closing delimiter
        if (text[j] === '$') {
          // Make sure it's not a $$ (block delimiter)
          if (j + 1 < text.length && text[j + 1] === '$') {
            // This is $$, treat as end of inline here
            end = j;
            break;
          }
          end = j;
          break;
        }
        j++;
      }

      if (end !== -1) {
        // Found closing $ — flush text and add inline segment
        if (currentText) {
          segments.push({ type: 'text', content: currentText });
          currentText = '';
        }
        const content = text.slice(start, end);
        // Only add non-empty formula segments
        if (content.length > 0) {
          segments.push({ type: 'inline', content });
        }
        i = end + 1;
      } else {
        // No closing $ found — treat as plain text
        currentText += '$';
        i += 1;
      }
      continue;
    }

    // Regular character
    currentText += text[i];
    i++;
  }

  // Flush remaining plain text
  if (currentText) {
    segments.push({ type: 'text', content: currentText });
  }

  return segments;
}
