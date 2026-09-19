const CACHE = 'cgt-atmp-v1';
const PRECACHE = [
  '/', '/index.html', '/stagiaires.html', '/carnet-atmp.html',
  '/fiche-delegue.html', '/argumentaire.html', '/lexique.html',
  '/faq-atmp.html', '/recherche.html', '/404.html',
  '/assets/style.css', '/assets/cgt-ui.js', '/assets/favicon.svg', '/assets/icons.svg',
  'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached ||
      fetch(e.request).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return resp;
      }).catch(() => caches.match('/404.html'))
    )
  );
});
