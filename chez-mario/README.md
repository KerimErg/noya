# Chez Mario — site vitrine

Site statique (Next.js + Tailwind) : aucun serveur, aucune base de données. Hébergement : Cloudflare Pages.

## Les 3 fichiers à connaître

| Je veux changer…                                 | Fichier                    |
| ------------------------------------------------ | -------------------------- |
| un prix, un produit, une pastille, une catégorie | `src/content/menu.ts`      |
| horaires, adresse, téléphone, réseaux, livraison, avis, mentions légales | `src/content/site.ts` |
| les photos                                       | dossier `photos/`          |

### Changer un prix (30 secondes)

1. Ouvrez `src/content/menu.ts` (sur GitHub : cliquez sur le fichier puis sur le crayon ✏️ « Edit »).
2. Cherchez le produit (Ctrl+F, ex. `Maxi Kebab`).
3. Changez le nombre après `price:` → `price: 13` devient `price: 13.5` pour 13,50 €. **Point, pas virgule.**
4. Cliquez sur « Commit changes ». Cloudflare remet le site à jour tout seul en 1 à 2 minutes.

### Ajouter une pastille

Sur un produit : `badges: ["best-seller"]`. Choix possibles : `"best-seller"`, `"nouveau"`, `"epice"`, `"signature"`.
Pour mettre un produit dans « Les classiques » de l'accueil : `featured: true`.

### Ajouter des photos

1. Déposez les photos dans `photos/` (JPG ou PNG, la plus grande qualité possible), par ex. `photos/berlinois.jpg`.
2. Dans `menu.ts`, sur le produit : `photo: "berlinois"`.
3. Pour la grande photo d'accueil : nommez-la `photos/hero.jpg` puis dans `site.ts` : `heroPhoto: "hero"`.

Au build, les photos sont automatiquement recadrées (carré, produit centré grâce à la détection du sujet) et converties en AVIF + WebP en plusieurs tailles.

### Ajouter la vidéo d'accueil

Version légère (720p, sans son, ~10 s, < 3 Mo) + image de secours, avec [ffmpeg](https://ffmpeg.org) :

```bash
ffmpeg -i ma-video.mp4 -t 10 -vf "scale=-2:720,fps=30" -c:v libx264 -preset slow -crf 28 -an -movflags +faststart public/video/hero.mp4
ffmpeg -i public/video/hero.mp4 -frames:v 1 -q:v 3 public/video/hero-poster.jpg
```

Puis dans `site.ts` : `heroVideo: { mp4: "/video/hero.mp4", poster: "/video/hero-poster.jpg" }`.
(Si le fichier dépasse 3 Mo, augmentez `-crf` à 30 ou 32.)

### Horaires

Dans `site.ts`, remplacez `hours: null` par (exemple, à adapter) :

```ts
hours: {
  lundi: [{ open: "11:00", close: "14:00" }, { open: "18:00", close: "22:30" }],
  mardi: [], // [] = fermé
  mercredi: [{ open: "11:00", close: "22:30" }],
  jeudi: [{ open: "11:00", close: "22:30" }],
  vendredi: [{ open: "11:00", close: "23:30" }],
  samedi: [{ open: "11:00", close: "23:30" }],
  dimanche: [{ open: "18:00", close: "22:30" }],
},
```

Le badge « Ouvert / Fermé », le tableau (jour actuel en évidence) et les données Google se mettent à jour tout seuls.

## Commandes (pour un développeur)

```bash
npm install
npm run dev          # site local sur http://localhost:3000
npm run build        # optimise les photos + génère le site dans out/
npm start            # sert out/ sur http://localhost:4173
npm run typecheck && npm run lint
npx playwright test  # tests iPhone + ordinateur, captures dans screenshots/
```

## Mise en ligne sur Cloudflare Pages

Voir le guide pas à pas donné dans la conversation (résumé) :

- Build command : `npm run build`
- Build output directory : `out`
- Root directory : `chez-mario`
- Variable d'environnement : `NODE_VERSION` = `22`

Après le branchement du nom de domaine, mettez-le dans `site.ts` → `url: "https://votre-domaine.fr"` (sitemap, Google, image de partage).
