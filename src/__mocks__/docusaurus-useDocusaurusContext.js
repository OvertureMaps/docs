/**
 * Stand-in for @docusaurus/useDocusaurusContext in unit tests.
 *
 * The real hook reads the site config from Docusaurus context, which only
 * exists inside a full site render. Tests set the `customFields` a component
 * expects with `setCustomFields` before rendering. Aliased in vitest.config.mjs.
 */
let customFields = {};

export function setCustomFields(fields) {
  customFields = fields;
}

export default function useDocusaurusContext() {
  return { siteConfig: { customFields } };
}
