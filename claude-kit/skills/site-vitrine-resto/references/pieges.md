# Pièges déjà rencontrés (et la bonne solution)

## Bannière mobile
- La barre collante « Voir la carte / Appeler » cache le bas de l'image : la bannière mobile fait exactement `h-[calc(100svh-96px)]` (svh, pas vh : Safari a des barres).
- Le personnage doit être centré : image en `position:absolute; left:50%; width:auto; height:100%` + `translateX(-X%)` où X = position du sujet dans l'image. Plus fiable que `object-position` qui dérive selon la hauteur d'écran.
- Le nom du resto au-dessus de l'image doit rester entier : hauteur `clamp(150px,24svh,200px)`, taille en `vw`.
- Le haut de l'aperçu dans l'appli Claude est masqué par sa propre barre : ce n'est pas un bug du site.

## Carrousel mobile (« On mange quoi ? »)
- Ne pas mettre `data-reveal` sur chaque carte : les cartes hors écran à droite restent invisibles. Le mettre sur la liste entière.
- Toujours ajouter des flèches ← → (composant `CarouselArrows`), qui bouclent au bout : dans l'appli Claude, le glisser horizontal peut être intercepté.
- Cartes à ~64 % de largeur pour qu'on voie qu'il y en a d'autres.

## Logo
- Le clic sur le logo depuis l'accueil doit remonter en haut (`scrollTo`) sinon « il ne se passe rien ».
- Détourage : pas de flou sur le masque (rayures) ; adoucir seulement les bords.

## Téléphone et plan
- Dans l'aperçu Artifact, `tel:` et les iframes Google ne marchent pas : le script `build-preview.mjs` remplace l'appel par une fenêtre avec le numéro et le plan par un lien.
- Sur ordinateur, le lien `tel:` copie aussi le numéro et affiche un message (`CallLink`).
- Le géocodage (Nominatim/OSM) est souvent bloqué : utiliser Google Maps à partir de l'adresse tant que le client n'a pas donné les coordonnées GPS.

## Images
- AVIF en effort élevé sur beaucoup d'images = 30 min+. Le script est incrémental : ne supprime pas `public/img` sans raison et annonce une durée honnête.
- Agrandissement IA ×2 (ESRGAN, ~1 min par image) seulement pour les photos découpées depuis un panneau.

## Shell
- `pkill -f serve.mjs` tue aussi le shell qui le lance : utiliser `pkill -f "^node scripts/serve.mjs"`.
- Playwright : Chromium est dans `/opt/pw-browsers` ; ne jamais lancer `playwright install`.
