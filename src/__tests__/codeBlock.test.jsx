// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { setCustomFields } from '@docusaurus/useDocusaurusContext';
import CodeBlockWrapper from '../theme/CodeBlock';

describe('CodeBlock wrapper', () => {
  beforeEach(() => setCustomFields({ overtureRelease: '2026-09-23.1' }));
  afterEach(cleanup);

  it('resolves release placeholders in plain fenced code blocks', () => {
    render(
      <CodeBlockWrapper language="sql">
        {'SELECT * FROM "overture"."__ATHENA_OVERTURE_RELEASE"\n' +
          '-- s3://overturemaps-us-west-2/release/__OVERTURE_RELEASE/\n' +
          '-- tiles/__PMTILES_OVERTURE_RELEASE/'}
      </CodeBlockWrapper>
    );
    expect(screen.getByTestId('code-block')).toHaveTextContent(
      'SELECT * FROM "overture"."v2026_09_23_1" ' +
        '-- s3://overturemaps-us-west-2/release/2026-09-23.1/ ' +
        '-- tiles/2026-09-23/'
    );
  });

  it('passes non-string children through untouched', () => {
    render(
      <CodeBlockWrapper>
        <span data-testid="child">__OVERTURE_RELEASE</span>
      </CodeBlockWrapper>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('__OVERTURE_RELEASE');
  });

  it('forwards props to the original CodeBlock', () => {
    render(<CodeBlockWrapper language="python">print(1)</CodeBlockWrapper>);
    const block = screen.getByTestId('code-block');
    expect(block).toHaveAttribute('data-language', 'python');
    expect(block).toHaveTextContent('print(1)');
  });
});
