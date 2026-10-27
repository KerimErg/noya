# Directions de style

Propose 2 directions maximum, avec une phrase et 3 couleurs chacune. Une fois choisie, tout passe par `tailwind.config.ts` (couleurs), `src/app/layout.tsx` (polices) et `src/components/Deco.tsx` (décors).

## Fondamentaux à garder quel que soit le style
- Titres énormes, police ronde ou grasse, contour encre (`.outlined`) et ombre décalée
- Bordures 3 px couleur encre, coins très arrondis, ombres pleines décalées (`shadow-pop`)
- Boutons qui s'enfoncent au clic, apparitions avec rebond (`data-reveal`), lettres qui sautent
- Photos partout : bannière plein écran, mosaïque « On mange quoi ? », photo par rubrique
- Barre collante « Voir la carte / Appeler » en bas sur mobile
- Fond clair et appétissant (crème), jamais trop sombre

## Directions éprouvées
| Direction | Ambiance | Couleurs | Polices |
|---|---|---|---|
| Jeu de plateforme (Chez Mario) | Fun, familial, nostalgique | rouge #E52521, vert #2DA84B, bleu #1D5FD6, jaune #FFC81F, ciel #63C7F7 | Lilita One + Nunito |
| Street food néon | Nuit, urbain, jeune | noir #111, rose #FF2E88, cyan #19E6FF, jaune #FFE600 | Bebas Neue + Inter |
| Marché frais | Healthy, bowls, salades | vert sauge #7FB77E, crème #FFF7EA, terracotta #E07A5F | Fraunces + DM Sans |
| Trattoria | Pizzeria, italien | rouge tomate #D7263D, vert basilic #2E7D32, crème #FFF8E7 | Abril Fatface + Nunito |
| Diner américain | Burgers, milkshakes | rouge #E63946, bleu ciel #A8DADC, crème #F1FAEE, damier | Shrikhand + Work Sans |
| Bazar oriental | Kebab, lahmacun, mezzés | safran #F4A300, grenade #B23A48, turquoise #1B998B, crème | Baloo 2 + Nunito |

Les polices doivent être **auto-hébergées** : paquet `@fontsource/...`, fichier `.woff2` copié puis chargé via `next/font/local`.

## Titre de bannière
Le nom du resto en HTML (pas dans l'image) : mot principal en lettres de couleurs alternées, contour épais (`.hero-word`), légère rotation alternée, lettres qui sautent une à une. Même composant (`HeroTitle`) sur mobile (au-dessus de l'image) et sur PC (posé dans l'image).
