/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Service worker (consultation hors-ligne)

   - Au premier passage, met en cache les diaporamas, fiches mémo,
     lexique, tableaux de maladies professionnelles et pages clés.
   - Pages du site : réseau d'abord (mises à jour visibles tout de
     suite), mais si le réseau ne répond pas en 4 s, la copie en cache
     est servie : utile dans les salles au réseau faible.
   - Quiz live, inscriptions, évaluations et services IA restent en
     ligne seulement (jamais servis depuis le cache).
   Changer CACHE (numéro de version) à chaque modification de la liste.
═══════════════════════════════════════════════════════════════ */
const CACHE = 'cgt-atmp-v31';

const PRECACHE = [
  // Pages d'accueil et outils
  '/', '/index.html', '/stagiaires.html', '/hors-ligne.html', '/404.html',
  // Diaporamas des modules
  '/presentations/Presentation_AT-MP_CGT.html',
  '/presentations/Prevention_SST_CGT_Occitanie.html',
  '/presentations/Prevoyance_Invalidite_CGT_Occitanie.html',
  '/presentations/Recours_Contestations_CPAM_CGT.html',
  '/presentations/ATMP_Fonction_Publique_CGT.html',
  // Fiches mémo
  '/fiches-memo/index.html', '/fiches-memo/fiche-atmp.html', '/fiches-memo/fiche-sst.html',
  '/fiches-memo/fiche-prevoyance.html', '/fiches-memo/fiche-handicap.html', '/fiches-memo/fiche-atmp-fp.html',
  // Lexique, tableaux MP et ressources AT/MP
  '/lexique.html', '/maladies-pro.html', '/carnet-atmp.html', '/deroulement.html', '/argumentaire.html',
  '/exercices-atmp.html', '/guide-atmp-fp.html', '/guide-dossier-atmp.html', '/checklist-at.html',
  '/veille-juridique.html', '/procedure-at.html', '/faq-atmp.html', '/fiche-delegue.html', '/comparatif-statuts.html',
  '/jurisprudence.html', '/courriers.html', '/recherche.html', '/calculateur-ij.html',
  // Quiz solo
  '/quiz-atmp.html', '/quiz/index.html', '/quiz/quiz-atmp.html', '/quiz/quiz-sst.html',
  '/quiz/quiz-prevoyance.html', '/quiz/quiz-handicap.html', '/quiz/quiz-fp.html', '/quiz/quiz-vie-syndicale.html',
  // Fichiers communs
  '/manifest.json', '/assets/style.css', '/assets/cgt-ui.js', '/assets/motion.js', '/assets/a11y.js',
  '/assets/documents.js', '/assets/documents-meta.js', '/assets/modules-data.js', '/assets/modules.js',
  '/assets/recherche-index.js', '/assets/questions-du-jour.js',
  '/assets/favicon.svg', '/assets/icons.svg', '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/logo-cgt-occitanie-web.jpg', '/assets/hero-stagiaire.webp', '/assets/hero-formateur.webp',
  '/assets/bandeau-contextuel.webp'
];

// En ligne seulement : jamais mis en cache ni servis depuis le cache
const EN_LIGNE_SEULEMENT = /^\/(api\/|quiz-live-|inscription\.html|evaluation-)/;
const DELAI_RESEAU = 4000;

self.addEventListener('install', e => {
  // Chaque fichier séparément : un fichier manquant n'empêche pas de mettre les autres en cache
  e.waitUntil(caches.open(CACHE).then(c =>
    Promise.allSettled(PRECACHE.map(u => c.add(new Request(u, { cache: 'reload' }))))
  ));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

function depuisCache(req) {
  return caches.match(req, { ignoreSearch: true }).then(r => {
    if (r) return r;
    if (req.mode === 'navigate') return caches.match('/hors-ligne.html');
    return Response.error();
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (EN_LIGNE_SEULEMENT.test(url.pathname)) {
      // Pas de cache, mais une page claire si la connexion manque
      if (req.mode === 'navigate') e.respondWith(fetch(req).catch(() => caches.match('/hors-ligne.html')));
      return;
    }
    // Réseau d'abord, avec un délai : au-delà, la copie en cache est servie
    e.respondWith(new Promise(resolve => {
      let fini = false;
      const repli = () => depuisCache(req).then(r => { if (!fini && r && r.type !== 'error') { fini = true; resolve(r); } return r; });
      const minuteur = setTimeout(repli, DELAI_RESEAU);
      fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(resp => {
        clearTimeout(minuteur);
        if (resp.ok) {
          const copie = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copie));
        }
        if (!fini) { fini = true; resolve(resp); }
      }).catch(() => {
        clearTimeout(minuteur);
        depuisCache(req).then(r => { if (!fini) { fini = true; resolve(r); } });
      });
    }));
    return;
  }

  // Firebase et autres services en direct : jamais en cache
  if (/firebase|googleapis\.com\/(?!css)|firestore/.test(url.host + url.pathname)) return;

  // Polices et bibliothèques externes : cache d'abord
  e.respondWith(
    caches.match(req).then(cached => cached ||
      fetch(req).then(resp => {
        if (resp.ok || resp.type === 'opaque') {
          const copie = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copie));
        }
        return resp;
      })
    )
  );
});

// La page demande quels modules sont disponibles hors-ligne
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'etat-hors-ligne') return;
  const urls = e.data.urls || [];
  Promise.all(urls.map(u => caches.match(u, { ignoreSearch: true }).then(r => !!r)))
    .then(res => e.source && e.source.postMessage({ type: 'etat-hors-ligne', etat: urls.map((u, i) => [u, res[i]]) }));
});
