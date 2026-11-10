// Optimise les photos de photos/ → public/img/<nom>-<largeur>.(avif|webp) + manifeste.
// Incrémental : une image déjà générée n'est pas refaite.
import sharp from "sharp";
import { readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const SRC = "photos";
const OUT = "public/img";
const WIDTHS = [640, 1080, 1600, 2200];
const manifest = {};
const exists = (p) => access(p).then(() => true, () => false);

for (const file of (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const name = file.replace(/\.[^.]+$/, "");
  const img = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width > 2200 ? [] : [width]).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    for (const fmt of ["avif", "webp"]) {
      const out = path.join(OUT, `${name}-${w}.${fmt}`);
      if (await exists(out)) continue;
      const pipe = sharp(path.join(SRC, file)).rotate().resize({ width: w });
      await (fmt === "avif" ? pipe.avif({ quality: 52, effort: 4 }) : pipe.webp({ quality: 74 })).toFile(out);
    }
  }
  manifest[name] = { ratio: +(width / height).toFixed(4), widths };
  console.log("✓", name, widths.join(","));
}
await writeFile("src/content/images.json", JSON.stringify(manifest, null, 2) + "\n");
