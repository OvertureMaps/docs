import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/__tests__/**/*.test.{js,jsx}'],
    setupFiles: ['./src/setupTests.js'],
  },
});
