// MapLibre GL JS v6 ships ESM-only, and its worker (maplibre-gl-worker.mjs)
// statically imports a sibling chunk (maplibre-gl-shared.mjs). Neither Rspack
// nor webpack's `new URL(..., import.meta.url)` asset handling follows that
// relative import when copying the worker as a build asset, so the sibling
// never lands next to it and the worker fails to load at runtime with an
// opaque error. Copying both files verbatim into static/ (served as-is,
// unprocessed, by Docusaurus) keeps them side by side and importable.
// See src/components/map.js and src/components/buildings-map.js, and the
// MapLibre v5->v6 migration guide's ESM/worker section.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, '..', 'node_modules', 'maplibre-gl', 'dist');
const destination = join(__dirname, '..', 'static', 'maplibre');

mkdirSync(destination, { recursive: true });

for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(join(source, file), join(destination, file));
}
