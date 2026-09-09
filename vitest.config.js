import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Mirror the @site alias that Docusaurus/webpack provides at build time
      '@site': path.resolve(__dirname),
      // Docusaurus client exports need site context that doesn't exist in a
      // unit test; stub the ones components import directly.
      '@docusaurus/useBaseUrl': path.resolve(__dirname, 'src/__mocks__/docusaurus-useBaseUrl.js'),
    },
  },
  test: {
    include: ['src/**/__tests__/**/*.test.{js,jsx}', 'scripts/__tests__/**/*.test.{js,mjs}'],
    setupFiles: ['./src/setupTests.js'],
    // CI runners are slower under load; the render-heavy CommunityTable tests
    // can exceed the 5s default and flake. 20s gives ample headroom.
    testTimeout: 20000,
  },
});
