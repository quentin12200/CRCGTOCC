# Formation Syndicale — CGT Comité Régional Occitanie

Espace pédagogique en ligne pour la formation syndicale secteur privé, CGT Occitanie.

## Contenu

| Répertoire | Contenu |
|---|---|
| `presentations/` | Diaporamas HTML autonomes (autocontenu, logo base64) |
| `documents/` | Déroulés pédagogiques et argumentaires (DOCX) |
| `index.html` | Page d'accueil du site |
| `vercel.json` | Configuration Vercel (headers, cache, routing) |

### Modules disponibles

- **AT/MP 2 jours** — Accidents du Travail & Maladies Professionnelles
- **Prévoyance/Invalidité demi-journée** *(fichier à déposer : `presentations/Prevoyance_Invalidite_CGT_Occitanie.html`)*

---

## Déploiement Vercel

### Premier déploiement

```bash
npm i -g vercel
vercel --prod
```

Répondre aux prompts : projet existant ou nouveau, répertoire racine = `.` (défaut).

### Mettre à jour le site

```bash
# Après modification d'un fichier
git add <fichier>
git commit -m "Mise à jour <description>"
git push
# Vercel redéploie automatiquement si connecté au repo GitHub
```

Ou en ligne de commande directement :

```bash
vercel --prod
```

---

## Ajouter ou remplacer une présentation HTML

1. Déposer le fichier dans `presentations/` avec le nom exact attendu
2. Vérifier que le fichier est bien autonome (pas d'assets externes)
3. Pousser sur la branche principale — le déploiement se fait automatiquement

---

## Licence

Usage interne CGT Occitanie exclusivement. Diffusion publique interdite.  
Les contenus pédagogiques sont propriété de la CGT Comité Régional Occitanie.
