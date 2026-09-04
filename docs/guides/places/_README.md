# Taxonomy Explorer

An interactive tool for exploring and comparing Overture Maps Places taxonomy releases.

There are two kinds of release entry:

- **Canonical (JSON)** — generated from the places pipeline by
  `scripts/build-taxonomy.mjs` and served as a static file that the browser
  fetches. This is how every release from September 2026 onward is added.
- **Legacy (CSV)** — the working spreadsheets produced during the taxonomy
  project, inlined into the page bundle via `raw-loader`. Kept so the browser
  can still show how the taxonomy looked at each earlier point.

Both kinds live in the same `releases` array and can be selected and compared
against each other. Adding either one only requires editing
`taxonomy-explorer.mdx` — no component changes.

## Adding a canonical release

### 1. Generate the artifacts

Run the generator against the canonical files in the pipeline repo:

```bash
npm run build-taxonomy -- \
  --source ../tf-data-platform/overture_places/overture_places/places_data_providers/category_mapping \
  --version 2026-08-19.0 \
  --schema v1.18.0 \
  --date 2026-08-19 \
  --counts path/to/counts.csv    # optional
```

This writes `static/taxonomy/<version>/`, which Docusaurus serves verbatim.
Commit the output; the docs build never reads the pipeline repo.

`taxonomy.json` is the explorer's data source, not a download: it carries the
place counts and roll-ups the page needs. The CSVs are the human-facing form and
are what `downloads` should link to.

If `--counts` is omitted the taxonomy still renders, and the stats row reports
"Not published" for place counts rather than showing a broken zero. Counts can
be added later by re-running the generator; no component change is needed.

### 2. Add a release entry

```jsx
{
  id: 'august',
  label: '2026 August (Canonical Taxonomy)',
  releaseUrl: 'https://docs.overturemaps.org/blog/...',
  note: 'Optional note displayed in the detail panel.',
  tags: [
    { label: '19 August 2026', title: 'Date' },
    { label: '2026-08-19.0', title: 'Data version' },
    { label: 'v1.18.0', title: 'Schema version' },
  ],
  dataUrl: '/taxonomy/2026-08-19.0/taxonomy.json',
  downloads: [
    { label: 'Taxonomy (CSV)', url: '/taxonomy/2026-08-19.0/taxonomy.csv' },
    { label: 'Basic categories (CSV)', url: '/taxonomy/2026-08-19.0/basic_categories.csv' },
  ],
  displayFields: [
    { field: 'is_basic', label: 'Is Basic Category' },
  ],
}
```

`dataUrl` is what makes an entry canonical: when it is present the component
fetches that file and ignores the CSV fields entirely. URLs are resolved through
Docusaurus's base URL, so write them site-absolute (leading `/`).

## Adding a legacy CSV release

### 1. Add CSV files

Place two CSV files in the `csv/` directory:

- **Data CSV**: Contains the taxonomy hierarchy and category mappings.
- **Counts CSV**: Contains place counts per category. Expected columns: `count`, `primary_category`, and optionally `basic_category`.

### 2. Add imports

At the top of `taxonomy-explorer.mdx`, add raw-loader imports for your new files:

```js
import newDataCsv from '!!raw-loader!./csv/YYYY-MM-DD-New-Release.csv';
import newCountsCsv from '!!raw-loader!./csv/YYYY-MM-DD-counts.csv';
```

### 3. Add a release entry

Add an object to the `releases` array in `taxonomy-explorer.mdx`:

```jsx
{
  id: 'uniqueId',
  label: 'Month (Short Description)',
  releaseUrl: 'https://docs.overturemaps.org/blog/...',
  note: 'Optional note displayed in the detail panel.',
  tags: [
    { label: 'DD Month YYYY', title: 'Date' },
    { label: 'YYYY-MM-DD.0', title: 'Data version' },
    { label: 'vX.Y.Z', title: 'Schema version' },
  ],
  dataCsv: newDataCsv,
  countsCsv: newCountsCsv,
  // Field mappings (see below)
  codeField: 'column_name',
  fieldNames: ['col1', 'col2', ...],
  basicCategoryField: 'basic_col_name' // or null
  // Plus one of the two hierarchy modes
}
```

### Hierarchy modes

Choose one depending on the structure of the data CSV:

**Multi-field** — The hierarchy is constructed by joining multiple columns. Use when the CSV has separate columns like `theme`, `category`, `sub_category`, etc.

```js
hierarchyFields: ['theme', 'category', 'sub_category', 'speciality'],
```

**Single-field** — The CSV already contains a `" > "`-delimited hierarchy string in one column.

```js
hierarchyField: 'hierarchy_column_name',
```

### Field reference

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | Unique identifier for this release |
| `label` | Yes | Display label shown in the dropdown and section headers |
| `releaseUrl` | No | Link for the release date tag |
| `note` | No | Note shown in the collapsible detail section |
| `tags` | Yes | Array of `{ label, title }` for the info row |
| `dataCsv` | Yes | Raw-loader import of the data CSV |
| `countsCsv` | No | Raw-loader import of the counts CSV, or `null` |
| `fieldNames` | Yes | Column names in order, mapping CSV columns to object keys |
| `codeField` | Yes | Which field in `fieldNames` is the category code |
| `hierarchyFields` | * | Array of fields to join into a hierarchy path |
| `hierarchyField` | * | Single field containing a pre-built `" > "` hierarchy |
| `basicCategoryField` | No | Field holding the basic-level category label, or `null` |
| `enabled` | No | Set to `false` to hide this release from the built site. Defaults to `true` |
| `dataUrl` | * | Site-absolute URL of a generated `taxonomy.json`. Marks the entry as canonical; the CSV fields are then unused |
| `downloads` | No | Array of `{ label, url }` shown as download links under the stats row |
| `displayFields` | No | Array of `{ field, label }` for extra key-value rows in the detail panel |
| `matchColumn` | No | Column containing a code from another release for cross-tab matching |
| `matchType` | No | Which release's codes `matchColumn` maps to: `'original'` or `'new'` |

\* A canonical entry needs `dataUrl` only. A legacy CSV entry needs `dataCsv`,
`fieldNames`, `codeField`, and exactly one of `hierarchyFields` or
`hierarchyField`.

### Cross-tab matching

When category codes change between releases, set `matchColumn` and `matchType` so the detail panel can find the corresponding entry across tabs.

- `matchColumn` — a column in the data CSV that holds a code from a different release (e.g. `old_primary_category`)
- `matchType`:
  - `'original'` — the `matchColumn` values correspond to the first release's category codes. Use this when the column maps back to the original taxonomy.
  - `'new'` — the `matchColumn` values correspond to the immediately previous release's category codes. Use this when releases change incrementally.

This does two things:

1. **Cross-tab lookup**: entries are also indexed by the `matchColumn` value, so selecting a category on one tab finds the matching data in releases that renamed it.
2. **Change indicators**: `prevCount` is resolved using the `matchColumn` value against the appropriate prior release's counts.

If `matchColumn` is not set, cross-tab matching uses the `codeField` value directly (works when codes are the same across releases).

### Release ordering

Releases are compared in array order, oldest first. The first release has no
previous-release comparison; each subsequent release computes change indicators
against the one before it. **Place new releases at the end of the array** — the
browser opens on the last entry, so ordering determines what a visitor sees
first.

### Visibility and missing data

Set `enabled: false` on a release entry in `taxonomy-explorer.mdx` to exclude it from the built site:

```jsx
{
  id: 'february',
  enabled: false,   // hidden from the site until ready
  label: 'February (Bug Fixes, Simplified Basic)',
  // ...
}
```

The release stays in the config for future use — just flip it to `true` (or remove the property) when ready. Only enabled releases appear in the dropdown, tree, and detail panel.

If a release has no counts — `countsCsv: null`, or a canonical release generated
without `--counts` — the stats row reports "Not published" for total places and
the tree nodes carry no count badges. Category and basic-category totals are
structural and still shown.

### Display fields

Use `displayFields` to show extra key-value rows from the CSV data in the detail panel. Each entry maps a CSV column (`field`) to a label. Fields with empty values are automatically skipped.

```jsx
displayFields: [
  { field: 'match_type', label: 'Match Type' },
  { field: 'modified', label: 'Modified' },
],
```

These appear after the hierarchy levels and basic category, but before counts and percentile tags. Current releases use:

| Release | Display fields |
| --- | --- |
| 2025 April | `category_key` |
| 2025 October | `match_type`, `modified`, `remove_from_v1` |
| 2025 December | none |
| 2026 March | `new_display_name`, `is_basic`, `pc_added`, `pc_hierarchy_change`, `pc_name_change`, `pc_removed`, `pc_redirect_to`, `blc_change` |
| 2026 August | `is_basic` |

For canonical releases the generator derives `is_basic`.
