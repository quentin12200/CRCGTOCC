/**
 * Formation CGT - Module « AG et congrès »
 * Parcours : 1. congrès et AG (cartes) · 2. autodiagnostic des 7 critères de
 * représentativité · 3. AG de syndiqué·es et AG de salarié·es · 4. quiz.
 */

const MODELE = "Modèle de statuts de syndicat CGT (2024)";

const INSTANCES = [
  {
    id: "congres",
    icon: "🏛️",
    title: "Le congrès, instance souveraine",
    question: "Qui compose le congrès du syndicat, et que décide-t-il ?",
    points: [
      "Il réunit tous les syndiqué·es à jour de leurs cotisations",
      "Il débat de l'activité, de l'orientation et des finances du syndicat",
      "Il se prononce par un vote sur les rapports présentés",
      "Il élit la commission exécutive et la commission financière de contrôle",
      "Il est le seul à pouvoir modifier les statuts, à la majorité des deux tiers"
    ],
    source: MODELE + ", art. 7 et 11"
  },
  {
    id: "ag",
    icon: "🙋",
    title: "L'assemblée générale",
    question: "À quoi sert une assemblée générale entre deux congrès ?",
    points: [
      "Elle est convoquée par la commission exécutive au moins une fois par an",
      "Les syndiqué·es y font le point sur l'activité et les finances",
      "Elles et ils y décident du programme revendicatif, des candidatures et des mandats",
      "C'est le lieu ordinaire de la démocratie syndicale : les syndiqué·es sont propriétaires de leur organisation"
    ],
    source: MODELE + ", art. 7 ; Charte de la vie syndicale"
  },
  {
    id: "preparer",
    icon: "🗓️",
    title: "Préparer un congrès",
    question: "Comment préparer un congrès pour que les syndiqué·es décident vraiment ?",
    points: [
      "La commission exécutive le convoque au moins un mois à l'avance, avec l'ordre du jour",
      "Les documents (rapport d'activité, rapport financier, orientations) circulent avant, pour en débattre sur les lieux de travail",
      "On lance l'appel à candidatures pour la CE et la CFC, en veillant à la diversité des syndiqué·es",
      "Le jour même : une présidence de séance, une commission des mandats qui vérifie qui peut voter, un procès-verbal"
    ],
    source: MODELE + ", art. 7 ; Charte de la vie syndicale"
  },
  {
    id: "extraordinaire",
    icon: "⚡",
    title: "Le congrès extraordinaire",
    question: "Qui peut demander un congrès extraordinaire ?",
    points: [
      "La commission exécutive",
      "Ou au moins un tiers des syndiqué·es",
      "Il permet de décider sans attendre le prochain congrès ordinaire, par exemple sur une modification des statuts ou une dissolution"
    ],
    source: MODELE + ", art. 7, 11 et 12"
  },
  {
    id: "voter",
    icon: "🗳️",
    title: "Voter",
    question: "Comment les syndiqué·es votent-ils en congrès ?",
    points: [
      "Chaque syndiqué·e à jour de ses cotisations prend part au vote",
      "Le vote a lieu à mains levées ou à bulletins secrets",
      "Les rapports sont adoptés à la majorité ; la modification des statuts demande les deux tiers",
      "Les décisions et les résultats sont consignés au procès-verbal"
    ],
    source: MODELE + ", art. 7 et 11"
  }
];

// AG de syndiqué·es et AG de salarié·es (« AG ouvrière ») : la seconde vient toujours après la première
const DEUX_AG = [
  {
    id: "ag-syndiques",
    icon: "🧑‍🤝‍🧑",
    title: "L'AG de syndiqué·es",
    question: "Qui participe à une AG de syndiqué·es, et que décide-t-elle ?",
    points: [
      "Elle réunit les syndiqué·es, et seulement elles et eux",
      "C'est la démocratie du syndicat : les syndiqué·es sont propriétaires de leur organisation",
      "Elles et ils analysent la situation et construisent ensemble les propositions de revendications et d'action",
      "Elles et ils décident de la vie du syndicat : orientation, candidatures, mandats"
    ],
    source: MODELE + ", art. 7 ; Charte de la vie syndicale"
  },
  {
    id: "ag-salaries",
    icon: "🏭",
    title: "L'AG de salarié·es, dite « AG ouvrière »",
    question: "Qui participe à une AG de salarié·es, et que décide-t-elle ?",
    points: [
      "Elle réunit tous les salarié·es concerné·es, syndiqué·es ou non",
      "Le syndicat y soumet les propositions construites avec ses syndiqué·es",
      "Les salarié·es débattent et décident ensemble de leurs revendications et de leur action : grève, pétition, délégation…",
      "C'est aussi un moment pour proposer l'adhésion à la CGT"
    ],
    source: "Charte de la vie syndicale"
  },
  {
    id: "ag-ordre",
    icon: "🔁",
    title: "Pourquoi l'AG de syndiqué·es d'abord ?",
    question: "Pourquoi l'AG de syndiqué·es se tient-elle toujours avant l'AG de salarié·es ?",
    points: [
      "Le syndicat arrive devant les salarié·es avec des propositions décidées collectivement, pas celles de quelques militant·es",
      "On respecte la souveraineté des syndiqué·es : rien ne se décide au nom du syndicat sans elles et eux",
      "Les syndiqué·es portent ensuite ces propositions sur le terrain, auprès de leurs collègues",
      "Après l'action, on revient vers les syndiqué·es pour faire le bilan et décider des suites"
    ],
    source: "Charte de la vie syndicale"
  },
  {
    id: "ag-qui-decide",
    icon: "⚖️",
    title: "Qui décide quoi ?",
    question: "Dans chacune des deux AG, qui décide, et de quoi ?",
    points: [
      "Les syndiqué·es décident de la vie et des propositions de leur syndicat",
      "Les salarié·es décident de leurs revendications et de leurs actions",
      "Le syndicat éclaire, propose et organise : il ne décide pas à la place des salarié·es",
      "Ne pas confondre les deux : chacune a son rôle, et elles se complètent"
    ],
    source: "Charte de la vie syndicale"
  }
];

// Autodiagnostic des 7 critères de représentativité (Code du travail, art. L2121-1)
const CRITERES = [
  { t: "Le respect des valeurs républicaines", d: "Liberté d'opinion, refus de toute discrimination et de tout racisme.", q: "Nos statuts et nos pratiques les affirment-ils clairement ?", conseil: "Reprendre le préambule des statuts confédéraux dans nos statuts et le faire vivre dans nos actions." },
  { t: "L'indépendance", d: "Notamment vis-à-vis de l'employeur.", q: "Le syndicat vit-il de ses cotisations, sans dépendre de l'employeur ?", conseil: "Développer le prélèvement automatique et faire de la cotisation la ressource principale." },
  { t: "La transparence financière", d: "Comptes établis, approuvés et publiés chaque année.", q: "Nos comptes sont-ils arrêtés par le bureau, approuvés par la CE et publiés ?", conseil: "Calendrier annuel : arrêté des comptes, approbation en CE (procès-verbal), contrôle de la CFC, publication." },
  { t: "Une ancienneté minimale de 2 ans", d: "Dans le champ professionnel et géographique, à compter du dépôt des statuts.", q: "Nos statuts sont-ils déposés en mairie et à jour de notre périmètre ?", conseil: "Vérifier le dépôt en mairie et préciser dans le préambule toute modification, tout regroupement ou toute extension." },
  { t: "L'audience", d: "Au moins 10 % des suffrages au 1er tour des élections du CSE (8 % dans la branche et au niveau national).", q: "Présentons-nous des listes complètes, construites avec les syndiqué·es ?", conseil: "Préparer les élections tôt, avec les syndiqué·es de chaque collège, et faire campagne." },
  { t: "L'influence", d: "Caractérisée en priorité par l'activité et l'expérience.", q: "Le syndicat est-il visible et actif auprès des salarié·es (tracts, réunions, actions) ?", conseil: "Un plan de travail : heures d'information, tracts réguliers, permanences, actions revendicatives." },
  { t: "Les effectifs d'adhérent·es et les cotisations", d: "Le nombre de syndiqué·es et le versement régulier des cotisations.", q: "Le nombre de syndiqué·es progresse-t-il ? Les cotisations sont-elles reversées régulièrement ?", conseil: "Faire de la syndicalisation l'affaire de toutes et tous : proposer l'adhésion, suivre chaque parcours (CoGiTiel)." }
];

const QUIZ_POOL = [
  { role: "congres", type: "qcm",
    question: "Quelle est l'instance souveraine du syndicat ?",
    options: ["Le congrès des syndiqué·es", "La commission exécutive", "Le bureau", "Le ou la secrétaire général·e"],
    answer: "Le congrès des syndiqué·es",
    explanation: "Le congrès réunit tous les syndiqué·es à jour de leurs cotisations : c'est l'instance souveraine (art. 7)." },
  { role: "congres", type: "qcm",
    question: "Qui élit la commission exécutive et la commission financière de contrôle ?",
    options: ["Le congrès", "Le bureau", "L'union départementale", "La fédération"],
    answer: "Le congrès",
    explanation: "Le congrès élit la CE et la CFC (art. 7 à 9)." },
  { role: "congres", type: "qcm",
    question: "Quelle majorité faut-il pour modifier les statuts du syndicat ?",
    options: ["Les deux tiers, en congrès", "La majorité simple, en CE", "L'unanimité du bureau", "L'accord de la fédération"],
    answer: "Les deux tiers, en congrès",
    explanation: "Seul le congrès peut modifier les statuts, à la majorité des deux tiers (art. 11)." },
  { role: "ag", type: "qcm",
    question: "Entre deux congrès, à quelle fréquence minimale réunit-on une assemblée générale des syndiqué·es ?",
    options: ["Une fois par an", "Une fois tous les trois ans", "Seulement en cas de conflit", "Jamais : le congrès suffit"],
    answer: "Une fois par an",
    explanation: "La CE convoque une assemblée générale au moins une fois par an (art. 7)." },
  { role: "preparer", type: "vf",
    question: "Le congrès doit être convoqué au moins un mois à l'avance, avec son ordre du jour.",
    answer: "Vrai",
    explanation: "La CE convoque le congrès au moins un mois à l'avance, avec l'ordre du jour, pour que les syndiqué·es puissent en débattre (art. 7)." },
  { role: "preparer", type: "vf",
    question: "Les documents du congrès sont découverts le jour même par les syndiqué·es.",
    answer: "Faux",
    explanation: "Les rapports et les orientations circulent avant le congrès, pour en débattre sur les lieux de travail : c'est ce qui permet aux syndiqué·es de décider vraiment." },
  { role: "extraordinaire", type: "qcm",
    question: "Qui peut demander un congrès extraordinaire ?",
    options: ["La CE ou au moins un tiers des syndiqué·es", "Le ou la secrétaire général·e seul·e", "L'employeur", "Seulement la Confédération"],
    answer: "La CE ou au moins un tiers des syndiqué·es",
    explanation: "Un congrès extraordinaire peut être demandé par la CE ou par au moins un tiers des syndiqué·es (art. 7)." },
  { role: "voter", type: "vf",
    question: "En congrès, le vote peut avoir lieu à mains levées ou à bulletins secrets.",
    answer: "Vrai",
    explanation: "Le modèle de statuts prévoit les deux modes de vote (art. 7)." },
  { role: "ag-syndiques", type: "qcm",
    question: "Qui participe à une AG de syndiqué·es ?",
    options: ["Les syndiqué·es seulement", "Tous les salarié·es de l'entreprise", "Les élu·es du CSE seulement", "L'employeur et les élu·es"],
    answer: "Les syndiqué·es seulement",
    explanation: "L'AG de syndiqué·es est la démocratie du syndicat : elle réunit ses syndiqué·es." },
  { role: "ag-salaries", type: "qcm",
    question: "Qui participe à une AG de salarié·es (« AG ouvrière ») ?",
    options: ["Tous les salarié·es concerné·es, syndiqué·es ou non", "Les syndiqué·es seulement", "Le bureau du syndicat", "Les cadres seulement"],
    answer: "Tous les salarié·es concerné·es, syndiqué·es ou non",
    explanation: "L'AG de salarié·es est ouverte à tous les salarié·es concerné·es : ce sont elles et eux qui décident de leur action." },
  { role: "ag-ordre", type: "qcm",
    question: "Dans quel ordre se tiennent les deux assemblées générales ?",
    options: ["D'abord l'AG de syndiqué·es, puis l'AG de salarié·es", "D'abord l'AG de salarié·es, puis l'AG de syndiqué·es", "Les deux en même temps", "L'ordre n'a pas d'importance"],
    answer: "D'abord l'AG de syndiqué·es, puis l'AG de salarié·es",
    explanation: "Le syndicat construit d'abord ses propositions avec ses syndiqué·es, puis les soumet aux salarié·es." },
  { role: "ag-qui-decide", type: "vf",
    question: "En AG de salarié·es, c'est le syndicat qui décide de l'action à la place des salarié·es.",
    answer: "Faux",
    explanation: "Le syndicat propose et organise ; ce sont les salarié·es qui décident de leurs revendications et de leur action." },
  { role: "representativite", type: "qcm",
    question: "Combien de critères faut-il remplir pour qu'un syndicat soit représentatif ?",
    options: ["Les 7, ils sont cumulatifs", "Au moins 4 sur 7", "Seulement l'audience", "Un seul suffit"],
    answer: "Les 7, ils sont cumulatifs",
    explanation: "Les 7 critères de l'article L2121-1 du Code du travail sont cumulatifs." },
  { role: "representativite", type: "qcm",
    question: "Quelle audience faut-il au 1er tour des élections du CSE pour être représentatif dans l'entreprise ?",
    options: ["10 % des suffrages exprimés", "5 % des inscrits", "25 % des suffrages", "50 % des votants"],
    answer: "10 % des suffrages exprimés",
    explanation: "Il faut au moins 10 % des suffrages exprimés au 1er tour des élections du CSE (8 % dans la branche et au niveau national)." },
  { role: "representativite", type: "vf",
    question: "Tenir ses AG, faire approuver et publier ses comptes aide le syndicat à être représentatif.",
    answer: "Vrai",
    explanation: "La transparence financière et l'indépendance font partie des 7 critères : faire vivre ses statuts, c'est déjà en remplir plusieurs." },
  { role: "representativite", type: "qcm",
    question: "À partir de quand compte-t-on l'ancienneté de 2 ans exigée pour la représentativité ?",
    options: ["Le dépôt des statuts", "La première adhésion", "Les premières élections", "La première négociation"],
    answer: "Le dépôt des statuts",
    explanation: "L'ancienneté de 2 ans se compte à partir du dépôt légal des statuts, dans le champ professionnel et géographique concerné." }
];

const QUIZ_LENGTH = 10;

const { el } = FK;

document.addEventListener('DOMContentLoaded', function() {

  /* ---------- Étape 1 : cartes ---------- */

  const listBody = item => [
    el('ul', { className: 'role-details' }, item.points.map(m => el('li', { text: m }))),
    el('p', { className: 'role-source', text: '📖 ' + item.source })
  ];
  const grid = document.getElementById('instances-grid');
  INSTANCES.forEach(item => grid.appendChild(FK.buildCard({
    id: item.id, icon: item.icon, label: 'Congrès et assemblée générale',
    title: item.title, question: item.question, body: listBody(item)
  })));
  const agGrid = document.getElementById('ag-grid');
  DEUX_AG.forEach(item => agGrid.appendChild(FK.buildCard({
    id: item.id, icon: item.icon, label: 'Deux assemblées générales',
    title: item.title, question: item.question, body: listBody(item)
  })));

  /* ---------- Étape 2 : autodiagnostic des 7 critères ---------- */

  const LABELS = [["2", "✅ Oui"], ["1", "🟡 En partie"], ["0", "❌ Non"]];
  const diagEl = document.getElementById('diag');
  const answers = {};

  function renderDiag() {
    diagEl.innerHTML = '';
    CRITERES.forEach((c, i) => {
      const choices = el('div', { className: 'diag-choices', role: 'group', 'aria-label': 'Réponse pour : ' + c.t });
      LABELS.forEach(([v, label]) => {
        const b = el('button', { type: 'button', 'data-v': v, 'aria-pressed': String(answers[i] === v), text: label });
        b.addEventListener('click', () => {
          answers[i] = v;
          choices.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        });
        choices.appendChild(b);
      });
      diagEl.appendChild(el('li', {}, [
        el('div', {}, [
          el('h4', { text: c.t }),
          el('p', { text: c.d }),
          el('p', { className: 'diag-q', text: c.q })
        ]),
        choices
      ]));
    });
  }

  document.getElementById('diag-bilan').addEventListener('click', () => {
    const res = document.getElementById('diag-result');
    const counts = { '2': 0, '1': 0, '0': 0 };
    const aRenforcer = [];
    CRITERES.forEach((c, i) => {
      if (answers[i] === undefined) return;
      counts[answers[i]]++;
      if (answers[i] !== '2') aRenforcer.push(c);
    });
    const repondu = counts['2'] + counts['1'] + counts['0'];
    res.innerHTML = '';
    res.appendChild(el('h3', {
      text: repondu === 0 ? 'Répondez d\'abord aux critères ci-dessus.'
        : counts['2'] === 7 ? 'Bravo : les 7 critères sont remplis.'
        : 'Bilan : ' + counts['2'] + ' critère(s) rempli(s) sur 7'
    }));
    if (repondu) {
      res.appendChild(el('div', {
        className: 'diag-score',
        text: '✅ ' + counts['2'] + ' · 🟡 ' + counts['1'] + ' · ❌ ' + counts['0'] + (repondu < 7 ? ' · ' + (7 - repondu) + ' sans réponse' : '')
      }));
    }
    if (aRenforcer.length) {
      res.appendChild(el('p', {}, [el('strong', { text: 'À renforcer dans notre syndicat :' })]));
      res.appendChild(el('ul', {}, aRenforcer.map(c => el('li', {}, [
        el('strong', { text: c.t + ' : ' }),
        document.createTextNode(c.conseil)
      ]))));
    }
    res.appendChild(el('p', { className: 'diag-note', text: 'Ces critères sont cumulatifs : il faut tous les remplir pour être représentatif.' }));
    res.hidden = false;
    res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('diag-reset').addEventListener('click', () => {
    Object.keys(answers).forEach(k => delete answers[k]);
    document.getElementById('diag-result').hidden = true;
    renderDiag();
  });
  renderDiag();

  /* ---------- Parcours, quiz et projection ---------- */

  const quiz = FK.createQuiz({
    pool: QUIZ_POOL,
    length: QUIZ_LENGTH,
    onSeeCard: q => focusCard(q.role),
    results: { perfect: 'Sans faute ! Vous maîtrisez le rôle de l\'AG et du congrès.' }
  });
  const modes = FK.initModes({ onQuiz: quiz.start });
  const parcours = FK.initParcours({ modes });

  function focusCard(id) {
    const node = document.getElementById('role-' + id) || document.getElementById(id);
    if (!node) return;
    parcours.show(node);
    if (node.classList.contains('role-card')) FK.highlightCard(node);
    else node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  FK.initProjection({
    initialDeck: () => modes.isQuiz() ? 'quiz' : ({ 2: 'criteres', 3: 'ag' }[parcours.current()] || 'instances'),
    decks: {
      instances: {
        build: () => INSTANCES,
        render: (stage, item, revealed) => FK.renderCardSlide(stage, {
          icon: item.icon, cat: 'Congrès et assemblée générale', title: item.title,
          question: item.question, answer: FK.listAnswer(item.points, item.source)
        }, revealed)
      },
      ag: {
        build: () => DEUX_AG,
        render: (stage, item, revealed) => FK.renderCardSlide(stage, {
          icon: item.icon, cat: 'Deux assemblées générales', title: item.title,
          question: item.question, answer: FK.listAnswer(item.points, item.source)
        }, revealed)
      },
      criteres: {
        build: () => CRITERES,
        render: (stage, item, revealed) => FK.renderCardSlide(stage, {
          icon: '⚖️', cat: 'Critère ' + (CRITERES.indexOf(item) + 1) + ' sur 7 (art. L2121-1)', title: item.t,
          question: item.q, answer: FK.listAnswer([item.d, 'Pour progresser : ' + item.conseil])
        }, revealed)
      },
      quiz: {
        build: () => FK.drawQuestions(QUIZ_POOL, QUIZ_LENGTH),
        render: FK.renderQuizSlide
      }
    }
  });

  document.querySelector('.print-button').addEventListener('click', () => window.print());

  FK.initToc();
  FK.initTheme();
});
