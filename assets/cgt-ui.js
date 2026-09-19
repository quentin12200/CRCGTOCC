/**
 * CGT Occitanie — UI commun
 * Injecter au début de <body> sur chaque page :
 *   <script src="/assets/cgt-ui.js"></script>
 */
(function () {
  'use strict';

  /* ── 1. Icônes SVG sprite ──────────────────────────────── */
  function injectIcons() {
    var d = document.createElement('div');
    d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    d.setAttribute('aria-hidden', 'true');
    // Chemin relatif à la racine — ajusté selon profondeur
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var base = Array(depth).fill('..').join('/') || '.';
    fetch(base + '/assets/icons.svg')
      .then(function(r){ return r.text(); })
      .then(function(t){ d.innerHTML = t; document.body.insertBefore(d, document.body.firstChild); })
      .catch(function(){});
  }

  /* ── 2. Loading screen ─────────────────────────────────── */
  function injectLoader() {
    var style = document.createElement('style');
    style.textContent = [
      '.cgt-loader{position:fixed;inset:0;z-index:99999;background:#0F0F0F;',
      'display:flex;align-items:center;justify-content:center;flex-direction:column;',
      'transition:opacity .4s ease,visibility .4s ease}',
      '.cgt-loader.done{opacity:0;visibility:hidden;pointer-events:none}',
      '.cgt-loader-logo{display:flex;align-items:center;gap:14px;',
      'animation:loaderIn .45s cubic-bezier(.22,.61,.36,1) both}',
      '@keyframes loaderIn{from{opacity:0;transform:scale(.82) translateY(12px)}',
      'to{opacity:1;transform:none}}',
      '.cgt-loader-sq{width:56px;height:56px;background:#E2001A;border-radius:8px;',
      'display:flex;align-items:center;justify-content:center;',
      'font-family:"Anton",sans-serif;font-size:1.35rem;color:#FFD200;letter-spacing:1px}',
      '.cgt-loader-txt strong{display:block;font-family:"Anton",sans-serif;',
      'font-size:1.2rem;color:#FAFAFA;letter-spacing:.5px}',
      '.cgt-loader-txt span{font-size:.8rem;color:#666}',
      '.cgt-loader-bar{position:absolute;bottom:0;left:0;height:3px;width:0;',
      'background:linear-gradient(90deg,#E2001A,#FFD200);',
      'animation:loaderBar .7s ease-out .1s forwards}',
      '@keyframes loaderBar{to{width:100%}}'
    ].join('');
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.className = 'cgt-loader';
    el.innerHTML = [
      '<div class="cgt-loader-logo">',
      '  <div class="cgt-loader-sq">CGT</div>',
      '  <div class="cgt-loader-txt">',
      '    <strong>CGT Occitanie</strong>',
      '    <span>Centre de ressources AT/MP</span>',
      '  </div>',
      '</div>',
      '<div class="cgt-loader-bar"></div>'
    ].join('');
    document.body.insertBefore(el, document.body.firstChild);

    // Disparaît après 800 ms (ou au chargement complet si plus long)
    var hide = function () {
      el.classList.add('done');
      setTimeout(function () { el.remove(); }, 450);
    };
    setTimeout(function () {
      if (document.readyState === 'complete') { hide(); }
      else { window.addEventListener('load', hide, { once: true }); }
    }, 800);
  }

  /* ── 3. Ticker d'actualité ─────────────────────────────── */
  function injectTicker() {
    // Ne pas injecter dans les présentations plein écran ni sur login
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1) return;
    if (path.indexOf('login') !== -1) return;

    var style = document.createElement('style');
    style.textContent = [
      '.ticker-wrap{background:#E2001A;color:#fff;height:32px;overflow:hidden;',
      'display:flex;align-items:center;font-size:.78rem;font-family:"Inter",sans-serif;',
      'position:relative;z-index:100;flex-shrink:0}',
      '.ticker-label{background:#FFD200;color:#0F0F0F;font-weight:700;',
      'padding:0 12px;height:100%;display:flex;align-items:center;',
      'white-space:nowrap;font-size:.72rem;letter-spacing:.5px;text-transform:uppercase;flex-shrink:0}',
      '.ticker-track{display:flex;overflow:hidden;flex:1;position:relative}',
      '.ticker-inner{display:flex;white-space:nowrap;',
      'animation:tickerScroll 40s linear infinite}',
      '.ticker-inner:hover{animation-play-state:paused}',
      '@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}',
      '.ticker-sep{margin:0 28px;opacity:.5}',
      '@media print{.ticker-wrap{display:none}}'
    ].join('');
    document.head.appendChild(style);

    var stats = [
      '⚠ 1 331 morts par accident du travail en 2025',
      '📊 551 225 AT avec arrêt de travail',
      '💊 1 971 maladies psychiques reconnues — chiffre doublé en 5 ans',
      '💶 5,4 Md€ d\'indemnités journalières versées (+10,5%)',
      '📅 84 millions de journées de travail perdues',
      '🔴 693 718 sinistres AT au total — CGT exige un plan national de prévention'
    ];
    var items = (stats.concat(stats)).map(function (s) {
      return '<span>' + s + '</span><span class="ticker-sep">·</span>';
    }).join('');

    var el = document.createElement('div');
    el.className = 'ticker-wrap';
    el.innerHTML = [
      '<div class="ticker-label">CGT 2025</div>',
      '<div class="ticker-track">',
      '  <div class="ticker-inner">' + items + '</div>',
      '</div>'
    ].join('');

    // Insérer avant le premier élément du body (après le loader)
    var ref = document.querySelector('.cgt-loader');
    if (ref && ref.nextSibling) {
      document.body.insertBefore(el, ref.nextSibling);
    } else {
      document.body.insertBefore(el, document.body.firstChild);
    }
  }

  /* ── 4. Footer commun ──────────────────────────────────── */
  function injectFooter() {
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1) return;
    // Ne pas dupliquer si footer déjà présent
    if (document.querySelector('.cgt-footer')) return;

    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var base = Array(depth).fill('..').join('/') || '.';

    var style = document.createElement('style');
    style.textContent = [
      '.cgt-footer{background:#111;border-top:1px solid #2C2C2C;',
      'padding:2rem 1rem 1.5rem;text-align:center;',
      'font-family:"Inter",sans-serif;color:#555;font-size:.8rem}',
      '.cgt-footer-logo{display:inline-flex;align-items:center;gap:10px;margin-bottom:1rem}',
      '.cgt-footer-sq{width:38px;height:38px;background:#E2001A;border-radius:5px;',
      'display:flex;align-items:center;justify-content:center;',
      'font-family:"Anton",sans-serif;font-size:1rem;color:#FFD200}',
      '.cgt-footer-name{text-align:left}',
      '.cgt-footer-name strong{display:block;color:#999;font-size:.85rem}',
      '.cgt-footer-name span{font-size:.72rem;color:#444}',
      '.cgt-footer-links{display:flex;flex-wrap:wrap;gap:.75rem;',
      'justify-content:center;margin:.75rem 0}',
      '.cgt-footer-links a{color:#555;text-decoration:none;transition:color .15s}',
      '.cgt-footer-links a:hover{color:#FFD200}',
      '.cgt-footer-copy{font-size:.72rem;color:#333;margin-top:.5rem}',
      '@media print{.cgt-footer{display:none}}'
    ].join('');
    document.head.appendChild(style);

    var el = document.createElement('footer');
    el.className = 'cgt-footer';
    el.innerHTML = [
      '<div class="cgt-footer-logo">',
      '  <div class="cgt-footer-sq">CGT</div>',
      '  <div class="cgt-footer-name">',
      '    <strong>CGT Occitanie</strong>',
      '    <span>Centre de ressources AT/MP — Version 2025</span>',
      '  </div>',
      '</div>',
      '<div class="cgt-footer-links">',
      '  <a href="' + base + '/index.html">Accueil formateur</a>',
      '  <a href="' + base + '/stagiaires.html">Espace stagiaire</a>',
      '  <a href="' + base + '/carnet-atmp.html">Carnet AT/MP</a>',
      '  <a href="' + base + '/lexique.html">Lexique</a>',
      '  <a href="' + base + '/faq-atmp.html">FAQ</a>',
      '  <a href="' + base + '/recherche.html">Recherche</a>',
      '</div>',
      '<div class="cgt-footer-copy">',
      '  © CGT Occitanie 2025 · Contenu syndical — usage interne formations',
      '</div>'
    ].join('');
    document.body.appendChild(el);
  }

  /* ── 5. Scroll reveal ──────────────────────────────────── */
  function initReveal() {
    if (!window.IntersectionObserver) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }

  /* ── Init ──────────────────────────────────────────────── */
  // Loader en synchrone (avant DOMContentLoaded pour apparaître immédiatement)
  injectLoader();

  document.addEventListener('DOMContentLoaded', function () {
    injectIcons();
    injectTicker();
    injectFooter();
    initReveal();
  });

})();
