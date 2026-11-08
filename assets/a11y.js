/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Accessibilité commune (a11y.js)
   Chargé par cgt-ui.js, ou directement par les pages qui n'utilisent
   pas cgt-ui.js. Corrige au chargement, et sur le contenu ajouté
   ensuite, les défauts répétés dans les pages (WCAG 2.2 AA) :

   1. Éléments cliquables (div/li/span avec onclick) inaccessibles au
      clavier : rôle bouton, tabulation, Entrée et Espace.
   2. <label> non reliés à leur champ : liaison for/id.
   3. Champs sans nom accessible : aria-label tiré du placeholder.
   4. Boutons réduits à une icône (×, ✕, ▲…) : aria-label.
   5. Contour de focus visible pour la navigation au clavier.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__cgtA11y) return;
  window.__cgtA11y = true;

  var NATIVE = 'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]';
  var uid = 0;

  function injectCSS() {
    if (document.getElementById('cgt-a11y-css')) return;
    var st = document.createElement('style');
    st.id = 'cgt-a11y-css';
    st.textContent =
      ':focus-visible{outline:3px solid #1A5FAD;outline-offset:2px}' +
      '[data-theme="dark"] :focus-visible{outline-color:#7FB2E8}' +
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :focus-visible{outline-color:#7FB2E8}}' +
      '[data-cgt-btn]{cursor:pointer}';
    document.head.appendChild(st);
  }

  /* 1. Cliquables non natifs */
  function fixClickables(root) {
    root.querySelectorAll('[onclick]').forEach(function (el) {
      if (el.matches(NATIVE) || el.hasAttribute('data-cgt-btn')) return;
      if (/^(HTML|BODY|TR|TD|TH|TABLE|TBODY|LABEL|IMG|SVG)$/i.test(el.tagName)) return;
      // Déjà dans un lien ou un vrai bouton : rien à ajouter
      if (el.parentElement && el.parentElement.closest('button, a[href]')) return;
      el.setAttribute('data-cgt-btn', '');
      if (!el.hasAttribute('role')) {
        // Ligne de case à cocher (listes de contrôle) : rôle case à cocher
        var oc = el.getAttribute('onclick') || '';
        var box = el.querySelector(':scope > .checkbox, :scope > .check') || /^toggle(Handicap|Presta)?\(this\)/.test(oc);
        el.setAttribute('role', box ? 'checkbox' : 'button');
      }
      el.setAttribute('tabindex', '0');
      syncChecked(el);
    });
  }
  function syncChecked(el) {
    if (el.getAttribute('role') !== 'checkbox') return;
    var on = /\b(checked|done|selected|active|coche|is-checked)\b/.test(el.className);
    el.setAttribute('aria-checked', on ? 'true' : 'false');
  }
  document.addEventListener('keydown', function (e) {
    var el = e.target;
    if (!el || !el.hasAttribute || !el.hasAttribute('data-cgt-btn')) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      el.click();
    }
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-cgt-btn][role="checkbox"]');
    if (el) setTimeout(function () { syncChecked(el); }, 0);
    var hdr = e.target.closest && e.target.closest('[data-cgt-btn][aria-expanded]');
    if (hdr) setTimeout(function () { syncExpanded(hdr); }, 0);
  });

  /* En-têtes dépliables (bouton qui ouvre le bloc suivant) */
  function syncExpanded(el) {
    var oc = el.getAttribute('onclick') || '';
    // toggleEx(this) / toggleCorrige(this) : c'est le bloc parent qui s'ouvre
    var next = /^toggleEx\(/.test(oc) ? el.closest('.ex') : /^toggleCorrige\(/.test(oc) ? el.closest('.corrige') : el.nextElementSibling;
    if (!next) return;
    var open = next.classList.contains('open') || next.classList.contains('active') || next.classList.contains('show');
    el.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function fixExpanders(root) {
    root.querySelectorAll('[data-cgt-btn][role="button"]').forEach(function (el) {
      if (el.hasAttribute('aria-expanded')) return;
      var oc = el.getAttribute('onclick') || '';
      if (/nextElementSibling|^toggle(Ex|Corrige)\(this\)/.test(oc)) { el.setAttribute('aria-expanded', 'false'); syncExpanded(el); }
    });
  }

  /* 2 et 3. Étiquettes des champs */
  function fixLabels(root) {
    root.querySelectorAll('label:not([for])').forEach(function (lab) {
      if (lab.querySelector('input, select, textarea')) return;
      var field = null, n = lab.nextElementSibling;
      // Le champ suit l'étiquette (directement ou dans le bloc suivant)
      for (var i = 0; n && i < 3 && !field; i++, n = n.nextElementSibling) {
        if (n.matches('input, select, textarea')) field = n;
        else if (n.tagName === 'LABEL') break;
        else {
          // Un bloc de plusieurs champs (boutons radio, cases) n'a pas une étiquette unique
          var champs = n.querySelectorAll('input:not([type=hidden]), select, textarea');
          if (champs.length > 1) break;
          field = champs[0] || null;
        }
      }
      if (!field || field.labels && field.labels.length) return;
      if (!field.id) field.id = 'cgt-champ-' + (++uid);
      lab.setAttribute('for', field.id);
    });
    root.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea').forEach(function (f) {
      if ((f.labels && f.labels.length) || f.getAttribute('aria-label') || f.getAttribute('aria-labelledby')) return;
      var name = f.getAttribute('placeholder') || f.getAttribute('title') || '';
      if (!name && f.type === 'search') name = 'Rechercher';
      if (name) f.setAttribute('aria-label', name.replace(/^(ex\.?|ex :)\s*/i, '').replace(/…$/, '').trim());
    });
  }

  /* 4. Boutons réduits à une icône */
  var ICONS = { '×': 'Fermer', '✕': 'Supprimer', '✖': 'Supprimer', '✓': 'Valider', '▲': 'Réduire', '▼': 'Déplier',
                '‹': 'Précédent', '›': 'Suivant', '←': 'Précédent', '→': 'Suivant', '☰': 'Menu', '⋮': 'Plus d\'options', '+': 'Ajouter', '−': 'Retirer' };
  function fixIconButtons(root) {
    root.querySelectorAll('button, [role="button"]').forEach(function (b) {
      if (b.getAttribute('aria-label') || b.getAttribute('aria-labelledby')) return;
      var t = (b.textContent || '').trim();
      if (t.length > 2 && /[A-Za-zÀ-ÿ0-9]/.test(t)) return;
      var name = b.getAttribute('title') || ICONS[t];
      if (!name && b.classList.contains('close-toc')) name = 'Fermer le sommaire';
      if (name) b.setAttribute('aria-label', name);
    });
  }

  function run(root) {
    root = root || document;
    fixClickables(root);
    fixExpanders(root);
    fixLabels(root);
    fixIconButtons(root);
  }

  function init() {
    injectCSS();
    run(document);
    if (!window.MutationObserver) return;
    var pending = false;
    new MutationObserver(function (muts) {
      if (pending) return;
      // Seuls les ajouts d'éléments comptent (pas le texte d'un chrono mis à jour chaque seconde)
      for (var i = 0; i < muts.length && !pending; i++) {
        for (var j = 0; j < muts[i].addedNodes.length; j++) {
          var n = muts[i].addedNodes[j];
          if (n.nodeType === 1 && !(n.classList && n.classList.contains('cgt-m-ripple'))) { pending = true; break; }
        }
      }
      if (!pending) return;
      setTimeout(function () { pending = false; run(document); }, 80);
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
