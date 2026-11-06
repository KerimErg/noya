# DOCUMENT B — DESIGN SYSTEM ET DIRECTION ARTISTIQUE

> Conventions : **[CONSTATÉ]** vu dans le code ou les fichiers · **[DÉDUIT]** conclusion tirée de plusieurs projets · **[INCONNU]** information absente.
> Toutes les valeurs (couleurs, polices, tailles) sont extraites du code réel de tes artefacts.

---

## PARTIE 1 — LES RÈGLES TRANSVERSALES

### 1.1 Typographie

**Principe [DÉDUIT, observé sur 9 projets sur 9]** : une police de titre à fort caractère + une sans-serif de lecture. Jamais deux polices « neutres » ensemble.

| Projet | Titres | Texte | Troisième |
|---|---|---|---|
| SITEO | Bodoni Moda (Didone, 400, italique pour les mots clés) | Jost (300 à 600) | IBM Plex Mono (numéros, chiffres, URL) |
| Bannière SITEO | Instrument Sans 500 en CAPITALES | Instrument Sans | — |
| Novaluxe | Syncopate 700 (capitales larges, espacement 0,32em sur le logo) | Inter Tight | — |
| GOIA Lounge | Serif display (repli Didot/Georgia) | Sans | Serif d'accent |
| Au Vieux Pressoir | Gloock (serif affichée) | Karla | — |
| Chez Mario | Lilita One (ronde, grasse, avec contour) | Nunito | — |
| BOWLY'S | Archivo | Roboto Condensed | — |
| Canarinho | Big Shoulders Display 900 (condensée géante) | Archivo | — |
| Logo Bowlys (planche) | Lettrage dessiné en SVG | Instrument Sans | — |

**Règles d'usage [CONSTATÉ]** :
- Titres en graisse **400 pour les serifs élégantes** (SITEO, Pressoir), **700-900 pour les display** (Novaluxe, Canarinho, Chez Mario).
- Tailles de titre fluides en `clamp()` : hero SITEO `clamp(44px, 6.6vw, 96px)`, Bannière `clamp(46px, 9.2vw, 124px)`, Canarinho `clamp(96px, 19vw, 260px)`, Pressoir `clamp(2.6rem, 8vw, 5rem)`.
- Interlignage serré sur les titres (`.82` à `1.1`), confortable sur le texte (`1.5` à `1.6`).
- `text-wrap: balance` sur les titres.
- **Eyebrow** systématique : 12-13 px, capitales, `letter-spacing` 0,14 à 0,24em, graisse 500-700, couleur d'accent.
- Chiffres : `font-variant-numeric: tabular-nums` pour les prix, horaires, montants.
- Mot mis en valeur dans un titre : *italique* dans la couleur d'accent (SITEO : « Des sites qui font *entrer* vos clients. »).

**Sites clients en production [CONSTATÉ, skill]** : polices **auto-hébergées** (`@fontsource/...` → `.woff2` → `next/font/local`), **jamais d'appel à Google Fonts** (RGPD). Les maquettes/artefacts peuvent utiliser Google Fonts.

### 1.2 Couleurs

**Principe [DÉDUIT]** : 1 fond + 1 encre + 1 accent principal + 1-2 accents secondaires. La palette **raconte le lieu ou le produit**, et les variables CSS portent des noms de matière (`--plaster`, `--timber`, `--flute`, `--gres`, `--canario`, `--verde`, `--azul`, `--gold`, `--paper`, `--night`, `--ivory`).

**Palettes réelles :**

| Projet | Fond | Encre/texte | Accent | Secondaires |
|---|---|---|---|---|
| SITEO | `#0A1526` nuit | `#ECE6D9` | or `#D3AF6B` (clair `#EDD39C`, foncé `#9C7B3F`) | navy `#10203A` `#182C4D` `#21385F`, brume `#9AA8BF`, papier `#F5F0E6` |
| Bannière SITEO | `#0B0A09` | `#F3EEE6` | or `#C9A96E` / `#E3CB9A` | ivoire `#F2EDE4` + encre `#14120F` |
| Novaluxe | `#F3F2EF` | `#141414` | bronze `#6E5F44` | pierre `#E9E6E0`, ligne `#DAD7D0`, sable `#C8B996` sur noir |
| GOIA Lounge | `#1B1511` | `#F7F2EA` | corail `#E88A7A` | vert sauge `#8FC79A`, or `#E6C98A`, pétrole `#0F3B3C` |
| Au Vieux Pressoir | `#FAF9F6` enduit | `#3A2B22` bois | vert bouteille `#2E5A3C` | grès rose `#B4584C`, ligne `#DDD8CF` |
| Chez Mario | crème `#FFF6E5` / ciel `#C9EEFF` | encre `#1F1A17` | jaune `#FFC81F` | rouge `#E52521`, vert `#2DA84B`, bleu `#1D5FD6`, ciel `#63C7F7` |
| BOWLY'S | crème `#FAF6F3` | `#1E0B0E` | rouge `#B42318` / `#8C020A` | jaune `#FFD60A` |
| Logo Bowlys | rouge `#C8341F` | crème `#FBF3E6` | — | charbon `#24150F`, or `#F2A93B`, rouge foncé `#8F2213` |
| Canarinho | blanc / jaune `#FFD500` | bleu `#0B2A6B` | vert `#00843D` | vert foncé `#00562A` |

**Règles [CONSTATÉ]** :
- Couleurs déclarées en **variables CSS sur `:root`**, avec variante sombre (`prefers-color-scheme: dark` + `[data-theme]`) sur les pages autonomes (Pressoir, Canarinho, Logo Bowlys).
- Restaurants : **fond clair et appétissant, jamais trop sombre** (skill). Exception assumée : lounge de nuit (GOIA) et marque premium (SITEO, Novaluxe).
- L'or est toujours en **dégradé à 3 tons** sur les boutons premium (SITEO : `linear-gradient(135deg, or clair, or 55%, or foncé)`).

### 1.3 Mise en page, grilles, espacements

**[CONSTATÉ]** :
- Conteneur centré `max-width` **1080 à 1240 px**, gouttière latérale **16 px sur mobile** (40 px à partir de 760 px sur SITEO), compatible `safe-area-inset`.
- Sections très aérées : `padding-block` de **72 à 140 px** (SITEO `clamp(72px, 10vw, 140px)`).
- Grilles **asymétriques** : hero `1.05fr / .95fr`, études de cas `1.35fr / .65fr` alternées gauche/droite, contact `1fr / 1.2fr`.
- En-têtes de section en **deux colonnes** : titre à gauche, paragraphe d'intro à droite, alignés en bas (`.shead` de SITEO).
- Séparateurs : filets fins `1px` à faible opacité plutôt que des cartes à ombre.
- Passage à une colonne entre **760 et 980 px**.
- Grilles produits/avis en `repeat(auto-fit, minmax(260-320px, 1fr))`.

### 1.4 Composition et hiérarchie

**[DÉDUIT]** Ordre type d'une page de commerce :
1. Navigation collante (logo, 3-5 liens, sélecteur de langue, CTA).
2. Hero : eyebrow (type · lieu), grand titre, une phrase, 2 boutons (primaire plein + secondaire contour), statut ouvert/fermé ou chiffres clés.
3. Preuve / présentation (histoire, engagements).
4. La carte ou les produits (onglets par catégorie).
5. Horaires + accès (tableau, jour courant mis en valeur, lien Google Maps ou carte OSM).
6. Avis (placeholders si pas de vrais avis).
7. Réservation / contact / commande.
8. Pied de page avec mentions légales et confidentialité.

### 1.5 Images et visuels

**[CONSTATÉ]** :
- Restaurants : **« beaucoup de photos »** (bannière plein écran, mosaïque « On mange quoi ? », photo par rubrique).
- Photos manquantes = **placeholder explicite** décrivant la photo attendue (« [TA PHOTO PORTÉE – veste noire, plan large, lumière naturelle] », « Photo de la salle ou de la façade (à remplacer par les photos du client) »), parfois sur fond hachuré.
- Décors en **SVG maison** quand il n'y a pas de photo : colombages en filigrane (Pressoir), silhouette de veste (Canarinho), fond animé de ville en canvas (Bannière SITEO).
- Pipeline images du site resto : AVIF/WebP générés de façon **incrémentale**, agrandissement IA ×2 seulement pour les photos découpées d'un panneau, logo détouré sans flou sur le masque.
- Si la bannière fournie contient déjà un titre, on l'efface (OpenCV) et on met le titre en HTML par-dessus.

### 1.6 Animations et micro-interactions

**[CONSTATÉ]** :
- **Courbe signature** : `cubic-bezier(.2, .7, .2, 1)` (SITEO, Bannière).
- Boutons : léger soulèvement `translateY(-1 à -2px)` au survol, flèche `→` qui glisse de 4 px, remplissage qui balaie de gauche à droite (Bannière).
- Chez Mario : **boutons qui s'enfoncent au clic**, apparitions avec **rebond** (`data-reveal`), **lettres qui sautent**, ombres pleines décalées (`shadow-pop`), titres avec contour (`.outlined`, `.hero-word`) et rotation alternée.
- SITEO : reflet qui passe sur la carte de visite, captures d'écran qui **défilent au survol** dans un cadre de navigateur, sceau doré qui tombe « Demande reçue », lignes du devis qui flashent quand elles changent.
- Bannière SITEO : animation de titre racontée en 5 s (« SITE. HAUT DE GAMME. » → « SITEO »), avec flou qui se dissipe, mot par mot, bouton « Rejouer l'animation ».
- **Toujours** `prefers-reduced-motion` respecté.

### 1.7 Navigation, menus, boutons, composants

**[CONSTATÉ]** :
- Navigation collante, fond légèrement transparent + `backdrop-filter: blur` (SITEO).
- Sélecteur de langue en **pastille segmentée** (FR | DE, FR | EN), état mémorisé.
- Boutons : pilule `border-radius: 999px`, padding ~16 × 24-30 px, graisse 500-700, cible tactile ≥ 44 px. Exceptions volontaires : Novaluxe (angles droits, capitales espacées, très « mode »), Pressoir (radius 4 px, plus traditionnel).
- **Mobile resto : barre collante en bas « Voir la carte / Appeler »** (et « Itinéraire » sur BOWLY'S).
- Onglets de carte en pastilles, prix alignés à droite avec points de conduite ou pointillés.
- Tableaux d'horaires avec le **jour courant en gras et en couleur d'accent**.
- Formulaires : `label` visibles, validation douce avec message clair, état de succès qui récapitule la demande.
- Carrousel mobile : cartes à ~64 % de largeur, **flèches ← → qui bouclent**.
- Liens `tel:` partout où apparaît le numéro ; sur ordinateur, le clic copie le numéro.

### 1.8 Ambiances et références

**[CONSTATÉ dans styles.md]** Directions éprouvées pour la restauration :

| Direction | Ambiance | Couleurs | Polices |
|---|---|---|---|
| Jeu de plateforme (Chez Mario) | Fun, familial, nostalgique | `#E52521` `#2DA84B` `#1D5FD6` `#FFC81F` `#63C7F7` | Lilita One + Nunito |
| Street food néon | Nuit, urbain, jeune | `#111` `#FF2E88` `#19E6FF` `#FFE600` | Bebas Neue + Inter |
| Marché frais | Healthy, bowls | `#7FB77E` `#FFF7EA` `#E07A5F` | Fraunces + DM Sans |
| Trattoria | Pizzeria | `#D7263D` `#2E7D32` `#FFF8E7` | Abril Fatface + Nunito |
| Diner américain | Burgers | `#E63946` `#A8DADC` `#F1FAEE` + damier | Shrikhand + Work Sans |
| Bazar oriental | Kebab, lahmacun | `#F4A300` `#B23A48` `#1B998B` crème | Baloo 2 + Nunito |

Références hors resto **[DÉDUIT]** : papeterie de luxe (SITEO : papier gaufré, sceau de cire, devis sur papier), mode minimaliste (Novaluxe), lounge feutré (GOIA), patrimoine alsacien (Pressoir).

### 1.9 Responsive et mobile

**[CONSTATÉ]** — règles dures :
- Vérification d'abord en **390 × 664** (iPhone avec barres Safari), puis **1440 × 860**.
- Unités `svh` et non `vh` pour les hauteurs plein écran.
- Bannière mobile resto : `h-[calc(100svh-96px)]` pour ne pas être cachée par la barre collante.
- Sujet de la bannière centré par `left:50%; height:100%; translateX(-X%)` plutôt que `object-position`.
- Nom du resto au-dessus de l'image : hauteur `clamp(150px, 24svh, 200px)`, taille en `vw`.
- Liens de nav secondaires masqués sous 720-980 px, CTA principal conservé.
- `viewport-fit=cover` + `env(safe-area-inset-*)` partout.

### 1.10 Niveau de finition attendu

**[DÉDUIT]** Niveau agence. Concrètement, un livrable n'est pas fini sans :
- Mode sombre propre ou choix assumé d'un seul thème (commenté dans le code).
- Focus clavier visible (`:focus-visible` dans la couleur d'accent).
- Contrastes lisibles, cibles tactiles ≥ 44 px.
- Statut d'ouverture en direct (commerces).
- Mentions légales, confidentialité, mention allergènes / alcool / tabac selon le cas.
- Données structurées, sitemap, robots, image de partage, favicon (site en production).

---

## PARTIE 2 — LES CRÉATIONS DE RÉFÉRENCE

> **Limite** : je ne peux pas savoir lesquelles tu as « particulièrement aimées », faute d'accès à tes retours. Je les classe par **indices objectifs** : un skill entier construit dessus, réutilisation comme référence, nombre de versions, mise en avant dans ton portfolio.

### 2.1 Chez Mario Erstein — LA référence

- **Indices** : c'est le **modèle officiel** de ton skill (« un site comme Chez Mario »), le dossier `chez-mario/` du dépôt GitHub `kerimerg/noya` sert de base à tout nouveau resto, et c'est la **réalisation n°1** de la vitrine SITEO. Artefact partagé par lien.
- **Contexte** : snack à Erstein (67) — kebab, burgers, tacos.
- **DA** : univers jeu de plateforme, couleurs primaires saturées sur fond crème/ciel, Lilita One + Nunito, encre `#1F1A17`.
- **Ce qui a fonctionné [CONSTATÉ dans styles.md, « fondamentaux à garder »]** : titres énormes avec contour et ombre décalée, bordures 3 px encre, coins très arrondis, ombres pleines décalées, boutons qui s'enfoncent, apparitions avec rebond, lettres qui sautent, photos partout, barre collante mobile, fond clair.
- **Détails différenciants [CONSTATÉ]** : nom du resto en HTML avec lettres de couleurs alternées et rotation (`HeroTitle`), mosaïque « On mange quoi ? », formule menu mise en avant pour augmenter le panier, horaires en direct.
- **Corrections intégrées** : toute la liste de `pieges.md` (voir document C).
- **Attention droits** : l'univers évoque une licence de jeu vidéo connue ; le skill prévoit de prévenir une fois du risque juridique, de le noter dans `site.ts` et les mentions légales, puis de respecter le choix du client.

### 2.2 SITEO (site de l'agence) — le plus abouti techniquement

- **Indices** : le plus récent (2 nov.), le plus complexe (66 Ko de code, 18 fichiers), suivi d'une bannière dédiée deux jours plus tard.
- **DA** : « papier gaufré bleu nuit », or, Bodoni Moda + Jost + IBM Plex Mono, grain photographique en surimpression, bilingue FR/EN.
- **Sections** : hero avec carte de visite en 3D + 3 chiffres clés → réalisations dans des cadres navigateur + téléphone superposé, défilement au survol → méthode en 4 étapes numérotées → tarifs façon carte de restaurant (points de conduite) → studio : **chatbot qui pose les questions + devis papier qui se construit en direct** → tableau de bord admin des demandes.
- **Détails différenciants** : devis numéroté `SITEO-2026-XXXX`, acompte/solde calculés, sceau doré « Demande reçue », données stockées dans la base de l'artefact avec droits admin.
- **À reproduire** : le principe « le prix se construit sous les yeux du client ».

### 2.3 Bannière SITEO

- **Contexte** : hero animé pour l'agence, sur fond « drone au-dessus d'une ville de nuit » simulé en canvas (la vraie vidéo remplacera la simulation).
- **Détail clé** : animation du jeu de mots en 5 s, documentée dans la page même (section ivoire qui explique chaque étape avec son minutage). **[DÉDUIT]** Tu aimes qu'on t'explique ce qu'on a fait, dans le livrable.

### 2.4 Au Vieux Pressoir — maquette de prospection

- **Contexte** : winstub de la Petite France. Contenu d'exemple, bandeau « Maquette – proposition de site », `noindex`.
- **DA** : patrimoine alsacien sobre, Gloock + Karla, colombages en SVG à 13 % d'opacité.
- **Détails** : FR/DE (« l'allemand est un vrai argument à Strasbourg »), carte en onglets façon ardoise, statut ouvert/fermé, formulaire de réservation, avis en placeholders explicites, bloc `CONFIG` en tête de script « PERSONNALISER ICI ».
- **À reproduire** : la maquette de démarchage **personnalisable en 2 minutes** par un objet de configuration.

### 2.5 GOIA Lounge

- **Contexte** : chicha lounge à Kehl (Allemagne, frontière). FR/DE/EN.
- **DA** : nuit chaude, corail + sauge + or, serif Didot.
- **Détails** : réservation en 3 étapes (nombre de personnes → calendrier avec disponibilités → horaire), carte OpenStreetMap (Leaflet), carte du menu en fiches numérotées 01/02/03, mention 18+ et avertissement santé.

### 2.6 BOWLY'S + Logo Bowlys

- **Contexte** : ton propre fast-food. Site en Next.js (Archivo + Roboto Condensed, rouge profond + jaune), box de petits lahmacuns + dürüm à composer en 3 étapes, bandeau défilant « BOWLY'S • LAHMACUN • BOX • DÜRÜM ».
- **Logo** : planche de marque complète (logo sur rouge, sur blanc, variantes, palette de 5 couleurs, mises en situation avatar). Idée : **le O est un bol vu de dessus avec un manti dedans** ; le manti seul sert d'icône.
- **[DÉDUIT]** Le concept a évolué (le logo évoque le manti, le site est centré sur le lahmacun) : vérifier avec toi lequel est à jour.

### 2.7 Novaluxe – Page d'accueil (canevas Design)

- **DA** : « le luxe discret », Syncopate + Inter Tight, noir/pierre/bronze, angles droits, capitales espacées, bandeau d'annonce noir.
- **Détails** : réassurance en 4 pictos, guide des tailles en tableau, FAQ en accordéon, newsletter, tutoiement, placeholders `[À REMPLIR]`, couleur d'accent réglable (4 options).

### 2.8 Canarinho Store

- **DA** : couleurs du Brésil, titre géant condensé « VESTE / BRÉSIL », bande vert/bleu.
- **Détails** : commande sans paiement en ligne (formulaire → base de données → rappel), sélecteur de taille en pastilles, quantité ±, récapitulatif qui se met à jour.

---

## PARTIE 3 — APPROCHE TECHNIQUE

### 3.1 Choix habituels

| Sujet | Site client en production | Maquette / artefact de démo |
|---|---|---|
| Framework | **Next.js statique** (`output: "export"`) + **Tailwind** | HTML/CSS/JS en un seul fichier |
| Hébergement | **Cloudflare Pages gratuit** (build `npm run build`, sortie `out`, dossier racine = slug) | Artefact Claude (lien privé → bouton Partager) |
| Polices | Auto-hébergées `next/font/local` | Google Fonts |
| Données | `src/content/menu.ts` (toute la carte) + `src/content/site.ts` (infos du commerce) ; rien en dur ailleurs | Objet `CONFIG` + dictionnaire `I18N` en tête de script |
| Style | Couleurs dans `tailwind.config.ts`, polices dans `layout.tsx`, décors dans `components/Deco.tsx` | Variables CSS `:root` |
| Plan | Lien Google Maps / OpenStreetMap si coordonnées GPS | Lien Google Maps |
| Tests | `tsc --noEmit`, `eslint`, `npm run build`, **Playwright** + captures iPhone/PC | — |
| Code source | Dépôt GitHub `kerimerg/noya` | — |

### 3.2 Composants nommés dans le modèle (Chez Mario)

`HeroTitle`, `CarouselArrows`, `CallLink`, `Deco`, attribut `data-reveal`, classes `.outlined`, `.hero-word`, `shadow-pop`. Scripts : `scripts/crop-photos.mjs`, `scripts/upscale.cjs`, `scripts/extract-logo.mjs`, `scripts/serve.mjs`, `build-preview.mjs` (aperçu artefact), `npm run images`.

### 3.3 Conformité intégrée (France)

Pages `/mentions-legales` et `/confidentialite`, hébergeur Cloudflare cité, médiateur de la consommation, prix TTC service compris, mention allergènes, mention alcool, « photos non contractuelles », JSON-LD `Restaurant`, sitemap, robots, Open Graph, favicon, icône Apple.

### 3.4 Choix propres à un projet

- Base de données d'artefact + rôles admin : SITEO, Canarinho.
- Animation canvas : Bannière SITEO.
- Leaflet / OpenStreetMap : GOIA.
- Canevas Design avec réglages (`data-props`) : Novaluxe.
- Trilingue : GOIA ; bilingue FR/DE : Pressoir ; FR/EN : SITEO.
