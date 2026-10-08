# Overture Documentation

[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA-green)](https://www.w3.org/WAI/WCAG22/quickref/)
[![release-calendar.json](https://img.shields.io/badge/%F0%9F%94%97-release--calendar.json-4051CC)](https://docs.overturemaps.org/release-calendar.json)

This repository uses [Docusaurus](https://docusaurus.io/) to publish the documentation pages seen at [docs.overturemaps.org](https://docs.overturemaps.org). Maintainer procedures (monthly release calendar updates, schema snapshots, OG image cache) are in [CONTRIBUTING](CONTRIBUTING.md).

<p align="center">
  <a href="../../issues/new?template=community-project.yaml">
    <img src="https://img.shields.io/badge/-%2B_Submit_a_community_project-4051CC?style=for-the-badge" alt="Submit a community project" height="60" />
  </a>
</p>

## Structure

- `blog/`: Entries for the Overture engineering blog available at docs.overturemaps.org/blog
- `community/`: The community page that showcases Overture data being used in the wild.
  - `community-projects.json` - source data for all community project cards
  - `og-image-cache.json` - cached `og:image` URLs for entries without an explicit `image` field (see [CONTRIBUTING](CONTRIBUTING.md#og-image-cache))
- `docs/`: The main documentation pages available at docs.overturemaps.org/. The sidebar for these pages is manually curated in the `sidebars.js` file.
- `schema/`: Source for the schema reference overview page (`index.md`) and scratch output of the schema doc generator.
- `schema_versioned_docs/`, `schema_versioned_sidebars/`, `schema_versions.json`: committed snapshots of the schema reference for each released schema tag.
- `static/release-calendar.json`: the release calendar data (see [Release Calendar](#release-calendar))

## Schema Reference (`docs.overturemaps.org/schema`)

The reference pages under `docs.overturemaps.org/schema` are generated from the Pydantic models in [OvertureMaps/schema](https://github.com/OvertureMaps/schema). Only released schema tags are published; the newest is served at `/schema/` and older ones at `/schema/vX.Y.Z/`.

**If you spot a typo or error under `docs.overturemaps.org/schema`, it is not fixable in this repository.** Open an issue or PR against the docstrings/models in [OvertureMaps/schema](https://github.com/OvertureMaps/schema) instead; the fix appears in the next release's snapshot. How snapshots are added is in [CONTRIBUTING](CONTRIBUTING.md#schema-reference).

## Release Calendar

Release dates are published as JSON at `https://docs.overturemaps.org/release-calendar.json`, with a JSON Schema alongside it at `release-calendar.schema.json` (referenced by the file's `$schema` key, so editors validate edits as you type). `releases` is a flat list, and each entry has:

- `date`: release date, ISO 8601
- `dataVersion`: the release's data version
- `schemaVersion`: the schema version, or `null` when not yet determined (renders as TBD)
- `majorChangeMonth`: optional, `true` for the quarterly major breaking change release

An entry dated after today is upcoming, and anything else has shipped. A release dated today counts as shipped. The file has no status field, so compare `date` against the current date. For which releases have actually shipped, use [STAC](https://stac.overturemaps.org/). The `/release-calendar` page renders from this file, and the monthly update steps are in [CONTRIBUTING](CONTRIBUTING.md#release-calendar).

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
- `npm run fetch-og` - Fetch and cache `og:image` metadata for community project entries (see [CONTRIBUTING](CONTRIBUTING.md#og-image-cache))
- `npm run add-schema-version -- vX.Y.Z` - Snapshot the schema reference for a released schema tag (see [CONTRIBUTING](CONTRIBUTING.md#adding-a-schema-version))
- `npm run swizzle` - Customize Docusaurus components by "ejecting" them for modification
- `npm run write-translations` - Generate translation files for internationalization
- `npm run write-heading-ids` - Auto-generate heading IDs for better linking

## LLM-Friendly Content

Each production build generates [llmstxt.org](https://llmstxt.org)-standard files for use with LLMs and AI tools:

| File | URL | Contents |
|------|-----|----------|
| `llms.txt` | [docs.overturemaps.org/llms.txt](https://docs.overturemaps.org/llms.txt) | Index of all docs and blog posts with links |
| `llms-full.txt` | [docs.overturemaps.org/llms-full.txt](https://docs.overturemaps.org/llms-full.txt) | Full content of all docs and blog posts |
| `llms-schema.txt` | [docs.overturemaps.org/llms-schema.txt](https://docs.overturemaps.org/llms-schema.txt) | Full schema reference only (useful for data model questions) |

These are generated by [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) and configured in `docusaurus.config.js`.
