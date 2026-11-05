// The Taxonomy Explorer lives in OvertureMaps/web-tools and is published to
// GitHub Pages. docs/guides/places/taxonomy-explorer.mdx also links to this URL
// as plain Markdown so the links survive the llms-full.txt export.

export const TAXONOMY_EXPLORER_URL = 'https://labs.overturemaps.org/web-tools/taxonomy-explorer/';

/** Build the embed URL, passing the docs site's color mode through as a theme hint. */
export function taxonomyExplorerSrc(colorMode) {
  const url = new URL(TAXONOMY_EXPLORER_URL);
  if (colorMode === 'light' || colorMode === 'dark') {
    url.searchParams.set('theme', colorMode);
  }
  return url.toString();
}
