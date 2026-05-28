#!/usr/bin/env node
/**
 * Fetches og:image metadata for community project entries that have no
 * explicit `image` field and writes the results to community/og-image-cache.json.
 *
 * Run manually after adding new entries:
 *   npm run fetch-og
 *
 * The cache file is committed so CI builds never need to hit external URLs.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const entriesPath = resolve(root, 'community/community-projects.json');
const cachePath = resolve(root, 'community/og-image-cache.json');

const FETCH_TIMEOUT_MS = 10_000;
const DELAY_BETWEEN_REQUESTS_MS = 300;

const entries = JSON.parse(readFileSync(entriesPath, 'utf8'));

let cache = {};
try {
  cache = JSON.parse(readFileSync(cachePath, 'utf8'));
} catch {
  // cache doesn't exist yet — start fresh
}

// Re-validate previously cached non-empty values + fetch missing ones
const needsValidation = entries.filter((e) => !e.image && cache[e.url]);
const needsFetch = entries.filter((e) => !e.image && !Object.hasOwn(cache, e.url));

if (needsValidation.length === 0 && needsFetch.length === 0) {
  console.log('og-image cache is up to date. Nothing to fetch.');
  process.exit(0);
}

if (needsValidation.length > 0) {
  console.log(`Validating ${needsValidation.length} cached entries…`);
  for (const entry of needsValidation) {
    process.stdout.write(`  ${entry.url} … `);
    const valid = await isImageUrl(cache[entry.url]);
    if (!valid) {
      cache[entry.url] = '';
      console.log('✗ invalid, clearing');
    } else {
      console.log('✓');
    }
    await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }
}

console.log(`Fetching og:image for ${needsFetch.length} entries…`);

function extractOgImage(html) {
  // Match <meta property="og:image" content="..."> in any attribute order
  const match = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  ) ?? html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
  );
  return match?.[1] ?? null;
}

async function fetchOgImage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'OvertureMaps-docs-og-fetcher/1.0' },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const imgUrl = extractOgImage(html);
    if (!imgUrl) return null;
    return (await isImageUrl(imgUrl)) ? imgUrl : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function isImageUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'OvertureMaps-docs-og-fetcher/1.0' },
    });
    const ct = res.headers.get('content-type') ?? '';
    return res.ok && ct.startsWith('image/');
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

for (const entry of needsFetch) {
  process.stdout.write(`  ${entry.url} … `);
  const img = await fetchOgImage(entry.url);
  cache[entry.url] = img ?? '';
  console.log(img ? '✓' : '(no og:image)');
  await sleep(DELAY_BETWEEN_REQUESTS_MS);
}

writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');
console.log(`\nCache written to community/og-image-cache.json`);
