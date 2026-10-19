/**
 * Recadre les photos produits (photos/source/photo-*.jpg) en carré centré sur la nourriture,
 * agrandit proprement, accentue légèrement et relève un peu les couleurs.
 * Résultat dans photos/<nom>.png (puis optimisé en AVIF/WebP au build).
 */
import sharp from "sharp";

const crops = [
  { name: "tacos", src: "photos/source/photo-tacos.jpg", x: 12, y: 470, size: 680 },
  { name: "barquettes", src: "photos/source/photo-barquettes.jpg", x: 12, y: 500, size: 680 },
  { name: "boissons", src: "photos/source/photo-boissons.jpg", x: 80, y: 520, size: 540 },
  { name: "burger", src: "photos/source/photo-burger.jpg", x: 0, y: 410, size: 640 },
  { name: "kebab", src: "photos/source/photo-kebab.jpg", x: 32, y: 470, size: 640 },
  { name: "assiette-kebab", src: "photos/source/photo-assiette-kebab.jpg", x: 30, y: 500, size: 660 },
  { name: "menu-enfant", src: "photos/source/photo-menu-enfant.jpg", x: 50, y: 500, size: 590 },
];

const OUT = 1200;
for (const c of crops) {
  await sharp(c.src)
    .extract({ left: c.x, top: c.y, width: c.size, height: c.size })
    .resize(OUT, OUT, { kernel: "lanczos3" })
    .modulate({ saturation: 1.12, brightness: 1.03 })
    .sharpen({ sigma: 1, m1: 0.6, m2: 2 })
    .png()
    .toFile(`photos/${c.name}.png`);
  console.log("✓", c.name);
}
