import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Mirror the @site alias that Docusaurus/webpack provides at build time
      '@site': path.resolve(__dirname),
    },
  },
  test: {
    include: ['src/**/__tests__/**/*.test.{js,jsx}'],
    setupFiles: ['./src/setupTests.js'],
    // CI runners are slower under load; the render-heavy CommunityTable tests
    // can exceed the 5s default and flake. 20s gives ample headroom.
    testTimeout: 20000,
  },
});
