/**
 * Validation tests for docusaurus-plugin-llms build output.
 *
 * These tests skip automatically when the plugin hasn't produced output yet
 * (e.g., before a build, or in an older build that predates the plugin).
 * In CI they run as post-build validation after `npm run build`.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const BUILD_DIR = fileURLToPath(new URL('../../build', import.meta.url));
const LLMS_TXT = join(BUILD_DIR, 'llms.txt');
const LLMS_FULL_TXT = join(BUILD_DIR, 'llms-full.txt');
const LLMS_SCHEMA_TXT = join(BUILD_DIR, 'llms-schema.txt');

describe('llms.txt build output', () => {
  it.skipIf(!existsSync(LLMS_TXT))('llms.txt follows llmstxt.org format', () => {
    const content = readFileSync(LLMS_TXT, 'utf-8');
    // Must have a top-level H1 title
    expect(content).toMatch(/^# .+/m);
    // Must have at least one H2 section
    expect(content).toMatch(/^## .+/m);
    // Must contain markdown links to docs
    expect(content).toMatch(/\[.+\]\(https?:\/\/.+\)/);
  });

  it.skipIf(!existsSync(LLMS_TXT))('llms.txt does not contain MDX import statements', () => {
    const content = readFileSync(LLMS_TXT, 'utf-8');
    // excludeImports: true should strip these
    expect(content).not.toMatch(/^import\s+.+from\s+['"]/m);
  });

  it.skipIf(!existsSync(LLMS_TXT))('llms.txt references Overture content', () => {
    const content = readFileSync(LLMS_TXT, 'utf-8');
    expect(content).toMatch(/Overture/i);
  });
});

describe('llms-full.txt build output', () => {
  it.skipIf(!existsSync(LLMS_FULL_TXT))(
    'llms-full.txt contains substantive content',
    () => {
      const content = readFileSync(LLMS_FULL_TXT, 'utf-8');
      expect(content.length).toBeGreaterThan(10_000);
      expect(content).toMatch(/Overture/i);
      expect(content).toMatch(/schema/i);
    },
  );

  it.skipIf(!existsSync(LLMS_FULL_TXT))(
    'llms-full.txt does not contain MDX import statements',
    () => {
      const content = readFileSync(LLMS_FULL_TXT, 'utf-8');
      expect(content).not.toMatch(/^import\s+.+from\s+['"]/m);
    },
  );
});

describe('llms-schema.txt build output', () => {
  it.skipIf(!existsSync(LLMS_SCHEMA_TXT))(
    'llms-schema.txt contains schema reference header',
    () => {
      const content = readFileSync(LLMS_SCHEMA_TXT, 'utf-8');
      expect(content).toMatch(/Overture Maps Schema Reference/i);
    },
  );

  it.skipIf(!existsSync(LLMS_SCHEMA_TXT))(
    'llms-schema.txt contains schema content',
    () => {
      const content = readFileSync(LLMS_SCHEMA_TXT, 'utf-8');
      expect(content).toMatch(/schema/i);
    },
  );
});
