// The Taxonomy Explorer lives in OvertureMaps/web-tools and is published to
// GitHub Pages. Keep its URL and query parameters here so the docs only need
// updating in one place if either changes.

export const TAXONOMY_EXPLORER_URL = 'https://labs.overturemaps.org/web-tools/taxonomy-explorer/';

export const TAXONOMY_DOWNLOADS_URL = `${TAXONOMY_EXPLORER_URL}taxonomy/2026-09-23.0/`;

/** Build the embed URL, passing the docs site's color mode through as a theme hint. */
export function taxonomyExplorerSrc(colorMode) {
  const url = new URL(TAXONOMY_EXPLORER_URL);
  if (colorMode === 'light' || colorMode === 'dark') {
    url.searchParams.set('theme', colorMode);
  }
  return url.toString();
}
