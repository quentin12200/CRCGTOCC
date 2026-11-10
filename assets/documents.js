/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Liens vers les documents (documents.js)
   Ajoute à chaque lien vers un document son format et son poids
   (« Word · 98 Ko »), et pour un document Word, un lien vers sa
   version PDF quand elle existe.
   Les poids viennent de assets/documents-meta.js, généré par
   scripts/maj-documents.py.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__cgtDocs) return;
  window.__cgtDocs = true;

  var FORMATS = { docx: 'Word', pdf: 'PDF', pptx: 'PowerPoint', xlsx: 'Excel', odt: 'Texte' };

  function poids(o) {
    if (o >= 1048576) return (o / 1048576).toFixed(1).replace('.', ',') + ' Mo';
    return Math.max(1, Math.round(o / 1024)) + ' Ko';
  }
  function chemin(a) {
    try { return decodeURIComponent(new URL(a.getAttribute('href'), location.href).pathname); }
    catch (e) { return ''; }
  }
  function badge(fmt, o) {
    var s = document.createElement('span');
    s.className = 'cgt-doc-info';
    s.textContent = fmt + (o ? ' · ' + poids(o) : '');
    return s;
  }

  function decorer(root) {
    var meta = window.CGT_DOCS || {};
    (root || document).querySelectorAll('a[href]').forEach(function (a) {
      if (a.dataset.cgtDoc) return;
      var p = chemin(a);
      var m = p.match(/\.(docx|pdf|pptx|xlsx|odt)$/i);
      if (!m) return;
      a.dataset.cgtDoc = '1';
      var ext = m[1].toLowerCase();
      // Mention déjà présente dans le texte du lien (« (Word) », « PDF, 4,6 Mo »…) : on la retire
      a.childNodes.forEach(function (n) {
        if (n.nodeType === 3) n.textContent = n.textContent.replace(/\s*\((Word|PDF)(,[^)]*)?\)\s*$/i, '');
      });
      a.appendChild(document.createTextNode(' '));
      a.appendChild(badge(FORMATS[ext], meta[p]));
      if (ext === 'docx') {
        var pdf = p.replace(/\.docx$/i, '.pdf');
        if (meta[pdf]) {
          var alt = document.createElement('a');
          alt.href = encodeURI(pdf);
          alt.className = 'cgt-doc-alt';
          alt.dataset.cgtDoc = '1';
          alt.target = '_blank';
          alt.rel = 'noopener';
          alt.setAttribute('aria-label', 'Version PDF : ' + (a.textContent || '').trim());
          alt.appendChild(document.createTextNode('version PDF '));
          alt.appendChild(badge('PDF', meta[pdf]));
          a.insertAdjacentText('afterend', ' ');
          a.parentNode.insertBefore(alt, a.nextSibling.nextSibling);
        }
      }
    });
  }

  function css() {
    var st = document.createElement('style');
    st.textContent =
      '.cgt-doc-info{display:inline-block;font-size:.72em;font-weight:600;letter-spacing:.02em;padding:.05em .45em;' +
      'border:1px solid currentColor;border-radius:3px;white-space:nowrap;vertical-align:.1em;margin-left:.15em}' +
      '.cgt-doc-alt{display:inline-flex;align-items:center;gap:.2em;min-height:26px;font-size:.85em;white-space:nowrap}' +
      '@media print{.cgt-doc-info,.cgt-doc-alt{display:none}}';
    document.head.appendChild(st);
  }

  function init() {
    css();
    decorer();
    if (window.MutationObserver) {
      var t = null;
      new MutationObserver(function () {
        clearTimeout(t);
        t = setTimeout(function () { decorer(); }, 120);
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  function charger() {
    if (window.CGT_DOCS) return init();
    var me = document.querySelector('script[src*="documents.js"]');
    var s = document.createElement('script');
    s.src = me ? me.getAttribute('src').replace('documents.js', 'documents-meta.js') : '/assets/documents-meta.js';
    s.onload = s.onerror = init;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', charger);
  else charger();
})();
