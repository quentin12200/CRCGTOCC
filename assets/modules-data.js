/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Catalogue des modules de formation (modules-data.js)
   Source unique pour les cartes de la page formateur, la recherche
   et l'indicateur hors-ligne.

   Chaque module a toujours les 4 rubriques du kit :
     guide      : guide de l'animateur·ice (déroulé, livret, notes)
     support    : support stagiaire (fiche mémo, carnet, document à remettre)
     quiz       : quiz live (live: true) ou solo
     evaluation : évaluation de la formation
   Une rubrique vide s'affiche « À venir ». Un élément sans href est une
   mention sans lien. Pour ajouter une ressource : l'ajouter ici, c'est tout.
═══════════════════════════════════════════════════════════════ */
window.CGT_FAMILLES = [
 {
  "id": "vie-syndicale",
  "titre": "Vie syndicale",
  "sous": "UD CGT Aveyron",
  "desc": "Découvrir la CGT, puis faire vivre son syndicat.",
  "cls": "vs"
 },
 {
  "id": "sante-travail",
  "titre": "Santé au travail, AT/MP et protection sociale",
  "sous": "",
  "desc": "Défendre les accidenté·es et les malades, prévenir les risques. Secteur privé et fonction publique.",
  "cls": "sst"
 },
 {
  "id": "handicap",
  "titre": "Handicap et emploi",
  "sous": "",
  "desc": "Négocier un accord handicap dans l'entreprise, défendre les travailleur·ses handicapé·es.",
  "cls": "hd"
 }
];

window.CGT_MODULES = [
 {
  "id": "decouvrir-cgt",
  "famille": "vie-syndicale",
  "titre": "Découvrir la CGT",
  "duree": "2 heures",
  "type": "Formation interactive",
  "desc": "Pour les nouveaux adhérent·es et les salarié·es pas encore syndiqué·es : les métiers des stagiaires, la CGT construite en partant du syndiqué (section, syndicat, UL, unions professionnelles, UD, fédérations, confédération), les valeurs et l'adhésion.",
  "ouvrir": {
   "href": "/formation-ud12/decouvrir-cgt.html",
   "label": "Ouvrir la formation"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Guide de l'animateur·ice",
     "href": "/documents/Decouvrir_la_CGT_Guide_animateur.docx"
    }
   ],
   "support": [
    {
     "t": "Bulletin d'adhésion",
     "href": "/0%20FSG%20D%C3%A9couvrir%20la%20CGT/D1%20Bulletin%20d%27adh%C3%A9sion.docx"
    },
    {
     "t": "Présentation du syndicat",
     "href": "/0%20FSG%20D%C3%A9couvrir%20la%20CGT/D2%20Pr%C3%A9sentation%20du%20syndicat.docx"
    }
   ],
   "quiz": [],
   "evaluation": []
  },
  "mots": "adhésion syndicat union locale fédération confédération nouveaux adhérents",
  "icone": {
   "bg": "linear-gradient(135deg,#C8102E 0%,#E2001A 60%,#FFD200 140%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <circle cx=\"24\" cy=\"36\" r=\"4\" stroke=\"white\" stroke-width=\"2.5\"/> <path d=\"M24 32V24M24 24L13 17M24 24l11-7\" stroke=\"white\" stroke-width=\"2.2\" stroke-linecap=\"round\"/> <circle cx=\"13\" cy=\"15\" r=\"3.5\" stroke=\"#FFD200\" stroke-width=\"2\"/> <circle cx=\"35\" cy=\"15\" r=\"3.5\" stroke=\"#FFD200\" stroke-width=\"2\"/> <circle cx=\"24\" cy=\"8\" r=\"3.5\" stroke=\"white\" stroke-width=\"2\"/> <path d=\"M24 20v-8.5\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/> </svg>"
  }
 },
 {
  "id": "fonctionnement-statutaire",
  "famille": "vie-syndicale",
  "titre": "Fonctionnement statutaire d'un syndicat",
  "duree": "1 journée",
  "type": "Formation interactive",
  "desc": "Rôle des adhérent·es, élu·es et mandaté·es, CE, bureau et SG, AG et congrès, cotisations, articulation syndicat / UL / UD / Fédé. Avec 4 modules interactifs et les ressources CGT.",
  "ouvrir": {
   "href": "/formation-ud12/index.html",
   "label": "Ouvrir la formation"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Aide-mémoire formateur·ices",
     "href": "/documents/Aide_Memoire_Formateurs_CGT.docx"
    },
    {
     "t": "Fiche descriptive de la formation",
     "href": "/documents/Fiche_descriptive_Fonctionnement_statutaire.docx"
    }
   ],
   "support": [
    {
     "t": "Support stagiaire à imprimer",
     "href": "/documents/Support_Stagiaires_Objectifs_CGT.docx"
    },
    {
     "t": "Le rôle de chacun, fiche à remettre",
     "href": "/documents/Role_de_chacun_dans_le_syndicat.docx"
    }
   ],
   "quiz": [
    {
     "t": "Quiz live",
     "href": "/quiz-live-host.html?set=vie-syndicale",
     "live": true
    },
    {
     "t": "Quiz solo",
     "href": "/quiz/quiz-vie-syndicale.html"
    }
   ],
   "evaluation": [
    {
     "t": "Évaluation de la formation",
     "href": "/evaluation-resultats.html?f=vie-syndicale"
    }
   ]
  },
  "mots": "statuts congrès bureau secrétaire général cotisations commission exécutive assemblée générale",
  "icone": {
   "bg": "linear-gradient(135deg,#7A0010 0%,#C8102E 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <circle cx=\"24\" cy=\"15\" r=\"6\" stroke=\"white\" stroke-width=\"2.5\"/> <circle cx=\"11\" cy=\"21\" r=\"4.5\" stroke=\"white\" stroke-width=\"2\"/> <circle cx=\"37\" cy=\"21\" r=\"4.5\" stroke=\"white\" stroke-width=\"2\"/> <path d=\"M13 40c0-6.08 4.92-11 11-11s11 4.92 11 11\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> <path d=\"M4 37c0-4 3-7 7-7M44 37c0-4-3-7-7-7\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/> </svg>"
  }
 },
 {
  "id": "atmp",
  "famille": "sante-travail",
  "titre": "Accidents du travail & maladies professionnelles",
  "duree": "2 jours",
  "type": "Présentation diaporama",
  "desc": "Régime AT/MP, reconnaissance, réparation, droits des accidenté·es et malades. Module complet pour militant·es et élu·es du CSE.",
  "ouvrir": {
   "href": "/presentations/Presentation_AT-MP_CGT.html",
   "label": "Ouvrir le diaporama"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Déroulé minuté — 2 jours",
     "href": "/deroulement.html"
    },
    {
     "t": "Livret formateur — Argumentaire",
     "href": "/argumentaire.html"
    },
    {
     "t": "Notes de l’animateur·ice intégrées au diaporama (mode présentateur, touche P)",
     "href": null
    }
   ],
   "support": [
    {
     "t": "Carnet de formation",
     "href": "/carnet-atmp.html"
    },
    {
     "t": "Fiche mémo AT/MP",
     "href": "/fiches-memo/fiche-atmp.html"
    },
    {
     "t": "Exercices & ateliers",
     "href": "/exercices-atmp.html"
    }
   ],
   "quiz": [
    {
     "t": "Quiz live — AT/MP",
     "href": "/quiz-live-host.html?set=atmp",
     "live": true
    },
    {
     "t": "Quiz live — Bilan du jour 1",
     "href": "/quiz-live-host.html?set=atmp-j1",
     "live": true
    },
    {
     "t": "Quiz solo — Droits & réparation",
     "href": "/quiz/quiz-atmp.html"
    },
    {
     "t": "Quiz solo — complet (25 questions)",
     "href": "/quiz-atmp.html"
    }
   ],
   "evaluation": [
    {
     "t": "Évaluation de la formation",
     "href": "/evaluation-resultats.html"
    }
   ]
  },
  "mots": "accident du travail maladie professionnelle IJ IPP rente consolidation faute inexcusable déclaration CPAM",
  "icone": {
   "bg": "linear-gradient(135deg,#8B0012 0%,#E2001A 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z\" stroke=\"white\" stroke-width=\"2.5\"/> <path d=\"M24 15v9l6 3.5\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> <rect x=\"20\" y=\"30\" width=\"8\" height=\"3\" rx=\"1.5\" fill=\"white\"/> <path d=\"M21 36h6\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/> </svg>"
  }
 },
 {
  "id": "prevention-sst",
  "famille": "sante-travail",
  "titre": "Prévention des risques — Diagnostic SST",
  "duree": "1 jour",
  "type": "Présentation diaporama",
  "desc": "Analyse des AT, DUER, plan de prévention, droits du CSE, droit d'alerte. Angle syndical CGT renforcé.",
  "ouvrir": {
   "href": "/presentations/Prevention_SST_CGT_Occitanie.html",
   "label": "Ouvrir le diaporama"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Notes de l’animateur·ice intégrées au diaporama (mode présentateur, touche P)",
     "href": null
    }
   ],
   "support": [
    {
     "t": "Fiche mémo Prévention SST",
     "href": "/fiches-memo/fiche-sst.html"
    }
   ],
   "quiz": [
    {
     "t": "Quiz solo — Prévention SST",
     "href": "/quiz/quiz-sst.html"
    }
   ],
   "evaluation": [
    {
     "t": "Évaluation commune (volet Prévention SST)",
     "href": "/evaluation-resultats.html"
    }
   ]
  },
  "mots": "prévention DUER DUERP risques CSE CSSCT droit d alerte danger grave imminent RPS",
  "icone": {
   "bg": "linear-gradient(135deg,#0D5C2E 0%,#1A9B52 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M24 6L8 14v10c0 9.5 6.8 18.4 16 20.8C33.2 42.4 40 33.5 40 24V14L24 6z\" stroke=\"white\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/> <path d=\"M24 6L8 14v10c0 9.5 6.8 18.4 16 20.8\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> <path d=\"M17 24l5 5 9-9\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </svg>"
  }
 },
 {
  "id": "prevoyance",
  "famille": "sante-travail",
  "titre": "Prévoyance & Invalidité",
  "duree": "Demi-journée",
  "type": "Présentation diaporama",
  "desc": "Garanties de prévoyance collective, régimes d'invalidité, incapacité de travail et complémentaires santé en entreprise.",
  "ouvrir": {
   "href": "/presentations/Prevoyance_Invalidite_CGT_Occitanie.html",
   "label": "Ouvrir le diaporama"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Notes de l’animateur·ice intégrées au diaporama (mode présentateur, touche P)",
     "href": null
    }
   ],
   "support": [
    {
     "t": "Fiche mémo Prévoyance & Invalidité",
     "href": "/fiches-memo/fiche-prevoyance.html"
    }
   ],
   "quiz": [
    {
     "t": "Quiz solo — Prévoyance",
     "href": "/quiz/quiz-prevoyance.html"
    }
   ],
   "evaluation": [
    {
     "t": "Évaluation commune (volet Prévoyance)",
     "href": "/evaluation-resultats.html"
    }
   ]
  },
  "mots": "prévoyance invalidité pension catégorie incapacité mutuelle maintien de salaire",
  "icone": {
   "bg": "linear-gradient(135deg,#5C3A0D 0%,#C87020 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <circle cx=\"24\" cy=\"16\" r=\"7\" stroke=\"white\" stroke-width=\"2.5\"/> <path d=\"M10 40c0-7.73 6.27-14 14-14s14 6.27 14 14\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> <path d=\"M30 28l3 3 6-6\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </svg>"
  }
 },
 {
  "id": "recours-cpam",
  "famille": "sante-travail",
  "titre": "Recours & contestations face à la CPAM",
  "duree": "Demi-journée",
  "type": "Présentation diaporama",
  "desc": "CRA, CMRA, pôle social, CRRMP, faute inexcusable : délais, procédures et arguments juridiques pour défendre les victimes d'AT/MP.",
  "ouvrir": {
   "href": "/presentations/Recours_Contestations_CPAM_CGT.html",
   "label": "Ouvrir le diaporama"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Notes de l’animateur·ice intégrées au diaporama (mode présentateur, touche P)",
     "href": null
    }
   ],
   "support": [],
   "quiz": [],
   "evaluation": []
  },
  "plus": [
   {
    "t": "Modèles de courriers",
    "href": "/courriers.html"
   },
   {
    "t": "Jurisprudence AT/MP",
    "href": "/jurisprudence.html"
   }
  ],
  "mots": "recours contestation CRA CMRA pôle social tribunal CRRMP faute inexcusable inopposabilité",
  "icone": {
   "bg": "linear-gradient(135deg,#7A0010 0%,#E2001A 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M24 8v32M12 14h24\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> <path d=\"M12 14l-6 12a6 6 0 0 0 12 0z\" stroke=\"white\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/> <path d=\"M36 14l-6 12a6 6 0 0 0 12 0z\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linejoin=\"round\"/> <path d=\"M16 40h16\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> </svg>"
  }
 },
 {
  "id": "atmp-fp",
  "famille": "sante-travail",
  "titre": "AT/MP dans la fonction publique",
  "duree": "Demi-journée",
  "type": "Présentation diaporama",
  "desc": "FPE, FPT, FPH : accident de service, maladie professionnelle, droits, indemnisations, F3SCT, CNRACL. Angle militant CGT avec notes formateur pour chaque diapo.",
  "ouvrir": {
   "href": "/presentations/ATMP_Fonction_Publique_CGT.html",
   "label": "Ouvrir le diaporama"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Notes de l’animateur·ice intégrées au diaporama (mode présentateur, touche P)",
     "href": null
    }
   ],
   "support": [
    {
     "t": "Guide complet AT/MP Fonction publique",
     "href": "/guide-atmp-fp.html"
    },
    {
     "t": "Fiche mémo AT/MP Fonction publique",
     "href": "/fiches-memo/fiche-atmp-fp.html"
    }
   ],
   "quiz": [
    {
     "t": "Quiz solo — Fonction publique",
     "href": "/quiz/quiz-fp.html"
    }
   ],
   "evaluation": []
  },
  "mots": "fonction publique accident de service CITIS fonctionnaire contractuel F3SCT CNRACL ATI",
  "icone": {
   "bg": "linear-gradient(135deg,#2D1A6B 0%,#5E35B1 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <rect x=\"8\" y=\"20\" width=\"32\" height=\"22\" rx=\"2\" stroke=\"white\" stroke-width=\"2.5\"/> <path d=\"M16 20V14a8 8 0 0 1 16 0v6\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> <circle cx=\"24\" cy=\"31\" r=\"3\" fill=\"#FFD200\"/> <line x1=\"24\" y1=\"34\" x2=\"24\" y2=\"38\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\"/> </svg>"
  }
 },
 {
  "id": "handicap",
  "famille": "handicap",
  "titre": "Négocier un accord handicap",
  "duree": "",
  "type": "Documents à télécharger",
  "desc": "Le guide CGT Handicap 2026, l'argumentaire CGT pour préparer et mener la négociation, et un modèle d'accord à compléter avec les revendications du syndicat.",
  "ouvrir": {
   "href": "/fiches-memo/fiche-handicap.html",
   "label": "Ouvrir la fiche mémo handicap"
  },
  "horsligne": true,
  "kit": {
   "guide": [
    {
     "t": "Argumentaire CGT pour la négociation",
     "href": "/documents/Argumentaire_CGT_negociation_accord_handicap.docx"
    }
   ],
   "support": [
    {
     "t": "Guide CGT Handicap 2026",
     "href": "/documents/cgt_-_guide_handicap_2026_cmjn.pdf"
    },
    {
     "t": "Modèle d'accord handicap à compléter",
     "href": "/documents/Modele_CGT_accord_handicap_a_completer.docx"
    }
   ],
   "quiz": [
    {
     "t": "Quiz solo — Handicap & emploi",
     "href": "/quiz/quiz-handicap.html"
    }
   ],
   "evaluation": []
  },
  "mots": "handicap RQTH OETH Agefiph accord référent handicap travailleur handicapé",
  "icone": {
   "bg": "linear-gradient(135deg,#0D3C7A 0%,#1565C0 100%)",
   "svg": "<svg viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <rect x=\"11\" y=\"6\" width=\"26\" height=\"36\" rx=\"2\" stroke=\"white\" stroke-width=\"2.5\"/> <path d=\"M17 15h14M17 21h14M17 27h8\" stroke=\"white\" stroke-width=\"2.2\" stroke-linecap=\"round\"/> <path d=\"M26 34l3 3 6-6\" stroke=\"#FFD200\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </svg>"
  }
 }
];
