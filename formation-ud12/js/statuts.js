/**
 * Formation CGT - Page « Fonctionnement statutaire »
 * Contenu aligné sur le modèle de statuts de syndicat CGT (Espace Vie syndicale, 2024).
 * Cartes, étapes, quiz et projection sont générés depuis les données ci-dessous.
 */

const MODELE = "Modèle de statuts de syndicat CGT (2024)";

const POURQUOI = [
  {
    id: "texte-fondateur",
    icon: "📜",
    title: "Le texte fondateur du syndicat",
    question: "Que définissent les statuts d'un syndicat ?",
    points: [
      "Son objet : défendre les droits et intérêts individuels et collectifs, matériels et moraux des salarié·es",
      "Qui peut adhérer, avec quels droits et quels engagements",
      "Ses instances : congrès, commission exécutive, commission financière de contrôle, bureau",
      "Ses ressources : la cotisation de 1 % net et son reversement via CoGéTise",
      "Ses affiliations à la CGT, et les règles de modification et de dissolution"
    ],
    source: MODELE + ", art. 1 à 12"
  },
  {
    id: "democratie",
    icon: "🗳️",
    title: "Une garantie de démocratie",
    question: "En quoi les statuts protègent-ils la démocratie syndicale ?",
    points: [
      "Le congrès de tous les syndiqué·es à jour de cotisation est l'instance souveraine",
      "Chaque instance est élue et rend compte à celle qui l'a élue",
      "Une commission financière de contrôle, élue hors de la CE, vérifie la gestion",
      "Les décisions se prennent à la majorité ; modifier les statuts exige les deux tiers",
      "Aucune sanction sans avoir entendu le ou la syndiqué·e, avec appel possible devant l'AG ou le congrès"
    ],
    source: MODELE + ", art. 5, 7 à 9 et 11"
  },
  {
    id: "existence-juridique",
    icon: "⚖️",
    title: "Une existence juridique",
    question: "Pourquoi les statuts sont-ils indispensables juridiquement ?",
    points: [
      "Un syndicat se constitue librement, mais il doit déposer ses statuts et la liste de ses dirigeant·es en mairie",
      "Les syndicats ont la personnalité civile : ils peuvent agir en justice et posséder des biens",
      "Le nom statutaire sert à la publication des comptes, critère de représentativité (transparence financière)",
      "Il faut deux ans d'existence pour présenter des candidat·es aux élections ou désigner un·e délégué·e syndical·e"
    ],
    source: "Code du travail, art. L2131-2, L2131-3, L2132-1 et L2135-1 ; " + MODELE
  },
  {
    id: "coherence",
    icon: "🔗",
    title: "La cohérence confédérale",
    question: "Qu'est-ce qui relie les statuts du syndicat au reste de la CGT ?",
    points: [
      "Le syndicat adhère à la fois à une union départementale et à une fédération : c'est ce qui le rend confédéré",
      "Il fait siens les statuts, les chartes et l'annexe confédéraux, et le préambule de la CGT",
      "Ses statuts sont envoyés à l'UD et à la fédération pour avis, vérification et validation",
      "Il reverse les cotisations via CoGéTise aux UL, UD, fédérations, comité régional et confédération",
      "« Le syndicat, base de toute la CGT » : c'est le titre commun des articles 7 à 9 des statuts confédéraux"
    ],
    source: MODELE + ", art. 2 et 6 ; statuts confédéraux, art. 3"
  }
];

// La vie des statuts, dans l'ordre chronologique
const ETAPES = [
  {
    id: "etape-rediger",
    icon: "✍️",
    title: "Rédiger",
    question: "Par où commencer pour écrire des statuts ?",
    points: [
      "Partir du modèle confédéral : c'est une « épure » qui donne le contenu minimum",
      "Définir le périmètre : établissement, entreprise, syndicat local professionnel ou syndicat de site (« inter-entreprises »)",
      "Préciser dans le préambule s'il s'agit d'une modification, d'un regroupement ou d'une extension du champ",
      "Compléter ce que le modèle laisse en blanc : titre, siège, affiliations, périodicité du congrès"
    ],
    source: MODELE + ", rappels et recommandations"
  },
  {
    id: "etape-adopter",
    icon: "🏛️",
    title: "Débattre et adopter en congrès",
    question: "Qui adopte ou modifie les statuts, et à quelle majorité ?",
    points: [
      "Les syndiqué·es sont convoqué·es au moins un mois avant, avec les propositions de modification",
      "Les statuts ne peuvent être modifiés qu'en congrès, ordinaire ou extraordinaire",
      "Les amendements doivent recueillir les deux tiers des suffrages valablement exprimés"
    ],
    source: MODELE + ", art. 7 et 11"
  },
  {
    id: "etape-valider",
    icon: "✅",
    title: "Faire valider par la CGT",
    question: "À qui faut-il envoyer les statuts avant de les déposer ?",
    points: [
      "Aux organisations auxquelles le syndicat est affilié : l'union départementale et la fédération",
      "Elles donnent leur avis, vérifient et valident la conformité aux statuts de la CGT",
      "Cela évite les erreurs de périmètre ou d'affiliation qui pourraient être contestées"
    ],
    source: MODELE + ", art. 2 (note 8)"
  },
  {
    id: "etape-deposer",
    icon: "🏢",
    title: "Déposer en mairie",
    question: "Comment le syndicat obtient-il son existence légale ?",
    points: [
      "Dépôt à la mairie du siège social, en quatre exemplaires, contre récépissé",
      "Avec la liste des dirigeant·es : nom, prénom, profession, domicile, nationalité",
      "Les statuts sont signés par le ou la secrétaire général·e et le ou la trésorier·ère, chaque page paraphée",
      "Joindre en annexe la liste du bureau élu"
    ],
    source: "Code du travail, art. L2131-3 et R2131-1 ; " + MODELE + ", recommandations"
  },
  {
    id: "etape-deux-ans",
    icon: "⏳",
    title: "Compter deux ans d'existence",
    question: "Un syndicat tout juste créé peut-il présenter une liste aux élections ?",
    points: [
      "La loi du 20 août 2008 exige deux ans d'existence pour présenter des candidat·es ou désigner un·e DS, même pour un syndicat affilié à une confédération représentative",
      "D'où l'importance de mentionner dans le préambule la continuité avec un syndicat existant (modification, regroupement, extension)",
      "Pendant ce temps, la section syndicale et l'UL / l'UD accompagnent la construction du syndicat"
    ],
    source: MODELE + ", conseils pour les préambules ; loi n° 2008-789 du 20 août 2008"
  },
  {
    id: "etape-faire-vivre",
    icon: "🔄",
    title: "Faire vivre et réviser",
    question: "Une fois déposés, les statuts sont-ils figés ?",
    points: [
      "Ils vivent : congrès réguliers, assemblée générale au moins une fois par an",
      "Chaque année, le bureau arrête les comptes, la CE les approuve et ils sont publiés",
      "Ils se révisent en congrès quand le périmètre, l'organisation ou la loi évoluent",
      "Toute modification est à nouveau envoyée à l'UD et à la fédération, puis déposée en mairie"
    ],
    source: MODELE + ", art. 7, 8, 10 et 11"
  }
];

// Le modèle de statuts, article par article
const ARTICLES = [
  {
    id: "art-preambule", num: "Préambule", icon: "📖",
    title: "Préambule",
    question: "Que contient le préambule, et quand faut-il le compléter ?",
    points: [
      "Le syndicat est régi par les principes de la CGT et fait sien le préambule des statuts confédéraux",
      "Il rassemble les salarié·es dans leur diversité, pour la liberté, l'égalité, la justice, la laïcité, la fraternité et la solidarité",
      "Il agit pour une société démocratique, libérée de l'exploitation capitaliste et des autres formes de domination, contre toutes les discriminations"
    ],
    vigilance: "En cas de modification de statuts antérieurs, de regroupement de syndicats ou d'extension du champ, il faut le préciser ici : c'est ce qui préserve les deux ans d'existence."
  },
  {
    id: "art-1", num: "Article 1", icon: "🏗️",
    title: "Constitution",
    question: "Qui peut adhérer au syndicat ?",
    points: [
      "Le syndicat regroupe les personnels d'un établissement, d'une entreprise, ou des entreprises d'un site ou d'une zone",
      "Il est ouvert à tous les salarié·es et ancien·nes salarié·es, sans distinction de statut, d'opinion politique, religieuse ou philosophique, ni de nationalité",
      "Sa durée est illimitée"
    ],
    vigilance: "Rédiger le périmètre avec soin. Pour un syndicat de site ou de zone, écrire « inter-entreprises », jamais « multiprofessionnel »."
  },
  {
    id: "art-2", num: "Article 2", icon: "🔗",
    title: "Affiliation",
    question: "À quelles structures le syndicat doit-il adhérer ?",
    points: [
      "À une ou plusieurs fédérations, unions départementales et unions locales CGT",
      "Par ses affiliations, il est partie intégrante de la CGT",
      "Il fait siens les statuts, les chartes et l'annexe confédéraux"
    ],
    vigilance: "Il faut à la fois une UD et une fédération (statuts confédéraux, art. 3). Les statuts leur sont envoyés pour avis, vérification et validation."
  },
  {
    id: "art-3", num: "Article 3", icon: "🏷️",
    title: "Titre et siège",
    question: "Pourquoi le nom exact du syndicat est-il si important ?",
    points: [
      "Le titre « Syndicat CGT de … » est écrit en entier",
      "Le siège social peut être à l'entreprise (si le syndicat y a un local), à l'extérieur ou à l'union locale",
      "Le siège peut être transféré par décision de la commission exécutive"
    ],
    vigilance: "C'est ce nom statutaire qui sert à la publication des comptes : une erreur peut fragiliser la représentativité."
  },
  {
    id: "art-4", num: "Article 4", icon: "🎯",
    title: "Objet",
    question: "À quoi sert le syndicat, et qui le représente en justice ?",
    points: [
      "Défendre les droits et intérêts individuels et collectifs, professionnels, matériels et moraux des salarié·es",
      "Agir en justice devant toutes les juridictions : en son nom, en intervention, en partie civile, ou en substitution d'un·e salarié·e",
      "Le ou la secrétaire général·e représente le syndicat en justice",
      "Tout·e syndiqué·e peut le représenter, sur mandat du bureau"
    ],
    vigilance: "Prévoir explicitement le mandat du bureau, pour qu'un·e autre syndiqué·e puisse représenter le syndicat si besoin."
  },
  {
    id: "art-5", num: "Article 5", icon: "🤝",
    title: "Adhésion",
    question: "Quels droits et quels engagements prend-on en adhérant ?",
    points: [
      "Les syndiqué·es sont égaux, libres et responsables : s'exprimer, être informé·es, se former, participer à toutes les décisions d'orientation",
      "Ils et elles s'engagent à respecter les orientations et les règles de vie de la CGT, à ne pas nuire à ses intérêts ni à son image, et à cotiser régulièrement",
      "En cas de violation grave, la CE peut suspendre ou exclure, après avoir fait connaître les griefs et entendu la personne ; appel devant l'AG ou le congrès"
    ],
    vigilance: "Jamais d'exclusion pour une simple divergence d'orientation (charte de la vie syndicale)."
  },
  {
    id: "art-6", num: "Article 6", icon: "💶",
    title: "Cotisations et ressources",
    question: "Comment fonctionnent les cotisations ?",
    points: [
      "Ressources : cotisations, subventions ou dons éventuels, autres produits conformes à la loi",
      "Cotisation mensuelle : 1 % du salaire net, primes comprises, ou de la pension nette (base et complémentaire)",
      "Le syndicat encaisse les cotisations, garde sa part et reverse le reste à CoGéTise, qui le répartit entre UL, UD, fédérations, comité régional et confédération",
      "Sans cotisation à jour, on ne peut pas se prévaloir du syndicat ; toute somme versée lui est acquise"
    ],
    vigilance: "Un taux inférieur à 1 % net place le syndicat hors du cadre statutaire confédéral."
  },
  {
    id: "art-7", num: "Article 7", icon: "🏛️",
    title: "Congrès",
    question: "Comment fonctionne le congrès ?",
    points: [
      "Le congrès de tous les syndiqué·es à jour de leurs cotisations est l'instance souveraine",
      "Convoqué par la CE au moins un mois avant, avec l'ordre du jour, les propositions de modification des statuts et les modalités de représentation",
      "Il débat de l'activité, de l'orientation et des finances, puis vote sur les rapports",
      "Il élit la commission exécutive et la commission financière de contrôle",
      "Entre deux congrès : AG au moins une fois par an ; congrès extraordinaire à la demande de la CE ou d'un tiers des syndiqué·es"
    ],
    vigilance: "Le modèle laisse la périodicité en blanc (« tous les ___ ans ») : à compléter."
  },
  {
    id: "art-8", num: "Article 8", icon: "🧩",
    title: "Commission exécutive",
    question: "Que peut faire la commission exécutive ?",
    points: [
      "Elle dirige le syndicat entre deux congrès, avec les pouvoirs les plus étendus dans le cadre des statuts et des orientations",
      "Elle se réunit au moins une fois par mois et décide à la majorité (moitié des voix plus une)",
      "Elle élit le bureau, composé au minimum d'un·e secrétaire général·e et d'un·e trésorier·ère",
      "Elle approuve chaque année les comptes arrêtés par le bureau"
    ],
    vigilance: "L'approbation annuelle des comptes donne lieu à un procès-verbal (Code du travail, art. L2135-1 et suivants)."
  },
  {
    id: "art-9", num: "Article 9", icon: "🔎",
    title: "Commission financière de contrôle",
    question: "Qui contrôle les finances du syndicat ?",
    points: [
      "Elle vérifie la bonne gestion des finances et peut faire toutes suggestions",
      "Elle se réunit au moins deux fois par an",
      "Elle rend compte à la CE et au congrès ; ses membres sont invités aux réunions de la CE, sans droit de vote"
    ],
    vigilance: "Ses membres sont élus par le congrès en dehors de la CE, en nombre impair, au moins trois."
  },
  {
    id: "art-10", num: "Article 10", icon: "🗂️",
    title: "Bureau (ou secrétariat)",
    question: "Que fait le bureau au quotidien ?",
    points: [
      "Il met en œuvre les orientations et décisions du congrès et de la CE",
      "Il organise son travail sous la responsabilité du ou de la secrétaire général·e",
      "Il prépare et convoque les réunions de la CE et assume les tâches administratives",
      "Il arrête chaque année les comptes et en assure la publicité"
    ],
    vigilance: "Joindre aux statuts déposés la liste du bureau élu."
  },
  {
    id: "art-11", num: "Article 11", icon: "✏️",
    title: "Modification des statuts",
    question: "Comment modifier les statuts ?",
    points: [
      "Uniquement à l'occasion d'un congrès, ordinaire ou extraordinaire",
      "Les amendements doivent recueillir la majorité des deux tiers des suffrages valablement exprimés"
    ],
    vigilance: "Les propositions de modification doivent figurer dans la convocation, envoyée au moins un mois avant le congrès."
  },
  {
    id: "art-12", num: "Article 12", icon: "🔚",
    title: "Dissolution",
    question: "Que se passe-t-il si le syndicat est dissous ?",
    points: [
      "La dissolution ne peut être décidée que par les deux tiers au moins des syndiqué·es réuni·es en congrès",
      "Les biens sont dévolus à l'union départementale ou à la fédération CGT désignée"
    ],
    vigilance: "Les biens restent dans la CGT : la structure bénéficiaire doit être nommée dès la rédaction."
  }
];

// Activité : classer les instances selon leur rôle
const CLASSEMENT_ZONES = [
  { id: "souverainete", label: "Instances souveraines", hint: "Les syndiqué·es décident" },
  { id: "direction", label: "Direction", hint: "Dirige entre deux congrès" },
  { id: "execution", label: "Mise en œuvre", hint: "Gère au quotidien" },
  { id: "controle", label: "Contrôle", hint: "Vérifie et rend compte" }
];
const CLASSEMENT_ITEMS = [
  { label: "Congrès", zone: "souverainete", why: "Le congrès de tous les syndiqué·es est l'instance souveraine (art. 7)." },
  { label: "Assemblée générale des syndiqué·es", zone: "souverainete", why: "Entre deux congrès, les syndiqué·es s'y prononcent, au moins une fois par an (art. 7)." },
  { label: "Commission exécutive", zone: "direction", why: "Elle dirige le syndicat entre deux congrès (art. 8)." },
  { label: "Conseil syndical", zone: "direction", why: "C'est le nom que certains syndicats donnent à leur organe de direction, à la place de « commission exécutive »." },
  { label: "Bureau", zone: "execution", why: "Il met en œuvre les décisions du congrès et de la CE (art. 10)." },
  { label: "Secrétariat", zone: "execution", why: "Autre nom du bureau dans certains syndicats (art. 10 : « le bureau ou le secrétariat »)." },
  { label: "Commission financière de contrôle", zone: "controle", why: "Elle vérifie la bonne gestion des finances et rend compte à la CE et au congrès (art. 9)." },
  { label: "Commission des mandats", zone: "controle", why: "Au congrès, elle vérifie les mandats des délégué·es et la régularité de la représentation." }
];

// type "qcm" : options mélangées ; type "vf" : Vrai / Faux dans cet ordre.
// role = identifiant de la carte liée (lien « Voir la fiche »)
const QUIZ_POOL = [
  { role: "etape-deposer", type: "qcm",
    question: "Où doit-on déposer les statuts d'un syndicat ?",
    options: ["À la mairie du siège social", "À la préfecture", "Au greffe du tribunal judiciaire", "À l'inspection du travail"],
    answer: "À la mairie du siège social",
    explanation: "Les statuts sont déposés à la mairie du siège social, en quatre exemplaires, contre récépissé, avec la liste des dirigeant·es (Code du travail, R2131-1)." },
  { role: "etape-deposer", type: "vf",
    question: "Les statuts sont déposés avec la liste des dirigeant·es du syndicat.",
    answer: "Vrai",
    explanation: "Avec leurs nom, prénom, profession, domicile et nationalité. Le modèle recommande aussi de joindre la liste du bureau élu." },
  { role: "etape-deposer", type: "qcm",
    question: "Qui signe les statuts déposés en mairie ?",
    options: ["Le ou la secrétaire général·e et le ou la trésorier·ère", "Tous les syndiqué·es", "Le ou la délégué·e syndical·e", "Le ou la secrétaire de l'UD"],
    answer: "Le ou la secrétaire général·e et le ou la trésorier·ère",
    explanation: "Ils et elles signent les statuts et paraphent chaque page (modèle de statuts, recommandations complémentaires)." },
  { role: "art-11", type: "qcm",
    question: "Quelle majorité faut-il pour modifier les statuts ?",
    options: ["Les deux tiers des suffrages exprimés", "La majorité simple", "L'unanimité", "Les trois quarts des syndiqué·es"],
    answer: "Les deux tiers des suffrages exprimés",
    explanation: "Les amendements doivent recueillir la majorité des deux tiers des suffrages valablement exprimés, en congrès (art. 11)." },
  { role: "art-11", type: "vf",
    question: "La commission exécutive peut modifier les statuts entre deux congrès.",
    answer: "Faux",
    explanation: "Les statuts ne peuvent être modifiés qu'à l'occasion d'un congrès, ordinaire ou extraordinaire (art. 11)." },
  { role: "art-2", type: "qcm",
    question: "À quelles structures un syndicat CGT doit-il adhérer pour être confédéré ?",
    options: ["À une union départementale et à une fédération", "À une union locale seulement", "Directement à la confédération", "À aucune : c'est facultatif"],
    answer: "À une union départementale et à une fédération",
    explanation: "Selon l'article 3 des statuts confédéraux, la CGT est constituée par les fédérations et les UD, auxquelles les syndicats doivent adhérer pour être confédérés." },
  { role: "etape-deux-ans", type: "qcm",
    question: "Combien de temps d'existence faut-il à un syndicat pour présenter des candidat·es ou désigner un·e DS ?",
    options: ["Deux ans", "Six mois", "Un an", "Cinq ans"],
    answer: "Deux ans",
    explanation: "La loi du 20 août 2008 impose deux ans d'existence, même pour un syndicat affilié à une confédération représentative." },
  { role: "art-preambule", type: "vf",
    question: "Si les statuts résultent d'un regroupement de syndicats, il faut le préciser dans le préambule.",
    answer: "Vrai",
    explanation: "Préciser une modification, un regroupement ou une extension préserve la continuité, et donc les deux ans d'existence nécessaires." },
  { role: "art-1", type: "vf",
    question: "Pour un syndicat de site, on écrit « syndicat multiprofessionnel » dans les statuts.",
    answer: "Faux",
    explanation: "Il ne faut pas le qualifier officiellement de « multiprofessionnel », mais bien de syndicat « inter-entreprises »." },
  { role: "art-1", type: "qcm",
    question: "Qui peut adhérer au syndicat ?",
    options: ["Tous les salarié·es et ancien·nes salarié·es, sans distinction", "Seulement les salarié·es en CDI", "Seulement les salarié·es de nationalité française", "Seulement les cadres et technicien·nes"],
    answer: "Tous les salarié·es et ancien·nes salarié·es, sans distinction",
    explanation: "Le syndicat est ouvert à tous, sans distinction de statut, d'opinion politique, religieuse, philosophique ou de nationalité (art. 1)." },
  { role: "art-4", type: "qcm",
    question: "Qui représente le syndicat en justice ?",
    options: ["Le ou la SG, ou un·e syndiqué·e mandaté·e par le bureau", "Uniquement un·e avocat·e", "Le ou la trésorier·ère", "L'union départementale"],
    answer: "Le ou la SG, ou un·e syndiqué·e mandaté·e par le bureau",
    explanation: "Le ou la secrétaire général·e représente le syndicat en justice ; chaque syndiqué·e peut le faire sur mandat du bureau (art. 4)." },
  { role: "art-3", type: "qcm",
    question: "Pourquoi le titre exact du syndicat est-il important ?",
    options: ["Il sert à la publication des comptes, donc à la représentativité", "Pour imprimer les tracts", "Il est imposé par l'employeur", "Il n'a pas d'importance"],
    answer: "Il sert à la publication des comptes, donc à la représentativité",
    explanation: "C'est le nom statutaire qui sert à la publication des comptes ; la transparence financière est un critère de représentativité." },
  { role: "art-12", type: "vf",
    question: "En cas de dissolution, les biens du syndicat sont partagés entre les syndiqué·es.",
    answer: "Faux",
    explanation: "Ils sont dévolus à l'union départementale ou à la fédération CGT, sur décision d'au moins deux tiers des syndiqué·es réunis en congrès (art. 12)." },
  { role: "etape-valider", type: "qcm",
    question: "À qui envoie-t-on les statuts pour avis et validation ?",
    options: ["À l'UD et à la fédération auxquelles le syndicat est affilié", "À l'employeur", "À l'inspection du travail", "Au conseil de prud'hommes"],
    answer: "À l'UD et à la fédération auxquelles le syndicat est affilié",
    explanation: "Ces organisations vérifient la conformité aux statuts de la CGT et valident les statuts (modèle, art. 2)." },
  { role: "art-7", type: "qcm",
    question: "Au minimum, combien de temps avant le congrès la convocation doit-elle parvenir aux syndiqué·es ?",
    options: ["Un mois", "Huit jours", "Quinze jours", "Trois mois"],
    answer: "Un mois",
    explanation: "Avec l'ordre du jour, les éventuelles propositions de modification des statuts et les modalités de représentation (art. 7)." },
  { role: "art-6", type: "qcm",
    question: "Que fait le syndicat des cotisations qu'il encaisse ?",
    options: ["Il garde sa part et reverse le reste à CoGéTise", "Il reverse tout à la confédération", "Il garde tout", "Il les confie à l'UL"],
    answer: "Il garde sa part et reverse le reste à CoGéTise",
    explanation: "CoGéTise répartit ensuite entre les UL, UD, fédérations, comité régional et confédération (art. 6)." },
  { role: "etape-faire-vivre", type: "vf",
    question: "Une fois déposés, les statuts sont figés et ne peuvent plus évoluer.",
    answer: "Faux",
    explanation: "Ils se révisent en congrès quand le périmètre, l'organisation ou la loi évoluent ; la nouvelle version est validée puis redéposée." },
  { role: "art-4", type: "qcm",
    question: "Selon le modèle de statuts, quel est l'objet du syndicat ?",
    options: ["Défendre les droits et intérêts individuels et collectifs des salarié·es", "Gérer les activités sociales du CSE", "Conseiller l'employeur", "Organiser les élections professionnelles"],
    answer: "Défendre les droits et intérêts individuels et collectifs des salarié·es",
    explanation: "Professionnels, matériels et moraux. Pour cela, le syndicat peut agir en justice devant toutes les juridictions (art. 4)." }
];

const QUIZ_LENGTH = 10;

const { el } = FK;

document.addEventListener('DOMContentLoaded', function() {
  const explorationPanel = document.getElementById('exploration-panel');

  /* ---------- Cartes ---------- */

  function listBody(item, extra) {
    return [
      el('ul', { className: 'role-details' }, item.points.map(m => el('li', { text: m }))),
      extra || null,
      item.source ? el('p', { className: 'role-source', text: '📖 ' + item.source }) : null
    ];
  }

  const pourquoiGrid = document.getElementById('pourquoi-grid');
  POURQUOI.forEach(item => pourquoiGrid.appendChild(FK.buildCard({
    id: item.id, icon: item.icon, label: 'Pourquoi des statuts ?',
    title: item.title, question: item.question, body: listBody(item)
  })));

  const etapesList = document.getElementById('etapes-list');
  ETAPES.forEach((item, i) => {
    const card = FK.buildCard({
      id: item.id, icon: item.icon, label: `Étape ${i + 1} sur ${ETAPES.length}`,
      title: item.title, question: item.question, body: listBody(item)
    });
    etapesList.appendChild(el('li', { className: 'etape' }, [card]));
  });

  const articlesGrid = document.getElementById('articles-grid');
  ARTICLES.forEach(item => articlesGrid.appendChild(FK.buildCard({
    id: item.id, icon: item.icon, label: 'Modèle de statuts',
    title: item.title, question: item.question,
    badge: { cls: 'role-badge--article', text: item.num },
    body: listBody(item, el('p', { className: 'role-vigilance' }, [
      el('strong', { text: '⚠️ Point de vigilance : ' }),
      document.createTextNode(item.vigilance)
    ]))
  })));

  const allCards = explorationPanel.querySelectorAll('.role-card');
  document.getElementById('reveal-all-btn').addEventListener('click', () => {
    allCards.forEach(card => FK.setExpanded(card, true));
  });
  document.getElementById('hide-all-btn').addEventListener('click', () => {
    allCards.forEach(card => FK.setExpanded(card, false));
  });

  function focusCard(id) {
    const card = document.getElementById('role-' + id);
    if (!card) return;
    modes.setMode('exploration');
    FK.highlightCard(card);
  }

  /* ---------- Activité : classer les instances ---------- */
  // Fonctionne à la souris, au doigt et au clavier :
  // choisir une étiquette, puis la case où la ranger.

  const pool = document.getElementById('classement-pool');
  const zonesBox = document.getElementById('classement-zones');
  const classFeedback = document.getElementById('classement-feedback');
  let selectedChip = null;

  function selectChip(chip) {
    document.querySelectorAll('.classement .chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
    selectedChip = selectedChip === chip ? null : chip;
    if (selectedChip) selectedChip.setAttribute('aria-pressed', 'true');
    zonesBox.classList.toggle('placing', !!selectedChip);
  }

  function placeChip(target) {
    if (!selectedChip) return;
    selectedChip.classList.remove('good', 'bad');
    target.appendChild(selectedChip);
    selectedChip.setAttribute('aria-pressed', 'false');
    selectedChip.focus();
    selectedChip = null;
    zonesBox.classList.remove('placing');
    classFeedback.className = 'quiz-feedback';
    classFeedback.innerHTML = '';
  }

  function resetClassement() {
    pool.innerHTML = '';
    zonesBox.querySelectorAll('.zone-items').forEach(z => { z.innerHTML = ''; });
    FK.shuffle(CLASSEMENT_ITEMS).forEach(item => {
      const chip = el('button', { type: 'button', className: 'chip', 'aria-pressed': 'false', 'data-zone': item.zone, text: item.label });
      chip.addEventListener('click', e => { e.stopPropagation(); selectChip(chip); });
      pool.appendChild(chip);
    });
    selectedChip = null;
    zonesBox.classList.remove('placing');
    classFeedback.className = 'quiz-feedback';
    classFeedback.innerHTML = '';
  }

  CLASSEMENT_ZONES.forEach(zone => {
    const items = el('div', { className: 'zone-items' });
    const target = el('button', { type: 'button', className: 'zone-target', text: 'Ranger ici' });
    target.addEventListener('click', () => placeChip(items));
    zonesBox.appendChild(el('div', { className: 'zone', 'data-zone': zone.id }, [
      el('div', { className: 'zone-head' }, [
        el('strong', { text: zone.label }),
        el('span', { text: zone.hint })
      ]),
      items,
      target
    ]));
  });
  document.getElementById('classement-pool-target').addEventListener('click', () => placeChip(pool));

  document.getElementById('classement-check').addEventListener('click', () => {
    const placed = zonesBox.querySelectorAll('.chip');
    const list = el('ul', { className: 'classement-why' });
    let good = 0;
    placed.forEach(chip => {
      const zone = chip.closest('.zone').dataset.zone;
      const ok = zone === chip.dataset.zone;
      chip.classList.toggle('good', ok);
      chip.classList.toggle('bad', !ok);
      if (ok) good++;
      const item = CLASSEMENT_ITEMS.find(i => i.label === chip.textContent);
      list.appendChild(el('li', { className: ok ? 'good' : 'bad' }, [
        el('strong', { text: (ok ? '✔ ' : '✘ ') + item.label + ' : ' }),
        document.createTextNode(item.why)
      ]));
    });
    const total = CLASSEMENT_ITEMS.length;
    const remaining = pool.querySelectorAll('.chip').length;
    classFeedback.className = 'quiz-feedback visible ' + (good === total ? 'correct' : 'incorrect');
    classFeedback.innerHTML = '';
    classFeedback.appendChild(el('strong', {
      text: good === total ? 'Bravo, tout est bien rangé ! '
        : `${good} sur ${total} bien rangées` + (remaining ? ` (${remaining} encore à placer). ` : '. ') + 'Déplacez les étiquettes en rouge. '
    }));
    if (placed.length) classFeedback.appendChild(list);
  });
  document.getElementById('classement-reset').addEventListener('click', resetClassement);
  resetClassement();

  /* ---------- Modes et quiz ---------- */

  const quiz = FK.createQuiz({
    pool: QUIZ_POOL,
    length: QUIZ_LENGTH,
    onSeeCard: q => focusCard(q.role),
    results: { perfect: 'Sans faute ! Vous maîtrisez le fonctionnement statutaire.' }
  });
  const modes = FK.initModes({ onQuiz: quiz.start });

  /* ---------- Mode projection ---------- */

  const cardDeck = (items, cat, badge) => ({
    build: () => items,
    render: (stage, item, revealed) => FK.renderCardSlide(stage, {
      icon: item.icon,
      cat: typeof cat === 'function' ? cat(item) : cat,
      title: item.title,
      badge: badge ? badge(item) : null,
      question: item.question,
      answer: () => {
        const answer = FK.listAnswer(item.points, item.source)();
        if (item.vigilance) {
          answer.appendChild(el('p', { className: 'proj-explanation proj-vigilance', text: '⚠️ ' + item.vigilance }));
        }
        return answer;
      }
    }, revealed)
  });

  FK.initProjection({
    initialDeck: () => modes.isQuiz() ? 'quiz' : 'pourquoi',
    decks: {
      pourquoi: cardDeck(POURQUOI, 'Pourquoi des statuts ?'),
      etapes: cardDeck(ETAPES, item => `La vie des statuts — étape ${ETAPES.indexOf(item) + 1} sur ${ETAPES.length}`),
      articles: cardDeck(ARTICLES, 'Le modèle de statuts, article par article', item => ({ cls: 'role-badge--article', text: item.num })),
      quiz: {
        build: () => FK.drawQuestions(QUIZ_POOL, QUIZ_LENGTH),
        render: FK.renderQuizSlide
      }
    }
  });

  // La fiche-mémo imprimée montre toutes les cartes ouvertes (voir @media print)
  document.querySelector('.print-button').addEventListener('click', () => {
    modes.setMode('exploration');
    window.print();
  });

  FK.initToc();
  FK.initTheme();
});
