# Atelier Lenoir — site vitrine d'une agence de peinture

Site statique haut de gamme, noir et blanc : Next.js (export statique) + Tailwind CSS + GSAP (ScrollTrigger, SplitText) + Lenis pour le défilement fluide. Aucun serveur, aucune base de données : le dossier `out/` se met en ligne tel quel (Cloudflare Pages, Netlify, OVH…).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère out/
npm start          # sert out/ sur http://localhost:4173
```

## Les fichiers à connaître

| Je veux changer…                                                         | Fichier                     |
| ------------------------------------------------------------------------ | --------------------------- |
| coordonnées, prestations, réalisations, chiffres, avis, mentions légales | `src/content/site.ts`       |
| couleurs et polices                                                      | `tailwind.config.ts`        |
| animations                                                               | `src/components/Motion.tsx` |

Les valeurs marquées `À REMPLACER` dans `site.ts` sont des exemples (téléphone, e-mail, SIRET, chiffres, avis) : remplacez-les par les vraies informations avant la mise en ligne.

## Photos

Les visuels sont des illustrations monochromes dessinées en SVG (`src/components/Plate.tsx`). Pour afficher une vraie photo de chantier : déposez-la dans `public/img/` puis, dans `site.ts`, ajoutez `image: "/img/mon-chantier.jpg"` à la réalisation. Elle s'affiche automatiquement en noir et blanc.

## Animations

Tout est piloté par des attributs posés dans le HTML, sans code à écrire :

| Attribut             | Effet                                              |
| -------------------- | -------------------------------------------------- |
| `data-split`         | titre révélé ligne par ligne                       |
| `data-reveal`        | fondu montant (`data-delay="0.2"` pour décaler)    |
| `data-clip`          | visuel dévoilé par un rideau                       |
| `data-parallax="12"` | parallaxe                                          |
| `data-words`         | texte qui s'allume mot à mot au défilement         |
| `data-count="640"`   | compteur animé                                     |
| `data-line`          | filet qui se trace                                 |
| `data-hscroll`       | galerie horizontale épinglée (tablette/ordinateur) |

Les visiteurs qui ont activé « réduire les animations » voient le site sans mouvement, et le contenu reste lisible même si le JavaScript ne se charge pas.

## Formulaire

Le site étant statique, le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie à l'adresse de `site.email`. Pour recevoir les demandes sans passer par la messagerie, branchez un service comme Formspree ou Web3Forms.
