# Contributing

Maintainer procedures for this repository. For what the repository contains and how to run it locally, see the [README](README.md).

- [Release calendar](#release-calendar)
- [Schema reference](#schema-reference)
  - [Adding a schema version](#adding-a-schema-version)
  - [Schema PR previews](#schema-pr-previews)
- [OG image cache](#og-image-cache)

## Release calendar

`static/release-calendar.json` is the source of truth for release dates, and the `/release-calendar` page renders from it (`src/components/ReleaseCalendar.jsx`). Its shape is documented in the [README](README.md#release-calendar), and `static/release-calendar.schema.json` validates it.

Each month, add an entry for the release that's three to four months out, so at least three upcoming releases are listed. Set `majorChangeMonth` to true for March, June, September, and December. After a release ships, fill in `schemaVersion` if it was still `null`, and publish the release notes as `blog/YYYY-MM-DD-release-notes.mdx`. The history table links the data version to that post automatically, and shows plain text when there isn't one. Entries move from the schedule to the history table by date, so nothing else needs editing. The change shows up on the next deploy.

The fallback release in `docusaurus.config.js` (`getLatestOvertureRelease()`) is the newest shipped entry in this file. It's only used when the STAC catalog is unreachable at build time.

Don't hardcode the current release in docs examples. Use the `__OVERTURE_RELEASE` placeholder, which resolves the latest release from [STAC](https://stac.overturemaps.org/) at build time. It works in plain fenced code blocks and in the `QueryBuilder` component. Pin a version only when the surrounding text depends on that exact release.

## Schema reference

The reference pages under `docs.overturemaps.org/schema` are generated from the Pydantic models in [OvertureMaps/schema](https://github.com/OvertureMaps/schema).

The schema reference is its own [versioned Docusaurus docs instance](https://docusaurus.io/docs/versioning) (plugin id `schema`, config in `docusaurus.config.js`, sidebar in `sidebars-schema.js`), separate from the main `docs/` instance. Only released schema tags are published; there is no rolling "latest" built from `main`. The newest tag in `schema_versions.json` is served at `/schema/`, older tags at `/schema/vX.Y.Z/`, and a version dropdown appears in the navbar on schema pages only.

Snapshots are generated once per tag and committed under `schema_versioned_docs/version-vX.Y.Z/`. Builds do not call the schema generator, so a production deploy only ever changes the schema pages when a new snapshot lands here.

**A typo or error under `docs.overturemaps.org/schema` is not fixable in this repository.** Open an issue or PR against the docstrings/models in [OvertureMaps/schema](https://github.com/OvertureMaps/schema) instead; the fix appears in the next release's snapshot. Re-snapshotting an existing tag is possible (delete its three artifacts and re-run the script below) but pointless unless the tag itself moved.

The overview page (`schema/index.md`) is copied into each snapshot when it's created. Edits to it need to be applied to the `index.md` in each `schema_versioned_docs/version-*/` too.

### Adding a schema version

Run this after a `vX.Y.Z` tag is published in [OvertureMaps/schema](https://github.com/OvertureMaps/schema/releases). It needs `git`, [`uv`](https://docs.astral.sh/uv/), and `npm install` already done.

```shell
npm run add-schema-version -- v2.0.0
```

The script (`scripts/add-schema-version.mjs`) clones the schema repo at that tag, runs its `overture-codegen` into `schema/reference/`, then runs `docusaurus docs:version:schema <tag>`, which writes:

- `schema_versioned_docs/version-<tag>/` (with links into the schema repo pinned to the tag)
- `schema_versioned_sidebars/version-<tag>-sidebars.json`
- an entry in `schema_versions.json` (kept sorted newest-first; the first entry is what `/schema/` serves)

Commit those three and open a PR. `schema/reference/` is cleaned up afterwards.

Only tags that ship the `overture-schema-codegen` package (v1.17.0 and later) can be added; earlier releases were JSON Schema and have no generator. The script refuses tags that don't match `vX.Y.Z` or are already in `schema_versions.json`.

### Schema PR previews

The schema repo's PR preview workflow checks out this repo, generates Markdown from the PR branch into `schema/reference/`, and builds with `SCHEMA_PREVIEW=true`. In that mode the `schema` instance builds only the `current` version from `schema/reference/` at `/schema/`; committed snapshots, the version dropdown, blog, and community pages are skipped.

## OG image cache

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
