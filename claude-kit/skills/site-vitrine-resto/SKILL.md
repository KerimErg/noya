---
name: site-vitrine-resto
description: Crée un site vitrine haut de gamme pour un restaurant, snack, kebab, burger, pizzeria, tacos, bowl, boulangerie ou commerce de bouche (Next.js statique + Tailwind, hébergé gratuitement sur Cloudflare Pages), à partir d'un brief, de photos du menu et du logo. À utiliser dès qu'on demande « un site comme Chez Mario », un site pour un resto, un site vitrine, une carte en ligne ou une page pour un commerce local.
---

# Site vitrine de restaurant

Tu fabriques un site vitrine du niveau d'une agence premium pour un commerce de bouche, sur le modèle de **Chez Mario** (dossier `chez-mario/` du dépôt `kerimerg/noya`). Tout se fait en **français** : réponses, textes du site, commentaires du code.

## Règles qui ne se discutent pas

1. **Ne jamais inventer** un produit, un prix, un horaire, un avis, une adresse, un numéro ou une info légale. Ce qui manque reste `TODO` (« À COMPLÉTER ») dans `site.ts`, et le site masque ou signale proprement ce qui n'est pas rempli.
2. **Toute la carte vit dans `src/content/menu.ts`** ; toutes les infos du commerce dans `src/content/site.ts`. Aucun prix ou texte de carte en dur ailleurs.
3. **Statique uniquement** : `output: "export"`, pas de base de données, pas d'admin, pas de commande en ligne (sauf liens Uber Eats / Deliveroo fournis par le client).
4. **RGPD** : polices auto-hébergées (`next/font/local`), aucun traceur, pas de bannière cookies inutile ; le plan Google ne se charge qu'en connaissance de cause (voir `references/legal.md`).
5. **Mobile d'abord** : 80 % des visites viennent du téléphone. Chaque écran se vérifie d'abord en 390 × 664 (iPhone avec barres de Safari).
6. **Droits d'auteur** : si le client veut un personnage ou une marque connue (Mario, Pokémon, Disney…), préviens une fois du risque juridique, note-le dans `site.ts` et les mentions légales, puis respecte son choix.

## Déroulé

### 1. Brief (une seule série de questions)
Récupère ce qui manque avec `references/brief.md`. Si le client a déjà envoyé des photos du menu, lis les prix sur les photos plutôt que de redemander. Si des infos manquent, avance quand même avec des `TODO`.

### 2. Partir du modèle
Copie le modèle, ne repars jamais de zéro :
```bash
rsync -a --exclude node_modules --exclude out --exclude test-results --exclude screenshots --exclude 'photos/*' --exclude 'public/img/*' --exclude tsconfig.tsbuildinfo chez-mario/ <slug-du-resto>/
cd <slug-du-resto> && mkdir -p photos/source && echo '{}' > src/content/images.generated.json && npm install
```
Si le dossier `chez-mario/` n'est pas là, ajoute le dépôt `kerimerg/noya` à la session et clone-le.
Puis renomme partout (`package.json`, `layout.tsx`, `opengraph-image.tsx`, README, tests) et vide les photos du modèle.

### 3. Contenu
- `src/content/site.ts` : nom, accroche, année, adresse, téléphone (`display` + `tel` en +33), horaires (`[]` = fermé), réseaux, livraison, `heroBanner`, infos légales en `TODO`.
- `src/content/menu.ts` : rubriques dans l'ordre logique du métier (plats phares → assiettes → burgers/tacos → enfants → à-côtés → boissons → desserts). `menuSupplement` pour une colonne « Menu » calculée ; `featured` pour l'accueil ; badges seulement s'ils sont justifiés.
- Allergènes : la mention « consultable par écrit au comptoir » sauf si le client donne le détail.

### 4. Style
Choisis ou propose 2 directions avec `references/styles.md`, puis applique-la via les couleurs de `tailwind.config.ts`, les polices de `layout.tsx` et les décors de `components/Deco.tsx`. Garde les fondamentaux qui font l'effet « premium » : gros titres avec contour, bordures épaisses, ombres décalées, boutons qui s'enfoncent, apparitions avec rebond, beaucoup de photos.

### 5. Photos et logo
- Photos dans `photos/` (nom = identifiant utilisé dans `menu.ts`). Pour découper des photos depuis des panneaux de menu : `scripts/crop-photos.mjs` (avec agrandissement IA ×2 hors ligne via `scripts/upscale.cjs`).
- Logo : `scripts/extract-logo.mjs` détoure le fond et génère `public/logo.*`, `src/app/icon.png`, `src/app/apple-icon.png`.
- Bannière : fichier nommé `banniere.*`, déclaré dans `site.ts` (`heroBanner`). Si elle contient déjà un titre écrit, efface-le (remplissage du ciel ligne par ligne avec OpenCV) et mets le titre en HTML par-dessus.
- `npm run images` est **incrémental** ; ne force jamais une régénération complète (AVIF lent : 30 min+).

### 6. Vérifier
```bash
npx tsc --noEmit && npx eslint src --quiet
npm run build
pkill -f "^node scripts/serve.mjs"; PW_CHROMIUM=/opt/pw-browsers/chromium npx playwright test
```
Adapte `tests/site.spec.ts` au nouveau resto (titre, rubriques, pages légales). Fais des captures iPhone 390 × 664 et PC 1440 × 860 et **regarde-les** avant d'annoncer quoi que ce soit.

### 7. Aperçu à envoyer au client
```bash
cd <slug-du-resto> && (node scripts/serve.mjs &)
node <dossier-de-ce-skill>/scripts/build-preview.mjs <slug-du-resto> <scratchpad>/<slug>.html
```
Publie ce fichier avec l'outil Artifact (toujours le même chemin pour garder le même lien). Rappelle que le lien est privé : il faut cliquer sur **Partager** pour que le client l'ouvre. Dans l'aperçu, « Appeler » ouvre une fenêtre avec le numéro et le plan est remplacé par un lien Google Maps : c'est normal.

### 8. Mise en ligne
Cloudflare Pages (gratuit) : dépôt GitHub → Build command `npm run build`, Output `out`, Root directory `<slug-du-resto>`. Le client branche ensuite son nom de domaine. Tu ne peux pas te connecter à son compte : guide-le pas à pas.

### 9. Livrer
Commit + push sur la branche de travail. Réponse au client : ce qui a changé, le lien d'aperçu, la liste des infos encore à fournir (`TODO`).

## Pièges déjà rencontrés
Lis `references/pieges.md` avant de toucher à la bannière mobile, au carrousel, au plan ou aux liens téléphone.
