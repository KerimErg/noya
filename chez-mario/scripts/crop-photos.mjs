/**
 * Recadre les photos produits (agrandissement x2 par IA via scripts/upscale.cjs, puis) (photos/source/photo-*.jpg) en carré centré sur la nourriture,
 * agrandit proprement, accentue légèrement et relève un peu les couleurs.
 * Résultat dans photos/<nom>.png (puis optimisé en AVIF/WebP au build).
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const crops = [
  { name: "tacos", src: "photos/source/photo-tacos.jpg", x: 12, y: 500, size: 680 },
  { name: "barquettes", src: "photos/source/photo-barquettes.jpg", x: 12, y: 500, size: 680 },
  { name: "boissons", src: "photos/source/photo-boissons.jpg", x: 80, y: 520, size: 540 },
  { name: "burger", src: "photos/source/photo-burger.jpg", x: 93, y: 455, size: 520 },
  { name: "kebab", src: "photos/source/photo-kebab.jpg", x: 32, y: 470, size: 640 },
  { name: "assiette-kebab", src: "photos/source/photo-assiette-kebab.jpg", x: 30, y: 500, size: 660 },
  { name: "mario-bowl", src: "photos/source/photo-mario-bowl.jpg", x: 40, y: 520, size: 620 },
  { name: "frites", src: "photos/source/photo-frites.jpg", x: 60, y: 590, size: 540 },
  { name: "menu-enfant", src: "photos/source/photo-menu-enfant.jpg", x: 50, y: 500, size: 590 },
];

const OUT = 1200;
const TMP = "photos/source/.tmp";
mkdirSync(TMP, { recursive: true });
const only = process.argv.slice(2);
for (const c of crops) {
  if (only.length && !only.includes(c.name)) continue;
  const raw = `${TMP}/${c.name}.png`;
  const up = `${TMP}/${c.name}-x2.png`;
  await sharp(c.src).extract({ left: c.x, top: c.y, width: c.size, height: c.size }).png().toFile(raw);
  // Super-résolution : recrée du détail au lieu d'étirer les pixels
  execFileSync("node", ["scripts/upscale.cjs", raw, up], { stdio: "inherit" });
  await sharp(up)
    .resize(OUT, OUT, { kernel: "lanczos3" })
    .modulate({ saturation: 1.1, brightness: 1.02 })
    .sharpen({ sigma: 0.6, m1: 0.4, m2: 1 })
    .png()
    .toFile(`photos/${c.name}.png`);
  console.log("✓", c.name);
}
