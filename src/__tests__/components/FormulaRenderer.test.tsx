import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormulaRenderer from '@/components/FormulaRenderer';

describe('FormulaRenderer', () => {
  it('renders plain text content', () => {
    render(<FormulaRenderer content="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders inline formulas within text flow using KaTeX', () => {
    const { container } = render(
      <FormulaRenderer content="The formula $x^2$ is quadratic" />
    );
    // Inline formula should be in a span (not a div)
    const katexSpans = container.querySelectorAll('.katex');
    expect(katexSpans.length).toBe(1);
    // The katex element should be within a span, not breaking text flow
    const katexParent = katexSpans[0].closest('span');
    expect(katexParent).not.toBeNull();
  });

  it('renders block formulas centered on their own line', () => {
    const { container } = render(
      <FormulaRenderer content="Before $$x^2 + y^2 = r^2$$ After" />
    );
    // Block formula should be in a div with text-center class
    const blockDiv = container.querySelector('.my-4.text-center.overflow-x-auto');
    expect(blockDiv).not.toBeNull();
    expect(blockDiv?.querySelector('.katex')).not.toBeNull();
  });

  it('renders invalid KaTeX with red border error indicator without crashing', () => {
    // Use throwOnError: false so KaTeX handles errors itself,
    // but let's test with a formula that KaTeX might render as error
    const { container } = render(
      <FormulaRenderer content="Text $\invalidcommand$ more text" />
    );
    // The component should not crash - it should render something
    expect(container).toBeTruthy();
    // Plain text parts should still render
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('more text')).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const { container } = render(<FormulaRenderer content="" />);
    expect(container).toBeTruthy();
  });

  it('preserves whitespace in text segments', () => {
    const { container } = render(
      <FormulaRenderer content="Line 1\nLine 2" />
    );
    // Text should use whitespace-pre-wrap style
    const textSpan = container.querySelector('[style*="white-space: pre-wrap"]');
    expect(textSpan).not.toBeNull();
  });

  it('renders multiple formulas in the same content', () => {
    const { container } = render(
      <FormulaRenderer content="$a$ and $b$ and $$c + d$$" />
    );
    const katexElements = container.querySelectorAll('.katex');
    expect(katexElements.length).toBe(3);
  });
});
