# Conformité (France) — checklist avant mise en ligne

## Pages obligatoires
- **Mentions légales** (`/mentions-legales`) : éditeur (raison sociale, forme, capital, adresse, SIRET, RCS, TVA, téléphone, e-mail), directeur de la publication, hébergeur (Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, USA — +1 (888) 993-5273), médiateur de la consommation, propriété intellectuelle, droit applicable.
- **Confidentialité** (`/confidentialite`) : aucune donnée collectée par le site, pas de cookie de mesure ; préciser ce que fait le plan Google et les liens sortants (Instagram, Facebook, livraison).

## Sur la carte
- Prix nets en euros TTC, service compris.
- Allergènes : mention « La liste des allergènes présents dans chaque plat est consultable par écrit au comptoir » (ou le détail si fourni).
- Alcool : « L'abus d'alcool est dangereux pour la santé, à consommer avec modération. » dès qu'une boisson alcoolisée apparaît.
- « Photos non contractuelles. »
- Pas de mention d'origine des viandes si le client ne la fournit pas (ne jamais l'inventer).

## RGPD
- Polices auto-hébergées, aucun appel à Google Fonts.
- Aucun Google Analytics / pixel sans bannière de consentement ; par défaut, aucun traceur.
- Plan : OpenStreetMap (aucun cookie) si les coordonnées GPS sont connues ; sinon Google Maps intégré, signalé dans la page Confidentialité.

## Technique
- Données structurées `Restaurant` (JSON-LD) avec adresse, téléphone, horaires, `sameAs` vers les réseaux.
- `sitemap.xml`, `robots.txt`, image de partage (`opengraph-image.tsx`), favicon et icône Apple.
- Liens `tel:` cliquables partout où apparaît le numéro.
