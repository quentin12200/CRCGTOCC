/**
 * Formation CGT - Module « Cotisations et outils CGT »
 * Parcours : 1. à quoi sert la cotisation (cartes) · 2. calculer sa cotisation ·
 * 3. le circuit (répartition, CoGéTise et CoGiTiel) · 4. quiz.
 */

const MODELE = "Modèle de statuts de syndicat CGT (2024)";

const SERT = [
  {
    id: "independance",
    icon: "🛡️",
    title: "L'indépendance",
    question: "Pourquoi la cotisation garantit-elle l'indépendance du syndicat ?",
    points: [
      "C'est la ressource principale du syndicat : il ne dépend ni de l'employeur, ni des pouvoirs publics",
      "Elle matérialise l'appartenance du ou de la syndiqué·e à la CGT",
      "L'indépendance, la transparence financière, les effectifs et les cotisations font partie des 7 critères de représentativité"
    ],
    source: "Statuts confédéraux de la CGT ; Code du travail, art. L2121-1"
  },
  {
    id: "un-pourcent",
    icon: "💶",
    title: "1 % du salaire net",
    question: "Combien cotise-t-on à la CGT ?",
    points: [
      "1 % du salaire ou de la pension nette, toutes primes comprises, pour tout le monde",
      "Le versement régulier, de préférence par prélèvement automatique, évite les ruptures d'adhésion",
      "66 % de la cotisation sont remboursés par un crédit d'impôt, même sans être imposable",
      "Un syndicat qui fixe un taux inférieur se place hors des règles communes de la CGT"
    ],
    source: MODELE + ", art. 6 ; statuts confédéraux"
  },
  {
    id: "solidarite",
    icon: "🤝",
    title: "La solidarité entre structures",
    question: "Pourquoi ma cotisation finance-t-elle aussi l'UL, l'UD, la fédération et la Confédération ?",
    points: [
      "Chaque syndiqué·e appartient à toute la CGT : son syndicat, sa fédération, son territoire, la Confédération",
      "Une part de chaque cotisation fait vivre chacune de ces structures",
      "Les petits syndicats bénéficient ainsi de la formation, du soutien juridique et de l'aide de toute l'organisation"
    ],
    source: "Statuts confédéraux de la CGT ; Charte de la vie syndicale"
  },
  {
    id: "transparence",
    icon: "🔎",
    title: "La transparence",
    question: "Qui contrôle l'usage des cotisations ?",
    points: [
      "Le ou la trésorier·ère tient les comptes ; le bureau les arrête",
      "La commission exécutive les approuve chaque année",
      "La commission financière de contrôle vérifie la gestion et rend compte au congrès",
      "Les comptes sont publiés : c'est une obligation légale et un critère de représentativité"
    ],
    source: MODELE + ", art. 6, 8, 9 et 10"
  }
];

const OUTILS = [
  {
    id: "cogetise",
    icon: "🔁",
    title: "CoGéTise",
    question: "À quoi sert CoGéTise ?",
    points: [
      "C'est le système de répartition des cotisations de la CGT",
      "Le syndicat garde sa part et reverse le reste à CoGéTise",
      "CoGéTise répartit automatiquement entre la fédération, l'UL, l'UD, le comité régional et la Confédération",
      "Reverser régulièrement, c'est faire vivre toute la CGT"
    ],
    source: "Guide de l'organisation de la CGT"
  },
  {
    id: "cogitiel",
    icon: "🗂️",
    title: "CoGiTiel",
    question: "À quoi sert CoGiTiel ?",
    points: [
      "C'est le fichier des syndiqué·es de la CGT",
      "Il permet de connaître ses syndiqué·es et de suivre le parcours de chacun·e (changement d'employeur, retraite…)",
      "Il évite les ruptures d'adhésion et sert de base à la vie syndicale : informer, former, proposer des responsabilités",
      "Le tenir à jour est l'affaire du syndicat, avec son ou sa responsable à l'organisation"
    ],
    source: "Guide de l'organisation de la CGT ; Charte de la vie syndicale"
  }
];

const QUIZ_POOL = [
  { role: "un-pourcent", type: "qcm",
    question: "Quel est le montant de la cotisation à la CGT ?",
    options: ["1 % du salaire ou de la pension nette", "1 % du salaire brut", "Un forfait de 10 € par mois", "Il dépend de chaque syndiqué·e"],
    answer: "1 % du salaire ou de la pension nette",
    explanation: "La cotisation est égale à 1 % du salaire ou de la pension nette, toutes primes comprises." },
  { role: "un-pourcent", type: "vf",
    question: "Les primes entrent dans le calcul de la cotisation.",
    answer: "Vrai",
    explanation: "La cotisation est de 1 % du salaire net, toutes primes comprises." },
  { role: "un-pourcent", type: "qcm",
    question: "Quelle part de la cotisation est remboursée par le crédit d'impôt ?",
    options: ["66 %", "50 %", "25 %", "Rien"],
    answer: "66 %",
    explanation: "66 % de la cotisation sont remboursés par un crédit d'impôt, même si l'on n'est pas imposable." },
  { role: "un-pourcent", type: "vf",
    question: "Il faut être imposable pour bénéficier du crédit d'impôt sur la cotisation syndicale.",
    answer: "Faux",
    explanation: "C'est un crédit d'impôt : les personnes non imposables sont remboursées." },
  { role: "independance", type: "qcm",
    question: "Pourquoi la cotisation garantit-elle l'indépendance du syndicat ?",
    options: ["Le syndicat vit de ses syndiqué·es, pas de l'employeur", "Elle est fixée par l'employeur", "Elle est versée par l'État", "Elle remplace les élections"],
    answer: "Le syndicat vit de ses syndiqué·es, pas de l'employeur",
    explanation: "La cotisation est la ressource principale : elle rend le syndicat indépendant de l'employeur et des pouvoirs publics." },
  { role: "solidarite", type: "vf",
    question: "Toute la cotisation reste au syndicat.",
    answer: "Faux",
    explanation: "Le syndicat garde sa part et reverse le reste, via CoGéTise, à la fédération, au territoire et à la Confédération." },
  { role: "cogetise", type: "qcm",
    question: "Quel outil répartit les cotisations entre les structures de la CGT ?",
    options: ["CoGéTise", "CoGiTiel", "L'URSSAF", "Un virement direct à la fédération"],
    answer: "CoGéTise",
    explanation: "CoGéTise est le système de répartition des cotisations de la CGT." },
  { role: "cogitiel", type: "qcm",
    question: "À quoi sert CoGiTiel ?",
    options: ["Tenir le fichier des syndiqué·es", "Calculer les impôts", "Organiser les élections du CSE", "Payer les salaires"],
    answer: "Tenir le fichier des syndiqué·es",
    explanation: "CoGiTiel est le fichier des syndiqué·es : il permet de suivre le parcours de chacun·e et d'éviter les ruptures d'adhésion." },
  { role: "transparence", type: "qcm",
    question: "Quelle instance contrôle la gestion financière du syndicat ?",
    options: ["La commission financière de contrôle", "L'employeur", "Le bureau seul", "La préfecture"],
    answer: "La commission financière de contrôle",
    explanation: "La CFC, élue par le congrès hors de la CE, vérifie la gestion et rend compte au congrès." },
  { role: "transparence", type: "vf",
    question: "Les comptes du syndicat doivent être approuvés et publiés chaque année.",
    answer: "Vrai",
    explanation: "C'est une obligation légale et l'un des 7 critères de représentativité (transparence financière)." }
];

const QUIZ_LENGTH = 8;

const { el } = FK;

document.addEventListener('DOMContentLoaded', function() {

  /* ---------- Cartes ---------- */

  const listBody = item => [
    el('ul', { className: 'role-details' }, item.points.map(m => el('li', { text: m }))),
    el('p', { className: 'role-source', text: '📖 ' + item.source })
  ];
  const addCards = (gridId, items, label) => {
    const grid = document.getElementById(gridId);
    items.forEach(item => grid.appendChild(FK.buildCard({
      id: item.id, icon: item.icon, label, title: item.title, question: item.question, body: listBody(item)
    })));
  };
  addCards('sert-grid', SERT, 'À quoi sert la cotisation ?');
  addCards('outils-grid', OUTILS, 'Les outils de la CGT');

  /* ---------- Étape 2 : calculateur ---------- */

  const euros = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const calcResult = document.getElementById('calc-result');
  function calculer() {
    const salaire = parseFloat(String(document.getElementById('salaire').value).replace(',', '.')) || 0;
    calcResult.innerHTML = '';
    if (salaire <= 0) {
      calcResult.appendChild(el('h3', { text: 'Saisissez un salaire ou une pension nette mensuelle.' }));
      calcResult.hidden = false;
      return;
    }
    const mois = salaire * 0.01;
    const an = mois * 12;
    const reel = an * 0.34; // après 66 % de crédit d'impôt
    const tile = (v, t) => el('div', {}, [el('b', { text: euros(v) }), el('span', { text: t })]);
    calcResult.append(
      el('h3', { text: 'Pour ' + euros(salaire) + ' net par mois' }),
      el('div', { className: 'calc-grid' }, [
        tile(mois, 'cotisation par mois'),
        tile(an, 'cotisation par an'),
        tile(reel, 'coût réel par an, après 66 % de crédit d\'impôt'),
        tile(reel / 12, 'coût réel par mois')
      ])
    );
    calcResult.hidden = false;
  }
  document.getElementById('calc-btn').addEventListener('click', calculer);
  document.getElementById('salaire').addEventListener('keydown', e => { if (e.key === 'Enter') calculer(); });

  /* ---------- Étape 3 : répartition ---------- */

  const repart = document.getElementById('repartition');
  document.getElementById('repart-btn').addEventListener('click', () => {
    repart.dataset.shown = 'true';
    repart.querySelectorAll('.repart-bar div').forEach(d => { d.style.width = d.dataset.w + '%'; });
  });

  /* ---------- Parcours, quiz et projection ---------- */

  const quiz = FK.createQuiz({
    pool: QUIZ_POOL,
    length: QUIZ_LENGTH,
    onSeeCard: q => focusCard(q.role),
    results: { perfect: 'Sans faute ! Vous savez à quoi sert la cotisation et où elle va.' }
  });
  const modes = FK.initModes({ onQuiz: quiz.start });
  const parcours = FK.initParcours({ modes });

  function focusCard(id) {
    const card = document.getElementById('role-' + id);
    if (!card) return;
    parcours.show(card);
    FK.highlightCard(card);
  }

  const deck = (items, cat) => ({
    build: () => items,
    render: (stage, item, revealed) => FK.renderCardSlide(stage, {
      icon: item.icon, cat, title: item.title, question: item.question,
      answer: FK.listAnswer(item.points, item.source)
    }, revealed)
  });

  FK.initProjection({
    initialDeck: () => modes.isQuiz() ? 'quiz' : (parcours.current() === 3 ? 'outils' : 'sert'),
    decks: {
      sert: deck(SERT, 'À quoi sert la cotisation ?'),
      outils: deck(OUTILS, 'Les outils de la CGT'),
      quiz: {
        build: () => FK.drawQuestions(QUIZ_POOL, QUIZ_LENGTH),
        render: FK.renderQuizSlide
      }
    }
  });

  // À l'impression, la répartition est affichée
  window.addEventListener('beforeprint', () => document.getElementById('repart-btn').click());
  document.querySelector('.print-button').addEventListener('click', () => window.print());

  FK.initToc();
  FK.initTheme();
});
