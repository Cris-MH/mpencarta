'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';
import { parseFormulas } from '@/lib/formula-parser';
import type { FormulaRendererProps } from '@/lib/types';

export default function FormulaRenderer({ content }: FormulaRendererProps) {
  const segments = parseFormulas(content);

  return (
    <span className="formula-renderer">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return (
            <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
              {segment.content}
            </span>
          );
        }

        if (segment.type === 'inline') {
          try {
            const html = katex.renderToString(segment.content, {
              throwOnError: false,
              displayMode: false,
            });
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span
                key={index}
                className="border border-[var(--color-encarta-red)] bg-[#fce4ec] px-1 text-[11px] font-mono"
              >
                {segment.content}
              </span>
            );
          }
        }

        if (segment.type === 'block') {
          try {
            const html = katex.renderToString(segment.content, {
              throwOnError: false,
              displayMode: true,
            });
            return (
              <div
                key={index}
                className="my-2 text-center overflow-x-auto formula-block-panel"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <div
                key={index}
                className="my-2 text-center overflow-x-auto formula-block-panel"
              >
                <span className="border border-[var(--color-encarta-red)] bg-[#fce4ec] px-1 text-[11px] font-mono">
                  {segment.content}
                </span>
              </div>
            );
          }
        }

        return null;
      })}
    </span>
  );
}
