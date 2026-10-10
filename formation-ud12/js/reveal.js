/**
 * Révélation pas à pas des slides, comme un diaporama.
 *
 * En arrivant sur une séquence, seuls le titre, l'horaire et l'objectif sont
 * visibles : les contenus sont remplacés par des cadres vides. Chaque appui sur
 * « Suivant », → , Espace ou Page suivante (télécommande) révèle l'élément
 * suivant ; un clic sur un cadre le révèle directement. Quand tout est affiché,
 * « Suivant » passe à la séquence suivante. « Précédent » masque le dernier
 * élément révélé, puis revient à la séquence précédente (affichée en entier).
 *
 * Le bouton « Pas à pas » de la barre du bas désactive le mode (préparation,
 * relecture) ; le choix est mémorisé.
 */
(function () {
  'use strict';

  var KEY = 'cgt_reveal';
  // Conteneurs dont chaque enfant est une étape
  var GROUPS = '.info-grid, .criteres, .chiffres, .branches, .programme, .orga-side';
  var steps = {};    // index de slide -> [éléments]
  var shown = {};    // index de slide -> pile des éléments révélés

  var enabled = true;
  try { enabled = localStorage.getItem(KEY) !== 'off'; } catch (e) {}

  function slideEl(i) { return document.querySelectorAll('.slide')[i]; }

  /* ── Repérage des étapes ─────────────────────────────────── */
  function collect(el, out) {
    if (el.matches(GROUPS)) {
      Array.prototype.forEach.call(el.children, function (c) { out.push(c); });
    } else if (el.querySelector(GROUPS)) {
      Array.prototype.forEach.call(el.children, function (c) { collect(c, out); });
    } else if (!/^H[1-6]$/.test(el.tagName)) {
      out.push(el); // les titres de bloc restent visibles
    }
  }

  function getSteps(i) {
    if (steps[i]) return steps[i];
    var out = [];
    var s = slideEl(i);
    var card = s && s.querySelector('.card');
    var obj = card && card.querySelector(':scope > .objectif');
    if (obj) {
      for (var el = obj.nextElementSibling; el; el = el.nextElementSibling) {
        if (el.matches('.time-control, .rv-hint, script')) continue;
        collect(el, out);
      }
    }
    out.forEach(function (el) {
      el.classList.add('rv-step');
      el.addEventListener('click', function (e) {
        if (!enabled || el.classList.contains('rv-in')) return;
        e.preventDefault();
        e.stopPropagation();
        show(i, el);
      }, true);
    });
    steps[i] = out;
    shown[i] = [];
    if (out.length) addHint(i, card);
    return out;
  }

  /* ── Bandeau d'aide sous les contenus ────────────────────── */
  function addHint(i, card) {
    var hint = document.createElement('div');
    hint.className = 'rv-hint';
    hint.innerHTML = '<button type="button" class="rv-next">▶ Révéler la suite</button>'
      + '<span class="rv-count" aria-live="polite"></span>'
      + '<button type="button" class="rv-all">Tout afficher</button>';
    hint.querySelector('.rv-next').addEventListener('click', function () { revealNext(i); });
    hint.querySelector('.rv-all').addEventListener('click', function () { revealAll(i); });
    var tc = card.querySelector('.time-control');
    card.insertBefore(hint, tc || null);
  }

  /* ── États ───────────────────────────────────────────────── */
  function show(i, el, scroll) {
    if (el.classList.contains('rv-in')) return;
    el.classList.add('rv-in');
    shown[i].push(el);
    if (scroll !== false && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    refresh(i);
  }

  function revealNext(i) {
    var list = getSteps(i);
    for (var k = 0; k < list.length; k++) {
      if (!list[k].classList.contains('rv-in')) { show(i, list[k]); return true; }
    }
    return false;
  }

  function hideLast(i) {
    getSteps(i);
    var el = shown[i].pop();
    if (!el) return false;
    el.classList.remove('rv-in');
    refresh(i);
    return true;
  }

  function reset(i) {
    getSteps(i).forEach(function (el) { el.classList.remove('rv-in'); });
    shown[i] = [];
    refresh(i);
  }

  function revealAll(i) {
    getSteps(i).forEach(function (el) { if (!el.classList.contains('rv-in')) show(i, el, false); });
    refresh(i);
  }

  function remaining(i) {
    return getSteps(i).filter(function (el) { return !el.classList.contains('rv-in'); }).length;
  }

  function refresh(i) {
    var list = getSteps(i);
    var s = slideEl(i);
    var hint = s && s.querySelector('.rv-hint');
    var left = remaining(i);
    if (hint) {
      hint.classList.toggle('rv-done', left === 0);
      hint.querySelector('.rv-count').textContent = left
        ? (list.length - left) + ' / ' + list.length + ' affiché' + (list.length - left > 1 ? 's' : '')
        : 'Tout est affiché';
    }
    if (typeof current !== 'undefined' && i === current) updateButtons();
  }

  function updateButtons() {
    var nextBtn = document.getElementById('next-btn');
    var prevBtn = document.getElementById('prev-btn');
    var left = enabled ? remaining(current) : 0;
    if (nextBtn) {
      nextBtn.textContent = left ? 'Révéler ▶' : 'Suivant ➡';
      nextBtn.title = left ? 'Afficher l\'élément suivant (' + left + ' restant' + (left > 1 ? 's' : '') + ')' : 'Séquence suivante';
      if (left) { nextBtn.disabled = false; nextBtn.style.opacity = '1'; }
    }
    if (prevBtn && enabled && shown[current] && shown[current].length) {
      prevBtn.disabled = false; prevBtn.style.opacity = '1';
    }
  }

  /* ── Branchement sur la navigation existante ─────────────── */
  var baseShow = window.showSlide;
  var baseNext = window.next;
  var basePrev = window.prev;

  window.showSlide = function (index) {
    baseShow(index);
    reset(current);
  };
  window.next = function () {
    if (enabled && revealNext(current)) return;
    baseNext();
  };
  window.prev = function () {
    if (enabled && hideLast(current)) return;
    var before = current;
    basePrev();
    if (current !== before) revealAll(current);
  };

  // Télécommandes de présentation (Page suivante / Page précédente)
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'PageDown') { window.next(); e.preventDefault(); }
    else if (e.key === 'PageUp') { window.prev(); e.preventDefault(); }
  });

  /* ── Bouton « Pas à pas » ────────────────────────────────── */
  function applyMode() {
    document.body.classList.toggle('rv-on', enabled);
    var b = document.getElementById('reveal-btn');
    if (b) {
      b.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      b.title = enabled
        ? 'Pas à pas activé : les contenus se révèlent un par un. Cliquer pour tout afficher.'
        : 'Pas à pas désactivé : tout est affiché. Cliquer pour révéler les contenus un par un.';
    }
    if (typeof current !== 'undefined') updateButtons();
  }

  var btn = document.getElementById('reveal-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      enabled = !enabled;
      try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (e) {}
      if (enabled) reset(current);
      applyMode();
    });
  }

  // Préparer toutes les slides puis masquer les contenus de la slide affichée
  for (var n = 0; n < document.querySelectorAll('.slide').length; n++) getSteps(n);
  applyMode();
  if (typeof current !== 'undefined') reset(current);
})();
