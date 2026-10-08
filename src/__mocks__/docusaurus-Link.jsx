/**
 * Stand-in for @docusaurus/Link in unit tests.
 *
 * The real component needs the router and site context. Components under test
 * only need the rendered anchor and its href. Aliased in vitest.config.mjs.
 */

export default function Link({ to, href, children, ...props }) {
  return (
    <a href={to ?? href} {...props}>
      {children}
    </a>
  );
}
