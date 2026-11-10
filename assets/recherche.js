/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Recherche instantanée (recherche.js)
   S'attache aux champs <input data-cgt-recherche>. Cherche dans les
   modules, fiches AT/MP, lexique et tableaux de maladies
   professionnelles (assets/recherche-index.js), au fil de la frappe :
   - accents et majuscules ignorés ;
   - fautes de frappe tolérées (1 lettre sur les mots de 4 à 6 lettres,
     2 au-delà) ;
   - résultats regroupés par catégorie ; flèches, Entrée et Échap.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var PAR_GROUPE = 5;
  var VIDES = { le: 1, la: 1, les: 1, de: 1, du: 1, des: 1, d: 1, l: 1, a: 1, au: 1, aux: 1, et: 1, en: 1, un: 1, une: 1, pour: 1, par: 1, sur: 1, que: 1, qui: 1, ou: 1, est: 1, mon: 1, ma: 1, mes: 1 };
  // Mots du langage courant → termes des tableaux et des textes
  var SYNONYMES = {
    lombalgie: 'lombaire rachis', lombalgies: 'lombaire rachis', dos: 'rachis lombaire', hernie: 'sciatique rachis',
    burnout: 'psychique epuisement', 'burn': 'psychique epuisement', depression: 'psychique', stress: 'psychosociaux',
    canal: 'carpien', tms: 'periarticulaires', tendinite: 'tendinopathie', surdite: 'auditive', bruit: 'auditive',
    poussiere: 'silice', eternit: 'amiante', ft: 'fonction publique', fonctionnaire: 'fonction publique',
    licenciement: 'inaptitude', arret: 'indemnites journalieres', ij: 'indemnites journalieres', duerp: 'duer',
    fie: 'faute inexcusable', cmra: 'commission medicale recours amiable', cra: 'commission recours amiable'
  };
  var index = null, chargement = null;

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[œ]/g, 'oe').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Distance de Damerau-Levenshtein bornée (arrêt dès que max est dépassé)
  function distance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) {
      var minLigne = Infinity;
      for (j = 1; j <= b.length; j++) {
        var cout = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cout);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        if (d[i][j] < minLigne) minLigne = d[i][j];
      }
      if (minLigne > max) return max + 1;
    }
    return d[a.length][b.length];
  }

  function preparer(liste) {
    return liste.map(function (e) {
      var titre = norm(e.t), tout = norm([e.t, e.k, e.d].join(' '));
      var mots = {};
      tout.split(' ').forEach(function (m) { if (m.length > 1) mots[m] = 1; });
      return { e: e, titre: ' ' + titre + ' ', tout: ' ' + tout + ' ', mots: Object.keys(mots) };
    });
  }

  function scoreExact(x, q) {
    if (x.titre.indexOf(' ' + q) !== -1) return 10;
    if (x.titre.indexOf(q) !== -1) return 7;
    if (x.tout.indexOf(' ' + q) !== -1) return 5;
    if (q.length >= 4 && x.tout.indexOf(q) !== -1) return 3;
    return 0;
  }
  function scoreMot(x, q) {
    var s = scoreExact(x, q);
    if (s) return s;
    // Synonyme du langage courant (« lombalgie » → « lombaire »)
    if (SYNONYMES[q]) {
      var syn = SYNONYMES[q].split(' '), best = 0;
      syn.forEach(function (m) { best = Math.max(best, scoreExact(x, m)); });
      if (best) return best - 1;
    }
    // Faute de frappe : 1 lettre (mots de 4 à 6 lettres), 2 au-delà ; mieux noté si c'est dans le titre
    var max = q.length >= 7 ? 2 : q.length >= 4 ? 1 : 0;
    if (!max) return 0;
    var meilleur = 0;
    for (var i = 0; i < x.mots.length && meilleur < 4; i++) {
      var m = x.mots[i], ok = 0;
      if (distance(q, m, max) <= max) ok = 2;
      // Mot en cours de frappe : on compare au début du mot
      else if (m.length > q.length && distance(q, m.slice(0, q.length), max) <= max) ok = 1.5;
      if (ok && x.titre.indexOf(' ' + m) !== -1) ok += 2;
      if (ok > meilleur) meilleur = ok;
    }
    return meilleur;
  }

  function chercher(requete) {
    var expr = ' ' + norm(requete) + ' ';
    // Expressions courantes ramenées à un mot
    expr = expr.replace(/ burn out /g, ' burnout ').replace(/ mal (au|de) dos /g, ' lombalgie ').replace(/ troubles? musculo squelettiques? /g, ' tms ');
    var mots = expr.trim().split(' ').filter(function (m) { return m && !VIDES[m] && (m.length > 1 || /\d/.test(m)); });
    if (!mots.length) return [];
    var res = [], exigence = mots.length;
    for (var essai = 0; essai < 2 && !res.length; essai++) {
      index.forEach(function (x) {
        var total = 0, trouves = 0;
        mots.forEach(function (q) { var s = scoreMot(x, q); if (s) { total += s; trouves++; } });
        if (trouves >= exigence) res.push({ x: x, s: total + (trouves === mots.length ? 5 : 0) });
      });
      exigence = Math.max(1, Math.ceil(mots.length / 2)); // 2e essai : au moins la moitié des mots
    }
    return res.sort(function (a, b) { return b.s - a.s; });
  }

  function charger(src) {
    if (index) return Promise.resolve();
    if (chargement) return chargement;
    chargement = new Promise(function (ok) {
      if (window.CGT_RECHERCHE) { index = preparer(window.CGT_RECHERCHE); return ok(); }
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { index = preparer(window.CGT_RECHERCHE || []); ok(); };
      s.onerror = function () { index = []; ok(); };
      document.head.appendChild(s);
    });
    return chargement;
  }

  var compteur = 0;
  function brancher(input) {
    if (input.dataset.cgtRechercheOk) return;
    input.dataset.cgtRechercheOk = '1';
    var id = 'cgt-rech-' + (++compteur);
    var hote = input.closest('form') || input.parentNode;
    if (getComputedStyle(hote).position === 'static') hote.style.position = 'relative';
    var boite = document.createElement('div');
    boite.className = 'cgt-rech';
    boite.id = id;
    boite.setAttribute('role', 'listbox');
    boite.setAttribute('aria-label', 'Résultats de recherche');
    boite.hidden = true;
    var statut = document.createElement('div');
    statut.className = 'cgt-rech-statut';
    statut.setAttribute('role', 'status');
    hote.appendChild(boite);
    hote.appendChild(statut);
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', id);
    input.setAttribute('aria-expanded', 'false');
    var src = (document.querySelector('script[src*="recherche.js"]') || {}).src;
    src = src ? src.replace('recherche.js', 'recherche-index.js') : '/assets/recherche-index.js';
    var actif = -1, options = [], minuteur = null;

    function fermer() { boite.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); actif = -1; }
    function choisir(i) {
      options.forEach(function (o, j) { o.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
      actif = i;
      if (i >= 0) { input.setAttribute('aria-activedescendant', options[i].id); options[i].scrollIntoView({ block: 'nearest' }); }
    }

    function afficher() {
      var q = input.value.trim();
      if (q.length < 2) { fermer(); statut.textContent = ''; return; }
      charger(src).then(function () {
        if (input.value.trim() !== q) return;
        var res = chercher(q);
        // Groupes dans l'ordre de leur meilleur résultat
        var groupes = {}, ordre = [];
        res.forEach(function (r) {
          if (!groupes[r.x.e.c]) { groupes[r.x.e.c] = []; ordre.push(r.x.e.c); }
          groupes[r.x.e.c].push(r.x.e);
        });
        var n = 0, html = '';
        ordre.forEach(function (c) {
          var g = groupes[c];
          if (!g) return;
          html += '<div class="cgt-rech-groupe" role="group" aria-label="' + esc(c) + '"><div class="cgt-rech-cat" aria-hidden="true">' + esc(c) +
            ' <span>' + g.length + '</span></div>';
          g.slice(0, PAR_GROUPE).forEach(function (e) {
            html += '<a class="cgt-rech-opt" role="option" id="' + id + '-o' + (n++) + '" href="' + esc(e.u) + '" aria-selected="false">' +
              '<strong>' + esc(e.t) + '</strong><small>' + esc(e.d) + '</small></a>';
          });
          html += '</div>';
        });
        html += '<a class="cgt-rech-tout" href="/recherche.html?q=' + encodeURIComponent(q) + '">' +
          (res.length ? 'Voir tous les résultats (' + res.length + ')' : 'Aucun résultat instantané — lancer la recherche complète') + ' →</a>';
        boite.innerHTML = html;
        options = Array.prototype.slice.call(boite.querySelectorAll('.cgt-rech-opt'));
        boite.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        actif = -1;
        statut.textContent = res.length ? res.length + ' résultat' + (res.length > 1 ? 's' : '') + '. Flèches pour parcourir.' : 'Aucun résultat.';
      });
    }

    input.addEventListener('input', function () { clearTimeout(minuteur); minuteur = setTimeout(afficher, 90); });
    input.addEventListener('focus', function () { charger(src); if (input.value.trim().length >= 2) afficher(); });
    input.addEventListener('keydown', function (e) {
      if (boite.hidden) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); choisir(Math.min(actif + 1, options.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); choisir(Math.max(actif - 1, -1)); }
      else if (e.key === 'Escape') { fermer(); }
      else if (e.key === 'Enter' && actif >= 0) { e.preventDefault(); location.href = options[actif].href; }
    });
    document.addEventListener('click', function (e) { if (!hote.contains(e.target)) fermer(); });
  }

  function css() {
    var st = document.createElement('style');
    st.textContent =
      '.cgt-rech{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:9500;max-height:min(70vh,520px);overflow:auto;' +
      'background:#fff;color:#1A2540;border:1px solid #D8DEE8;box-shadow:0 12px 32px rgba(0,0,0,.25);text-align:left}' +
      '.cgt-rech-cat{position:sticky;top:0;background:#F4F6FA;font:700 .66rem/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#4A5568;padding:.55rem .9rem}' +
      '.cgt-rech-cat span{float:right;font-weight:600}' +
      '.cgt-rech-opt{display:block;padding:.55rem .9rem;text-decoration:none;color:inherit;border-top:1px solid #EEF2F8}' +
      '.cgt-rech-opt strong{display:block;font-size:.86rem;color:#1A2540}' +
      '.cgt-rech-opt small{display:block;font-size:.74rem;color:#4A5568;line-height:1.4;margin-top:.15rem}' +
      '.cgt-rech-opt:hover,.cgt-rech-opt[aria-selected="true"]{background:#E8F0FB}' +
      '.cgt-rech-opt[aria-selected="true"]{outline:2px solid #1A5FAD;outline-offset:-2px}' +
      '.cgt-rech-tout{display:block;padding:.7rem .9rem;font-weight:700;font-size:.8rem;color:#1A5FAD;background:#F4F6FA;text-decoration:none;border-top:1px solid #D8DEE8}' +
      '.cgt-rech-statut{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}';
    document.head.appendChild(st);
  }

  // Exposé pour les tests et pour la page de recherche complète
  window.CGT_chercher = function (q, liste) { if (liste) index = preparer(liste); return chercher(q).map(function (r) { return r.x.e; }); };

  function init() {
    var champs = document.querySelectorAll('input[data-cgt-recherche]');
    if (!champs.length) return;
    css();
    Array.prototype.forEach.call(champs, brancher);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
