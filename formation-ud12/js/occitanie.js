/**
 * Formation vie syndicale — intégration au site CGT Occitanie
 * - lien retour vers l'espace formateurs dans l'en-tête
 * - pied de page commun
 * - thème clair/sombre partagé avec le reste du site (clé cgt_theme)
 */
(function () {
  'use strict';

  function init() {
    var header = document.querySelector('body > header');
    if (header && !header.querySelector('.oc-back')) {
      var back = document.createElement('a');
      back.className = 'oc-back';
      back.href = '/index.html';
      back.title = 'Retour à l\'espace formateurs CGT Occitanie';
      back.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M10 6H2M2 6L5.5 2.5M2 6L5.5 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Espace formateurs';
      var toggle = header.querySelector('.theme-switch-wrapper, .theme-toggle');
      header.insertBefore(back, toggle || null);
    }

    if (!document.querySelector('.oc-footer')) {
      var footer = document.createElement('footer');
      footer.className = 'oc-footer';
      footer.innerHTML = '<strong>CGT</strong> Formation vie syndicale — Union Départementale de l\'Aveyron'
        + '&nbsp;·&nbsp;<a href="/index.html">Espace formateurs CGT Occitanie →</a>';
      document.body.appendChild(footer);
    }

    var switches = document.querySelectorAll('header input[type="checkbox"]');
    Array.prototype.forEach.call(switches, function (sw) {
      sw.addEventListener('change', function () {
        var t = sw.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', t);
        try { localStorage.setItem('cgt_theme', t); } catch (e) {}
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
