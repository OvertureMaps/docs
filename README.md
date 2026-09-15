# Overture Documentation

[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA-green)](https://www.w3.org/WAI/WCAG22/quickref/)

This repository uses [Docusaurus](https://docusaurus.io/) to publish the documentation pages seen at [docs.overturemaps.org](https://docs.overturemaps.org)

<p align="center">
  <a href="../../issues/new?template=community-project.yaml">
    <img src="https://img.shields.io/badge/-%2B_Submit_a_community_project-4051CC?style=for-the-badge" alt="Submit a community project" height="60" />
  </a>
</p>

## Structure

- `blog/`: Entries for the Overture engineering blog available at docs.overturemaps.org/blog
- `community/`: The community page that showcases Overture data being used in the wild.
  - `community-projects.json` - source data for all community project cards
  - `og-image-cache.json` - cached `og:image` URLs for entries without an explicit `image` field (see [OG Image Cache](#og-image-cache) below)
- `docs/`: The main documentation pages available at docs.overturemaps.org/. The sidebar for these pages is manually curated in the `sidebars.js` file.
- `schema/`: The schema reference overview page and the build-time output of the schema doc generator. See below.
- `schema_versioned_docs/`, `schema_versioned_sidebars/`, `schema_versions.json`: committed snapshots of the schema reference for each released schema tag. See below.

## Schema Reference (`docs.overturemaps.org/schema`)

The Overture schema repository [OvertureMaps/schema](https://github.com/OvertureMaps/schema) maintains the official Overture schema as Pydantic models, and the reference pages under `docs.overturemaps.org/schema` are generated directly from those models. This keeps the schema and its documentation permanently in sync.

The schema reference is its own [versioned Docusaurus docs instance](https://docusaurus.io/docs/versioning) (plugin id `schema`, config in `docusaurus.config.js`, sidebar in `sidebars-schema.js`), separate from the main `docs/` instance. A version dropdown appears in the navbar on schema pages only.

| Version | Source | URL | Where it lives |
|---------|--------|-----|----------------|
| `latest` | schema repo `main`, generated on every build | `/schema/` | `schema/reference/` (gitignored, never committed) |
| `vX.Y.Z` | schema release tag, generated once | `/schema/vX.Y.Z/` | `schema_versioned_docs/version-vX.Y.Z/` (committed) |

Every build (CI, PR preview, and production) runs the [`generate-schema-docs`](https://github.com/OvertureMaps/workflows/tree/main/.github/actions/generate-schema-docs) action, which generates Markdown into `schema/reference/` from the schema repository's `main` branch (or a specific `schema-ref` when triggered via `workflow_dispatch`, e.g. from an `overture-schema` release).

**If you spot a typo or error under `docs.overturemaps.org/schema`, it is not fixable in this repository.** Open an issue or PR against the docstrings/models in [OvertureMaps/schema](https://github.com/OvertureMaps/schema) instead. `latest` picks up the fix on the next build; a released version only changes if its snapshot is regenerated (delete the three version artifacts and re-run the script below).

### Adding a schema version

Run this after a `vX.Y.Z` tag is published in [OvertureMaps/schema](https://github.com/OvertureMaps/schema/releases). It needs `git`, [`uv`](https://docs.astral.sh/uv/), and `npm install` already done.

```shell
npm run add-schema-version -- v2.0.0
```

The script (`scripts/add-schema-version.mjs`) clones the schema repo at that tag, runs its `overture-codegen` into `schema/reference/`, then runs `docusaurus docs:version:schema <tag>`, which writes:

- `schema_versioned_docs/version-<tag>/`
- `schema_versioned_sidebars/version-<tag>-sidebars.json`
- an entry in `schema_versions.json` (kept sorted newest-first)

Commit those three and open a PR. `schema/reference/` is cleaned up afterwards.

Only tags that ship the `overture-schema-codegen` package (v1.17.0 and later) can be added; earlier releases were JSON Schema and have no generator. The script refuses tags that don't match `vX.Y.Z` or are already in `schema_versions.json`.

## Developing

Docusaurus requires node.
First, install the required packages:

```shell
npm install
```

Then, start the local server:

```shell
npm start
```

Now navigate to <http://localhost:3000> to see the live preview.

### Available Commands

- `npm start` - Start the development server
- `npm run build` - Build the production site (also shows locale/translation warnings and broken link checks)
- `npm run serve` - Serve the built site locally
- `npm run deploy` - Deploy the site
- `npm run fetch-og` - Fetch and cache `og:image` metadata for community project entries (see [OG Image Cache](#og-image-cache) below)
- `npm run add-schema-version -- vX.Y.Z` - Snapshot the schema reference for a released schema tag (see [Adding a schema version](#adding-a-schema-version) above)
- `npm run swizzle` - Customize Docusaurus components by "ejecting" them for modification
- `npm run write-translations` - Generate translation files for internationalization
- `npm run write-heading-ids` - Auto-generate heading IDs for better linking

## OG Image Cache

The community page displays project cards with images. Each entry in `community/community-projects.json` can include an optional `"image"` field. For entries without one, the site falls back to a cached `og:image` fetched from the project's URL.

The cache lives in `community/og-image-cache.json` and is committed to the repository so CI builds never make external HTTP requests.

**When to run it:** after adding or updating entries in `community-projects.json`.

```shell
npm run fetch-og
```

The script (`scripts/fetch-og-images.mjs`):
1. Skips entries that already have an explicit `"image"` field
2. Re-validates any previously cached non-empty URLs via a HEAD request (`Content-Type: image/*`) and clears invalid ones
3. Fetches the HTML for uncached entries, extracts `og:image`, and validates the URL before writing it to the cache
4. Is idempotent - safe to re-run at any time

Cards with no image (neither explicit nor cached) display a branded gradient placeholder.

## LLM-Friendly Content

Each production build generates [llmstxt.org](https://llmstxt.org)-standard files for use with LLMs and AI tools:

| File | URL | Contents |
|------|-----|----------|
| `llms.txt` | [docs.overturemaps.org/llms.txt](https://docs.overturemaps.org/llms.txt) | Index of all docs and blog posts with links |
| `llms-full.txt` | [docs.overturemaps.org/llms-full.txt](https://docs.overturemaps.org/llms-full.txt) | Full content of all docs and blog posts |
| `llms-schema.txt` | [docs.overturemaps.org/llms-schema.txt](https://docs.overturemaps.org/llms-schema.txt) | Full schema reference only (useful for data model questions) |

These are generated by [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) and configured in `docusaurus.config.js`.
