# DOCUMENT C — MÉTHODE DE COLLABORATION

> Conventions : **[CONSTATÉ]** écrit dans tes skills ou visible dans les artefacts · **[DÉDUIT]** conclusion tirée des livrables · **[INCONNU]** non retrouvable.
>
> **Limite importante** : je n'ai accès à aucune conversation passée. Ce document décrit la méthode **telle qu'elle est inscrite dans ton skill `site-vitrine-resto`** (qui codifie notre façon de travailler) et **telle qu'on la lit dans les livrables**. Il ne restitue pas de dialogues réels.

---

## 1. Comment passer de ton idée à une proposition visuelle

### Étape 1 — Le brief, en une seule fois [CONSTATÉ]
- Ne poser **que les questions dont la réponse manque**, en **une seule série**.
- Lire d'abord ce que tu as envoyé : les **photos du menu donnent les prix**, la devanture donne le nom exact, le logo donne les couleurs.
- Ce qui manque **ne bloque pas** : on avance avec des `TODO` (« À COMPLÉTER ») et on te liste ce qui reste à fournir à la fin.
- Liste de référence : nom exact, type, adresse, téléphone, horaires jour par jour (fermetures, coupures), carte complète, logo ; puis photos, réseaux, liens Uber Eats/Deliveroo, année d'ouverture, une phrase d'histoire, style voulu ; puis infos légales et nom de domaine.

### Étape 2 — Proposer 2 directions maximum [CONSTATÉ]
- **Une phrase + 3 couleurs** par direction, puis tu choisis.
- Partir des directions éprouvées (tableau dans le document B) ou d'une direction tirée du lieu.

### Étape 3 — Partir du modèle, jamais de zéro [CONSTATÉ]
- Site resto : copier `chez-mario/`, renommer partout, vider les photos, remplir `site.ts` et `menu.ts`.
- **[DÉDUIT]** Maquette rapide : réutiliser la structure Pressoir (objet `CONFIG` + `I18N` + sections standard).

### Étape 4 — Construire, vérifier, montrer [CONSTATÉ]
- Vérifier (types, lint, build, tests Playwright).
- **Faire et regarder les captures iPhone 390 × 664 et PC 1440 × 860 avant d'annoncer quoi que ce soit.**
- Publier l'aperçu en artefact, **toujours au même chemin pour garder le même lien**, et rappeler que le lien est privé tant qu'on ne clique pas sur **Partager**.

### Étape 5 — Livrer [CONSTATÉ]
Réponse finale = **ce qui a changé + le lien d'aperçu + la liste des infos encore à fournir**.

---

## 2. Comment prendre les décisions artistiques

**[DÉDUIT des livrables]** :
1. **Chercher le sujet dans le réel** : matière, lieu, produit, culture (colombages et grès de la cathédrale ; couleurs de la Seleção ; papier gaufré pour une agence qui se veut artisanale).
2. **Choisir un registre** : premium sombre/doré (agence, lounge, marque de mode) ou chaleureux/clair (restauration).
3. **Une police de titre forte**, une police de lecture sobre.
4. **Nommer les variables d'après la matière** (`--timber`, `--flute`) : la DA se lit dans le code.
5. **Écrire en commentaire en tête du CSS** l'idée de mise en page en une phrase (présent dans SITEO, Pressoir, Bannière, Logo Bowlys).
6. **Garder les fondamentaux « premium »** même quand le style change (voir B §2.1).

## 3. Comment gérer une demande imprécise

**[CONSTATÉ + DÉDUIT]** :
- Ne pas bloquer : **une première version complète avec hypothèses visibles** (placeholders, `TODO`, bandeau « Maquette – contenu d'exemple »).
- **Jamais d'invention** pour combler (prix, horaires, avis, adresses, SIRET).
- Pour les infos chiffrées (Bowlys) : 1-2 questions maximum, puis une première version avec hypothèses explicites.

## 4. Comment anticiper tes attentes

**[DÉDUIT]** Sans que tu le demandes, un livrable contient :
- Version **mobile soignée** et barre d'action collante.
- **Bilinguisme FR/DE** si le commerce est à Strasbourg ou de l'autre côté du Rhin.
- **Statut ouvert/fermé** calculé en direct.
- **Liens d'appel** cliquables et itinéraire.
- **Mentions légales et confidentialité** au pied.
- **Mode sombre** et **réduction des animations** gérés.
- Un **objet de configuration** pour adapter vite la maquette à un autre client.
- Pour tes propres marques : **prix clairs, devis détaillé, acompte**.

## 5. Comment structurer les réponses

**[CONSTATÉ dans le skill]** : français, direct. Après livraison : changements, lien, ce qui manque.
**[CONSTATÉ dans les skills Bowlys]** : calculs en tableaux, hypothèses explicites, « toujours un livrable prêt à l'emploi », « chaque action liée à un indicateur et un coût ».
**[INCONNU]** : ta tolérance à la longueur des réponses et ton usage ou non des listes. **[CONSTATÉ]** Tes skills s'adressent à Claude en le tutoyant ; les textes Novaluxe tutoient aussi le client final, alors que SITEO, Pressoir et Canarinho vouvoient.

## 6. Comment réaliser les itérations

**[CONSTATÉ]** :
- **Même lien** d'artefact d'une version à l'autre.
- `npm run images` **incrémental** : ne jamais tout régénérer (AVIF : 30 min et plus) et **annoncer une durée honnête** quand c'est long.
- **[DÉDUIT]** Modifier seulement ce qui est demandé ; garder la structure validée.

## 7. Comment arbitrer esthétique / fonctionnalité / performance

**[CONSTATÉ]** :
- Le **statique** gagne (pas de base, pas d'admin) sauf besoin réel (SITEO, Canarinho).
- La **conformité** gagne sur l'esthétique (polices locales, pas de traceur, plan OSM sans cookie si possible).
- Le **mobile** gagne sur le bureau.
- La performance compte (AVIF/WebP), mais une **belle photo** reste prioritaire pour un resto.
- **Droits d'auteur** : prévenir une fois du risque si le client veut un personnage ou une marque connue, puis respecter son choix (règle de ton skill).

---

## 8. TES CORRECTIONS → RÈGLES

> Source : `pieges.md` de ton skill (« Pièges déjà rencontrés et la bonne solution »). Ce sont des problèmes réellement rencontrés et corrigés. Je ne peux pas te dire mot pour mot comment tu les as signalés.

### Bannière mobile
| Problème rencontré | Règle |
|---|---|
| La barre « Voir la carte / Appeler » cachait le bas de l'image | Bannière mobile = `h-[calc(100svh-96px)]`, en `svh` (barres Safari) |
| Le personnage se décentrait selon la hauteur d'écran | `position:absolute; left:50%; width:auto; height:100%` + `translateX(-X%)` ; ne pas compter sur `object-position` |
| Le nom du resto était coupé | Hauteur `clamp(150px, 24svh, 200px)`, taille en `vw` |
| Le haut de l'aperçu paraît masqué | C'est la barre de l'appli Claude, pas un bug : le dire |

### Carrousel mobile
| Problème | Règle |
|---|---|
| Les cartes hors écran restaient invisibles | `data-reveal` sur la liste entière, pas sur chaque carte |
| Le glisser horizontal ne marchait pas dans l'appli | Toujours des flèches ← → qui bouclent |
| On ne voyait pas qu'il y avait d'autres cartes | Cartes à ~64 % de largeur |

### Logo
| Problème | Règle |
|---|---|
| Clic sur le logo depuis l'accueil : « il ne se passe rien » | Le logo remonte en haut (`scrollTo`) |
| Rayures sur le logo détouré | Pas de flou sur le masque ; adoucir seulement les bords |

### Téléphone et plan
| Problème | Règle |
|---|---|
| `tel:` et iframe Google ne marchent pas dans l'aperçu | Fenêtre avec le numéro + lien vers le plan dans l'aperçu (c'est normal) |
| Sur ordinateur, `tel:` ne fait rien | Copier le numéro et afficher un message |
| Géocodage OSM bloqué | Google Maps depuis l'adresse tant qu'on n'a pas les coordonnées GPS |

### Images et outils
| Problème | Règle |
|---|---|
| Régénération AVIF interminable | Script incrémental, ne pas vider `public/img`, annoncer la durée |
| `pkill -f serve.mjs` tuait le shell | `pkill -f "^node scripts/serve.mjs"` |
| Installation Playwright inutile | Chromium est dans `/opt/pw-browsers` ; ne jamais lancer `playwright install` |

### Règles générales qui en découlent
**Toujours** : tester sur iPhone d'abord · regarder les captures avant d'annoncer · même lien d'aperçu · lister les `TODO` restants · flèches sur tout carrousel · logo cliquable qui remonte · `svh` sur mobile.
**Jamais** : inventer une info · repartir de zéro · fond sombre pour un resto (sauf lieu de nuit) · Google Fonts en direct sur un site client · traceur sans consentement · régénération complète des images.

### Critères qui te font valider un design [DÉDUIT]
1. Identité forte et liée au commerce.
2. Rien de cassé sur iPhone.
3. Action principale évidente (appeler, réserver, commander).
4. Infos justes ou clairement signalées comme à compléter.
5. Lien partageable au client.

---

## 9. CONSIGNES OPÉRATIONNELLES POUR UN NOUVEAU CLAUDE

1. **Réponds en français.** Les sites sont en français ; ajoute l'allemand pour Strasbourg/Alsace/Kehl, l'anglais si c'est une clientèle internationale.
2. **Quand on te demande un site de resto**, applique le skill `site-vitrine-resto` (s'il est installé) et le dépôt `kerimerg/noya`. Sans lui, reproduis sa logique : Next.js statique + Tailwind, `menu.ts` + `site.ts`, Cloudflare Pages.
3. **Commence par lire tout ce qui est fourni** (photos de menu, logo, devanture) avant de poser des questions. Puis une seule série de questions, puis tu construis.
4. **Propose 2 directions maximum** (une phrase + 3 couleurs), sauf si la direction est évidente ou déjà donnée.
5. **Ne laisse pas de vide inventé** : placeholders explicites `[À REMPLIR]`, `TODO`, bandeau « maquette » si contenu d'exemple.
6. **Avant de dire « c'est prêt »**, vérifie le rendu iPhone 390 × 664 puis PC 1440 × 860, et applique la liste des pièges ci-dessus.
7. **Livre** : lien d'artefact (même chemin à chaque version, rappel du bouton Partager) + ce qui a changé + ce qui manque.
8. **Pour SITEO et la prospection** : le ton est premium, sobre, rassurant ; prix lisibles ; acompte 30 % / solde 70 %.
9. **Pour Bowlys** : calculs en tableaux, hypothèses explicites, renvoi à l'expert-comptable et aux sources officielles.
10. **Reste court en conversation** ; le détail va dans le livrable. *(Déduit, à confirmer avec l'utilisateur.)*
