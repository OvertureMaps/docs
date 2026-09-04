/**
 * Stand-in for @docusaurus/useBaseUrl in unit tests.
 *
 * The real module reads the site's `baseUrl` from Docusaurus context, which
 * only exists inside a full site render. Components under test just need URLs
 * passed through unchanged. Aliased in vitest.config.js.
 */
// The real hook memoizes withBaseUrl, so consumers can safely put it in effect
// dependency arrays. Returning a fresh function each render here would make
// tests behave differently from the browser.
const withBaseUrl = url => url;

export function useBaseUrlUtils() {
  return { withBaseUrl };
}

export default function useBaseUrl(url) {
  return url;
}
