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
    designation: "Adhère librement au syndicat de son entreprise ou de sa profession et y cotise.",
    rendCompte: "Décide avec les autres syndiqué·es, en assemblée générale et en congrès.",
    missions: [
      "Participe à la vie démocratique du syndicat",
      "Vote lors des assemblées générales et des congrès",
      "Contribue financièrement par sa cotisation",
      "Est informé·e et consulté·e sur l'activité et les décisions",
      "Peut être candidat·e aux responsabilités syndicales",
      "Diffuse les valeurs et les revendications de la CGT"
    ],
    source: "Statuts du syndicat et statuts confédéraux"
  },
  {
    id: "congres",
    cat: "syndicat",
    title: "Congrès / Assemblée générale",
    icon: "🏛️",
    question: "Pourquoi dit-on que le congrès est l'instance souveraine du syndicat ?",
    designation: "Réunit l'ensemble des syndiqué·es (ou leurs délégué·es).",
    rendCompte: "Les syndiqué·es elles-mêmes et eux-mêmes : c'est l'instance la plus haute.",
    missions: [
      "Définit les orientations et les revendications du syndicat",
      "Adopte et modifie les statuts",
      "Élit la commission exécutive et la commission financière de contrôle",
      "Examine le rapport d'activité et le rapport financier, et donne quitus",
      "Se réunit à la périodicité fixée par les statuts"
    ],
    source: "Statuts du syndicat"
  },
  {
    id: "ce",
    cat: "syndicat",
    title: "Commission exécutive",
    icon: "🧩",
    question: "Quel est le rôle de la commission exécutive (CE) ?",
    designation: "Élue par le congrès.",
    rendCompte: "Au congrès.",
    missions: [
      "Dirige le syndicat entre deux congrès",
      "Met en œuvre les orientations décidées en congrès",
      "Prend les décisions politiques et stratégiques",
      "Élit en son sein le bureau, le ou la secrétaire général·e et le ou la trésorier·ère",
      "Contrôle l'activité du bureau"
    ],
    source: "Statuts du syndicat"
  },
  {
    id: "cfc",
    cat: "syndicat",
    title: "Commission financière de contrôle",
    icon: "🔎",
    question: "À quoi sert la commission financière de contrôle (CFC) ?",
    designation: "Élue par le congrès.",
    rendCompte: "Au congrès, devant lequel elle présente son rapport.",
    missions: [
      "Contrôle la tenue des comptes et la régularité des dépenses",
      "Vérifie la perception et le reversement des cotisations",
      "Agit en toute indépendance du bureau",
      "Présente son rapport au congrès, avant le vote du quitus"
    ],
    source: "Statuts du syndicat"
  },
  {
    id: "bureau",
    cat: "syndicat",
    title: "Bureau syndical",
    icon: "🗂️",
    question: "Quelles sont les fonctions du bureau syndical ?",
    designation: "Élu par la commission exécutive, parmi ses membres.",
    rendCompte: "À la commission exécutive.",
    missions: [
      "Assure la gestion quotidienne du syndicat",
      "Met en œuvre les décisions de la CE",
      "Prépare les réunions de la CE",
      "Coordonne l'activité des différents secteurs",
      "Réagit rapidement aux situations urgentes"
    ],
    source: "Statuts du syndicat"
  },
  {
    id: "sg",
    cat: "responsables",
    title: "Secrétaire général·e",
    icon: "🧭",
    question: "Quel est le rôle du ou de la secrétaire général·e d'un syndicat CGT ?",
    designation: "Élu·e par la commission exécutive.",
    rendCompte: "À la commission exécutive et au congrès.",
    missions: [
      "Représente le syndicat auprès des employeurs et des institutions",
      "Coordonne l'activité syndicale et veille à l'application des décisions",
      "Anime l'équipe syndicale et les réunions du bureau",
      "Signe les correspondances officielles du syndicat",
      "Ne décide pas seul·e : applique les orientations du congrès et de la CE"
    ],
    source: "Statuts du syndicat"
  },
  {
    id: "tresorier",
    cat: "responsables",
    title: "Trésorier·ère",
    icon: "💰",
    question: "Quelles sont les responsabilités du ou de la trésorier·ère ?",
    designation: "Élu·e par la commission exécutive.",
    rendCompte: "À la CE ; les comptes sont contrôlés par la CFC et approuvés par le congrès.",
    missions: [
      "Gère les finances du syndicat et tient la comptabilité",
      "Établit les comptes annuels et en assure la publication",
      "Suit les cotisations et leur reversement via CoGéTise",
      "Prépare le budget prévisionnel",
      "Présente régulièrement l'état des finances aux instances"
    ],
    source: "Code du travail, art. L2135-1 à L2135-6 (transparence financière)"
  },
  {
    id: "org",
    cat: "responsables",
    title: "Secrétaire à l'organisation",
    icon: "📋",
    question: "Que fait le ou la secrétaire à l'organisation ?",
    designation: "Élu·e par la commission exécutive.",
    rendCompte: "À la commission exécutive.",
    missions: [
      "Organise la vie interne du syndicat (réunions, AG, congrès)",
      "Suit l'évolution des adhésions et la syndicalisation",
      "Tient à jour le fichier des syndiqué·es (CoGiTiel)",
      "Coordonne la communication interne",
      "Assure le lien avec les structures interprofessionnelles (UL, UD)"
    ],
    source: "Statuts du syndicat"
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
    options: ["Le congrès (ou l'AG des syndiqué·es)", "La commission exécutive", "Le bureau", "Le ou la secrétaire général·e"],
    answer: "Le congrès (ou l'AG des syndiqué·es)",
    explanation: "Le congrès réunit les syndiqué·es : il fixe les orientations, élit la CE et la CFC et donne quitus." },
  { role: "ce", type: "qcm",
    question: "Quel organe dirige le syndicat entre deux congrès ?",
    options: ["La commission exécutive", "Le bureau", "Le ou la secrétaire général·e", "La CFC"],
    answer: "La commission exécutive",
    explanation: "Élue par le congrès, la CE dirige le syndicat entre deux congrès et lui rend compte." },
  { role: "ce", type: "qcm",
    question: "Qui élit le bureau et le ou la secrétaire général·e ?",
    options: ["La commission exécutive", "Les adhérent·es, directement", "L'union départementale", "Le congrès confédéral"],
    answer: "La commission exécutive",
    explanation: "La CE élit en son sein le bureau, le ou la SG et le ou la trésorier·ère, qui lui rendent compte." },
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
    explanation: "Élue par le congrès et indépendante du bureau, la CFC vérifie les comptes et présente son rapport au congrès." },
  { role: "org", type: "qcm",
    question: "Qui suit les adhésions et tient à jour le fichier des syndiqué·es ?",
    options: ["Le ou la secrétaire à l'organisation", "Le ou la trésorier·ère", "Le ou la délégué·e syndical·e", "Le ou la secrétaire général·e"],
    answer: "Le ou la secrétaire à l'organisation",
    explanation: "La vie syndicale et la syndicalisation relèvent de l'organisation (fichier CoGiTiel)." },
  { role: "tresorier", type: "qcm",
    question: "Par quel outil passe la répartition des cotisations dans la CGT ?",
    options: ["CoGéTise", "CoGiTiel", "L'URSSAF", "Un virement direct à la fédération"],
    answer: "CoGéTise",
    explanation: "CoGéTise répartit chaque cotisation entre le syndicat, l'UL/UD, la fédération et la confédération. CoGiTiel, c'est le fichier des syndiqué·es." },
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
    explanation: "Élu par la CE, le bureau gère le quotidien et lui rend compte." },
  { role: "adherent", type: "vf",
    question: "Tout·e adhérent·e peut être candidat·e aux responsabilités syndicales.",
    answer: "Vrai",
    explanation: "C'est un droit de chaque syndiqué·e, dans les conditions prévues par les statuts." },
  { role: "sg", type: "vf",
    question: "Le ou la secrétaire général·e peut décider seul·e des orientations du syndicat.",
    answer: "Faux",
    explanation: "Les orientations sont décidées par le congrès et mises en œuvre par la CE. Le ou la SG coordonne et rend compte." },
  { role: "sg", type: "qcm",
    question: "Qui représente le syndicat et coordonne son activité, sous le contrôle de la CE ?",
    options: ["Le ou la secrétaire général·e", "Le ou la trésorier·ère", "Le ou la délégué·e syndical·e", "La CFC"],
    answer: "Le ou la secrétaire général·e",
    explanation: "Le ou la SG représente le syndicat et anime l'équipe, mais rend compte à la CE et au congrès." }
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

  /* ---------- Projection & impression ---------- */

  const presBtn = document.querySelector('.presentation-button');
  function setPresentation(on) {
    document.body.classList.toggle('presentation', on);
    presBtn.setAttribute('aria-pressed', String(on));
    presBtn.textContent = on ? '✖ Quitter la projection' : '🖥️ Mode projection';
  }
  presBtn.addEventListener('click', () => {
    const on = !document.body.classList.contains('presentation');
    setPresentation(on);
    try {
      if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
      else if (!on && document.fullscreenElement) document.exitFullscreen();
    } catch (e) {}
  });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) setPresentation(false);
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
