/**
 * Banque de questions — Formation AT/MP, bilan du jour 1
 * (du fait accidentel à la reconnaissance). Utilisée par le quiz live formateur :
 * /quiz-live-host.html?set=atmp-j1
 * correct = index de la bonne réponse dans choices.
 */
window.QUESTIONS_ATMP_J1 = [
  {
    q: "Qu'a changé la loi du 9 avril 1898 pour les accidentés du travail ?",
    choices: ["Elle a créé la Sécurité sociale", "Une indemnisation sans avoir à prouver la faute de l'employeur", "Elle a interdit le travail de nuit", "Elle a créé les CHSCT"],
    correct: 1,
    explication: "La loi de 1898 crée une <strong>responsabilité sans faute</strong> : l'accidenté est indemnisé forfaitairement, sans prouver la faute de l'employeur. En contrepartie, l'indemnisation n'est pas intégrale."
  },
  {
    q: "Que signifie la présomption d'imputabilité ?",
    choices: ["Le salarié doit prouver le lien avec son travail", "Tout accident au temps et au lieu de travail est présumé professionnel", "L'employeur est présumé coupable", "La CPAM présume la fraude"],
    correct: 1,
    explication: "Un accident survenu <strong>au temps et au lieu de travail</strong> est présumé professionnel : c'est à l'employeur ou à la CPAM de prouver le contraire."
  },
  {
    q: "Dans quel délai le ou la salarié·e doit-il informer l'employeur de son accident ?",
    choices: ["24 heures", "48 heures", "8 jours", "1 mois"],
    correct: 0,
    explication: "Le salarié informe l'employeur dans la journée, au plus tard dans les <strong>24 heures</strong> (sauf force majeure). Le faire par écrit, c'est garder une preuve."
  },
  {
    q: "Dans quel délai l'employeur doit-il déclarer l'accident à la CPAM ?",
    choices: ["24 heures", "48 heures (hors dimanches et jours fériés)", "15 jours", "Quand il le juge utile"],
    correct: 1,
    explication: "L'employeur a <strong>48 heures</strong>, hors dimanches et jours fériés, à partir du moment où il a connaissance de l'accident. Même s'il a des doutes : il peut émettre des réserves, mais il doit déclarer."
  },
  {
    q: "L'employeur refuse de déclarer l'accident. Que peut faire la victime ?",
    choices: ["Rien, seul l'employeur peut déclarer", "Déclarer elle-même à la CPAM, jusqu'à 2 ans après l'accident", "Saisir l'inspection du travail, qui déclarera à sa place", "Attendre la visite de reprise"],
    correct: 1,
    explication: "La victime peut <strong>déclarer elle-même</strong> l'accident à la CPAM jusqu'à <strong>2 ans</strong> après. Le refus de déclarer est sanctionné pour l'employeur."
  },
  {
    q: "À quoi sert la feuille d'accident du travail remise par l'employeur ?",
    choices: ["À justifier l'absence auprès du chef", "À se faire soigner sans avancer les frais", "À calculer la rente", "À saisir le prud'hommes"],
    correct: 1,
    explication: "Avec la <strong>feuille d'accident</strong>, les soins liés à l'AT sont pris en charge à 100 % sans avance de frais (tiers payant)."
  },
  {
    q: "Que doit décrire le certificat médical initial (CMI) ?",
    choices: ["Seulement la durée de l'arrêt", "Toutes les lésions, physiques et psychiques, le plus précisément possible", "La faute de l'employeur", "Le salaire de la victime"],
    correct: 1,
    explication: "Le <strong>CMI</strong> décrit toutes les lésions constatées, y compris le choc psychologique. Ce qui n'y figure pas sera difficile à faire reconnaître ensuite."
  },
  {
    q: "Dans quel délai l'employeur peut-il émettre des réserves motivées auprès de la CPAM ?",
    choices: ["24 heures", "10 jours francs à compter de la déclaration", "2 mois", "Il ne peut jamais en émettre"],
    correct: 1,
    explication: "Les réserves doivent être <strong>motivées</strong> et formulées dans les <strong>10 jours francs</strong>. Elles ne peuvent porter que sur le temps, le lieu ou une cause totalement étrangère au travail."
  },
  {
    q: "Le registre des accidents bénins concerne les accidents qui :",
    choices: ["N'entraînent ni arrêt de travail ni soins médicaux", "Durent moins de 3 jours d'arrêt", "Arrivent sur le trajet", "Touchent les intérimaires"],
    correct: 0,
    explication: "Seuls les accidents <strong>sans arrêt ni soins médicaux</strong> peuvent être inscrits au registre des bénins. S'il y a ensuite un arrêt ou des soins, l'employeur doit déclarer à la CPAM."
  },
  {
    q: "Pour un accident du travail, de combien de temps dispose la CPAM pour statuer ?",
    choices: ["10 jours", "30 jours francs", "6 mois", "1 an"],
    correct: 1,
    explication: "La CPAM a <strong>30 jours francs</strong> pour un accident du travail (120 jours francs pour une maladie professionnelle), à compter de la réception de la déclaration et du CMI."
  },
  {
    q: "Si la CPAM ne répond pas dans les délais, que se passe-t-il ?",
    choices: ["L'accident est refusé", "Le dossier est classé", "Le caractère professionnel est reconnu", "L'employeur décide"],
    correct: 2,
    explication: "<strong>Silence vaut acceptation</strong> : faute de réponse dans le délai, le caractère professionnel est reconnu."
  },
  {
    q: "Une maladie figure dans un tableau et toutes ses conditions sont remplies. Que se passe-t-il ?",
    choices: ["Elle est présumée professionnelle", "Elle doit passer devant le CRRMP", "Il faut prouver la faute de l'employeur", "Elle n'est jamais reconnue"],
    correct: 0,
    explication: "Quand la maladie et ses conditions (délai de prise en charge, durée d'exposition, liste de travaux) sont dans un <strong>tableau</strong>, elle est <strong>présumée professionnelle</strong>."
  },
  {
    q: "Un burn-out peut-il être reconnu comme maladie professionnelle ?",
    choices: ["Non, jamais", "Oui, hors tableau, par le CRRMP, si l'IPP prévisible atteint au moins 25 %", "Oui, automatiquement, il est au tableau", "Seulement dans la fonction publique"],
    correct: 1,
    explication: "Le burn-out n'est dans <strong>aucun tableau</strong> : il passe par le <strong>CRRMP</strong>, qui exige une IPP prévisible d'au moins 25 % et un lien direct et essentiel avec le travail."
  },
  {
    q: "Un accident survient chez soi pendant le télétravail, aux horaires de travail. Est-ce un AT ?",
    choices: ["Non, c'est un accident domestique", "Oui, il est présumé accident du travail", "Seulement si un témoin était présent", "Seulement avec l'accord de l'employeur"],
    correct: 1,
    explication: "L'accident survenu sur le lieu du télétravail pendant l'exercice de l'activité est <strong>présumé</strong> accident du travail (Code du travail, L.1222-9)."
  },
  {
    q: "À quoi sert le FIVA ?",
    choices: ["À financer la prévention", "À indemniser les victimes de l'amiante pour les préjudices non couverts par la rente", "À contrôler les employeurs", "À verser les indemnités journalières"],
    correct: 1,
    explication: "Le <strong>Fonds d'indemnisation des victimes de l'amiante</strong> indemnise les préjudices que la rente AT/MP ne couvre pas : préjudice moral, souffrances, préjudice esthétique et d'agrément."
  }
];
