/**
 * Optimise les photos déposées dans photos/ → public/img/ (AVIF + WebP, plusieurs tailles).
 * - Produits : recadrage carré centré sur le sujet (détection automatique du point d'intérêt).
 * - Fichiers commençant par "hero" : format paysage 16:9 (et 4:5 pour mobile).
 * Génère src/content/images.generated.json, lu par le composant <Photo>.
 */
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "photos";
const OUT = "public/img";
const MANIFEST = "src/content/images.generated.json";
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

const presets = {
  product: [{ suffix: "", ratio: 1, widths: [200, 400, 700] }],
  hero: [
    { suffix: "", ratio: 16 / 9, widths: [960, 1440, 1920] },
    { suffix: "-m", ratio: 4 / 5, widths: [480, 800] },
  ],
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC, { withFileTypes: true }).catch(() => [])).filter((f) => f.isFile() && EXT.test(f.name)).map((f) => f.name);
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const input = path.join(SRC, file);
  const kind = name.startsWith("hero") ? "hero" : "product";
  const srcTime = (await stat(input)).mtimeMs;
  const meta = await sharp(input).metadata();
  manifest[name] = { kind, alpha: !!meta.hasAlpha, variants: {} };

  for (const v of presets[kind]) {
    manifest[name].variants[v.suffix || "default"] = { ratio: v.ratio, widths: v.widths };
    for (const w of v.widths) {
      const h = Math.round(w / v.ratio);
      for (const fmt of ["avif", "webp"]) {
        const out = path.join(OUT, `${name}${v.suffix}-${w}.${fmt}`);
        const done = await stat(out).then((s) => s.mtimeMs >= srcTime).catch(() => false);
        if (done) continue;
        // Les détourages (fond transparent) gardent leur cadrage ; les photos sont recadrées sur le sujet.
        const img = sharp(input).rotate().resize(w, h, meta.hasAlpha ? { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } } : { fit: "cover", position: sharp.strategy.attention });
        await (fmt === "avif" ? img.avif({ quality: 52, effort: 5 }) : img.webp({ quality: 74 })).toFile(out);
      }
    }
  }
  console.log(`✓ ${file} → ${name} (${kind})`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(files.length ? `${files.length} photo(s) optimisée(s).` : "Aucune photo dans photos/ — visuels de remplacement utilisés.");
