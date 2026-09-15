// Snapshot the schema reference docs for a released OvertureMaps/schema tag
// into a Docusaurus version of the `schema` docs instance.
//
//   npm run add-schema-version -- v2.0.0
//
// Steps: clone the schema repo at the tag, run its own overture-codegen (same
// as the generate-schema-docs CI action) into schema/reference, then run
// `docusaurus docs:version:schema <tag>`, which copies schema/ into
// schema_versioned_docs/version-<tag>/, snapshots sidebars-schema.js, and
// prepends the tag to schema_versions.json. Those three outputs are committed.
// schema/reference is left clean afterwards (it is gitignored and
// regenerated from `main` on every build). See README "Schema Reference".
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCHEMA_REPO = 'https://github.com/OvertureMaps/schema.git';
const TAG_PATTERN = /^v\d+\.\d+\.\d+$/;
// Docstrings link into the schema repo at `main`; those paths drift after
// release, so a snapshot pins them to its own tag.
const SCHEMA_MAIN_LINK = /(github\.com\/OvertureMaps\/schema\/(?:blob|tree)\/)main\//g;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const referenceDir = join(root, 'schema', 'reference');
const versionsFile = join(root, 'schema_versions.json');
const docusaurusBin = join(root, 'node_modules', '@docusaurus', 'core', 'bin', 'docusaurus.mjs');

const semverParts = (v) => v.slice(1).split('.').map(Number);
const compareSemverDesc = (a, b) => {
  const [pa, pb] = [semverParts(a), semverParts(b)];
  return pb[0] - pa[0] || pb[1] - pa[1] || pb[2] - pa[2];
};

function pinSchemaLinks(dir, ref) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const file = join(entry.parentPath, entry.name);
    const src = readFileSync(file, 'utf8');
    const out = src.replace(SCHEMA_MAIN_LINK, `$1${ref}/`);
    if (out !== src) {
      writeFileSync(file, out);
      count++;
    }
  }
  return count;
}

const tag = process.argv[2];
if (!tag || !TAG_PATTERN.test(tag)) {
  console.error(`Usage: npm run add-schema-version -- vX.Y.Z\n\nGot: ${tag ?? '<missing>'}`);
  process.exit(2);
}

const existing = JSON.parse(readFileSync(versionsFile, 'utf8'));
if (existing.includes(tag)) {
  console.error(`${tag} is already in schema_versions.json; nothing to do.`);
  process.exit(1);
}

// Codegen needs UTF-8 stdio on Windows; mirrors the CI action's env.
const env = { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' };
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, env, stdio: 'inherit' });

const workDir = mkdtempSync(join(tmpdir(), 'overture-schema-'));
const schemaDir = join(workDir, 'schema');

try {
  console.log(`\n▶ Cloning OvertureMaps/schema@${tag}`);
  run('git', ['clone', '--quiet', '--depth', '1', '--branch', tag, SCHEMA_REPO, schemaDir]);

  console.log('\n▶ Installing schema packages (uv sync)');
  run(
    'uv',
    ['sync', '--package', 'overture-schema', '--package', 'overture-schema-codegen', '--no-dev'],
    schemaDir,
  );

  console.log(`\n▶ Generating markdown into ${referenceDir}`);
  rmSync(referenceDir, { recursive: true, force: true });
  run(
    'uv',
    ['run', 'overture-codegen', 'generate', '--format', 'markdown', '--output-dir', referenceDir],
    schemaDir,
  );
  if (!existsSync(referenceDir)) {
    throw new Error('codegen produced no output');
  }

  console.log(`\n▶ Snapshotting Docusaurus version ${tag}`);
  run(process.execPath, [docusaurusBin, 'docs:version:schema', tag], root);

  const versionDir = join(root, 'schema_versioned_docs', `version-${tag}`);
  const pinned = pinSchemaLinks(versionDir, tag);
  if (pinned) console.log(`  pinned schema repo links to ${tag} in ${pinned} file(s)`);

  // docs:version prepends; keep the dropdown ordered newest-first regardless
  // of the order tags are added in.
  const versions = JSON.parse(readFileSync(versionsFile, 'utf8')).sort(compareSemverDesc);
  writeFileSync(versionsFile, `${JSON.stringify(versions, null, 2)}\n`);

  console.log(`
✔ Added schema docs version ${tag}. Review and commit:
    schema_versions.json
    schema_versioned_docs/version-${tag}/
    schema_versioned_sidebars/version-${tag}-sidebars.json
`);
} finally {
  rmSync(referenceDir, { recursive: true, force: true });
  rmSync(workDir, { recursive: true, force: true });
}
