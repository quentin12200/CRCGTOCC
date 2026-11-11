/* ═══════════════════════════════════════════════════════════════
   CGT Occitanie — Cartes des modules de formation (modules.js)
   Construit les cartes à partir de assets/modules-data.js.
   Toutes les cartes ont la même structure : les 4 rubriques du kit
   (Guide animateur, Support stagiaire, Quiz, Évaluation), avec la
   mention « À venir » quand une ressource n'existe pas encore.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var RUBRIQUES = [
    { cle: 'guide', titre: 'Guide animateur' },
    { cle: 'support', titre: 'Support stagiaire' },
    { cle: 'quiz', titre: 'Quiz' },
    { cle: 'evaluation', titre: 'Évaluation' }
  ];
  var FLECHE = '<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function lien(r) {
    if (!r.href) return '<span class="kit-mention">' + esc(r.t) + '</span>';
    var ext = /^https?:|\.(pdf|docx)$/i.test(r.href);
    return '<a href="' + esc(r.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
      (r.live ? '<span class="kit-live">Live</span> ' : '') + esc(r.t) + '</a>';
  }

  function carte(m) {
    var kit = RUBRIQUES.map(function (rub) {
      var items = (m.kit && m.kit[rub.cle]) || [];
      return '<div class="kit-row' + (items.length ? '' : ' kit-row--vide') + '">' +
        '<dt>' + rub.titre + '</dt>' +
        '<dd>' + (items.length
          ? '<ul>' + items.map(function (r) { return '<li>' + lien(r) + '</li>'; }).join('') + '</ul>'
          : '<span class="kit-avenir">À venir</span>') +
        '</dd></div>';
    }).join('');
    var plus = (m.plus || []).length
      ? '<p class="kit-plus">Voir aussi : ' + m.plus.map(lien).join(' · ') + '</p>' : '';
    return '<article class="card" id="module-' + esc(m.id) + '">' +
      '<div class="card-icon" style="background:' + esc(m.icone.bg) + ';">' + m.icone.svg + '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta">' +
          (m.duree ? '<span class="tag-duree">' + esc(m.duree) + '</span>' : '') +
          '<span class="tag-type">' + esc(m.type) + '</span>' +
          (m.horsligne ? '<span class="tag-horsligne" data-url="' + esc(m.ouvrir.href) + '" title="Le diaporama est enregistré sur cet appareil dès la première visite du site : il reste consultable sans réseau">Hors-ligne après une 1re visite</span>' : '') +
        '</div>' +
        '<h2>' + esc(m.titre) + '</h2>' +
        '<p>' + esc(m.desc) + '</p>' +
        '<dl class="kit" aria-label="Kit du module">' + kit + '</dl>' +
        plus +
        '<a class="btn-ouvrir" href="' + esc(m.ouvrir.href) + '" target="_blank">' + esc(m.ouvrir.label) + ' ' + FLECHE + '</a>' +
      '</div>' +
    '</article>';
  }

  /* Cartes regroupées par famille : .famille[data-section] suivie de sa grille */
  window.CGT_afficherModules = function (conteneur) {
    var html = (window.CGT_FAMILLES || []).map(function (f) {
      var mods = (window.CGT_MODULES || []).filter(function (m) { return m.famille === f.id; });
      if (!mods.length) return '';
      return '<div class="famille" data-section="' + esc(f.id) + '">' +
          '<h3 class="famille-titre famille-titre--' + esc(f.cls) + '">' + esc(f.titre) +
          (f.sous ? ' <small class="famille-sub">' + esc(f.sous) + '</small>' : '') + '</h3>' +
          '<p class="famille-desc">' + esc(f.desc) + '</p>' +
        '</div>' +
        '<div class="modules-grid modules-grid--famille">' + mods.map(carte).join('') + '</div>';
    }).join('');
    conteneur.insertAdjacentHTML('beforebegin', html);
    conteneur.remove();
  };

  /* Indicateur hors-ligne : le service worker dit ce qui est réellement enregistré */
  window.CGT_etatHorsLigne = function () {
    var tags = document.querySelectorAll('.tag-horsligne[data-url]');
    if (!tags.length || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'etat-hors-ligne') return;
      var ok = {};
      e.data.etat.forEach(function (x) { ok[x[0]] = x[1]; });
      tags.forEach(function (t) {
        if (!ok[t.dataset.url]) return;
        t.classList.add('est-dispo');
        t.textContent = 'Disponible hors-ligne';
      });
    });
    navigator.serviceWorker.ready.then(function (reg) {
      var urls = Array.prototype.map.call(tags, function (t) { return t.dataset.url; });
      (navigator.serviceWorker.controller || reg.active).postMessage({ type: 'etat-hors-ligne', urls: urls });
    });
  };

  /* Tableau des manques : ✓ / À venir pour chaque rubrique */
  window.CGT_tableauManques = function (cible) {
    var lignes = (window.CGT_MODULES || []).map(function (m) {
      return '<tr><th scope="row"><a href="#module-' + esc(m.id) + '">' + esc(m.titre) + '</a></th>' +
        RUBRIQUES.map(function (rub) {
          var items = (m.kit && m.kit[rub.cle]) || [];
          if (!items.length) return '<td class="manque">À venir</td>';
          var seulNotes = items.every(function (r) { return !r.href; });
          return '<td class="ok">' + (seulNotes ? 'Notes du diaporama' : '✓ ' + items.length) + '</td>';
        }).join('') + '</tr>';
    }).join('');
    var manques = 0;
    (window.CGT_MODULES || []).forEach(function (m) {
      RUBRIQUES.forEach(function (rub) { if (!((m.kit && m.kit[rub.cle]) || []).length) manques++; });
    });
    cible.innerHTML =
      '<summary>État des kits de formation : ' + manques + ' ressource' + (manques > 1 ? 's' : '') + ' à venir</summary>' +
      '<div class="manques-wrap"><table class="manques"><thead><tr><th scope="col">Module</th>' +
      RUBRIQUES.map(function (r) { return '<th scope="col">' + r.titre + '</th>'; }).join('') +
      '</tr></thead><tbody>' + lignes + '</tbody></table></div>';
  };
})();
