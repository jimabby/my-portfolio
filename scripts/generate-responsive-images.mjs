// Builds the responsive-image assets the <Img> component relies on.
//
// For every source image under src/assets it records the intrinsic size (so
// every <img> can carry width/height and stop shifting the layout) and, for
// images larger than the widest size we ever display, emits down-scaled
// variants for use in srcset.
//
// Variants are written to public/responsive/ rather than imported through
// Vite on purpose. Resolving ~260 hashed URLs through import.meta.glob put the
// entire URL table in the entry bundle (+25 kB gzipped, for URLs most visitors
// never use). Predictable paths let <Img> build a srcset from string
// concatenation instead, so the only client-side cost is the manifest.
//
// Each filename embeds a content hash, so the files stay immutable and safe to
// cache forever even though they are not part of Vite's hashed asset graph.
//
// Outputs are derived and gitignored except image-manifest.json. Regenerate
// with `npm run images`; prebuild and predev both run it. Work is skipped when
// an output already exists for that exact content, so repeat runs are cheap.

import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = join(process.cwd(), 'src', 'assets');
const OUTPUT_DIR = join(process.cwd(), 'public', 'responsive');
const MANIFEST_PATH = join(SOURCE_DIR, 'image-manifest.json');

// The widths the layouts actually use: cards top out near 400 CSS px (800
// physical at 2x), article and gallery images near 780 CSS px. 1440 is the
// ceiling for wide screens at 2x.
const WIDTHS = [480, 960, 1440];
const SOURCE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

// Both formats at every width. AVIF lands roughly a third smaller than WebP at
// matched quality and is supported by every browser this site targets, but it
// is offered rather than substituted: <Img> emits it as a <source> ahead of
// the WebP, so anything that cannot decode it silently takes the WebP instead
// and nobody gets a broken image.
//
// Quality is per-format on purpose. AVIF at the same number looks better and
// weighs more than WebP does, so matching the numbers would hand back the
// saving that is the whole reason for encoding it.
const FORMATS = [
  { ext: 'webp', encode: (pipeline) => pipeline.webp({ quality: 78 }) },
  { ext: 'avif', encode: (pipeline) => pipeline.avif({ quality: 55, effort: 4 }) },
];

async function collectImages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectImages(full)));
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      found.push(full);
    }
  }
  return found;
}

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const sources = await collectImages(SOURCE_DIR);
  const manifest = {};
  const expected = new Set();
  let generated = 0;
  let reused = 0;

  for (const source of sources) {
    const bytes = await readFile(source);
    const { width, height } = await sharp(bytes).metadata();

    if (!width || !height) {
      console.warn(`Skipping ${relative(process.cwd(), source)}: no intrinsic size`);
      continue;
    }

    // Keyed by bare filename. Filenames are unique across src/assets, and
    // <Img> recovers this key from Vite's hashed output URL.
    const key = basename(source);
    const stem = basename(source, extname(source));
    const variants = [];

    for (const targetWidth of WIDTHS) {
      // Never upscale, and skip a variant that would barely differ from the
      // original — the extra request would cost more than it saves.
      if (targetWidth >= width * 0.9) continue;

      // Hash of (source content + target width): changing the source changes
      // the filename, so a cached copy can never go stale.
      const hash = createHash('sha256')
        .update(bytes)
        .update(String(targetWidth))
        .digest('base64url')
        .slice(0, 8);

      for (const { ext, encode } of FORMATS) {
        const variantName = `${stem}-${targetWidth}-${hash}.${ext}`;
        expected.add(variantName);

        if (await exists(join(OUTPUT_DIR, variantName))) {
          reused += 1;
          continue;
        }

        await encode(
          sharp(bytes).resize({ width: targetWidth, withoutEnlargement: true })
        ).toFile(join(OUTPUT_DIR, variantName));
        generated += 1;
      }

      variants.push([targetWidth, hash]);
    }

    // Terse on purpose: this object ships to every visitor.
    manifest[key] = { w: width, h: height, v: variants };
  }

  // Drop variants left behind by images that were edited or deleted.
  let removed = 0;
  for (const name of await readdir(OUTPUT_DIR)) {
    if (!expected.has(name)) {
      await rm(join(OUTPUT_DIR, name));
      removed += 1;
    }
  }

  const serialised = `${JSON.stringify(manifest)}\n`;
  const existing = await readFile(MANIFEST_PATH, 'utf8').catch(() => null);
  if (existing !== serialised) await writeFile(MANIFEST_PATH, serialised, 'utf8');

  console.log(
    `Images: ${sources.length} sources, ${generated} generated, ${reused} reused, ${removed} stale removed.`
  );
}

await run();
