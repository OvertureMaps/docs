#!/usr/bin/env node
/**
 * Generates the taxonomy artifacts the docs site serves from the canonical
 * places taxonomy files, which live in the tf-data-platform pipeline repo.
 *
 * That repo is deliberately an *input*, not a dependency: this script is run by
 * hand when a release lands, and its output is committed. The docs build stays
 * hermetic, and every release produces a reviewable diff.
 *
 *   npm run build-taxonomy -- \
 *     --source ../tf-data-platform/overture_places/overture_places/places_data_providers/category_mapping \
 *     --version 2026-09-16.0 \
 *     --schema v1.19.0 \
 *     --date 2026-09-16 \
 *     [--counts path/to/counts.csv]
 *
 * Writes to static/taxonomy/<version>/, which Docusaurus serves verbatim — so
 * every artifact is both the browser's data source and a public download.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildTaxonomy,
  compactTree,
  parseCsv,
  parseCounts,
  toCsv,
  toDisplayName,
} from './lib/taxonomy-transform.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const TAXONOMY_FILE = 'overture_taxonomy.json';
const BASIC_CATEGORY_FILE = 'overture_basic_category.json';
const LEGACY_CROSSWALK_FILE = 'overture_taxonomy_to_legacy_category.csv';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      args[key] = next;
      i++;
    } else {
      args[key] = true;
    }
  }
  return args;
}

function fail(message) {
  console.error(`\nbuild-taxonomy: ${message}\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

if (!args.source) fail('--source is required (the category_mapping directory in tf-data-platform)');
if (!args.version) fail('--version is required (the Overture data release, e.g. 2026-09-16.0)');

const sourceDir = resolve(process.cwd(), args.source);
const version = args.version;
const outDir = join(root, 'static', 'taxonomy', version);

for (const file of [TAXONOMY_FILE, BASIC_CATEGORY_FILE, LEGACY_CROSSWALK_FILE]) {
  if (!existsSync(join(sourceDir, file))) fail(`${file} not found in ${sourceDir}`);
}

const readJson = file => JSON.parse(readFileSync(join(sourceDir, file), 'utf8'));
const readText = file => readFileSync(join(sourceDir, file), 'utf8');

const canonical = readJson(TAXONOMY_FILE);
const basicCategories = readJson(BASIC_CATEGORY_FILE);
const counts = args.counts ? parseCounts(readFileSync(resolve(process.cwd(), args.counts), 'utf8')) : {};

if (!canonical.mappings) fail(`${TAXONOMY_FILE} has no "mappings" key — is this the canonical file?`);

const { tree, flat, orphans, stats } = buildTaxonomy({
  mappings: canonical.mappings,
  basicCategories,
  counts,
});

if (orphans.length > 0) {
  fail(
    `${orphans.length} categories have no parent in the taxonomy, which means the ` +
      `canonical file has a gap in its path keys. First few:\n  ${orphans.slice(0, 5).join('\n  ')}`
  );
}

// ---------------------------------------------------------------------------
// Artifacts
// ---------------------------------------------------------------------------

mkdirSync(outDir, { recursive: true });

const written = [];
function write(name, contents) {
  writeFileSync(join(outDir, name), contents);
  written.push([name, Buffer.byteLength(contents)]);
}

// 1. Nested tree — the explorer's data source and the visualization's d3
//    hierarchy. Not offered as a download: it carries the place counts and
//    roll-ups the page needs, and the CSVs below are the human-facing form.
write(
  'taxonomy.json',
  `${JSON.stringify(
    {
      version,
      schemaVersion: args.schema ?? null,
      releaseDate: args.date ?? null,
      generatedAt: new Date().toISOString().slice(0, 10),
      source: { taxonomy: TAXONOMY_FILE, basicCategories: BASIC_CATEGORY_FILE },
      stats,
      tree: compactTree(tree),
    }
  )}\n`
);

// 2. Flat category list — the spreadsheet form of the taxonomy.
write(
  'taxonomy.csv',
  toCsv(
    flat.map(entry => ({
      taxonomy: entry.path,
      primary: entry.name,
      displayName: entry.displayName,
      level: entry.level,
      isBasic: entry.isBasic,
      basicCategory: entry.basicCategory,
    })),
    ['taxonomy', 'primary', 'displayName', 'level', 'isBasic', 'basicCategory']
  )
);

// 3. Basic categories on their own — the ~300-label set most map-iconography
//    and high-level-filtering users actually want.
const basicRows = flat
  .filter(entry => entry.isBasic)
  .map(entry => ({
    basic_category: entry.name,
    display_name: entry.displayName,
    taxonomy: entry.path,
    level: entry.level,
  }));
write('basic_categories.csv', toCsv(basicRows, ['basic_category', 'display_name', 'taxonomy', 'level']));

// 4. Legacy crosswalk — the pipeline uses this file to back-fill the deprecated
//    `categories` property, so it is the authoritative old -> new mapping and
//    replaces the Google Sheet the taxonomy guide currently links.
const legacyRows = parseCsv(readText(LEGACY_CROSSWALK_FILE)).map(row => ({
  legacy_primary_category: row['Legacy Primary Category'],
  legacy_primary_hierarchy: row['Legacy Primary Hierarchy'],
  taxonomy_primary: row['Taxonomy Primary'],
  taxonomy_path: row['Taxonomy Path'],
  taxonomy_display_name: toDisplayName(row['Taxonomy Primary']),
}));
write(
  'legacy_crosswalk.csv',
  toCsv(legacyRows, [
    'legacy_primary_category',
    'legacy_primary_hierarchy',
    'taxonomy_primary',
    'taxonomy_path',
    'taxonomy_display_name',
  ])
);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const kb = bytes => `${(bytes / 1024).toFixed(0)} KB`;

console.log(`\nbuild-taxonomy → static/taxonomy/${version}/\n`);
for (const [name, bytes] of written) {
  console.log(`  ${name.padEnd(24)} ${kb(bytes).padStart(9)}`);
}
console.log(`
  categories         ${stats.categories}
  basic categories   ${stats.basicCategories}
  top-level groups   ${stats.rootGroups}
  max depth          ${stats.maxDepth}
  legacy crosswalk   ${legacyRows.length} rows
  place counts       ${stats.totalPlaces === null ? 'not supplied' : stats.totalPlaces.toLocaleString()}
`);

if (stats.totalPlaces === null) {
  console.log('  Note: no --counts supplied, so count badges and count-weighted');
  console.log('  visualization will be disabled for this release.\n');
}
