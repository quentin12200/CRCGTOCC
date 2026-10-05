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
      "Devoir : payer régulièrement sa cotisation (1 % du salaire ou de la pension nette) — sans cotisation à jour, on ne peut pas se prévaloir du syndicat"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 1, 5 et 6"
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
      "Un congrès extraordinaire peut être demandé par la CE ou par au moins un tiers des syndiqué·es"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 7 et 11"
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
      "Peut suspendre ou exclure un·e syndiqué·e pour violation grave des statuts, après l'avoir entendu·e (appel possible devant l'AG ou le congrès)"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 5, 7 et 8"
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
      "Ses membres sont invités à chaque réunion de la CE, sans droit de vote"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 7 et 9"
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
      "Signe et paraphe les statuts avec le ou la secrétaire général·e"
    ],
    source: "Modèle de statuts de syndicat CGT (2024), art. 6 et 10 ; Code du travail, art. L2135-1 à L2135-6"
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
      "Suit l'évolution des adhésions et la syndicalisation",
      "Tient à jour le fichier des syndiqué·es (CoGiTiel)",
      "Coordonne la communication interne",
      "Assure le lien avec les structures interprofessionnelles (UL, UD)"
    ],
    source: "Statuts propres à chaque syndicat (poste facultatif)"
  },
  {
    id: "ds",
    cat: "entreprise",
    title: "Délégué·e syndical·e",
    icon: "🗣️",
    question: "Quel est le rôle du ou de la délégué·e syndical·e (DS) dans l'entreprise ?",
    designation: "Désigné·e par un syndicat représentatif (entreprise d'au moins 50 salarié·es), en priorité parmi les candidat·es ayant obtenu au moins 10 % aux élections du CSE.",
    rendCompte: "Au syndicat qui l'a mandaté·e.",
    missions: [
      "Représente le syndicat auprès de l'employeur",
      "Négocie et signe les accords collectifs (dont les NAO), sur mandat du syndicat",
      "Porte les revendications des salarié·es",
      "Anime la section syndicale dans l'entreprise",
      "Informe et conseille les salarié·es sur leurs droits"
    ],
    source: "Code du travail, art. L2143-3 et suivants"
  },
  {
    id: "rss",
    cat: "entreprise",
    title: "Représentant·e de section syndicale",
    icon: "🌱",
    question: "Qu'est-ce qu'un·e représentant·e de section syndicale (RSS) ?",
    designation: "Désigné·e par un syndicat qui a constitué une section mais n'est pas (encore) représentatif dans l'entreprise (au moins 50 salarié·es).",
    rendCompte: "Au syndicat qui l'a mandaté·e.",
    missions: [
      "Fait vivre la section syndicale et développe la syndicalisation",
      "Prépare les élections pour que le syndicat devienne représentatif",
      "A les mêmes prérogatives que le DS, sauf la négociation (hors cas exceptionnels)",
      "Son mandat prend fin après les élections si le syndicat n'est pas reconnu représentatif"
    ],
    source: "Code du travail, art. L2142-1-1 et suivants"
  },
  {
    id: "cse",
    cat: "entreprise",
    title: "Élu·e au CSE",
    icon: "🏢",
    question: "Quelles sont les missions d'un·e élu·e au comité social et économique (CSE) ?",
    designation: "Élu·e par les salarié·es, comme titulaire ou suppléant·e, en principe pour 4 ans.",
    rendCompte: "Aux salarié·es ; à la section syndicale pour les élu·es présenté·es par la CGT.",
    missions: [
      "Présente les réclamations individuelles et collectives (dès 11 salarié·es)",
      "Veille au respect du droit du travail et contribue à la santé et à la sécurité",
      "Dès 50 salarié·es : est consulté·e sur les orientations stratégiques, la situation économique et la politique sociale",
      "Dès 50 salarié·es : gère les activités sociales et culturelles",
      "Peut alerter (danger grave et imminent, atteinte aux droits des personnes)"
    ],
    source: "Code du travail, art. L2312-5 (moins de 50) et L2312-8 (50 et plus)"
  },
  {
    id: "rscse",
    cat: "entreprise",
    title: "Représentant·e syndical·e au CSE",
    icon: "🎙️",
    question: "Quel est le rôle du ou de la représentant·e syndical·e au CSE (RS) ?",
    designation: "Désigné·e par un syndicat représentatif. Dans les entreprises de moins de 300 salarié·es, le ou la DS est de droit RS au CSE.",
    rendCompte: "Au syndicat qui l'a mandaté·e.",
    missions: [
      "Assiste aux réunions du CSE avec voix consultative (sans vote)",
      "Porte la parole et les analyses du syndicat",
      "Reçoit les mêmes informations que les élu·es",
      "Fait le lien entre les élu·es et la section syndicale"
    ],
    source: "Code du travail, art. L2314-2"
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
    rendCompte: "À l'organisation qui l'a proposé·e.",
    missions: [
      "Assiste ou représente les salarié·es devant le conseil de prud'hommes et la cour d'appel",
      "Dispose d'heures pour exercer sa mission",
      "Est un·e salarié·e protégé·e",
      "Est tenu·e au secret professionnel"
    ],
    source: "Code du travail, art. L1453-4 et suivants"
  },
  {
    id: "conseiller",
    cat: "appui",
    title: "Conseiller·ère du salarié",
    icon: "🤝",
    question: "Qui assiste un·e salarié·e convoqué·e à un entretien de licenciement quand il n'y a pas de représentant·e du personnel ?",
    designation: "Inscrit·e sur une liste départementale arrêtée par le préfet, sur proposition notamment des syndicats.",
    rendCompte: "À l'organisation qui l'a proposé·e.",
    missions: [
      "Assiste le ou la salarié·e lors de l'entretien préalable au licenciement, dans les entreprises sans représentant·e du personnel",
      "Peut aussi l'assister lors des entretiens de rupture conventionnelle",
      "Intervient gratuitement pour le ou la salarié·e",
      "Est un·e salarié·e protégé·e, tenu·e au secret professionnel"
    ],
    source: "Code du travail, art. L1232-4 et L1232-7 et suivants"
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
    explanation: "En cas de violation grave des statuts, la CE peut suspendre ou exclure, mais seulement après avoir fait connaître les griefs et entendu les explications. L'appel est possible devant l'AG ou le congrès (art. 5)." }
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

  ROLES.forEach(role => {
    const panelId = 'panel-' + role.id;
    const btn = el('button', { type: 'button', className: 'reveal-btn', 'aria-expanded': 'false', 'aria-controls': panelId, text: 'Révéler' });

    const meta = el('dl', { className: 'role-meta' }, [
      el('dt', { text: 'Qui élit ou désigne ?' }), el('dd', { text: role.designation }),
      el('dt', { text: 'Rend compte à' }), el('dd', { text: role.rendCompte })
    ]);
    const missions = el('ul', { className: 'role-details' }, role.missions.map(m => el('li', { text: m })));
    const source = el('p', { className: 'role-source', text: '📖 ' + role.source });

    const card = el('article', { className: 'role-card', id: 'role-' + role.id, 'data-cat': role.cat, 'aria-labelledby': 'title-' + role.id }, [
      el('div', { className: 'role-head' }, [
        el('span', { className: 'role-icon', 'aria-hidden': 'true', text: role.icon }),
        el('div', {}, [
          el('span', { className: 'role-cat', text: CATEGORIES[role.cat] }),
          el('h3', { id: 'title-' + role.id, text: role.title })
        ])
      ]),
      el('p', { className: 'role-question', text: role.question }),
      btn,
      el('div', { className: 'role-panel', id: panelId, hidden: '' }, [meta, missions, source])
    ]);

    btn.addEventListener('click', () => setExpanded(card, btn.getAttribute('aria-expanded') !== 'true'));
    rolesGrid.appendChild(card);
  });

  const roleCards = rolesGrid.querySelectorAll('.role-card');

  document.getElementById('reveal-all-btn').addEventListener('click', () => {
    roleCards.forEach(card => { if (!card.hidden) setExpanded(card, true); });
  });
  document.getElementById('hide-all-btn').addEventListener('click', () => {
    roleCards.forEach(card => setExpanded(card, false));
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

    if (deck === 'roles') {
      projStage.appendChild(el('div', { className: 'proj-head' }, [
        el('span', { className: 'proj-icon', 'aria-hidden': 'true', text: item.icon }),
        el('div', {}, [
          el('span', { className: 'proj-cat', text: CATEGORIES[item.cat] }),
          el('h2', { className: 'proj-title', text: item.title })
        ])
      ]));
      projStage.appendChild(el('p', { className: 'proj-question', text: item.question }));
      if (revealed) {
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
