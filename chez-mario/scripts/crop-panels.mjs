/**
 * Découpe les photos produits dans les panneaux de la carte (photos/source/)
 * et les enregistre en carré dans photos/ (fond prolongé avec la couleur du panneau).
 * À remplacer par de vraies photos dès que possible : il suffit de déposer
 * un fichier du même nom dans photos/ et de supprimer la ligne ci-dessous.
 */
import sharp from "sharp";

const S = "photos/source/panneau-sandwichs.jpg";
const A = "photos/source/panneau-assiettes.jpg";
const B = "photos/source/panneau-burgers-tacos.jpg";

const crops = [
  { name: "burger", src: B, x: 245, y: 588, w: 222, h: 210 },
  { name: "menu-kebab", src: S, x: 484, y: 692, w: 220, h: 92 },
  { name: "menu-yufka", src: S, x: 484, y: 838, w: 220, h: 100 },
  { name: "kebab", src: S, x: 268, y: 588, w: 92, h: 64 },
  { name: "falafel", src: S, x: 356, y: 586, w: 92, h: 66 },
  { name: "yufka", src: S, x: 270, y: 644, w: 92, h: 70 },
  { name: "nuggets", src: A, x: 530, y: 770, w: 116, h: 52 },
  ...[
    ["assiette-kebab", 646],
    ["assiette-kofte", 687.5],
    ["assiette-steak", 727.5],
    ["assiette-escalope", 766.5],
    ["assiette-cordon-bleu", 807.5],
    ["assiette-royal", 846.5],
    ["assiette-falafel", 887.5],
    ["mario-bowl", 930],
  ].map(([name, cy]) => ({ name, src: A, x: 155, y: Math.round(cy - 25), w: 50, h: 50, round: true })),
];


for (const c of crops) {
  const side = Math.max(c.w, c.h);
  const scale = Math.max(3, Math.ceil(600 / side));
  let img = sharp(c.src).extract({ left: c.x, top: c.y, width: c.w, height: c.h });
  const buf = await img
    .resize(c.w * scale, c.h * scale, { kernel: "lanczos3" })
    .sharpen({ sigma: 1.1 })
    .toBuffer();
  const sq = side * scale;
  if (c.round) {
    // Assiette détourée en rond, fond transparent
    const mask = Buffer.from(`<svg width="${sq}" height="${sq}"><circle cx="${sq / 2}" cy="${sq / 2}" r="${sq * 0.44}" fill="#fff"/></svg>`);
    await sharp(buf).resize(sq, sq).composite([{ input: mask, blend: "dest-in" }]).png().toFile(`photos/${c.name}.png`);
  } else {
    // Photo opaque, au format du découpage (le recadrage final se fait à l'affichage)
    await sharp(buf).removeAlpha().jpeg({ quality: 95 }).toFile(`photos/${c.name}.jpg`);
  }
  console.log("✓", c.name);
}
