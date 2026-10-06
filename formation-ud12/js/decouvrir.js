/**
 * Formation CGT - « Découvrir la CGT » (2 heures)
 * Pour les nouveaux adhérent·es et les salarié·es pas encore syndiqué·es.
 * Trame de l'UD CGT de l'Aveyron : les métiers des stagiaires, puis la CGT
 * présentée en partant du syndiqué, la cotisation et la formation syndicale.
 */

// Déroulé de la séance (durées en minutes)
const SEQUENCES = [
  {
    id: "seq-accueil", minutes: 25, icon: "👋",
    title: "Accueil et tour de table des métiers",
    objectif: "Mettre chacun·e à l'aise et faire parler de son travail : c'est le point de départ de toute la séance.",
    activite: [
      "Accueil individuel à l'arrivée, café, place avec le prénom de chacun·e",
      "Tour de table : prénom, métier, entreprise ou service, ce que j'aime dans mon travail, ce qui ne va pas",
      "« Qu'est-ce que vous avez envie de découvrir de la CGT ? »",
      "Noter les métiers dans le tableau ci-dessous : on s'en servira pour situer chacun·e dans la CGT"
    ],
    conseil: "Insister sur les métiers : chacun·e doit sentir que son travail compte. Deux minutes par personne maximum ; si quelqu'un a un problème personnel au travail, proposer d'en parler après la séance."
  },
  {
    id: "seq-animateur", minutes: 10, icon: "🙋",
    title: "Je me présente : l'animateur·ice",
    objectif: "Montrer qu'un·e militant·e CGT est un·e salarié·e comme les autres.",
    activite: [
      "Mon métier, mon entreprise ou mon service",
      "Pourquoi et quand je me suis syndiqué·e",
      "Ce que je fais dans la CGT aujourd'hui (syndicat, mandats, UL, UD…)",
      "Ce que la CGT m'a apporté, à moi et à mes collègues"
    ],
    conseil: "Rester simple et concret : une anecdote vécue vaut mieux qu'un discours."
  },
  {
    id: "seq-structures", minutes: 45, icon: "🏗️",
    title: "La CGT, en partant du syndiqué",
    objectif: "Comprendre comment la CGT est organisée, du ou de la syndiqué·e jusqu'à la confédération, et y situer chaque stagiaire.",
    activite: [
      "Construire la CGT étape par étape avec le schéma ci-dessous (bouton « Étape suivante »)",
      "À chaque étape, demander : « Qui l'a déjà croisée ? » « Où est-ce près de chez vous ? »",
      "Situer chaque stagiaire : son syndicat, son union professionnelle, sa fédération, son UL",
      "Finir sur les deux branches : professionnelle et territoriale / interprofessionnelle"
    ],
    conseil: "Partir toujours du ou de la syndiqué·e : c'est elle ou lui qui fait la CGT. Les sigles se retiennent mieux rattachés à un métier ou à un lieu connu."
  },
  {
    id: "seq-cotisation", minutes: 20, icon: "💶",
    title: "La cotisation : combien, et où va l'argent ?",
    objectif: "Comprendre que la cotisation finance une organisation indépendante et solidaire.",
    activite: [
      "« Où va l'argent de la cotisation, à votre avis ? » : faire deviner avant de montrer",
      "Calculer une cotisation à 1 % net avec le simulateur, et son coût réel après crédit d'impôt",
      "Montrer la répartition : syndicat, fédération, territoire, confédération"
    ],
    conseil: "Insister sur l'indépendance : la CGT ne vit que de ses syndiqué·es. Ne pas entrer dans le détail technique de CoGéTise."
  },
  {
    id: "seq-formation", minutes: 15, icon: "🎓",
    title: "Se former à la CGT",
    objectif: "Donner envie de continuer : la formation syndicale est un droit, ouvert à toutes et tous.",
    activite: [
      "Présenter le parcours : Découvrir, S'impliquer, Participer, Développer, Impulser",
      "Le droit à 12 jours par an de congé de formation économique, sociale et syndicale",
      "À qui s'adresser : le syndicat d'abord, puis l'UL, l'UD ou la fédération",
      "Remettre le guide « Ma formation syndicale CGT »"
    ],
    conseil: "Répondre aux situations des stagiaires présent·es : intérim, privé·e d'emploi, retraité·e, temps partiel…"
  },
  {
    id: "seq-conclusion", minutes: 5, icon: "🤝",
    title: "Conclusion : et maintenant ?",
    objectif: "Proposer l'adhésion, sans pression.",
    activite: [
      "Tour de table : « Je repars avec… »",
      "Remettre la présentation du syndicat (document D2) et le bulletin d'adhésion (document D1)",
      "« Vous pouvez adhérer maintenant ou plus tard, quand vous le déciderez. »"
    ],
    conseil: "Laisser le bulletin sur la table et rester disponible quelques minutes après la séance."
  }
];

// La CGT, de la base au sommet. order = ordre de présentation ; col = place dans le schéma
// (base : centre ; pro : branche professionnelle ; terr : branche territoriale)
const STRUCTURES = [
  {
    id: "syndique", order: 1, col: "base", icon: "🧑‍🔧",
    short: "Le ou la syndiqué·e", name: "Le ou la syndiqué·e",
    question: "Qui fait la CGT ?",
    points: [
      "C'est le point de départ : sans syndiqué·es, pas de syndicat",
      "Il ou elle cotise, s'informe, se forme, vote et décide des orientations",
      "Chacun·e compte pour un : ce sont les adhérent·es qui décident",
      "On prend la place qu'on a envie de prendre, avec le degré d'engagement qu'on choisit"
    ]
  },
  {
    id: "section", order: 2, col: "base", icon: "🏭",
    short: "La section syndicale", name: "La section syndicale (s'il y en a une)",
    question: "Qu'est-ce qui rassemble les syndiqué·es sur le lieu de travail ?",
    points: [
      "Elle regroupe les syndiqué·es CGT d'une entreprise, d'un établissement ou d'un service",
      "Elle fait vivre la CGT au quotidien : tracts, réunions, permanences, revendications",
      "Elle n'existe pas partout : elle dépend d'un syndicat, dont elle est une partie",
      "C'est souvent là que l'on rencontre la CGT pour la première fois"
    ]
  },
  {
    id: "syndicat", order: 3, col: "base", icon: "🏠",
    short: "Le syndicat", name: "Le syndicat, base de toute la CGT",
    question: "Pourquoi dit-on que le syndicat est « la base de toute la CGT » ?",
    points: [
      "Les syndiqué·es s'y organisent : il a ses statuts, son congrès, sa direction élue",
      "Il décide de ses revendications et de ses actions, et désigne les délégué·es syndicaux",
      "Il peut être d'entreprise, local professionnel, ou de site (inter-entreprises)",
      "Il adhère à la fois à une fédération (sa profession) et à une union départementale (son territoire) : c'est la double affiliation"
    ]
  },
  {
    id: "ul", order: 4, col: "terr", icon: "📍",
    short: "Union locale (UL)", name: "L'union locale (UL)",
    question: "Où trouver la CGT près de chez soi, quel que soit son métier ?",
    points: [
      "Elle rassemble tous les syndicats CGT d'une ville ou d'un bassin d'emploi, toutes professions confondues",
      "C'est la CGT de proximité : permanences, accueil des salarié·es isolé·es, des petites entreprises, des privé·es d'emploi",
      "Elle organise la solidarité entre syndicats et les mobilisations locales",
      "C'est souvent la porte d'entrée quand il n'y a pas de syndicat dans son entreprise"
    ]
  },
  {
    id: "unions-pro", order: 5, col: "pro", icon: "🧰",
    short: "Unions professionnelles (USD, CSD, USTM…)", name: "Les unions professionnelles départementales",
    question: "Qui rassemble les syndicats d'une même profession dans le département ?",
    points: [
      "Elles regroupent, dans le département, les syndicats CGT d'un même secteur professionnel",
      "USD : union syndicale départementale (par exemple dans la santé et l'action sociale)",
      "CSD : coordination syndicale départementale (par exemple dans les services publics)",
      "USTM : union syndicale des travailleurs de la métallurgie",
      "Elles font le lien entre les syndicats du département et leur fédération"
    ]
  },
  {
    id: "ud", order: 6, col: "terr", icon: "🗺️",
    short: "Union départementale (UD)", name: "L'union départementale (UD)",
    question: "Qui rassemble tous les syndicats CGT du département ?",
    points: [
      "Elle rassemble tous les syndicats CGT du département, de toutes les professions",
      "Elle coordonne les unions locales et porte les revendications interprofessionnelles du territoire",
      "Elle organise la formation syndicale, le soutien juridique, les grandes mobilisations",
      "Ici : l'union départementale CGT de l'Aveyron"
    ]
  },
  {
    id: "cr", order: 7, col: "terr", icon: "🧭",
    short: "Comité régional", name: "Le comité régional",
    question: "Qui porte la voix de la CGT face à la Région ?",
    points: [
      "Il rassemble et coordonne les unions départementales d'une région",
      "Il porte les revendications sur les compétences de la Région : formation professionnelle, transports, développement économique…",
      "Ici : le comité régional CGT Occitanie"
    ]
  },
  {
    id: "fd", order: 8, col: "pro", icon: "🏢",
    short: "Fédérations", name: "Les fédérations",
    question: "Qui défend les salarié·es d'une même profession dans tout le pays ?",
    points: [
      "Elles rassemblent les syndicats et les unions professionnelles de leur champ professionnel",
      "Elles couvrent les branches professionnelles et négocient les conventions collectives",
      "Exemples : métallurgie, santé et action sociale, commerce et services, services publics, cheminots…",
      "Elles organisent la formation et les actions propres à leur profession"
    ]
  },
  {
    id: "specifiques", order: 9, col: "base", icon: "🧩",
    short: "UGICT, UCR, CNTPEP, INDECOSA", name: "Les organisations spécifiques",
    question: "Comment la CGT s'adresse-t-elle à toutes les situations : cadres, retraité·es, précaires, consommateurs ?",
    points: [
      "UGICT : l'union générale des ingénieurs, cadres et techniciens",
      "UCR : l'union confédérale des retraité·es, pour que la retraite ne soit pas la fin de l'engagement",
      "CNTPEP : le comité national des travailleurs privés d'emploi et précaires",
      "INDECOSA : l'association de la CGT pour la défense des consommateurs et des locataires"
    ]
  },
  {
    id: "confederation", order: 10, col: "base", icon: "🏛️",
    short: "La Confédération", name: "La Confédération générale du travail",
    question: "Qu'est-ce qui réunit toutes ces structures ?",
    points: [
      "Elle est constituée par les fédérations et les unions départementales",
      "Son congrès confédéral, où votent les syndicats, définit les grandes orientations de la CGT",
      "Entre deux congrès, le comité confédéral national (CCN) réunit les UD et les fédérations",
      "Elle porte les revendications nationales et interprofessionnelles et négocie au niveau national"
    ]
  }
];

const BRANCHES = {
  pro: {
    title: "Branche professionnelle",
    text: "Syndicat → union professionnelle (USD, CSD, USTM…) → fédération : on s'organise avec celles et ceux qui font le même métier, pour les conventions collectives et les revendications de branche."
  },
  terr: {
    title: "Branche territoriale et interprofessionnelle",
    text: "Syndicat → union locale → union départementale → comité régional : on s'organise avec tous les salarié·es d'un même territoire, toutes professions confondues."
  }
};

// Répartition d'un timbre mensuel sans modulation (plaquette CoGéTise, congrès de Dijon 2019)
const REPARTITION = [
  { label: "Le syndicat", part: 33, color: "#E2001A", note: "Il garde sa part pour son activité : tracts, réunions, formation, solidarité." },
  { label: "La fédération", part: 29, color: "#1A5FAD", note: "La branche professionnelle (de 25 à 33 % selon les modulations décidées en congrès)." },
  { label: "Le territoire : UL, UD, comité régional", part: 25, color: "#C9A200", note: "La branche interprofessionnelle (de 21 à 29 % selon les modulations)." },
  { label: "La Confédération", part: 10, color: "#0F0F0F", note: "Activité nationale et interprofessionnelle." },
  { label: "Presse (mensuel « Ensemble »)", part: 3, color: "#7D8FA8", note: "Le journal des syndiqué·es." }
];

const PARCOURS = [
  { icon: "🔍", title: "Découvrir la CGT", who: "Pour toutes et tous les salarié·es", text: "Cette séance : 2 heures pour connaître la CGT." },
  { icon: "🌱", title: "S'impliquer dans la CGT", who: "Dès l'adhésion", text: "Une à deux journées pour faire ses premiers pas dans le syndicat ou l'union locale." },
  { icon: "🗣️", title: "Participer à la vie de la CGT", who: "Formation syndicale générale", text: "Un stage d'environ 8 jours, souvent en plusieurs modules, sur le syndicalisme et son rôle." },
  { icon: "🚀", title: "Développer la CGT", who: "Pour aller plus loin", text: "Approfondir pour animer et renforcer l'activité syndicale." },
  { icon: "🎯", title: "Impulser la démarche de la CGT", who: "Responsabilités", text: "Pour les secrétaires généraux, collectifs de direction, formateur·ices…" }
];

const FORMATION_QR = [
  { q: "Je viens de me syndiquer : comment je m'inscris à une formation ?", a: "Le syndicat est le premier interlocuteur ; sinon l'union locale, l'union départementale ou la fédération. Le ou la responsable de la formation syndicale (RFS) fait l'inscription et la demande de congé à l'employeur." },
  { q: "Combien de jours ai-je le droit de prendre ?", a: "Tout·e salarié·e a droit à 12 jours par an de congé de formation économique, sociale, environnementale et syndicale. Une attestation de suivi est remise à l'issue du stage." },
  { q: "Je suis privé·e d'emploi : puis-je me former ?", a: "Oui : le revenu de remplacement est maintenu pendant le congé de formation syndicale. S'adresser à l'union locale ou au CNTPEP." },
  { q: "Je suis intérimaire : ai-je droit à la formation syndicale ?", a: "Oui : un accord de branche organise la portabilité du droit entre les missions. Contact : l'UD ou l'union syndicale de l'intérim (USI)." },
  { q: "Je suis retraité·e : est-ce pour moi ?", a: "Oui : dans la CGT, la place des retraité·es est égale à celle des actif·ves. S'adresser à l'union syndicale des retraité·es ou à son syndicat." },
  { q: "Je ne peux pas partir une semaine entière…", a: "Beaucoup de stages se font près de chez soi, en modules de 2 à 3 jours, et certains à distance. En parler permet de lever les freins." }
];

const QUIZ_POOL = [
  { role: "syndicat", type: "qcm",
    question: "Quelle structure est « la base de toute la CGT » ?",
    options: ["Le syndicat", "La Confédération", "L'union départementale", "La fédération"],
    answer: "Le syndicat",
    explanation: "C'est dans le syndicat que les syndiqué·es s'organisent, décident de leurs revendications et élisent leur direction." },
  { role: "syndicat", type: "vf",
    question: "Un syndicat CGT adhère à la fois à une fédération et à une union départementale.",
    answer: "Vrai",
    explanation: "C'est la double affiliation : la profession (fédération) et le territoire (union départementale)." },
  { role: "ul", type: "qcm",
    question: "Quelle structure rassemble tous les syndicats CGT d'un bassin d'emploi, toutes professions confondues ?",
    options: ["L'union locale", "La fédération", "L'USTM", "L'UGICT"],
    answer: "L'union locale",
    explanation: "L'union locale, c'est la CGT de proximité : permanences, accueil des salarié·es isolé·es et des privé·es d'emploi." },
  { role: "fd", type: "qcm",
    question: "Qui négocie les conventions collectives de branche pour une profession ?",
    options: ["La fédération", "L'union locale", "Le comité régional", "La section syndicale"],
    answer: "La fédération",
    explanation: "Les fédérations rassemblent les syndicats de leur champ professionnel et couvrent les branches professionnelles." },
  { role: "unions-pro", type: "qcm",
    question: "Que signifie USTM ?",
    options: ["Union syndicale des travailleurs de la métallurgie", "Union syndicale de tous les métiers", "Union des salarié·es du transport maritime", "Union syndicale territoriale mutualiste"],
    answer: "Union syndicale des travailleurs de la métallurgie",
    explanation: "C'est une union professionnelle départementale : elle rassemble les syndicats de la métallurgie du département." },
  { role: "specifiques", type: "qcm",
    question: "Quelle organisation de la CGT s'adresse aux ingénieur·es, cadres et technicien·nes ?",
    options: ["L'UGICT", "L'UCR", "INDECOSA", "Le CNTPEP"],
    answer: "L'UGICT",
    explanation: "L'union générale des ingénieurs, cadres et techniciens de la CGT." },
  { role: "specifiques", type: "qcm",
    question: "Qui organise les retraité·es au niveau national dans la CGT ?",
    options: ["L'UCR", "L'UGICT", "La fédération des retraité·es", "Personne : on quitte la CGT à la retraite"],
    answer: "L'UCR",
    explanation: "L'union confédérale des retraité·es : la retraite n'est pas la fin de l'engagement syndical." },
  { role: "specifiques", type: "qcm",
    question: "Que fait le CNTPEP ?",
    options: ["Il organise les travailleur·ses privé·es d'emploi et précaires", "Il gère les cotisations", "Il négocie les salaires des cadres", "Il forme les délégué·es syndicaux"],
    answer: "Il organise les travailleur·ses privé·es d'emploi et précaires",
    explanation: "Comité national des travailleurs privés d'emploi et précaires : être sans emploi n'empêche pas d'être syndiqué·e." },
  { role: "specifiques", type: "vf",
    question: "INDECOSA est l'association de la CGT pour la défense des consommateurs et des locataires.",
    answer: "Vrai",
    explanation: "La CGT défend aussi les salarié·es dans leur vie hors du travail." },
  { role: "confederation", type: "qcm",
    question: "La Confédération est constituée par…",
    options: ["Les fédérations et les unions départementales", "Les unions locales seulement", "Les syndiqué·es directement", "Les comités régionaux seulement"],
    answer: "Les fédérations et les unions départementales",
    explanation: "Les deux branches, professionnelle et territoriale, se rejoignent à la Confédération." },
  { role: "cr", type: "qcm",
    question: "Quelles structures forment la branche territoriale et interprofessionnelle ?",
    options: ["Union locale, union départementale, comité régional", "Syndicat, fédération, UGICT", "Section, USD, fédération", "UCR, CNTPEP, INDECOSA"],
    answer: "Union locale, union départementale, comité régional",
    explanation: "On s'y organise avec tous les salarié·es d'un même territoire, toutes professions confondues." },
  { role: "cotisation-montant", type: "qcm",
    question: "Combien coûte la cotisation CGT ?",
    options: ["1 % du salaire net", "1 % du salaire brut", "Un forfait de 10 € par mois", "5 % du salaire net"],
    answer: "1 % du salaire net",
    explanation: "Primes comprises, ou 1 % de la pension nette pour les retraité·es." },
  { role: "cotisation-credit", type: "qcm",
    question: "Avec 20 € de cotisation par mois, combien cela coûte-t-il vraiment après le crédit d'impôt ?",
    options: ["6,80 € par mois", "20 € par mois", "13,20 € par mois", "Rien du tout"],
    answer: "6,80 € par mois",
    explanation: "Le crédit d'impôt rembourse 66 % de la cotisation : 20 € × 34 % = 6,80 €." },
  { role: "cotisation-credit", type: "vf",
    question: "Le crédit d'impôt sur la cotisation ne concerne que les personnes imposables.",
    answer: "Faux",
    explanation: "C'est un crédit d'impôt : il est remboursé même si l'on n'est pas imposable." },
  { role: "cotisation-repartition", type: "qcm",
    question: "Quelle part de chaque cotisation reste au syndicat ?",
    options: ["Un tiers (33 %)", "La totalité", "10 %", "La moitié"],
    answer: "Un tiers (33 %)",
    explanation: "Le reste part à CoGéTise, qui le répartit entre la fédération, le territoire (UL, UD, comité régional), la Confédération et la presse." },
  { role: "cotisation-repartition", type: "qcm",
    question: "Quel outil répartit la cotisation entre toutes les structures de la CGT ?",
    options: ["CoGéTise", "CoGiTiel", "L'URSSAF", "La banque du syndicat"],
    answer: "CoGéTise",
    explanation: "Un système démocratique, solidaire et transparent, mis en place en 2007. CoGiTiel, c'est le fichier des syndiqué·es." },
  { role: "formation-droit", type: "qcm",
    question: "Combien de jours par an de congé de formation économique, sociale et syndicale un·e salarié·e peut-il ou elle prendre ?",
    options: ["12 jours", "2 jours", "5 jours", "30 jours"],
    answer: "12 jours",
    explanation: "C'est un droit pour tous les salarié·es, à demander à l'employeur avec l'aide de son syndicat." },
  { role: "formation-droit", type: "vf",
    question: "Un·e privé·e d'emploi garde son revenu de remplacement pendant un stage de formation syndicale.",
    answer: "Vrai",
    explanation: "Les demandeur·ses d'emploi bénéficient du droit complet à la formation syndicale." },
  { role: "formation-droit", type: "qcm",
    question: "Pour s'inscrire à une formation syndicale, à qui s'adresser en premier ?",
    options: ["À son syndicat", "À son employeur", "À France Travail", "À la mairie"],
    answer: "À son syndicat",
    explanation: "Sinon à l'union locale, à l'union départementale ou à la fédération : le ou la responsable de la formation syndicale s'occupe de l'inscription." }
];

const QUIZ_LENGTH = 10;

const FEDERATIONS = [
  "Fédération des travailleurs de la métallurgie (FTM)",
  "Fédération Santé et Action sociale",
  "Fédération des Services publics",
  "Fédération du Commerce et des Services",
  "Fédération Agroalimentaire et Forestière (FNAF)",
  "Fédération Construction, Bois et Ameublement",
  "Fédération des Industries chimiques (FNIC)",
  "Fédération Mines-Énergie (FNME)",
  "Fédération des Cheminots",
  "Fédération des Transports",
  "Fédération des Activités postales et de télécommunications (FAPT)",
  "Fédération de l'Éducation, de la Recherche et de la Culture (FERC)",
  "Fédération des Finances",
  "Fédération des Organismes sociaux",
  "Fédération des Banques et Assurances",
  "Union fédérale des syndicats de l'État (UFSE)",
  "Fédération des Travailleurs de l'État (FNTE)",
  "Fédération des Sociétés d'études",
  "Fédération du Spectacle (FNSAC)",
  "Fédération du Livre, du Papier et de la Communication (FILPAC)",
  "Fédération Textile, Habillement, Cuir (THC)",
  "Fédération du Verre et de la Céramique",
  "Fédération des Ports et Docks"
];

const STORAGE_KEY = 'decouvrir_participants';
const START_KEY = 'decouvrir_heure_debut';

const { el } = FK;

function euros(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function storageGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function() {

  /* ---------- Déroulé de la séance ---------- */

  const deroule = document.getElementById('deroule');
  const startInput = document.getElementById('heure-debut');

  function addMinutes(hhmm, minutes) {
    const [h, m] = hhmm.split(':').map(Number);
    const total = h * 60 + m + minutes;
    return String(Math.floor(total / 60) % 24).padStart(2, '0') + 'h' + String(total % 60).padStart(2, '0');
  }

  function renderDeroule() {
    const start = startInput.value;
    let elapsed = 0;
    deroule.innerHTML = '';
    SEQUENCES.forEach((seq, i) => {
      const from = start ? addMinutes(start, elapsed) : `${elapsed} min`;
      elapsed += seq.minutes;
      const to = start ? addMinutes(start, elapsed) : `${elapsed} min`;
      const card = FK.buildCard({
        id: seq.id, icon: seq.icon,
        label: `Séquence ${i + 1} · ${seq.minutes} min · ${from} → ${to}`,
        title: seq.title,
        question: seq.objectif,
        body: [
          el('h4', { className: 'card-subtitle', text: '🧑‍🎓 Activité' }),
          el('ul', { className: 'role-details' }, seq.activite.map(a => el('li', { text: a }))),
          el('p', { className: 'role-vigilance' }, [el('strong', { text: '💡 Conseil d\'animation : ' }), document.createTextNode(seq.conseil)])
        ]
      });
      deroule.appendChild(el('li', { className: 'etape' }, [card]));
    });
  }
  startInput.value = storageGet(START_KEY, '');
  startInput.addEventListener('change', () => { storageSet(START_KEY, startInput.value); renderDeroule(); });
  renderDeroule();

  /* ---------- Tableau des métiers (enregistré seulement sur cet appareil) ---------- */

  const participants = storageGet(STORAGE_KEY, []);
  const tbody = document.getElementById('metiers-body');
  const situer = document.getElementById('situer-list');
  const datalist = document.getElementById('federations');
  FEDERATIONS.forEach(f => datalist.appendChild(el('option', { value: f })));

  function save() { storageSet(STORAGE_KEY, participants); renderSituer(); }

  function field(p, key, label, list) {
    const input = el('input', { type: 'text', value: p[key] || '', 'aria-label': label, placeholder: label });
    if (list) input.setAttribute('list', list);
    input.addEventListener('input', () => { p[key] = input.value; save(); });
    return el('td', { 'data-label': label }, [input]);
  }

  function renderMetiers() {
    tbody.innerHTML = '';
    participants.forEach((p, i) => {
      const del = el('button', { type: 'button', className: 'link-btn', 'aria-label': 'Retirer ' + (p.prenom || 'cette ligne'), text: 'Retirer' });
      del.addEventListener('click', () => { participants.splice(i, 1); save(); renderMetiers(); });
      tbody.appendChild(el('tr', {}, [
        field(p, 'prenom', 'Prénom'),
        field(p, 'metier', 'Métier'),
        field(p, 'entreprise', 'Entreprise ou service'),
        field(p, 'federation', 'Fédération', 'federations'),
        el('td', {}, [del])
      ]));
    });
    document.getElementById('metiers-empty').hidden = participants.length > 0;
    renderSituer();
  }

  function renderSituer() {
    situer.innerHTML = '';
    const filled = participants.filter(p => p.prenom || p.metier);
    document.getElementById('situer-box').hidden = filled.length === 0;
    filled.forEach(p => {
      situer.appendChild(el('li', {}, [
        el('strong', { text: (p.prenom || '…') + ' — ' + (p.metier || 'métier ?') }),
        el('span', { text: (p.entreprise ? p.entreprise + ' · ' : '') + (p.federation || 'fédération à trouver ensemble') })
      ]));
    });
  }

  document.getElementById('metiers-add').addEventListener('click', () => {
    participants.push({ prenom: '', metier: '', entreprise: '', federation: '' });
    save();
    renderMetiers();
    const inputs = tbody.querySelectorAll('tr:last-child input');
    if (inputs[0]) inputs[0].focus();
  });
  document.getElementById('metiers-clear').addEventListener('click', () => {
    if (!participants.length || confirm('Effacer la liste des participant·es de cet appareil ?')) {
      participants.length = 0;
      save();
      renderMetiers();
    }
  });
  renderMetiers();

  /* ---------- La CGT pas à pas ---------- */

  const ordered = STRUCTURES.slice().sort((a, b) => a.order - b.order);
  const schema = document.getElementById('cgt-schema');
  const detail = document.getElementById('cgt-detail');
  const stepLabel = document.getElementById('cgt-step');
  const prevBtn = document.getElementById('cgt-prev');
  const nextBtn = document.getElementById('cgt-next');
  let step = 0; // nombre d'étapes révélées
  let current = null;
  const nodes = {};

  // Le schéma se lit de haut en bas : de la Confédération jusqu'au syndiqué
  const LAYOUT = [
    ['confederation'],
    ['specifiques'],
    ['fd', 'cr'],
    ['unions-pro', 'ud'],
    [null, 'ul'],
    ['syndicat'],
    ['section'],
    ['syndique']
  ];

  schema.appendChild(el('div', { className: 'cgt-branch-head' }, [
    el('span', { className: 'cgt-branch-pro', text: '🔧 ' + BRANCHES.pro.title }),
    el('span', { className: 'cgt-branch-terr', text: '📍 ' + BRANCHES.terr.title })
  ]));
  LAYOUT.forEach(row => {
    const line = el('div', { className: 'cgt-row' + (row.length === 1 ? ' cgt-row--center' : '') });
    row.forEach(id => {
      if (!id) { line.appendChild(el('span', { className: 'cgt-spacer' })); return; }
      const s = STRUCTURES.find(x => x.id === id);
      const node = el('button', { type: 'button', className: 'cgt-node cgt-node--' + s.col, 'data-id': id }, [
        el('span', { className: 'cgt-num', text: String(s.order) }),
        el('span', { className: 'cgt-icon', 'aria-hidden': 'true', text: s.icon }),
        el('span', { className: 'cgt-label', text: s.short })
      ]);
      node.addEventListener('click', () => { if (!node.classList.contains('is-hidden')) showDetail(s); });
      nodes[id] = node;
      line.appendChild(node);
    });
    schema.appendChild(line);
  });

  function showDetail(s) {
    current = s;
    Object.values(nodes).forEach(n => n.classList.toggle('is-current', n.dataset.id === s.id));
    detail.innerHTML = '';
    detail.appendChild(el('div', { className: 'cgt-detail-head' }, [
      el('span', { className: 'role-icon', 'aria-hidden': 'true', text: s.icon }),
      el('div', {}, [
        el('span', { className: 'role-cat', text: `Étape ${s.order} sur ${ordered.length}` }),
        el('h4', { text: s.name })
      ])
    ]));
    detail.appendChild(el('p', { className: 'role-question', text: s.question }));
    detail.appendChild(el('ul', { className: 'role-details' }, s.points.map(m => el('li', { text: m }))));
    if (s.col === 'pro' || s.col === 'terr') {
      detail.appendChild(el('p', { className: 'cgt-branch-note cgt-branch-note--' + s.col, text: BRANCHES[s.col].title + ' : ' + BRANCHES[s.col].text }));
    }
  }

  function render() {
    ordered.forEach((s, i) => nodes[s.id].classList.toggle('is-hidden', i >= step));
    Object.values(nodes).forEach(n => {
      n.setAttribute('aria-hidden', n.classList.contains('is-hidden') ? 'true' : 'false');
      n.tabIndex = n.classList.contains('is-hidden') ? -1 : 0;
    });
    schema.classList.toggle('show-branches', step >= ordered.length);
    stepLabel.textContent = step === 0 ? 'Prêt·e à construire la CGT ?' : step > ordered.length ? 'Synthèse : deux branches qui se rejoignent' : `Étape ${step} sur ${ordered.length}`;
    prevBtn.disabled = step === 0;
    nextBtn.disabled = step > ordered.length;
    nextBtn.textContent = step === 0 ? 'Commencer ▶' : step === ordered.length ? 'Synthèse ▶' : 'Étape suivante ▶';
    if (step === 0) {
      detail.innerHTML = '';
      detail.appendChild(el('p', { className: 'role-question', text: 'On part du ou de la syndiqué·e et on remonte, étape par étape, jusqu\'à la Confédération.' }));
      Object.values(nodes).forEach(n => n.classList.remove('is-current'));
    } else if (step <= ordered.length) {
      showDetail(ordered[step - 1]);
    } else {
      Object.values(nodes).forEach(n => n.classList.remove('is-current'));
      detail.innerHTML = '';
      detail.appendChild(el('h4', { text: 'Deux branches qui se rejoignent à la Confédération' }));
      ['pro', 'terr'].forEach(b => detail.appendChild(el('p', { className: 'cgt-branch-note cgt-branch-note--' + b }, [
        el('strong', { text: BRANCHES[b].title + ' : ' }), document.createTextNode(BRANCHES[b].text)
      ])));
      detail.appendChild(el('p', { text: 'Le syndicat est au croisement des deux : il adhère à sa fédération et à son union départementale. Les organisations spécifiques (UGICT, UCR, CNTPEP, INDECOSA) s\'adressent à des situations particulières, et tout se rejoint à la Confédération.' }));
    }
  }

  prevBtn.addEventListener('click', () => { step = Math.max(0, step - 1); render(); });
  nextBtn.addEventListener('click', () => { step = Math.min(ordered.length + 1, step + 1); render(); });
  document.getElementById('cgt-all').addEventListener('click', () => { step = ordered.length + 1; render(); });
  document.getElementById('cgt-reset').addEventListener('click', () => { step = 0; render(); });
  render();

  /* ---------- Cotisation ---------- */

  const salaire = document.getElementById('salaire');
  const calcOut = document.getElementById('cotisation-resultat');
  const bars = document.getElementById('repartition');

  function renderCotisation() {
    const net = Math.max(0, parseFloat(String(salaire.value).replace(',', '.')) || 0);
    const cot = net * 0.01;
    const reel = cot * 0.34;
    calcOut.innerHTML = '';
    [
      ['Cotisation mensuelle (1 % net)', euros(cot)],
      ['Crédit d\'impôt (66 %)', '− ' + euros(cot * 0.66)],
      ['Coût réel par mois', euros(reel)],
      ['Coût réel par an', euros(reel * 12)]
    ].forEach(([k, v], i) => calcOut.appendChild(el('div', { className: 'calc-cell' + (i === 2 ? ' calc-cell--main' : '') }, [
      el('span', { text: k }), el('strong', { text: v })
    ])));
    bars.innerHTML = '';
    REPARTITION.forEach(r => {
      bars.appendChild(el('li', {}, [
        el('div', { className: 'rep-head' }, [
          el('strong', { text: r.label }),
          el('span', { text: `${r.part} % · ${euros(cot * r.part / 100)}` })
        ]),
        el('div', { className: 'rep-track' }, [
          el('div', { className: 'rep-bar', style: `width:${r.part * 3}%;background:${r.color}` })
        ]),
        el('p', { className: 'rep-note', text: r.note })
      ]));
    });
  }
  salaire.addEventListener('input', renderCotisation);
  renderCotisation();

  const repartitionReveal = document.getElementById('repartition-reveal');
  const repartitionBox = document.getElementById('repartition-box');
  repartitionReveal.addEventListener('click', () => {
    const open = repartitionBox.hidden;
    repartitionBox.hidden = !open;
    repartitionReveal.setAttribute('aria-expanded', String(open));
    repartitionReveal.textContent = open ? 'Masquer la répartition' : 'Révéler la répartition';
  });

  /* ---------- Se former ---------- */

  const parcours = document.getElementById('parcours');
  PARCOURS.forEach((p, i) => parcours.appendChild(el('li', { className: i === 0 ? 'is-here' : '' }, [
    el('span', { className: 'parcours-icon', 'aria-hidden': 'true', text: p.icon }),
    el('strong', { text: p.title }),
    el('span', { className: 'parcours-who', text: p.who }),
    el('span', { text: p.text })
  ])));

  const qrGrid = document.getElementById('formation-qr');
  FORMATION_QR.forEach((item, i) => qrGrid.appendChild(FK.buildCard({
    id: 'qr-' + i, icon: '❓', label: 'Questions / réponses',
    title: item.q, question: '', body: [el('p', { text: item.a })]
  })));
  qrGrid.querySelectorAll('.role-question').forEach(p => p.remove());

  /* ---------- Cartes de révélation globale ---------- */

  document.getElementById('reveal-all-btn').addEventListener('click', () => {
    document.querySelectorAll('#exploration-panel .role-card').forEach(c => FK.setExpanded(c, true));
    step = ordered.length + 1; render();
    repartitionBox.hidden = false; repartitionReveal.setAttribute('aria-expanded', 'true'); repartitionReveal.textContent = 'Masquer la répartition';
  });
  document.getElementById('hide-all-btn').addEventListener('click', () => {
    document.querySelectorAll('#exploration-panel .role-card').forEach(c => FK.setExpanded(c, false));
    step = 0; render();
    repartitionBox.hidden = true; repartitionReveal.setAttribute('aria-expanded', 'false'); repartitionReveal.textContent = 'Révéler la répartition';
  });

  /* ---------- Quiz ---------- */

  // Lien « Voir la fiche » : la structure dans le schéma, ou la section concernée
  function focusTopic(q) {
    modes.setMode('exploration');
    const s = STRUCTURES.find(x => x.id === q.role);
    if (s) {
      step = Math.max(step, s.order); render(); showDetail(s);
      document.getElementById('structures').scrollIntoView({ behavior: 'smooth' });
      nodes[s.id].focus({ preventScroll: true });
      return;
    }
    const target = q.role.startsWith('cotisation') ? 'cotisation' : 'formation';
    document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
  }

  const quiz = FK.createQuiz({
    pool: QUIZ_POOL,
    length: QUIZ_LENGTH,
    onSeeCard: focusTopic,
    results: { perfect: 'Sans faute ! Vous savez comment fonctionne la CGT.' }
  });
  const modes = FK.initModes({ onQuiz: quiz.start });

  /* ---------- Mode projection ---------- */

  const listSlide = (cat, item) => (stage, s, revealed) => FK.renderCardSlide(stage, {
    icon: s.icon, cat: typeof cat === 'function' ? cat(s) : cat, title: s.title || s.name,
    question: s.question, answer: FK.listAnswer(s.points)
  }, revealed);

  FK.initProjection({
    initialDeck: () => modes.isQuiz() ? 'quiz' : 'structures',
    decks: {
      deroule: {
        build: () => SEQUENCES.map((s, i) => ({ ...s, n: i + 1, question: s.objectif, points: s.activite })),
        render: listSlide(s => `Séquence ${s.n} · ${s.minutes} minutes`)
      },
      structures: {
        build: () => ordered.concat([{
          icon: '🔀', name: 'Deux branches qui se rejoignent', order: ordered.length + 1,
          question: 'Comment la CGT est-elle construite ?',
          points: [BRANCHES.pro.title + ' : ' + BRANCHES.pro.text, BRANCHES.terr.title + ' : ' + BRANCHES.terr.text,
            'Le syndicat est au croisement des deux : il adhère à sa fédération et à son union départementale.']
        }]),
        render: listSlide(s => s.order <= ordered.length ? `La CGT pas à pas — étape ${s.order} sur ${ordered.length}` : 'La CGT pas à pas — synthèse')
      },
      cotisation: {
        build: () => [
          { icon: '💶', name: 'Combien coûte la cotisation ?', question: 'À votre avis, combien coûte l\'adhésion à la CGT ?',
            points: ['1 % du salaire net, primes comprises (ou de la pension nette)', 'Crédit d\'impôt de 66 %, même si l\'on n\'est pas imposable', 'Exemple : 20 € par mois ne coûtent réellement que 6,80 €'] },
          { icon: '🔀', name: 'Où va l\'argent ?', question: 'À votre avis, où va l\'argent de la cotisation ?',
            points: REPARTITION.map(r => `${r.label} : ${r.part} %`).concat(['Répartition faite par CoGéTise : démocratique, solidaire et transparente']) },
          { icon: '✊', name: 'Pourquoi c\'est important ?', question: 'Pourquoi la CGT ne vit-elle que des cotisations ?',
            points: ['L\'indépendance : la CGT ne dépend ni du patronat, ni de l\'État, ni d\'un parti', 'La solidarité : chaque cotisation fait vivre toutes les structures', 'Les moyens d\'agir : tracts, formations, réunions, soutien juridique'] }
        ],
        render: listSlide('La cotisation')
      },
      quiz: {
        build: () => FK.drawQuestions(QUIZ_POOL, QUIZ_LENGTH),
        render: FK.renderQuizSlide
      }
    }
  });

  document.querySelector('.print-button').addEventListener('click', () => {
    modes.setMode('exploration');
    window.print();
  });

  FK.initToc();
  FK.initTheme();
});
