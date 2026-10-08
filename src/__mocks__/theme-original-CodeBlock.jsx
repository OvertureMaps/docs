/**
 * Stand-in for @theme-original/CodeBlock in unit tests.
 *
 * The real component needs the Docusaurus theme (Prism, color mode, etc.).
 * The swizzled wrapper under test only needs to see what children reach it.
 * Aliased in vitest.config.mjs.
 */

export default function CodeBlock({ children, language }) {
  return (
    <pre data-testid="code-block" data-language={language}>
      {children}
    </pre>
  );
}
