import { describe, it, expect } from 'vitest';
import { TAXONOMY_EXPLORER_URL, taxonomyExplorerSrc } from '../taxonomyExplorerEmbed.utils';

describe('taxonomyExplorerSrc', () => {
  it('passes the light or dark color mode as a theme hint', () => {
    expect(taxonomyExplorerSrc('light')).toBe(`${TAXONOMY_EXPLORER_URL}?theme=light`);
    expect(taxonomyExplorerSrc('dark')).toBe(`${TAXONOMY_EXPLORER_URL}?theme=dark`);
  });

  it('omits the theme hint for unknown color modes', () => {
    expect(taxonomyExplorerSrc(undefined)).toBe(TAXONOMY_EXPLORER_URL);
    expect(taxonomyExplorerSrc('sepia')).toBe(TAXONOMY_EXPLORER_URL);
  });
});
