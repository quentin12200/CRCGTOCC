/**
 * Banque de questions — Formation « Fonctionnement statutaire d'un syndicat »
 * (UD CGT Aveyron). Utilisée par le quiz live formateur (/quiz-live-host.html?set=vie-syndicale)
 * et le quiz solo stagiaire (/quiz/quiz-vie-syndicale.html).
 * correct = index de la bonne réponse dans choices.
 */
window.QUESTIONS_VIE_SYNDICALE = [
  {
    q: "Quelle est l'instance souveraine d'un syndicat CGT ?",
    choices: ["Le bureau syndical", "Le ou la secrétaire général·e", "L'assemblée générale / le congrès des syndiqué·es", "La commission exécutive"],
    correct: 2,
    explication: "Ce sont les <strong>syndiqué·es réuni·es en AG ou en congrès</strong> qui décident : orientation, élection de la direction, adoption des rapports et des statuts. Les autres instances agissent par délégation."
  },
  {
    q: "Qui dirige le syndicat entre deux congrès ?",
    choices: ["La commission exécutive (CE)", "Le délégué syndical", "L'union départementale", "La commission financière de contrôle"],
    correct: 0,
    explication: "La <strong>commission exécutive</strong>, élue par le congrès, prend les décisions politiques entre deux congrès, élit le bureau et le secrétariat et contrôle leur activité."
  },
  {
    q: "Quel est le rôle du bureau syndical ?",
    choices: ["Fixer l'orientation du syndicat", "Assurer la gestion quotidienne et mettre en œuvre les décisions de la CE", "Contrôler les comptes du syndicat", "Élire la commission exécutive"],
    correct: 1,
    explication: "Le <strong>bureau</strong> est l'équipe restreinte qui anime au quotidien : il met en œuvre les décisions de la CE, prépare ses réunions et réagit aux urgences. Il ne se substitue pas à la CE."
  },
  {
    q: "Quel est le montant statutaire de la cotisation CGT ?",
    choices: ["0,5 % du salaire brut", "1 % du salaire net, toutes primes comprises", "1 % du salaire brut hors primes", "Un forfait fixé librement par chaque syndicat"],
    correct: 1,
    explication: "Article 34 des statuts confédéraux : la cotisation est égale à <strong>1 % du salaire net, toutes primes comprises</strong>. Un syndicat qui fixe un taux inférieur se place en dehors du cadre statutaire confédéral."
  },
  {
    q: "Quel est le coût réel d'une cotisation après le crédit d'impôt ?",
    choices: ["Le crédit d'impôt n'existe pas pour les cotisations syndicales", "Il rembourse 33 % de la cotisation", "Il rembourse 66 % de la cotisation", "Il rembourse 100 % de la cotisation"],
    correct: 2,
    explication: "Les cotisations syndicales ouvrent droit à un <strong>crédit d'impôt de 66 %</strong>, même pour les personnes non imposables. Une cotisation de 20 € par mois coûte réellement moins de 7 €."
  },
  {
    q: "À quoi sert CoGéTise ?",
    choices: ["À gérer les adhésions en ligne", "À centraliser et répartir les cotisations entre les structures de la CGT", "À calculer les indemnités des élu·es", "À organiser les élections professionnelles"],
    correct: 1,
    explication: "<strong>CoGéTise</strong> centralise les cotisations reversées par les syndicats et les répartit entre la fédération, l'UD, l'UL et la confédération. Il garantit l'indépendance financière et la solidarité entre structures."
  },
  {
    q: "Quelle est la bonne différence entre élu·e et mandaté·e ?",
    choices: ["Il n'y a aucune différence", "L'élu·e est désigné·e par le syndicat, le ou la mandaté·e par les salarié·es", "L'élu·e est choisi·e par les salarié·es (ex : CSE), le ou la mandaté·e est désigné·e par le syndicat pour le représenter", "Le ou la mandaté·e est forcément membre du bureau"],
    correct: 2,
    explication: "L'<strong>élu·e</strong> tient son mandat d'une élection professionnelle (CSE…). Le ou la <strong>mandaté·e</strong> est désigné·e par le syndicat pour porter la parole CGT dans une instance ou une négociation — et rend compte au syndicat."
  },
  {
    q: "Qui représente le syndicat auprès de l'employeur et négocie les accords collectifs dans l'entreprise ?",
    choices: ["L'élu·e au CSE", "Le ou la délégué·e syndical·e", "Le ou la représentant·e de proximité", "Le ou la trésorier·ère"],
    correct: 1,
    explication: "Le <strong>délégué syndical</strong>, désigné par le syndicat, est l'interlocuteur de l'employeur pour la négociation collective. Il présente les revendications et anime la section syndicale."
  },
  {
    q: "Quelle structure CGT regroupe les syndicats d'une même branche professionnelle ?",
    choices: ["L'union locale", "L'union départementale", "La fédération", "Le comité régional"],
    correct: 2,
    explication: "La <strong>fédération</strong> est la structure professionnelle (métallurgie, santé, commerce…). UL, UD et comité régional sont des structures <strong>interprofessionnelles</strong>, organisées par territoire."
  },
  {
    q: "Vers quelle structure se tourne d'abord un syndicat pour un appui de proximité sur son territoire (formation, juridique, interpro) ?",
    choices: ["La confédération", "L'union locale puis l'union départementale", "Le ministère du Travail", "La fédération européenne"],
    correct: 1,
    explication: "L'<strong>UL</strong> est au plus près des syndicats ; l'<strong>UD</strong> appuie à l'échelle du département (formation syndicale, aide juridique, coordination interprofessionnelle). C'est la double affiliation : professionnelle (fédération) et territoriale (UL/UD)."
  },
  {
    q: "Qui gère les finances du syndicat et effectue les reversements à CoGéTise ?",
    choices: ["Le ou la secrétaire général·e", "Le ou la trésorier·ère", "Le ou la secrétaire à l'organisation", "Chaque adhérent·e individuellement"],
    correct: 1,
    explication: "Le <strong>trésorier ou la trésorière</strong> tient la comptabilité, collecte les cotisations, effectue les reversements et présente régulièrement l'état des finances aux instances."
  },
  {
    q: "Quelle instance contrôle la gestion financière du syndicat ?",
    choices: ["Le bureau", "La commission financière de contrôle (CFC)", "La commission des mandats", "L'employeur"],
    correct: 1,
    explication: "La <strong>commission financière de contrôle</strong> est élue par le congrès et indépendante de la direction. Elle vérifie les comptes et rend compte devant les syndiqué·es."
  },
  {
    q: "Comment les statuts d'un syndicat peuvent-ils être modifiés ?",
    choices: ["Par décision du ou de la secrétaire général·e", "Par le bureau, à tout moment", "Par un vote des syndiqué·es en congrès / AG selon les règles prévues", "Ils ne peuvent jamais être modifiés"],
    correct: 2,
    explication: "Les statuts sont élaborés et révisés <strong>démocratiquement</strong> : proposition, amendements, débat puis vote en congrès ou AG. Ils doivent rester conformes aux statuts confédéraux."
  },
  {
    q: "Qu'apportent les statuts sur le plan juridique ?",
    choices: ["Rien, ils sont purement internes", "La personnalité morale : agir en justice, signer des accords", "Une exonération d'impôts pour les adhérent·es", "Le droit de désigner l'inspecteur du travail"],
    correct: 1,
    explication: "Déposés en mairie, les statuts donnent au syndicat la <strong>personnalité morale</strong> : il peut agir en justice, signer des accords et posséder des biens. Ils protègent le syndicat et ses membres."
  },
  {
    q: "Quel droit appartient à tout·e adhérent·e CGT ?",
    choices: ["Être automatiquement membre de la CE", "Voter en AG/congrès et être candidat·e aux responsabilités", "Décider seul·e des positions du syndicat", "Ne pas payer de cotisation la première année"],
    correct: 1,
    explication: "L'adhérent·e est <strong>la base de l'organisation</strong> : il ou elle participe aux débats, vote en AG et en congrès, peut se porter candidat·e — et contribue par sa cotisation."
  }
];
