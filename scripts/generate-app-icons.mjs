// Re-encodes the PWA icons in public/icons/.
//
// These were exported straight from a photo editor and committed as full
// truecolor PNGs: icon-512 and maskable-512 were over 400 kB each. Two of them
// (icon-192 and icon-512) sit in the service worker's PRECACHE list, so every
// first-time visitor paid for them whether or not they ever installed the app.
//
// The artwork is a photograph, not flat icon art, which rules out the usual
// answer. A lossless re-encode of a photo saves about 6% — not worth a build
// step. Quantising to a 256-colour palette saves 76% and measures at 40.6 dB
// PSNR against the original, which on this image is indistinguishable at full
// size. That is the trade this makes, and it is why the palette is pinned at
// 256 rather than the smaller values that look fine on flat artwork: at 128
// colours the same photo drops to 29.4 dB and the water behind the subject
// visibly bands.
//
// Dimensions and framing are untouched — this only re-encodes.
//
// Idempotent in practice: it converges after one pass and then rewrites
// nothing, because a file is only replaced when re-encoding actually made it
// smaller. Run it with `npm run icons:app` after replacing any icon artwork.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ICON_DIR = join(process.cwd(), 'public', 'icons');

// Measured on the current artwork. Raise it (or drop the palette step) if the
// icons are ever replaced with something that bands at this depth; lower it
// only with a fresh PSNR reading, not by eye at thumbnail size.
const PALETTE_COLOURS = 256;

async function run() {
  const names = (await readdir(ICON_DIR)).filter((name) => name.endsWith('.png'));
  let shrunk = 0;
  let before = 0;
  let after = 0;

  for (const name of names) {
    const path = join(ICON_DIR, name);
    const original = await readFile(path);

    const encoded = await sharp(original)
      .png({ compressionLevel: 9, effort: 10, palette: true, colours: PALETTE_COLOURS })
      .toBuffer();

    before += original.length;

    // Never write a file that got bigger — re-encoding an already-quantised
    // PNG can, and a build step that inflates its own inputs on every run is
    // worse than no build step.
    if (encoded.length < original.length) {
      await writeFile(path, encoded);
      after += encoded.length;
      shrunk += 1;
    } else {
      after += original.length;
    }
  }

  const kb = (bytes) => `${Math.round(bytes / 1024)} kB`;
  console.log(
    `App icons: ${names.length} checked, ${shrunk} re-encoded, ${kb(before)} -> ${kb(after)}.`
  );
}

await run();
