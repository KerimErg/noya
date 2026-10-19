/**
 * Détoure le logo (photos/source/logo-source.jpg) : supprime le fond gris clair
 * connecté aux bords (remplissage depuis les bords), garde les blancs intérieurs.
 * Produit public/logo.png (+ webp) et l'icône du site.
 */
import sharp from "sharp";

const SRC = "photos/source/logo-source.jpg";
const box = { left: 105, top: 500, width: 445, height: 590 };

const { data, info } = await sharp(SRC).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const isBg = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max - min < 28 && max > 150; // gris/blanc peu saturé (fond + ombre portée)
};
const seen = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const p = stack.pop();
  if (seen[p]) continue;
  if (!isBg(p * 4)) continue;
  seen[p] = 1;
  data[p * 4 + 3] = 0;
  const x = p % W, y = (p / W) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}
// Bords adoucis : un pixel de fond touchant le logo devient semi-transparent
const out = Buffer.from(data);
for (let y = 1; y < H - 1; y++)
  for (let x = 1; x < W - 1; x++) {
    const p = y * W + x;
    if (!seen[p]) continue;
    const n = [p - 1, p + 1, p - W, p + W].filter((q) => !seen[q]).length;
    if (n) out[p * 4 + 3] = 70 * n;
  }
data.set(out);

const cut = sharp(data, { raw: { width: W, height: H, channels: 4 } }).png();
const trimmed = await sharp(await cut.toBuffer()).trim({ threshold: 1 }).toBuffer();
const logo = sharp(trimmed).resize({ height: 480, kernel: "lanczos3" }).sharpen({ sigma: 0.6 });
await logo.clone().png({ compressionLevel: 9 }).toFile("public/logo.png");
await logo.clone().webp({ quality: 90, alphaQuality: 100 }).toFile("public/logo.webp");
const meta = await sharp("public/logo.png").metadata();
console.log("logo", meta.width, "x", meta.height);

// Icône d'onglet + icône Apple : logo centré sur fond crème arrondi
const sq = 512;
const icon = await sharp(trimmed).resize({ width: 440, height: 440, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp({ create: { width: sq, height: sq, channels: 4, background: { r: 255, g: 246, b: 229, alpha: 1 } } })
  .composite([{ input: icon, gravity: "center" }])
  .png()
  .toFile("src/app/icon.png");
await sharp("src/app/icon.png").resize(180).toFile("src/app/apple-icon.png");
console.log("icônes ok");
