/**
 * Pure transforms that turn the canonical Overture places taxonomy files into
 * the artifacts the docs site serves.
 *
 * Kept free of I/O so the derivation rules — which have to stay faithful to the
 * pipeline — can be unit tested directly. See build-taxonomy.mjs for the CLI.
 *
 * Canonical inputs (from tf-data-platform, category_mapping/):
 *   overture_taxonomy.json                  { mappings: { "a > b > c": [{source, keys}] } }
 *   overture_basic_category.json            ["academy", "adult_entertainment_venue", ...]
 *   overture_taxonomy_to_legacy_category.csv
 */

/** Words that stay lowercase when they aren't the first token. */
const SMALL_WORDS = new Set(['and', 'or', 'the', 'in', 'of', 'for', 'to', 'a', 'an']);

/**
 * Tokens that are acronyms and should be fully uppercased. Derived by diffing
 * naive title-casing against the curated `New Display Name` column that shipped
 * with the March 2026 taxonomy spreadsheet.
 */
const ACRONYMS = new Set([
  'atm', 'atv', 'b2b', 'bbq', 'bmx', 'cbd', 'cpr', 'diy', 'dj', 'dui', 'dvd',
  'ems', 'ev', 'gps', 'hvac', 'id', 'it', 'iv', 'led', 'lpg', 'mma', 'pc',
  'rv', 'suv', 'tv', 'ufc', 'usb', 'vhs', 'vip', 'vr', 'ymca', 'ywca',
]);

/** Tokens the taxonomy spells without an apostrophe but that read as possessives. */
const POSSESSIVES = new Map([
  ['childrens', "Children's"],
  ['mens', "Men's"],
  ['womens', "Women's"],
]);

/**
 * Adjacent token pairs that form a hyphenated compound. Naive title-casing
 * renders `e_commerce_service` as "E Commerce Service"; these fix the small set
 * of keys where the underscore stands in for a hyphen rather than a space.
 */
const HYPHEN_COMPOUNDS = new Map([
  ['non|alcoholic', 'Non-Alcoholic'],
  ['serbo|croatian', 'Serbo-Croatian'],
  ['e|commerce', 'E-commerce'],
  ['t|shirt', 'T-shirt'],
  ['drive|in', 'Drive-In'],
  ['walk|in', 'Walk-In'],
]);

/**
 * Display names that no rule produces, because the underscore joins alternatives
 * rather than words. Kept explicit and small so it stays reviewable.
 */
const DISPLAY_NAME_OVERRIDES = new Map([
  ['food_truck_stand', 'Food Truck or Stand'],
  ['smoothie_juice_bar', 'Smoothie or Juice Bar'],
]);

/**
 * Convert a snake_case category key into a human display name.
 *
 * The canonical taxonomy carries no display-name column, so this reproduces the
 * curated names that shipped with earlier releases. Rule order matters:
 * hyphenated compounds consume two tokens, so they resolve before per-token
 * casing.
 */
export function toDisplayName(code) {
  if (!code) return '';

  const override = DISPLAY_NAME_OVERRIDES.get(code);
  if (override) return override;

  const tokens = code.split('_');
  const out = [];

  for (let i = 0; i < tokens.length; i++) {
    const pair = HYPHEN_COMPOUNDS.get(`${tokens[i]}|${tokens[i + 1]}`);
    if (pair) {
      out.push(pair);
      i++;
      continue;
    }

    const token = tokens[i];
    if (ACRONYMS.has(token)) {
      out.push(token.toUpperCase());
    } else if (POSSESSIVES.has(token)) {
      out.push(POSSESSIVES.get(token));
    } else if (out.length > 0 && SMALL_WORDS.has(token)) {
      out.push(token);
    } else {
      out.push(token.charAt(0).toUpperCase() + token.slice(1));
    }
  }

  return out.join(' ');
}

/**
 * Resolve the basic category for a taxonomy path.
 *
 * Mirrors `_add_basic_category` in the places pipeline
 * (overture_places/places_data_providers/places_data_provider.py): the basic
 * category is the deepest node in the hierarchy whose label is a valid basic
 * label, found by walking leaf -> root and taking the first hit. Basic labels
 * are globally unique, so matching on the bare label is safe.
 *
 * Deriving rather than importing this keeps the docs consistent with the data
 * users actually receive.
 */
export function deriveBasicCategory(hierarchy, basicLabels) {
  for (let i = hierarchy.length - 1; i >= 0; i--) {
    if (basicLabels.has(hierarchy[i])) return hierarchy[i];
  }
  return null;
}

/** Split a canonical `"a > b > c"` path key into its segments. */
export function splitPath(path) {
  return path.split(' > ').map(segment => segment.trim());
}

/**
 * Build the flat category list and the nested tree from the canonical files.
 *
 * `counts` is an optional map of category label -> place count. When absent,
 * every count is null and downstream consumers fall back to uniform weighting.
 */
export function buildTaxonomy({ mappings, basicCategories, counts = {} }) {
  const basicLabels = new Set(basicCategories);
  const paths = Object.keys(mappings).sort();

  const flat = [];
  const nodesByPath = new Map();

  for (const path of paths) {
    const hierarchy = splitPath(path);
    const name = hierarchy[hierarchy.length - 1];
    const count = Object.prototype.hasOwnProperty.call(counts, name) ? counts[name] : null;

    const entry = {
      path,
      name,
      displayName: toDisplayName(name),
      level: hierarchy.length - 1,
      group: hierarchy[0],
      isBasic: basicLabels.has(name),
      basicCategory: deriveBasicCategory(hierarchy, basicLabels),
      count,
    };

    flat.push(entry);
    nodesByPath.set(path, { ...entry, children: [] });
  }

  // Link children to parents. Paths are sorted, so a parent is always created
  // before its children; a missing parent means the canonical file has a gap.
  const roots = [];
  const orphans = [];

  for (const path of paths) {
    const node = nodesByPath.get(path);
    const hierarchy = splitPath(path);

    if (hierarchy.length === 1) {
      roots.push(node);
      continue;
    }

    const parentPath = hierarchy.slice(0, -1).join(' > ');
    const parent = nodesByPath.get(parentPath);
    if (parent) {
      parent.children.push(node);
    } else {
      orphans.push(path);
    }
  }

  // Roll counts up the tree so a collapsed branch still reports its weight.
  function totalCount(node) {
    const childTotal = node.children.reduce((sum, child) => sum + totalCount(child), 0);
    const own = node.count ?? 0;
    node.totalCount = own + childTotal;
    return node.totalCount;
  }
  for (const root of roots) totalCount(root);

  const hasCounts = Object.keys(counts).length > 0;
  if (!hasCounts) {
    for (const node of nodesByPath.values()) node.totalCount = null;
  }

  return {
    tree: roots,
    flat,
    orphans,
    stats: {
      categories: flat.length,
      basicCategories: basicLabels.size,
      rootGroups: roots.length,
      maxDepth: flat.reduce((max, e) => Math.max(max, e.level), 0),
      totalPlaces: hasCounts ? roots.reduce((sum, r) => sum + (r.totalCount ?? 0), 0) : null,
    },
  };
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

/** Parse RFC 4180-ish CSV text into an array of objects keyed by header name. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');

  for (let i = 0; i < src.length; i++) {
    const char = src[i];

    if (quoted) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }

  const header = rows.shift();
  if (!header) return [];

  return rows
    .filter(r => r.some(value => value !== ''))
    .map(r => Object.fromEntries(header.map((name, i) => [name, r[i] ?? ''])));
}

/** Serialize rows to CSV, quoting only fields that need it. */
export function toCsv(rows, columns) {
  const escape = value => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const lines = [columns.join(',')];
  for (const row of rows) lines.push(columns.map(c => escape(row[c])).join(','));
  return `${lines.join('\n')}\n`;
}

/** Read a counts CSV (count, primary_category, basic_category, ...) into a label -> count map. */
export function parseCounts(text) {
  if (!text) return {};
  const counts = {};
  for (const row of parseCsv(text)) {
    const values = Object.values(row);
    const count = Number.parseInt(values[0], 10);
    const category = values[1];
    if (category && Number.isFinite(count)) {
      counts[category] = (counts[category] ?? 0) + count;
    }
  }
  return counts;
}

/**
 * Strip a tree to what the browser actually needs to fetch.
 *
 * `path` and `group` are reconstructible while walking from the roots, and
 * absent fields are cheaper than null ones — together these roughly halve the
 * payload, which matters because this file is fetched on page load.
 */
export function compactTree(nodes) {
  return nodes.map(node => {
    const out = { name: node.name, displayName: node.displayName };
    if (node.isBasic) out.isBasic = true;
    if (node.basicCategory && node.basicCategory !== node.name) out.basicCategory = node.basicCategory;
    if (node.count !== null && node.count !== undefined) out.count = node.count;
    if (node.totalCount !== null && node.totalCount !== undefined) out.totalCount = node.totalCount;
    if (node.children.length > 0) out.children = compactTree(node.children);
    return out;
  });
}
