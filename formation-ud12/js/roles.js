/**
 * Formation CGT - Page « Rôles dans le syndicat »
 * Les cartes et le quiz sont générés à partir des mêmes données (ROLES / QUIZ_POOL)
 * pour rester cohérents : ajouter un rôle = ajouter une entrée ci-dessous.
 */

const CATEGORIES = {
  syndicat: "Instances du syndicat",
  responsables: "Responsables",
  entreprise: "Mandats dans l'entreprise",
  appui: "Appui aux salarié·es"
};

const ROLES = [
  {
    id: "adherent",
    cat: "syndicat",
    title: "Adhérent·e",
    icon: "🧑‍🤝‍🧑",
    question: "Quels sont les droits et devoirs d'un·e adhérent·e CGT ?",
    designation: "Tout·e salarié·e ou ancien·ne salarié·e, sans distinction de statut, d'opinion politique, religieuse ou philosophique, ni de nationalité.",
    rendCompte: "Décide avec les autres syndiqué·es : le congrès des syndiqué·es est l'instance souveraine.",
    missions: [
      "Droit : s'exprimer librement — les syndiqué·es sont égaux, libres et responsables",
      "Droit : être informé·e et participer aux formations syndicales",
      "Droit : participer à toutes les décisions sur l'orientation du syndicat",
      "Devoir : respecter les orientations et les règles de vie de la CGT",
      "Devoir : ne pas porter atteinte aux intérêts et à l'image de la CGT",
      "Devoir : payer régulièrement sa cotisation (1 % du salaire ou de la pension nette) — sans cotisation à jour, on ne peut pas se prévaloir du syndicat",
      "Reçoit un livret d'accueil à son arrivée, et a accès à la formation syndicale tout au long de sa vie syndicale",
      "Reste syndiqué·e quand sa situation change (nouvel employeur, intérim, retraite…) : la CGT suit son parcours"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 1, 5 et 6 ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "congres",
    cat: "syndicat",
    title: "Congrès / Assemblée générale",
    icon: "🏛️",
    question: "Pourquoi dit-on que le congrès est l'instance souveraine du syndicat ?",
    designation: "Le congrès réunit tous les syndiqué·es à jour de leurs cotisations. Il est convoqué par la CE, au moins un mois à l'avance, avec l'ordre du jour.",
    rendCompte: "Aux syndiqué·es elles-mêmes et eux-mêmes : c'est l'instance la plus haute.",
    missions: [
      "Débat de l'activité, de l'orientation et des finances du syndicat",
      "Se prononce par un vote (à mains levées ou à bulletins secrets) sur les rapports présentés",
      "Élit la commission exécutive et la commission financière de contrôle",
      "Est le seul à pouvoir modifier les statuts (majorité des deux tiers)",
      "Entre deux congrès, une assemblée générale est convoquée par la CE au moins une fois par an",
      "Un congrès extraordinaire peut être demandé par la CE ou par au moins un tiers des syndiqué·es",
      "Doit être préparé pour que les syndiqué·es puissent réellement débattre et décider de l'activité, du programme revendicatif, de la direction et des mandats"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 7 et 11 ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "ce",
    cat: "syndicat",
    title: "Commission exécutive",
    icon: "🧩",
    question: "Quel est le rôle de la commission exécutive (CE) ?",
    designation: "Élue par le congrès, parmi les syndiqué·es à jour de leurs cotisations (les membres sortants sont rééligibles).",
    rendCompte: "Au congrès.",
    missions: [
      "Dirige le syndicat entre deux congrès, avec les pouvoirs les plus étendus dans le cadre des statuts et des orientations du congrès",
      "Se réunit au moins une fois par mois et décide à la majorité (moitié des voix plus une)",
      "Élit le bureau syndical, composé au minimum d'un·e secrétaire général·e et d'un·e trésorier·ère",
      "Approuve chaque année les comptes arrêtés par le bureau",
      "Convoque le congrès et les assemblées générales",
      "Peut suspendre ou exclure un·e syndiqué·e pour violation grave des statuts, après l'avoir entendu·e (appel possible devant l'AG ou le congrès) — jamais pour une simple divergence d'orientation",
      "Doit être représentative de la diversité des salarié·es : mixité et parité, place des jeunes et des précaires, rotation des responsabilités"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 5, 7 et 8 ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "cfc",
    cat: "syndicat",
    title: "Commission financière de contrôle",
    icon: "🔎",
    question: "À quoi sert la commission financière de contrôle (CFC) ?",
    designation: "Élue par le congrès, parmi des syndiqué·es qui ne sont pas membres de la CE. Nombre de membres toujours impair, au moins trois.",
    rendCompte: "À la commission exécutive et au congrès.",
    missions: [
      "Vérifie la bonne gestion des finances du syndicat",
      "Peut formuler toutes suggestions et remarques sur la gestion et la politique financière",
      "Se réunit au moins deux fois par an",
      "Ses membres sont invités à chaque réunion de la CE, sans droit de vote",
      "Communique en toute transparence aux syndiqué·es le contrôle de la gestion financière"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 7 et 9 ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "bureau",
    cat: "syndicat",
    title: "Bureau syndical",
    icon: "🗂️",
    question: "Quelles sont les fonctions du bureau syndical (ou secrétariat) ?",
    designation: "Élu par la commission exécutive ; composé au minimum d'un·e secrétaire général·e et d'un·e trésorier·ère.",
    rendCompte: "À la commission exécutive.",
    missions: [
      "Met en œuvre les orientations et décisions du congrès et de la CE",
      "Prend les initiatives nécessaires à la bonne marche du syndicat et à sa vie démocratique",
      "Organise son travail sous la responsabilité du ou de la secrétaire général·e",
      "Prépare et convoque les réunions de la CE et assume les tâches administratives",
      "Arrête chaque année les comptes, les fait approuver par la CE et en assure la publicité"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 10 ; Code du travail, art. L2135-1 et suivants"
  },
  {
    id: "sg",
    cat: "responsables",
    title: "Secrétaire général·e",
    icon: "🧭",
    question: "Quel est le rôle du ou de la secrétaire général·e d'un syndicat CGT ?",
    designation: "Membre du bureau, élu·e par la commission exécutive.",
    rendCompte: "À la commission exécutive et au congrès.",
    missions: [
      "Représente le syndicat en justice (tout·e syndiqué·e peut aussi le faire, sur mandat du bureau)",
      "Le bureau organise son travail sous sa responsabilité",
      "Coordonne l'activité syndicale et veille à l'application des décisions",
      "Signe et paraphe les statuts avec le ou la trésorier·ère, pour leur dépôt en mairie",
      "Ne décide pas seul·e : applique les orientations du congrès et de la CE"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 4 et 10, et recommandations complémentaires"
  },
  {
    id: "tresorier",
    cat: "responsables",
    title: "Trésorier·ère",
    icon: "💰",
    question: "Quelles sont les responsabilités du ou de la trésorier·ère ?",
    designation: "Membre du bureau, élu·e par la commission exécutive.",
    rendCompte: "Au bureau et à la CE, qui approuve chaque année les comptes ; contrôlé·e par la CFC.",
    missions: [
      "Encaisse les cotisations sur le compte bancaire du syndicat (1 % du salaire net, primes comprises, ou de la pension nette)",
      "Conserve la part du syndicat et reverse le reste à CoGéTise, qui le répartit entre UL, UD, fédération, comité régional et confédération",
      "Tient la comptabilité et prépare les comptes annuels que le bureau arrête",
      "Veille à la publication des comptes (transparence financière, critère de représentativité)",
      "Développe le prélèvement automatique des cotisations et veille à ce qu'aucune quote-part due aux autres structures ne soit retenue",
      "Signe et paraphe les statuts avec le ou la secrétaire général·e"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 6 et 10 ; Code du travail, art. L2135-1 à L2135-6 ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "org",
    cat: "responsables",
    title: "Secrétaire à l'organisation",
    icon: "📋",
    question: "Que fait le ou la secrétaire à l'organisation ?",
    designation: "Membre du bureau, élu·e par la CE, si les statuts du syndicat prévoient ce poste. Le modèle de statuts n'impose que le ou la SG et le ou la trésorier·ère.",
    rendCompte: "Au bureau et à la commission exécutive.",
    missions: [
      "Organise la vie interne du syndicat (réunions, AG, congrès)",
      "Suit l'évolution des adhésions et organise la syndicalisation, y compris des précaires, des sous-traitants et des cadres",
      "Accueille les nouveaux syndiqué·es (livret d'accueil) et organise leur formation",
      "Tient à jour le fichier des syndiqué·es (CoGiTiel) et suit le parcours de chacun·e pour éviter les ruptures d'adhésion, notamment au départ en retraite",
      "Assure le lien avec les structures interprofessionnelles (UL, UD)"
    ],
    source: "Statuts propres à chaque syndicat (poste facultatif) ; Charte de la vie syndicale (47e congrès)"
  },
  {
    id: "ds",
    cat: "entreprise",
    title: "Délégué·e syndical·e",
    icon: "🗣️",
    question: "Quel est le rôle du ou de la délégué·e syndical·e (DS) dans l'entreprise ?",
    designation: "Désigné·e par un syndicat représentatif (entreprise d'au moins 50 salarié·es), en priorité parmi les candidat·es ayant obtenu au moins 10 % aux élections du CSE.",
    rendCompte: "Au syndicat qui l'a désigné·e, régulièrement. Les syndiqué·es peuvent confier le mandat à quelqu'un d'autre s'il ne correspond pas aux orientations votées.",
    missions: [
      "Représente le syndicat auprès de l'employeur",
      "Négocie et signe les accords collectifs (dont les NAO), sur mandat du syndicat",
      "Consulte les syndiqué·es et les salarié·es avant toute signature d'accord",
      "Travaille avec le syndicat avant toute déclaration ou décision qui engage la CGT",
      "Anime la section syndicale et renforce le syndicat",
      "Informe et conseille les salarié·es sur leurs droits"
    ],
    source: "Code du travail, art. L2143-3 et suivants ; Charte de l'élu·e et mandaté·e CGT (2025)"
  },
  {
    id: "rss",
    cat: "entreprise",
    title: "Représentant·e de section syndicale",
    icon: "🌱",
    question: "Qu'est-ce qu'un·e représentant·e de section syndicale (RSS) ?",
    designation: "Désigné·e par un syndicat qui a constitué une section mais n'est pas (encore) représentatif dans l'entreprise (au moins 50 salarié·es).",
    rendCompte: "Au syndicat qui l'a désigné·e, régulièrement.",
    missions: [
      "Fait vivre la section syndicale et développe la syndicalisation",
      "Prépare les élections pour que le syndicat devienne représentatif",
      "A les mêmes prérogatives que le DS, sauf la négociation (hors cas exceptionnels)",
      "Son mandat prend fin après les élections si le syndicat n'est pas reconnu représentatif"
    ],
    source: "Code du travail, art. L2142-1-1 et suivants ; Charte de l'élu·e et mandaté·e CGT (2025)"
  },
  {
    id: "cse",
    cat: "entreprise",
    title: "Élu·e au CSE",
    icon: "🏢",
    question: "Quelles sont les missions d'un·e élu·e au comité social et économique (CSE) ?",
    designation: "Élu·e par les salarié·es (titulaire ou suppléant·e, en principe pour 4 ans), sur une liste CGT décidée par les syndiqué·es.",
    rendCompte: "Aux salarié·es, et au syndicat, qui doit lui demander un compte rendu régulier de son activité.",
    missions: [
      "Présente les réclamations individuelles et collectives (dès 11 salarié·es)",
      "Veille au respect du droit du travail et contribue à la santé et à la sécurité",
      "Dès 50 salarié·es : est consulté·e sur les orientations stratégiques, la situation économique et la politique sociale",
      "Dès 50 salarié·es : gère les activités sociales et culturelles",
      "Peut alerter (danger grave et imminent, atteinte aux droits des personnes)",
      "Prend en compte tous les salarié·es : CDI, CDD, intérimaires, sous-traitance"
    ],
    source: "Code du travail, art. L2312-5 (moins de 50) et L2312-8 (50 et plus) ; Charte de l'élu·e et mandaté·e CGT (2025)"
  },
  {
    id: "rscse",
    cat: "entreprise",
    title: "Représentant·e syndical·e au CSE",
    icon: "🎙️",
    question: "Quel est le rôle du ou de la représentant·e syndical·e au CSE (RS) ?",
    designation: "Désigné·e par un syndicat représentatif. Dans les entreprises de moins de 300 salarié·es, le ou la DS est de droit RS au CSE.",
    rendCompte: "Au syndicat qui l'a désigné·e, avec qui il ou elle prépare chaque réunion.",
    missions: [
      "Assiste aux réunions du CSE avec voix consultative (sans vote)",
      "Porte la parole et les analyses du syndicat",
      "Reçoit les mêmes informations que les élu·es",
      "Fait le lien entre les élu·es et la section syndicale"
    ],
    source: "Code du travail, art. L2314-2 ; Charte de l'élu·e et mandaté·e CGT (2025)"
  },
  {
    id: "cssct",
    cat: "entreprise",
    title: "Membre de la CSSCT",
    icon: "🦺",
    question: "Que fait la commission santé, sécurité et conditions de travail (CSSCT) ?",
    designation: "Désigné·e par le CSE parmi ses membres. Commission obligatoire dès 300 salarié·es et dans certains établissements à risques.",
    rendCompte: "Au CSE.",
    missions: [
      "Exerce, par délégation du CSE, tout ou partie de ses attributions en santé et sécurité (hors consultations)",
      "Réalise des inspections et des enquêtes, notamment après un accident du travail",
      "Analyse les risques professionnels et les conditions de travail",
      "Prépare les avis que le CSE rendra"
    ],
    source: "Code du travail, art. L2315-36 et suivants"
  },
  {
    id: "rp",
    cat: "entreprise",
    title: "Représentant·e de proximité",
    icon: "👥",
    question: "À quoi sert un·e représentant·e de proximité ?",
    designation: "Prévu·e par un accord d'entreprise (non obligatoire) ; membre du CSE ou désigné·e par lui.",
    rendCompte: "Au CSE.",
    missions: [
      "Assure une présence au plus près des salarié·es",
      "Fait remonter les problèmes du quotidien",
      "Traite les questions de santé, sécurité et conditions de travail",
      "Fait le lien entre les salarié·es et les élu·es du CSE"
    ],
    source: "Code du travail, art. L2313-7"
  },
  {
    id: "defenseur",
    cat: "appui",
    title: "Défenseur·e syndical·e",
    icon: "⚖️",
    question: "Qui peut défendre un·e salarié·e devant les prud'hommes, à part un·e avocat·e ?",
    designation: "Inscrit·e sur une liste régionale arrêtée par l'administration (DREETS), sur proposition des organisations syndicales.",
    rendCompte: "À la structure CGT qui l'a mandaté·e, devant qui il ou elle rend compte de son activité.",
    missions: [
      "Assiste ou représente les salarié·es devant le conseil de prud'hommes et la cour d'appel",
      "Dispose d'heures pour exercer sa mission",
      "Est un·e salarié·e protégé·e",
      "Est tenu·e au secret professionnel"
    ],
    source: "Code du travail, art. L1453-4 et suivants ; Charte de l'élu·e et mandaté·e CGT (2025)"
  },
  {
    id: "conseiller",
    cat: "appui",
    title: "Conseiller·ère du salarié",
    icon: "🤝",
    question: "Qui assiste un·e salarié·e convoqué·e à un entretien de licenciement quand il n'y a pas de représentant·e du personnel ?",
    designation: "Inscrit·e sur une liste départementale arrêtée par le préfet, sur proposition notamment des syndicats.",
    rendCompte: "À la structure CGT qui l'a mandaté·e, devant qui il ou elle rend compte de son activité.",
    missions: [
      "Assiste le ou la salarié·e lors de l'entretien préalable au licenciement, dans les entreprises sans représentant·e du personnel",
      "Peut aussi l'assister lors des entretiens de rupture conventionnelle",
      "Intervient gratuitement pour le ou la salarié·e",
      "Est un·e salarié·e protégé·e, tenu·e au secret professionnel"
    ],
    source: "Code du travail, art. L1232-4 et L1232-7 et suivants ; Charte de l'élu·e et mandaté·e CGT (2025)"
  }
];

// Élu·e, mandaté·e ou responsable : vocabulaire de la Charte de l'élu·e et mandaté·e CGT (2025)
const STATUTS = {
  syndique: "Syndiqué·e",
  instance: "Instance",
  responsable: "Responsable élu·e",
  elu: "Élu·e",
  mandate: "Mandaté·e",
  designe: "Désigné·e par le CSE"
};
const STATUT_BY_ROLE = {
  adherent: "syndique",
  congres: "instance", ce: "instance", cfc: "instance", bureau: "instance",
  sg: "responsable", tresorier: "responsable", org: "responsable",
  ds: "mandate", rss: "mandate", rscse: "mandate",
  cse: "elu",
  cssct: "designe", rp: "designe",
  defenseur: "mandate", conseiller: "mandate"
};

const CHARTE_GROUPS = {
  vie: {
    title: "Charte de la vie syndicale",
    intro: "Adoptée au 47e congrès confédéral (résolution n°3) : des syndiqué·es sur tous les lieux de travail, informé·es, formé·es et propriétaires de leur organisation."
  },
  elus: {
    title: "Charte de l'élu·e et mandaté·e CGT",
    intro: "« Des élu·es et mandaté·es solidaires, démocratiques et efficaces. » Leur efficacité et leur crédibilité ne prennent force qu'au sein du syndicat. Réactualisée en novembre 2025."
  }
};

const CHARTE = [
  {
    id: "vs-partout",
    group: "vie",
    icon: "🌍",
    title: "Des syndiqué·es sur tous les lieux de travail",
    question: "Comment faire reculer les déserts syndicaux ?",
    points: [
      "S'adresser à l'ensemble des salarié·es, avec des dispositions particulières pour chaque catégorie et chaque situation",
      "Créer des syndicats de site ou de zone pour regrouper les syndiqué·es isolé·es des petites entreprises, souvent précaires, femmes, jeunes ou issu·es de l'immigration",
      "Syndiquer les salarié·es des sous-traitants, en coordination avec les syndicats des donneurs d'ordres, sans tutelle des uns sur les autres",
      "Développer une activité spécifique pour les cadres et les techniciens",
      "Organiser les retraité·es et les privé·es d'emploi là où ils et elles vivent (cités, quartiers, localités)",
      "Proposer systématiquement aux salarié·es des entreprises voisines de se syndiquer et de s'organiser"
    ]
  },
  {
    id: "vs-formes",
    group: "vie",
    icon: "📰",
    title: "Des syndiqué·es informé·es et formé·es",
    question: "Comment le syndicat accueille-t-il, informe-t-il et forme-t-il ses syndiqué·es ?",
    points: [
      "Remettre systématiquement un livret d'accueil à chaque nouveau·elle syndiqué·e",
      "Proposer la lecture régulière de la presse confédérale (NVO, Options, Vie Nouvelle) et utiliser les outils numériques",
      "Mettre en débat dans les syndicats les documents préparatoires aux décisions de la CGT",
      "La formation syndicale, sociale et économique est un droit : dès l'adhésion, puis tout au long de la vie syndicale",
      "Toute prise de responsabilité est accompagnée d'une formation, avant ou le plus rapidement possible"
    ]
  },
  {
    id: "vs-proprietaires",
    group: "vie",
    icon: "🗳️",
    title: "Des syndiqué·es propriétaires de leur organisation",
    question: "Comment les syndiqué·es gardent-ils et elles la main sur leur syndicat ?",
    points: [
      "Une activité permanente et démocratique dans chaque syndicat et section syndicale",
      "Une assemblée des syndiqué·es au moins une fois par an, et des congrès réguliers, préparés démocratiquement",
      "Les syndiqué·es débattent et décident de l'activité, du programme revendicatif, de la direction et des mandats",
      "Les mandaté·es et les candidat·es aux élections sont désigné·es démocratiquement par les syndiqué·es de chaque catégorie ou collège ; chacun·e peut être candidat·e",
      "Aucune exclusion fondée sur une différence d'approche de l'orientation, dès lors que les statuts et les règles de vie sont respectés"
    ]
  },
  {
    id: "vs-directions",
    group: "vie",
    icon: "🧑‍🤝‍🧑",
    title: "Des directions syndicales à l'image des salarié·es",
    question: "À quoi doit ressembler une direction syndicale ?",
    points: [
      "Représentative de la diversité des salarié·es et des syndiqué·es",
      "Favoriser la prise de responsabilité des adhérent·es, la place des jeunes et la rotation des responsabilités",
      "Viser partout la mixité, et au-delà la parité, à tous les niveaux",
      "Intégrer les salarié·es précaires dans les collectifs de direction",
      "Combattre le racisme, la xénophobie, l'homophobie et les discriminations envers les femmes, et favoriser l'accès aux responsabilités des camarades immigré·es ou issu·es de l'immigration"
    ]
  },
  {
    id: "vs-parcours",
    group: "vie",
    icon: "🔄",
    title: "Suivre chaque syndiqué·e, conquérir des moyens",
    question: "Que se passe-t-il quand un·e syndiqué·e change d'employeur ou part à la retraite ?",
    points: [
      "Suivre le parcours de chaque syndiqué·e (changement d'employeur, intérim, emplois multiples, retraite…) pour éviter toute rupture d'adhésion",
      "Assurer la continuité actif / retraité : ne plus perdre deux syndiqué·es sur trois au départ en retraite",
      "Faire circuler l'information entre les structures, avec CoGiTiel comme outil de base",
      "Cotisation : 1 % du salaire pour les actif·ves ; pour les retraité·es, au moins 0,5 % de la pension nette en tendant vers 1 % (le modèle de statuts 2024 retient 1 %)",
      "Généraliser le prélèvement automatique ; aucune rétention des quotes-parts dues aux autres structures",
      "Chaque syndicat se dote d'une politique financière et d'une commission financière de contrôle, en toute transparence"
    ]
  },
  {
    id: "charte-syndicat",
    group: "elus",
    icon: "🏠",
    title: "Le rôle du syndicat",
    question: "Que doit faire le syndicat pour ses élu·es et mandaté·es ?",
    points: [
      "Décider des candidatures, après débat avec les syndiqué·es : ce sont elles et eux, souverain·es, qui décident des listes",
      "Permettre aux mandaté·es d'exercer dans les meilleures conditions et de participer à la vie du syndicat",
      "Les aider : discussion, formation syndicale, abonnements aux publications de la CGT",
      "Consulter les syndiqué·es et les salarié·es avant toute signature d'accord",
      "Demander un compte rendu régulier de l'activité des élu·es et mandaté·es qu'il a désigné·es"
    ]
  },
  {
    id: "charte-engagements",
    group: "elus",
    icon: "✊",
    title: "Les engagements des élu·es et mandaté·es",
    question: "À quoi s'engage un·e élu·e ou mandaté·e CGT ?",
    points: [
      "Porter les revendications des salarié·es et les orientations décidées en congrès",
      "Renforcer son syndicat pour construire le rapport de force",
      "Débattre avec franchise et fraternité, puis appliquer les décisions votées à la majorité",
      "Prendre en compte tous les salarié·es : ouvrier·ères, employé·es, technicien·nes, cadres, CDI, CDD, intérim, sous-traitance",
      "Travailler avec la structure qui l'a désigné·e avant toute déclaration qui engage la CGT, et lui rendre compte",
      "Reverser, quand elles existent, les indemnités et dotations liées au mandat",
      "Personne n'est propriétaire de son mandat : les syndiqué·es peuvent le confier à d'autres s'il ne correspond pas aux orientations votées"
    ]
  },
  {
    id: "charte-organisation",
    group: "elus",
    icon: "🤲",
    title: "La responsabilité de l'organisation qui mandate",
    question: "Quelles sont les obligations de la structure CGT qui mandate ?",
    points: [
      "Veiller à la formation des syndiqué·es qu'elle mandate",
      "Réunir régulièrement les mandaté·es et les soutenir",
      "Limiter la durée et le nombre de mandats ; c'est au collectif d'éviter le cumul",
      "Prendre en charge les pertes de salaire liées au mandat, après avoir lutté pour des droits dans l'entreprise",
      "Veiller au reclassement des militant·es en fin de mandat",
      "Construire des listes représentatives de toutes les catégories : féminiser, rajeunir les responsables"
    ]
  },
  {
    id: "charte-statut",
    group: "elus",
    icon: "🏷️",
    title: "Élu·e ou mandaté·e ?",
    question: "Quelle différence entre un·e élu·e et un·e mandaté·e ? Citez des exemples.",
    points: [
      "Élu·es (choisi·es par les salarié·es ou les agent·es) : CSE, CSE d'établissement, commissions administratives et consultatives paritaires, comités sociaux d'administration et territoriaux…",
      "Mandatement syndical (désigné·es par le syndicat) : DS, DS central, RS, CSE central, comités de groupe et de groupe européen",
      "Mandatement par les organisations (UL, UD, fédération…) : administrateur·trices des caisses de Sécurité sociale, conseiller·ères du salarié, conseiller·ères prud'hommes, défenseur·es syndicaux·ales, instances paritaires…",
      "Dans tous les cas : on rend compte à la structure qui a désigné, et l'efficacité de la CGT ne prend force qu'au sein du syndicat"
    ]
  }
];

// type "qcm" : options mélangées ; type "vf" : Vrai / Faux dans cet ordre.
// answer = texte exact de la bonne option.
const QUIZ_POOL = [
  { role: "congres", type: "qcm",
    question: "Quelle instance est souveraine et définit les orientations du syndicat ?",
    options: ["Le congrès des syndiqué·es", "La commission exécutive", "Le bureau", "Le ou la secrétaire général·e"],
    answer: "Le congrès des syndiqué·es",
    explanation: "Le congrès de tous les syndiqué·es à jour de leurs cotisations est l'instance souveraine : il débat de l'activité, de l'orientation et des finances, vote sur les rapports et élit la CE et la CFC (art. 7)." },
  { role: "ce", type: "qcm",
    question: "Quel organe dirige le syndicat entre deux congrès ?",
    options: ["La commission exécutive", "Le bureau", "Le ou la secrétaire général·e", "La CFC"],
    answer: "La commission exécutive",
    explanation: "Élue par le congrès, la CE dirige le syndicat entre deux congrès. Elle se réunit au moins une fois par mois (art. 8)." },
  { role: "ce", type: "qcm",
    question: "Qui élit le bureau syndical, dont le ou la secrétaire général·e ?",
    options: ["La commission exécutive", "Les adhérent·es, directement", "L'union départementale", "Le congrès confédéral"],
    answer: "La commission exécutive",
    explanation: "La CE élit le bureau syndical, composé au minimum d'un·e secrétaire général·e et d'un·e trésorier·ère (art. 8)." },
  { role: "ds", type: "vf",
    question: "Le ou la délégué·e syndical·e est élu·e par les salarié·es de l'entreprise.",
    answer: "Faux",
    explanation: "Le ou la DS est désigné·e par le syndicat représentatif, en priorité parmi les candidat·es ayant obtenu au moins 10 % aux élections du CSE." },
  { role: "ds", type: "qcm",
    question: "Qui négocie les accords collectifs avec l'employeur ?",
    options: ["Le ou la délégué·e syndical·e", "Un·e élu·e au CSE", "Un·e représentant·e de proximité", "Le ou la secrétaire à l'organisation"],
    answer: "Le ou la délégué·e syndical·e",
    explanation: "La négociation est réservée aux DS, mandaté·es par leur syndicat (NAO, accords d'entreprise…)." },
  { role: "cfc", type: "qcm",
    question: "Quelle instance contrôle la gestion financière du syndicat ?",
    options: ["La commission financière de contrôle", "Le bureau", "Le ou la trésorier·ère", "La commission exécutive"],
    answer: "La commission financière de contrôle",
    explanation: "Élue par le congrès en dehors de la CE, la CFC vérifie la bonne gestion des finances et rend compte à la CE et au congrès (art. 9)." },
  { role: "org", type: "qcm",
    question: "Qui suit les adhésions et tient à jour le fichier des syndiqué·es ?",
    options: ["Le ou la secrétaire à l'organisation", "Le ou la trésorier·ère", "Le ou la délégué·e syndical·e", "Le ou la secrétaire général·e"],
    answer: "Le ou la secrétaire à l'organisation",
    explanation: "La vie syndicale et la syndicalisation relèvent de l'organisation (fichier CoGiTiel)." },
  { role: "tresorier", type: "qcm",
    question: "Par quel outil passe la répartition des cotisations dans la CGT ?",
    options: ["CoGéTise", "CoGiTiel", "L'URSSAF", "Un virement direct à la fédération"],
    answer: "CoGéTise",
    explanation: "Le syndicat encaisse les cotisations, garde sa part et reverse le reste à CoGéTise, qui le répartit entre UL, UD, fédérations, comité régional et confédération (art. 6). CoGiTiel, c'est le fichier des syndiqué·es." },
  { role: "rss", type: "vf",
    question: "Un·e représentant·e de section syndicale (RSS) peut négocier les accords comme un·e DS.",
    answer: "Faux",
    explanation: "Le ou la RSS a les prérogatives du DS sauf la négociation (hors cas exceptionnels). Sa mission : faire vivre la section et gagner la représentativité aux élections." },
  { role: "rscse", type: "qcm",
    question: "Qui siège au CSE pour le syndicat, avec une voix consultative seulement ?",
    options: ["Le ou la représentant·e syndical·e au CSE", "Un·e élu·e titulaire", "Le ou la trésorier·ère", "Un·e représentant·e de proximité"],
    answer: "Le ou la représentant·e syndical·e au CSE",
    explanation: "Le ou la RS participe aux débats sans voter. Dans les entreprises de moins de 300 salarié·es, c'est le ou la DS qui l'est de droit." },
  { role: "cssct", type: "vf",
    question: "Une CSSCT est obligatoire dans les entreprises d'au moins 300 salarié·es.",
    answer: "Vrai",
    explanation: "Elle est obligatoire dès 300 salarié·es (et dans certains établissements à risques). Ses membres sont désigné·es par le CSE." },
  { role: "conseiller", type: "qcm",
    question: "Dans une entreprise sans représentant·e du personnel, qui peut assister un·e salarié·e à l'entretien préalable au licenciement ?",
    options: ["Un·e conseiller·ère du salarié", "Un·e défenseur·e syndical·e", "Le ou la DS d'une autre entreprise", "Un·e représentant·e de proximité"],
    answer: "Un·e conseiller·ère du salarié",
    explanation: "Le ou la conseiller·ère du salarié, inscrit·e sur la liste du préfet, intervient justement quand il n'y a pas de représentant·e du personnel." },
  { role: "defenseur", type: "qcm",
    question: "Qui peut représenter un·e salarié·e devant le conseil de prud'hommes et la cour d'appel ?",
    options: ["Un·e défenseur·e syndical·e", "Un·e conseiller·ère du salarié", "Un·e élu·e au CSE", "Le ou la secrétaire à l'organisation"],
    answer: "Un·e défenseur·e syndical·e",
    explanation: "Le ou la défenseur·e syndical·e, inscrit·e sur une liste régionale, assiste ou représente les salarié·es devant les prud'hommes et la cour d'appel." },
  { role: "rp", type: "vf",
    question: "Les représentant·es de proximité sont obligatoires dans toutes les entreprises de plus de 50 salarié·es.",
    answer: "Faux",
    explanation: "Ils ne sont mis en place que si un accord d'entreprise le prévoit. C'est un point à revendiquer en négociation." },
  { role: "cse", type: "qcm",
    question: "Dans une entreprise de moins de 50 salarié·es, quelle est la mission principale des élu·es au CSE ?",
    options: ["Présenter les réclamations individuelles et collectives", "Négocier les accords d'entreprise", "Gérer les activités sociales et culturelles", "Désigner le ou la délégué·e syndical·e"],
    answer: "Présenter les réclamations individuelles et collectives",
    explanation: "Sous 50 salarié·es, le CSE présente les réclamations et veille à la santé et à la sécurité. Les consultations et la gestion des activités sociales et culturelles commencent à 50." },
  { role: "bureau", type: "qcm",
    question: "Qui assure la gestion quotidienne du syndicat et prépare les réunions de la CE ?",
    options: ["Le bureau", "Le congrès", "La CFC", "Les adhérent·es"],
    answer: "Le bureau",
    explanation: "Élu par la CE, le bureau met en œuvre ses décisions, prépare et convoque ses réunions et assume les tâches administratives (art. 10)." },
  { role: "adherent", type: "vf",
    question: "Tout·e adhérent·e peut être candidat·e aux responsabilités syndicales.",
    answer: "Vrai",
    explanation: "Oui, à condition d'être à jour de ses cotisations : c'est la seule condition posée pour être membre de la CE (art. 8)." },
  { role: "sg", type: "vf",
    question: "Le ou la secrétaire général·e peut décider seul·e des orientations du syndicat.",
    answer: "Faux",
    explanation: "Les orientations sont décidées par le congrès et mises en œuvre par la CE. Le ou la SG coordonne et rend compte." },
  { role: "sg", type: "qcm",
    question: "Qui représente le syndicat et coordonne son activité, sous le contrôle de la CE ?",
    options: ["Le ou la secrétaire général·e", "Le ou la trésorier·ère", "Le ou la délégué·e syndical·e", "La CFC"],
    answer: "Le ou la secrétaire général·e",
    explanation: "Le ou la SG représente le syndicat, y compris en justice, et le bureau travaille sous sa responsabilité ; il ou elle rend compte à la CE et au congrès (art. 4 et 10)." },
  { role: "tresorier", type: "qcm",
    question: "Quel est le montant de la cotisation prévu par le modèle de statuts CGT ?",
    options: ["1 % du salaire net, primes comprises", "1 % du salaire brut", "Un montant fixe décidé par la fédération", "0,5 % du salaire net"],
    answer: "1 % du salaire net, primes comprises",
    explanation: "La cotisation mensuelle est égale à 1 % du salaire net, toutes primes comprises, ou de la pension ou retraite nette (art. 6)." },
  { role: "ce", type: "qcm",
    question: "Qui approuve chaque année les comptes du syndicat ?",
    options: ["La commission exécutive", "Le congrès", "La CFC", "L'union départementale"],
    answer: "La commission exécutive",
    explanation: "Le bureau arrête les comptes, la CE les approuve chaque année et un procès-verbal est établi ; le bureau en assure ensuite la publicité (art. 8 et 10)." },
  { role: "cfc", type: "vf",
    question: "Les membres de la CFC peuvent aussi être membres de la commission exécutive.",
    answer: "Faux",
    explanation: "La CFC est élue par le congrès parmi des syndiqué·es extérieur·es à la CE. Ses membres sont invités aux réunions de la CE, mais sans droit de vote (art. 7 et 9)." },
  { role: "congres", type: "qcm",
    question: "Qui peut demander la convocation d'un congrès extraordinaire ?",
    options: ["La CE, ou au moins un tiers des syndiqué·es", "Seulement le ou la secrétaire général·e", "Seulement l'union départementale", "N'importe quel·le syndiqué·e seul·e"],
    answer: "La CE, ou au moins un tiers des syndiqué·es",
    explanation: "Un congrès extraordinaire peut être convoqué par la CE si les circonstances l'exigent, ou à la demande d'au moins un tiers des syndiqué·es (art. 7)." },
  { role: "congres", type: "vf",
    question: "Entre deux congrès, une assemblée générale des syndiqué·es doit se tenir au moins une fois par an.",
    answer: "Vrai",
    explanation: "Elle est convoquée par la CE chaque fois que les circonstances l'exigent, et au moins une fois par an (art. 7)." },
  { role: "adherent", type: "vf",
    question: "La CE peut exclure un·e syndiqué·e sans l'avoir entendu·e.",
    answer: "Faux",
    explanation: "En cas de violation grave des statuts, la CE peut suspendre ou exclure, mais seulement après avoir fait connaître les griefs et entendu les explications. L'appel est possible devant l'AG ou le congrès (art. 5)." },
  { role: "charte-syndicat", type: "qcm",
    question: "Qui décide des candidatures CGT aux élections et aux mandats ?",
    options: ["Le syndicat, après débat avec les syndiqué·es", "L'élu·e sortant·e", "L'union départementale seule", "La fédération seule"],
    answer: "Le syndicat, après débat avec les syndiqué·es",
    explanation: "La décision de proposer des candidatures appartient au syndicat. Les syndiqué·es étant souverain·es, ce sont elles et eux qui décident des listes (charte de l'élu·e et mandaté·e)." },
  { role: "charte-engagements", type: "vf",
    question: "Un·e élu·e CGT est propriétaire de son mandat jusqu'à son terme.",
    answer: "Faux",
    explanation: "« Personne n'est propriétaire de son mandat syndical, et chaque responsabilité est un bien collectif. » Les syndiqué·es peuvent le confier à d'autres (charte)." },
  { role: "charte-syndicat", type: "qcm",
    question: "Que prévoit la charte avant toute signature d'accord dans l'entreprise ?",
    options: ["Consulter les syndiqué·es et les salarié·es", "Informer seulement l'UD", "Attendre l'avis de l'employeur", "Rien : le ou la DS décide seul·e"],
    answer: "Consulter les syndiqué·es et les salarié·es",
    explanation: "Le syndicat construit la démarche avec les syndiqué·es et consulte les salarié·es avant toute signature d'accord ou événement important (charte)." },
  { role: "charte-engagements", type: "vf",
    question: "Quand elles existent, les indemnités liées à un mandat sont reversées à l'organisation.",
    answer: "Vrai",
    explanation: "Les élu·es et mandaté·es s'engagent à reverser les dotations, indemnités et autres émoluments liés à la responsabilité. En contrepartie, l'organisation prend en charge les pertes de salaire (charte)." },
  { role: "charte-statut", type: "qcm",
    question: "Selon la charte, un·e conseiller·ère du salarié ou un·e défenseur·e syndical·e est…",
    options: ["Un·e mandaté·e de la CGT", "Un·e élu·e du personnel", "Un·e salarié·e de l'UD", "Un·e bénévole sans lien avec la CGT"],
    answer: "Un·e mandaté·e de la CGT",
    explanation: "Ce sont des mandats confiés par les organisations de la CGT. Ils et elles rendent compte à la structure qui les a désigné·es (charte)." },
  { role: "charte-engagements", type: "vf",
    question: "Les syndiqué·es peuvent confier un mandat à quelqu'un d'autre s'il ne correspond pas aux orientations votées.",
    answer: "Vrai",
    explanation: "Les syndiqué·es peuvent contrôler à tout moment l'activité de leurs mandaté·es et confier les mandats à d'autres s'ils ne sont pas remplis correctement (charte)." },
  { role: "charte-organisation", type: "vf",
    question: "La charte demande de limiter la durée et le nombre de mandats d'un·e militant·e.",
    answer: "Vrai",
    explanation: "Une limitation de la durée et du nombre de mandats est nécessaire ; c'est au collectif d'éviter le cumul (charte)." },
  { role: "charte-organisation", type: "qcm",
    question: "Qui doit veiller à la formation et au soutien des mandaté·es ?",
    options: ["La structure CGT qui les mandate", "L'employeur", "Les mandaté·es seul·es", "Uniquement la confédération"],
    answer: "La structure CGT qui les mandate",
    explanation: "La structure qui mandate veille à la formation, réunit régulièrement les mandaté·es, les soutient et prépare leur reclassement en fin de mandat (charte)." },
  { role: "vs-formes", type: "vf",
    question: "Toute prise de responsabilité syndicale doit être accompagnée d'une formation.",
    answer: "Vrai",
    explanation: "La charte de la vie syndicale prévoit qu'elle soit accompagnée d'une formation correspondante, avant ou le plus rapidement possible." },
  { role: "vs-formes", type: "qcm",
    question: "Que remet-on systématiquement à un·e nouveau·elle syndiqué·e ?",
    options: ["Un livret d'accueil", "Un contrat d'engagement", "Une carte d'élu·e", "Rien de particulier"],
    answer: "Un livret d'accueil",
    explanation: "La charte de la vie syndicale décide d'accompagner l'arrivée des nouveaux syndiqué·es par la remise systématique d'un livret d'accueil." },
  { role: "vs-proprietaires", type: "vf",
    question: "Un syndicat peut exclure un·e syndiqué·e parce qu'il ou elle a une approche différente de l'orientation.",
    answer: "Faux",
    explanation: "La charte demande de bannir toute exclusion fondée sur des différences d'approche de l'orientation, dès lors que les statuts et les règles de vie de la CGT sont respectés." },
  { role: "vs-directions", type: "qcm",
    question: "Quel objectif la charte de la vie syndicale fixe-t-elle pour les directions syndicales ?",
    options: ["La mixité, et au-delà la parité", "Des mandats sans limite de durée", "Uniquement des militant·es expérimenté·es", "Une direction réduite au ou à la SG"],
    answer: "La mixité, et au-delà la parité",
    explanation: "Les directions doivent être représentatives de la diversité des salarié·es : mixité, parité, place des jeunes et des précaires, rotation des responsabilités." },
  { role: "vs-parcours", type: "qcm",
    question: "Selon la charte de la vie syndicale, combien de syndiqué·es la CGT perdait-elle au départ en retraite ?",
    options: ["Deux sur trois", "Un sur dix", "Un sur deux", "Presque aucun·e"],
    answer: "Deux sur trois",
    explanation: "D'où l'objectif d'assurer la continuité syndicale actif / retraité et de suivre le parcours de chaque syndiqué·e." },
  { role: "vs-proprietaires", type: "qcm",
    question: "Au minimum, à quelle fréquence le syndicat doit-il réunir l'assemblée de ses syndiqué·es ?",
    options: ["Une fois par an", "Une fois tous les cinq ans", "Seulement au congrès", "Quand l'employeur le demande"],
    answer: "Une fois par an",
    explanation: "La charte de la vie syndicale et le modèle de statuts (art. 7) prévoient une assemblée générale des syndiqué·es au moins une fois par an." }
];

const QUIZ_LENGTH = 10;

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === 'text') node.textContent = v;
    else if (k === 'className') node.className = v;
    else node.setAttribute(k, v);
  });
  (children || []).forEach(c => c && node.appendChild(c));
  return node;
}

document.addEventListener('DOMContentLoaded', function() {
  const rolesGrid = document.getElementById('roles-grid');
  const explorationModeBtn = document.getElementById('exploration-mode');
  const quizModeBtn = document.getElementById('quiz-mode');
  const explorationPanel = document.getElementById('exploration-panel');
  const quizPanel = document.getElementById('quiz-panel');
  const quizTitle = document.getElementById('quiz-title');
  const quizText = document.getElementById('quiz-text');
  const quizOptions = document.getElementById('quiz-options');
  const quizCheckBtn = document.getElementById('quiz-check');
  const quizNextBtn = document.getElementById('quiz-next');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizProgressBar = document.getElementById('quiz-progress-bar');

  /* ---------- Cartes ---------- */

  function setExpanded(card, open) {
    const btn = card.querySelector('.reveal-btn');
    const panel = card.querySelector('.role-panel');
    card.classList.toggle('revealed', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Masquer' : 'Révéler';
    panel.hidden = !open;
  }

  // Carte dépliable commune aux rôles et aux blocs de la charte
  function buildCard({ id, icon, label, title, question, badge, body }) {
    const panelId = 'panel-' + id;
    const btn = el('button', { type: 'button', className: 'reveal-btn', 'aria-expanded': 'false', 'aria-controls': panelId, text: 'Révéler' });
    const card = el('article', { className: 'role-card', id: 'role-' + id, 'aria-labelledby': 'title-' + id }, [
      el('div', { className: 'role-head' }, [
        el('span', { className: 'role-icon', 'aria-hidden': 'true', text: icon }),
        el('div', {}, [
          el('span', { className: 'role-cat', text: label }),
          el('h3', { id: 'title-' + id, text: title }),
          badge ? el('span', { className: 'role-badge role-badge--' + badge, text: STATUTS[badge] }) : null
        ])
      ]),
      el('p', { className: 'role-question', text: question }),
      btn,
      el('div', { className: 'role-panel', id: panelId, hidden: '' }, body)
    ]);
    btn.addEventListener('click', () => setExpanded(card, btn.getAttribute('aria-expanded') !== 'true'));
    return card;
  }

  ROLES.forEach(role => {
    const card = buildCard({
      id: role.id,
      icon: role.icon,
      label: CATEGORIES[role.cat],
      title: role.title,
      question: role.question,
      badge: STATUT_BY_ROLE[role.id],
      body: [
        el('dl', { className: 'role-meta' }, [
          el('dt', { text: 'Qui élit ou désigne ?' }), el('dd', { text: role.designation }),
          el('dt', { text: 'Rend compte à' }), el('dd', { text: role.rendCompte })
        ]),
        el('ul', { className: 'role-details' }, role.missions.map(m => el('li', { text: m }))),
        el('p', { className: 'role-source', text: '📖 ' + role.source })
      ]
    });
    card.dataset.cat = role.cat;
    rolesGrid.appendChild(card);
  });

  const charteGroups = document.getElementById('charte-groups');
  Object.entries(CHARTE_GROUPS).forEach(([key, group]) => {
    const grid = el('div', { className: 'roles-grid charte-grid' });
    CHARTE.filter(b => b.group === key).forEach(block => {
      grid.appendChild(buildCard({
        id: block.id,
        icon: block.icon,
        label: group.title,
        title: block.title,
        question: block.question,
        body: [el('ul', { className: 'role-details' }, block.points.map(m => el('li', { text: m })))]
      }));
    });
    charteGroups.appendChild(el('div', { className: 'charte-group', id: 'charte-' + key }, [
      el('h4', { text: group.title }),
      el('p', { className: 'charte-intro', text: group.intro }),
      grid
    ]));
  });

  const roleCards = rolesGrid.querySelectorAll('.role-card');
  const allCards = explorationPanel.querySelectorAll('.role-card');

  document.getElementById('reveal-all-btn').addEventListener('click', () => {
    allCards.forEach(card => { if (!card.hidden) setExpanded(card, true); });
  });
  document.getElementById('hide-all-btn').addEventListener('click', () => {
    allCards.forEach(card => setExpanded(card, false));
  });

  // Filtres par catégorie
  const filterBtns = document.querySelectorAll('.filter-btn');
  function applyFilter(filter) {
    filterBtns.forEach(b => {
      const on = b.dataset.filter === filter;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    roleCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.cat !== filter;
    });
  }
  filterBtns.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  // Ouvre et met en évidence une fiche (depuis le schéma ou le quiz)
  function focusRole(id) {
    const card = document.getElementById('role-' + id);
    if (!card) return;
    setMode('exploration');
    if (card.hidden) applyFilter('all');
    setExpanded(card, true);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('highlight');
    void card.offsetWidth; // relance l'animation
    card.classList.add('highlight');
    card.querySelector('.reveal-btn').focus({ preventScroll: true });
  }

  document.querySelectorAll('.schema-box[data-target]').forEach(box => {
    box.addEventListener('click', () => focusRole(box.dataset.target));
  });

  /* ---------- Modes ---------- */

  function setMode(mode) {
    const quiz = mode === 'quiz';
    explorationModeBtn.classList.toggle('active', !quiz);
    quizModeBtn.classList.toggle('active', quiz);
    explorationModeBtn.setAttribute('aria-selected', String(!quiz));
    quizModeBtn.setAttribute('aria-selected', String(quiz));
    explorationPanel.hidden = quiz;
    quizPanel.hidden = !quiz;
  }

  explorationModeBtn.addEventListener('click', () => setMode('exploration'));
  quizModeBtn.addEventListener('click', () => {
    setMode('quiz');
    startQuiz();
  });

  /* ---------- Quiz ---------- */

  let questions = [];
  let current = 0;
  let selected = null;
  let score = 0;
  let missed = [];

  function startQuiz() {
    questions = shuffle(QUIZ_POOL).slice(0, QUIZ_LENGTH).map(q => ({
      ...q,
      options: q.type === 'vf' ? ['Vrai', 'Faux'] : shuffle(q.options)
    }));
    current = 0;
    score = 0;
    missed = [];
    showQuestion();
  }

  function showQuestion() {
    const q = questions[current];
    selected = null;
    quizTitle.textContent = `Question ${current + 1}/${questions.length}` + (q.type === 'vf' ? ' — Vrai ou faux ?' : '');
    quizText.textContent = q.question;
    quizProgressBar.style.width = (current / questions.length * 100) + '%';
    quizOptions.innerHTML = '';
    quizOptions.className = 'quiz-options' + (q.type === 'vf' ? ' quiz-options--vf' : '');

    q.options.forEach(option => {
      const btn = el('button', { type: 'button', className: 'quiz-option', 'aria-pressed': 'false', text: option });
      btn.addEventListener('click', () => {
        if (quizCheckBtn.dataset.done === '1') return;
        quizOptions.querySelectorAll('.quiz-option').forEach(o => {
          o.classList.remove('selected');
          o.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        selected = option;
        quizCheckBtn.disabled = false;
      });
      quizOptions.appendChild(btn);
    });

    quizCheckBtn.hidden = false;
    quizNextBtn.hidden = false;
    quizCheckBtn.disabled = true;
    quizCheckBtn.dataset.done = '0';
    quizNextBtn.disabled = true;
    quizNextBtn.textContent = current === questions.length - 1 ? 'Voir mon résultat' : 'Question suivante';
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.innerHTML = '';
  }

  quizCheckBtn.addEventListener('click', () => {
    if (selected === null) return;
    const q = questions[current];
    const ok = selected === q.answer;
    if (ok) score++; else missed.push(q);

    quizOptions.querySelectorAll('.quiz-option').forEach(o => {
      o.disabled = true;
      if (o.textContent === q.answer) o.classList.add('correct');
      else if (o.textContent === selected) o.classList.add('incorrect');
    });

    quizFeedback.className = 'quiz-feedback visible ' + (ok ? 'correct' : 'incorrect');
    quizFeedback.innerHTML = '';
    quizFeedback.appendChild(el('strong', { text: ok ? 'Bonne réponse ! ' : `Pas tout à fait. La bonne réponse : ${q.answer}. ` }));
    quizFeedback.appendChild(document.createTextNode(q.explanation + ' '));
    const link = el('button', { type: 'button', className: 'link-btn', text: 'Voir la fiche →' });
    link.addEventListener('click', () => focusRole(q.role));
    quizFeedback.appendChild(link);

    quizCheckBtn.disabled = true;
    quizCheckBtn.dataset.done = '1';
    quizNextBtn.disabled = false;
    quizNextBtn.focus();
  });

  quizNextBtn.addEventListener('click', () => {
    current++;
    if (current < questions.length) showQuestion();
    else showResults();
  });

  function showResults() {
    const total = questions.length;
    const ratio = score / total;
    quizProgressBar.style.width = '100%';
    quizTitle.textContent = `Résultat : ${score}/${total}`;
    quizText.textContent = ratio === 1 ? 'Sans faute ! Vous maîtrisez qui fait quoi dans le syndicat.'
      : ratio >= 0.7 ? 'Très bien ! Revoyez les quelques points ci-dessous.'
      : ratio >= 0.4 ? 'C\'est un bon début. Reprenez les fiches ci-dessous puis retentez le quiz.'
      : 'Prenez le temps de relire les fiches en mode exploration, puis retentez votre chance.';
    quizOptions.innerHTML = '';
    quizOptions.className = 'quiz-options';
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.innerHTML = '';
    quizCheckBtn.hidden = true;
    quizNextBtn.hidden = true;

    if (missed.length) {
      const list = el('ul', { className: 'quiz-recap' });
      missed.forEach(q => {
        const link = el('button', { type: 'button', className: 'link-btn', text: 'Voir la fiche →' });
        link.addEventListener('click', () => focusRole(q.role));
        list.appendChild(el('li', {}, [
          el('p', { className: 'quiz-recap-q', text: q.question }),
          el('p', { text: '✔ ' + q.answer + ' — ' + q.explanation }),
          link
        ]));
      });
      quizOptions.appendChild(el('h4', { text: 'À revoir' }));
      quizOptions.appendChild(list);
    }

    const restart = el('button', { type: 'button', className: 'quiz-restart', text: 'Recommencer avec d\'autres questions' });
    restart.addEventListener('click', startQuiz);
    quizOptions.appendChild(restart);
    restart.focus();
  }

  /* ---------- Sommaire ---------- */

  const toc = document.getElementById('table-of-contents');
  const tocOverlay = document.getElementById('toc-overlay');
  const tocButton = document.querySelector('.toc-button');

  function setToc(open) {
    toc.classList.toggle('active', open);
    tocOverlay.classList.toggle('active', open);
    toc.setAttribute('aria-hidden', String(!open));
    tocButton.setAttribute('aria-expanded', String(open));
    if (open) document.getElementById('close-toc').focus();
  }
  tocButton.addEventListener('click', () => setToc(!toc.classList.contains('active')));
  document.getElementById('close-toc').addEventListener('click', () => { setToc(false); tocButton.focus(); });
  tocOverlay.addEventListener('click', () => setToc(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toc.classList.contains('active')) { setToc(false); tocButton.focus(); }
  });

  /* ---------- Mode projection (diaporama animateur) ---------- */
  // Une diapo à la fois : la question d'abord, la réponse au 2e appui.
  // Clavier / télécommande : → ou PageDown = avancer, ← ou PageUp = reculer,
  // Espace ou Entrée = révéler, F = plein écran, Échap = quitter.

  const proj = document.getElementById('projection');
  const projStage = document.getElementById('proj-stage');
  const projCounter = document.getElementById('proj-counter');
  const projReveal = document.getElementById('proj-reveal');
  const projPrev = document.getElementById('proj-prev');
  const projNext = document.getElementById('proj-next');
  const projTabs = proj.querySelectorAll('.proj-tab');
  const presBtn = document.querySelector('.presentation-button');

  let deck = 'roles';
  let slides = [];
  let slideIndex = 0;
  let revealed = false;
  let lastFocus = null;

  function buildDeck() {
    if (deck === 'roles') {
      // Respecte le filtre actif en mode exploration
      const visibleIds = Array.from(roleCards).filter(c => !c.hidden).map(c => c.id.replace('role-', ''));
      slides = ROLES.filter(r => visibleIds.includes(r.id));
    } else if (deck === 'charte') {
      slides = CHARTE;
    } else {
      slides = shuffle(QUIZ_POOL).slice(0, QUIZ_LENGTH).map(q => ({
        ...q,
        options: q.type === 'vf' ? ['Vrai', 'Faux'] : shuffle(q.options)
      }));
    }
    slideIndex = 0;
  }

  function renderSlide() {
    const item = slides[slideIndex];
    projStage.innerHTML = '';
    projCounter.textContent = `${slideIndex + 1} / ${slides.length}`;
    projPrev.disabled = slideIndex === 0;
    projNext.disabled = slideIndex === slides.length - 1 && revealed;
    projReveal.textContent = revealed ? 'Masquer la réponse' : 'Révéler la réponse';

    if (deck === 'roles' || deck === 'charte') {
      const badge = deck === 'roles' ? STATUT_BY_ROLE[item.id] : null;
      projStage.appendChild(el('div', { className: 'proj-head' }, [
        el('span', { className: 'proj-icon', 'aria-hidden': 'true', text: item.icon }),
        el('div', {}, [
          el('span', { className: 'proj-cat', text: deck === 'roles' ? CATEGORIES[item.cat] : CHARTE_GROUPS[item.group].title }),
          el('h2', { className: 'proj-title', text: item.title }),
          badge ? el('span', { className: 'role-badge role-badge--' + badge, text: STATUTS[badge] }) : null
        ])
      ]));
      projStage.appendChild(el('p', { className: 'proj-question', text: item.question }));
      if (revealed && deck === 'charte') {
        projStage.appendChild(el('div', { className: 'proj-answer proj-answer--full' }, [
          el('ul', { className: 'proj-list' }, item.points.map(m => el('li', { text: m })))
        ]));
      } else if (revealed) {
        projStage.appendChild(el('div', { className: 'proj-answer' }, [
          el('ul', { className: 'proj-list' }, item.missions.map(m => el('li', { text: m }))),
          el('dl', { className: 'proj-meta' }, [
            el('div', {}, [el('dt', { text: 'Qui élit ou désigne ?' }), el('dd', { text: item.designation })]),
            el('div', {}, [el('dt', { text: 'Rend compte à' }), el('dd', { text: item.rendCompte })])
          ]),
          el('p', { className: 'proj-source', text: '📖 ' + item.source })
        ]));
      }
    } else {
      projStage.appendChild(el('span', { className: 'proj-cat', text: item.type === 'vf' ? 'Vrai ou faux ?' : 'Question' }));
      projStage.appendChild(el('h2', { className: 'proj-title proj-title--quiz', text: item.question }));
      const letters = 'ABCD';
      projStage.appendChild(el('ol', { className: 'proj-options' + (item.type === 'vf' ? ' proj-options--vf' : '') },
        item.options.map((o, i) => el('li', {
          className: revealed ? (o === item.answer ? 'good' : 'bad') : ''
        }, [el('span', { className: 'proj-letter', text: item.type === 'vf' ? '' : letters[i] }), document.createTextNode(o)]))));
      if (revealed) {
        projStage.appendChild(el('p', { className: 'proj-explanation', text: item.explanation }));
      }
    }
  }

  function goTo(i) {
    if (i < 0 || i >= slides.length) return;
    slideIndex = i;
    revealed = false;
    renderSlide();
  }

  // « Avancer » révèle d'abord la réponse, puis passe à la diapo suivante
  function advance() {
    if (!revealed) { revealed = true; renderSlide(); }
    else goTo(slideIndex + 1);
  }

  function setDeck(name) {
    deck = name;
    projTabs.forEach(t => {
      const on = t.dataset.deck === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    buildDeck();
    revealed = false;
    renderSlide();
  }

  function openProjection() {
    lastFocus = document.activeElement;
    proj.hidden = false;
    document.body.classList.add('proj-open');
    presBtn.setAttribute('aria-expanded', 'true');
    setDeck(quizPanel.hidden ? 'roles' : 'quiz');
    try {
      if (proj.requestFullscreen) proj.requestFullscreen().catch(() => {});
    } catch (e) {}
    projNext.focus();
  }

  function closeProjection() {
    proj.hidden = true;
    document.body.classList.remove('proj-open');
    presBtn.setAttribute('aria-expanded', 'false');
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
    if (lastFocus) lastFocus.focus();
  }

  presBtn.addEventListener('click', openProjection);
  document.getElementById('proj-close').addEventListener('click', closeProjection);
  document.getElementById('proj-fullscreen').addEventListener('click', toggleFullscreen);
  projPrev.addEventListener('click', () => goTo(slideIndex - 1));
  projNext.addEventListener('click', advance);
  projReveal.addEventListener('click', () => { revealed = !revealed; renderSlide(); });
  projTabs.forEach(t => t.addEventListener('click', () => setDeck(t.dataset.deck)));

  function toggleFullscreen() {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (proj.requestFullscreen) proj.requestFullscreen().catch(() => {});
    } catch (e) {}
  }

  document.addEventListener('keydown', e => {
    if (proj.hidden) return;
    // Laisse les boutons du bandeau réagir normalement à Entrée / Espace
    const onButton = e.target.closest && e.target.closest('.proj-bar button');
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); advance(); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); goTo(slideIndex - 1); break;
      case ' ': case 'Enter':
        if (onButton) return;
        e.preventDefault(); revealed = !revealed; renderSlide(); break;
      case 'Home': e.preventDefault(); goTo(0); break;
      case 'End': e.preventDefault(); goTo(slides.length - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
      // En plein écran, le navigateur intercepte le 1er Échap pour quitter le plein écran
      case 'Escape': closeProjection(); break;
    }
  });

  // La fiche-mémo imprimée montre toutes les cartes ouvertes (voir @media print)
  document.querySelector('.print-button').addEventListener('click', () => {
    setMode('exploration');
    applyFilter('all');
    window.print();
  });

  /* ---------- Thème (l'enregistrement est géré par occitanie.js) ---------- */

  const themeSwitch = document.getElementById('theme-switch');
  const themeIcon = document.querySelector('.theme-icon');
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  themeSwitch.checked = isDark();
  themeIcon.textContent = isDark() ? '☀️' : '🌙';
  themeSwitch.addEventListener('change', () => {
    const t = themeSwitch.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    themeIcon.textContent = themeSwitch.checked ? '☀️' : '🌙';
  });
});
