/**
 * WCAG 2.2 AA accessibility tests using Node's built-in test runner.
 * Requires a built `build/` directory — run `npm run build` first.
 * Run with: npm run test:a11y
 */

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, access } from 'node:fs/promises';
import { extname, join, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const BUILD_DIR = join(__dirname, '..', 'build');
const PORT = 3778;
const BASE_URL = `http://localhost:${PORT}`;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

let server, browser;

before(async () => {
  await access(join(BUILD_DIR, 'index.html')).catch(() => {
    throw new Error(`build/index.html not found — run 'npm run build' before running accessibility tests`);
  });

  // minimal static file server, falls back to index.html for Docusaurus client-side routing
  server = createServer(async (req, res) => {
    const urlPath = (req.url ?? '/').split('?')[0];
    const filePath = resolve(join(BUILD_DIR, urlPath === '/' ? 'index.html' : urlPath));
    // relative() is cross-platform; startsWith(BUILD_DIR + '/') broke on Windows backslashes
    const rel = relative(BUILD_DIR, filePath);
    if (rel.startsWith('..') || isAbsolute(rel)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' });
      res.end(data);
    } catch {
      // SPA fallback only for route-like requests (no extension); a missing
      // asset (.js/.css/.png) must 404 so broken builds aren't masked.
      if (extname(filePath) === '') {
        try {
          const data = await readFile(join(BUILD_DIR, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
          return;
        } catch { /* fall through to 404 */ }
      }
      res.writeHead(404);
      res.end('Not found');
    }
  });
  await new Promise((resolve) => server.listen(PORT, resolve));
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
});

function formatViolations(violations, label) {
  if (violations.length === 0) return;
  const detail = violations
    .map((v) =>
      `[${v.impact}] ${v.id}: ${v.description}\n` +
      v.nodes.map((n) =>
        `  • ${n.target}` +
        (n.failureSummary ? `\n    ${n.failureSummary.replace(/\n/g, '\n    ')}` : '')
      ).join('\n')
    )
    .join('\n\n');
  assert.fail(`${violations.length} WCAG 2.2 AA violation(s) — ${label}:\n\n${detail}`);
}

async function runAxe(url) {
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(`${BASE_URL}${url}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 10000 });
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    return violations;
  } finally {
    await context.close();
  }
}

const PAGES = [
  { path: '/', label: 'homepage' },
  { path: '/docs/', label: 'docs index' },
  { path: '/getting-data/', label: 'quickstart (QueryBuilder)' },
  { path: '/guides/', label: 'guides index' },
  { path: '/examples/', label: 'examples index' },
  { path: '/blog/', label: 'blog index' },
  { path: '/community/', label: 'community (custom table)' },
];

for (const { path, label } of PAGES) {
  test(`${label} passes WCAG 2.2 AA`, async () => {
    formatViolations(await runAxe(path), label);
  });
}
