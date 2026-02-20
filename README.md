# Overture Documentation

This repository uses [Docusaurus](https://docusaurus.io/) to publish the documentation pages seen at [docs.overturemaps.org](https://docs.overturemaps.org)

## Structure

- `blog/`: Entries for the Overture engineering blog available at docs.overturemaps.org/blog
- `community/`: The community page that showcases Overture data being used in the wild.
- `docs/`: The main documentation pages available at docs.overturemaps.org/. The sidebar for these pages is manually curated in the `sidebars.js` file.
- `release-blog/`: Release notes for every Overture data release. The latest release is always available at <https://docs.overturemaps.org/release/latest/>
- Notice there is no `schema reference` folder. See below.

## Schema Reference (`docs.overturemaps.org/schema`)

The Overture schema repository [github/overturemaps/schema](https://github.com/overturemaps/schema) maintains the official Overture schema and the documentation surrounding the actual schema reference pages. This is to ensure that the schema, documentation, and relevant examples are always in-sync.

The script `fetch_schema.sh` injects the contents of the schema's documentation into `docs/schema/` and copies the schema `YAML` files and examples to `docs/_schema` and `docs/_examples`, respectively. This script runs with every build.

Therefore, anything available at `docs.overturemaps.org/schema` (under the **Schema Reference** link in the header) comes from the Overture schema repository, not this repository. Any changes to `schema` will be overwritten on every build.

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
- `npm run clear` - Clear the Docusaurus cache
- `npm run swizzle` - Customize Docusaurus components by "ejecting" them for modification
- `npm run write-translations` - Generate translation files for internationalization
- `npm run write-heading-ids` - Auto-generate heading IDs for better linking
