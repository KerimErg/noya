# Kit Claude — SITEO

Source commune pour tous mes comptes Claude. Quand je modifie un skill ou une règle, je le fais ici, puis je mets à jour chaque compte.

## Contenu

| Dossier | À quoi ça sert |
|---|---|
| `documents/` | A : profil créatif · B : direction artistique et design system · C : méthode de travail · D : master prompt |
| `skills/` | Mes skills en clair (pour les lire et les modifier) |
| `skills-zip/` | Les mêmes skills prêts à importer dans Claude |
| `artefacts-exemples/` | Pages de référence : Chez Mario, SITEO (avec images), bannière SITEO, Au Vieux Pressoir |

## Installer sur un compte Claude

1. **Paramètres > Capabilities** : activer « Code execution and file creation ».
2. Section **Skills** > **Upload skill** : importer chaque zip de `skills-zip/`, sans le décompresser.
3. Créer un **Projet** « SITEO – Sites clients » :
   - Instructions : coller le texte de `documents/D-master-prompt.md` (entre les lignes `=====`).
   - Fichiers : ajouter `documents/A`, `B`, `C` et les pages de `artefacts-exemples/`.
4. Connecter GitHub pour que Claude puisse lire ce dépôt (modèle `chez-mario/`).

## Mettre à jour un skill

1. Modifier les fichiers dans `skills/<nom>/`.
2. Refaire le zip : depuis `claude-kit/skills/`, lancer `zip -r ../skills-zip/skill-<nom>.zip <nom>`.
3. Sur chaque compte Claude : supprimer l'ancien skill, importer le nouveau zip.
