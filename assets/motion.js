/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Animations communes du site (motion.js)
   Chargé par cgt-ui.js, ou directement par les pages qui n'utilisent
   pas cgt-ui.js. Autonome : injecte son propre CSS.

   1. Apparition au défilement des blocs de contenu (avec cascade)
   2. Compteurs animés sur les chiffres clés
   3. Barre de progression de lecture
   4. Effet d'onde au clic sur les boutons
   5. Ouverture animée des blocs <details>
   6. Soulignement animé des titres de section

   Respecte « réduire les animations » (prefers-reduced-motion) et
   n'anime jamais un élément déjà animé par la page elle-même.
   Désactivation possible par page : <body data-motion="off">.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__cgtMotion) return;
  window.__cgtMotion = true;

  var path = location.pathname;
  // Les diaporamas ont leur propre moteur d'animation
  if (path.indexOf('/presentations/') !== -1 || /Presentation_|Prevoyance_Invalidite/.test(path)) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.22,.61,.36,1)';

  /* ── CSS ─────────────────────────────────────────────────── */
  var css = [
    '.cgt-m-hide{opacity:0;transform:translateY(22px) scale(.985)}',
    '.cgt-m-show{opacity:1;transform:none;transition:opacity .6s ' + EASE + ' var(--cgt-md,0ms),transform .6s ' + EASE + ' var(--cgt-md,0ms)}',
    '#cgt-m-progress{position:fixed;top:0;left:0;height:3px;width:100%;z-index:10000;pointer-events:none;',
    '  background:linear-gradient(90deg,#E2001A,#FFD200);transform-origin:0 50%;transform:scaleX(0);transition:transform .12s linear;opacity:.95}',
    '.cgt-m-ripple{position:absolute;border-radius:50%;pointer-events:none;background:currentColor;opacity:.28;',
    '  transform:scale(0);animation:cgtRipple .55s ease-out forwards}',
    '@keyframes cgtRipple{to{transform:scale(1);opacity:0}}',
    'details.cgt-m-opening > :not(summary){animation:cgtDetails .38s ' + EASE + ' both}',
    '@keyframes cgtDetails{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}',
    '.cgt-m-uline{position:relative}',
    '.cgt-m-uline::after{content:"";position:absolute;left:0;bottom:-.18em;height:3px;width:0;max-width:72px;',
    '  background:#FFD200;border-radius:2px;transition:width .7s ' + EASE + ' .15s}',
    '.cgt-m-uline.cgt-m-lined::after{width:48px}',
    '.cgt-m-count{font-variant-numeric:tabular-nums}',
    '@media print{.cgt-m-hide{opacity:1!important;transform:none!important}#cgt-m-progress{display:none!important}.cgt-m-uline::after{display:none}}'
  ].join('\n');

  function injectCSS() {
    if (document.getElementById('cgt-motion-css')) return;
    var st = document.createElement('style');
    st.id = 'cgt-motion-css';
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ── Utilitaires ─────────────────────────────────────────── */
  function inChrome(el) {
    return !!el.closest('nav, header, footer, .site-header, .topbar, .cgt-footer, .ticker, #cgt-ticker, .modal, [role="dialog"], [data-motion="off"]');
  }
  // Élément déjà pris en charge par une animation propre à la page
  function managedByPage(el) {
    if (el.classList.contains('reveal') || el.classList.contains('visible')) return true;
    var cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.position === 'sticky') return true;
    if (parseFloat(cs.opacity) < 0.99) return true;
    if (cs.animationName && cs.animationName !== 'none') return true;
    return false;
  }

  /* ── 1. Apparition au défilement ─────────────────────────── */
  var REVEAL_SELECTOR = [
    '.card', '.ressource-item', '.mp-card', '.guide-block', '.intro-box', '.metier-box',
    '.stat', '.stat-card', '.stat-pill', '.kpi', '.chiffre', '.tile', '.module', '.fiche',
    '.faq-item', '.question-card', '.q-card', '.quiz-card', '.case', '.cas', '.exercice',
    '.timeline-item', '.step', '.etape', '.bloc', '.box', '.encadre', '.callout', '.cgt-angle',
    '.courrier', '.modele', '.juris', '.arret', '.veille-item', '.term', '.lexique-item',
    '.welcome-box', '.section-label', '.intro', '.legende', '.letter-group', '.alpha-group',
    'main section', 'main article', 'main > details', 'main table', 'main blockquote'
  ].join(',');

  var revealObs = null;
  var seen = new WeakSet();

  function setupReveal(root) {
    if (reduce || !window.IntersectionObserver) return;
    if (!revealObs) {
      revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          el.classList.add('cgt-m-show');
          el.classList.remove('cgt-m-hide');
          revealObs.unobserve(el);
          // Nettoyage après l'animation pour ne pas gêner les styles de survol
          setTimeout(function () { el.classList.remove('cgt-m-show'); el.style.removeProperty('--cgt-md'); }, 1400);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    }
    var all = Array.prototype.slice.call((root || document).querySelectorAll(REVEAL_SELECTOR));
    // Éléments de grilles et de frises, quel que soit leur nom de classe
    var scope = document.querySelector('main') || document.body;
    scope.querySelectorAll('.timeline, .grid, [class*="-grid"], [class*="grid-"], ul.cards, .cards').forEach(function (g) {
      if (g.children.length < 2 || g.children.length > 80) return;
      var d = getComputedStyle(g).display;
      if (!/grid|flex|block/.test(d)) return;
      Array.prototype.forEach.call(g.children, function (c) {
        if (c.tagName !== 'SCRIPT' && c.tagName !== 'TEMPLATE') all.push(c);
      });
    });
    var targets = all.filter(function (el) {
      if (seen.has(el) || inChrome(el) || managedByPage(el)) return false;
      if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return false; // masqué
      return true;
    });
    // Ne pas animer un bloc et ses enfants en même temps : on garde le plus haut
    var set = new Set(targets);
    targets = targets.filter(function (el) {
      var p = el.parentElement;
      while (p) { if (set.has(p)) return false; p = p.parentElement; }
      return true;
    });
    // Cascade : délai croissant entre éléments frères
    var counters = new Map();
    targets.forEach(function (el) {
      seen.add(el);
      var parent = el.parentElement;
      var i = counters.get(parent) || 0;
      counters.set(parent, i + 1);
      el.style.setProperty('--cgt-md', Math.min(i, 7) * 70 + 'ms');
      el.classList.add('cgt-m-hide');
      revealObs.observe(el);
    });
  }

  /* ── 2. Compteurs animés ─────────────────────────────────── */
  var COUNT_SELECTOR = [
    '.stat-num', '.stat-number', '.stat-value', '.kpi-value', '.big-num', '.chiffre-num',
    '.mf-num', '.num', '.stat-pill span', '[data-countup]'
  ].join(',');
  var NUM_RE = /^(\D{0,3}?)(\d{1,3}(?:[\s  ]\d{3})+|\d+)([.,]\d+)?(\s?(?:%|€|k€|M€|Md€|M|K|ans?|jours?|h|mois)?\s*)$/;
  var countObs = null;

  function animateCount(el) {
    var txt = el.textContent.trim();
    var m = txt.match(NUM_RE);
    if (!m) return;
    var pre = m[1], intPart = m[2], dec = m[3] || '', suf = m[4] || '';
    var sep = (intPart.match(/[\s  ]/) || [' '])[0];
    var target = parseFloat(intPart.replace(/[\s  ]/g, '') + dec.replace(',', '.'));
    if (!isFinite(target) || target === 0) return;
    var decimals = dec ? dec.length - 1 : 0;
    var decSep = dec ? dec.charAt(0) : ',';
    function fmt(v) {
      var s = v.toFixed(decimals).split('.');
      var ip = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, intPart.length > 3 && /\D/.test(intPart) ? sep : '');
      return pre + ip + (decimals ? decSep + s[1] : '') + suf;
    }
    el.classList.add('cgt-m-count');
    var dur = 1300, t0 = null, last;
    function step(now) {
      // La page a modifié le chiffre entre-temps (filtre, recherche) : on s'arrête
      if (el.textContent !== last) return;
      if (t0 === null) t0 = now;
      var k = Math.min(1, Math.max(0, now - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = last = (k < 1 ? fmt(target * e) : txt);
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = last = fmt(0);
    requestAnimationFrame(step);
  }

  function setupCounters(root) {
    if (reduce || !window.IntersectionObserver) return;
    if (!countObs) {
      countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          countObs.unobserve(e.target);
          animateCount(e.target);
        });
      }, { threshold: 0.4 });
    }
    (root || document).querySelectorAll(COUNT_SELECTOR).forEach(function (el) {
      if (el.dataset.cgtCount || el.dataset.animated || el.dataset.val || el.dataset.v || inChrome(el)) return;
      if (el.children.length) return; // uniquement du texte simple
      if (!NUM_RE.test(el.textContent.trim())) return;
      el.dataset.cgtCount = '1';
      countObs.observe(el);
    });
  }

  /* ── 3. Barre de progression de lecture ──────────────────── */
  function setupProgress() {
    var doc = document.documentElement;
    if (doc.scrollHeight < window.innerHeight * 1.6) return;
    var bar = document.createElement('div');
    bar.id = 'cgt-m-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ── 4. Onde au clic sur les boutons ─────────────────────── */
  function setupRipple() {
    if (reduce) return;
    document.addEventListener('pointerdown', function (e) {
      var btn = e.target.closest('button, .btn, a[class*="btn"], .filter-btn, .finder button');
      if (!btn || inChrome(btn) || btn.disabled) return;
      var cs = getComputedStyle(btn);
      if (cs.display === 'inline' || cs.position === 'fixed') return;
      if (cs.position === 'static') btn.style.position = 'relative';
      if (cs.overflow !== 'hidden') btn.style.overflow = 'hidden';
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2.2;
      var dot = document.createElement('span');
      dot.className = 'cgt-m-ripple';
      dot.style.width = dot.style.height = size + 'px';
      dot.style.left = (e.clientX - r.left - size / 2) + 'px';
      dot.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(dot);
      setTimeout(function () { dot.remove(); }, 600);
    }, { passive: true });
  }

  /* ── 5. Ouverture animée des <details> ───────────────────── */
  function setupDetails() {
    if (reduce) return;
    document.addEventListener('toggle', function (e) {
      var d = e.target;
      if (!(d instanceof HTMLDetailsElement) || !d.open) return;
      d.classList.remove('cgt-m-opening');
      void d.offsetWidth;
      d.classList.add('cgt-m-opening');
      setTimeout(function () { d.classList.remove('cgt-m-opening'); }, 450);
    }, true);
  }

  /* ── 6. Soulignement animé des titres de section ─────────── */
  function setupHeadings() {
    if (reduce || !window.IntersectionObserver) return;
    var hs = Array.prototype.slice.call(document.querySelectorAll('main h2')).filter(function (h) {
      if (inChrome(h)) return false;
      var cs = getComputedStyle(h);
      // Pas sur les titres qui ont déjà un décor ou sont centrés
      return cs.textAlign !== 'center' && getComputedStyle(h, '::after').content === 'none' && cs.display !== 'inline';
    });
    if (!hs.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('cgt-m-lined'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    hs.forEach(function (h) { h.classList.add('cgt-m-uline'); obs.observe(h); });
  }

  /* ── Contenu ajouté dynamiquement (listes filtrées, cartes générées) ── */
  function watchMutations() {
    if (reduce || !window.MutationObserver) return;
    var pending = false;
    new MutationObserver(function (muts) {
      if (pending) return;
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { pending = true; break; }
      }
      if (!pending) return;
      setTimeout(function () { pending = false; setupReveal(); setupCounters(); }, 60);
    }).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    if (document.body && document.body.dataset.motion === 'off') return;
    injectCSS();
    setupReveal();
    setupCounters();
    setupProgress();
    setupRipple();
    setupDetails();
    setupHeadings();
    watchMutations();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  else setTimeout(init, 0);
})();
