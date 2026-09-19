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
      'position:fixed;bottom:0;left:0;right:0;z-index:9000;}',
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
      '<div class="ticker-label">CGT 2026</div>',
      '<div class="ticker-track">',
      '  <div class="ticker-inner">' + items + '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(el);
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

  /* ── 6. Raccourcis clavier globaux ─────────────────────── */
  function initKeyboard() {
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1) return;
    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var d = (path.match(/\//g) || []).length - 1;
      var base = d > 0 ? Array(d).fill('..').join('/') : '.';
      switch (e.key.toLowerCase()) {
        case 'h': window.location.href = base + '/index.html'; break;
        case 'g': window.location.href = base + '/recherche.html'; break;
        case 'escape': var t = document.getElementById('cgt-kb-tip'); if (t) t.remove(); break;
        case '?': showKbHelp(base); break;
      }
    });
  }

  function showKbHelp() {
    if (document.getElementById('cgt-kb-tip')) return;
    var el = document.createElement('div');
    el.id = 'cgt-kb-tip';
    el.style.cssText = 'position:fixed;bottom:40px;right:16px;z-index:9500;background:#1A1A1A;border:1px solid #333;border-radius:10px;padding:1rem 1.25rem;font-family:"Inter",sans-serif;font-size:.82rem;color:#FAFAFA;box-shadow:0 8px 32px rgba(0,0,0,.6)';
    el.innerHTML = '<div style="font-family:Anton,sans-serif;color:#FFD200;margin-bottom:.6rem">RACCOURCIS</div>' +
      [['H','Accueil'],['G','Recherche'],['?','Cette aide'],['Esc','Fermer']].map(function(k){
        return '<div style="display:flex;gap:.6rem;align-items:center;margin:.25rem 0">' +
          '<kbd style="background:#333;border:1px solid #555;border-radius:4px;padding:.1em .4em;font-family:monospace;color:#FFD200">' + k[0] + '</kbd>' +
          '<span style="color:#999">' + k[1] + '</span></div>';
      }).join('');
    el.addEventListener('click', function(){ el.remove(); });
    document.body.appendChild(el);
    setTimeout(function(){ if(el.parentNode) el.remove(); }, 5000);
  }

  /* ── 7. Breadcrumb ──────────────────────────────────────── */
  function injectBreadcrumb() {
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1 || path.indexOf('login') !== -1) return;
    var parts = path.split('/').filter(Boolean);
    if (parts.length < 2) return;
    var depth = parts.length;
    var base = Array(depth).fill('..').join('/');
    var crumbs = [{ label: 'Accueil', href: base + '/index.html' }];
    if (parts[0] === 'fiches-memo') crumbs.push({ label: 'Fiches mémo', href: base + '/fiches-memo/index.html' });
    if (parts[0] === 'quiz') crumbs.push({ label: 'Quiz', href: base + '/quiz/index.html' });
    var style = document.createElement('style');
    style.textContent = '.cgt-breadcrumb{padding:.4rem 1.5rem;font-size:.78rem;font-family:"Inter",sans-serif;color:#666;border-bottom:1px solid #1A1A1A;background:#0F0F0F}.cgt-breadcrumb a{color:#666;text-decoration:none;transition:color .15s}.cgt-breadcrumb a:hover{color:#FFD200}.cgt-breadcrumb span{margin:0 .35rem;opacity:.4}@media print{.cgt-breadcrumb{display:none}}';
    document.head.appendChild(style);
    var html = crumbs.map(function(c){ return '<a href="'+c.href+'">'+c.label+'</a><span>›</span>'; }).join('') +
      '<span style="color:#999">' + document.title.split('·')[0].trim() + '</span>';
    var el = document.createElement('nav');
    el.className = 'cgt-breadcrumb';
    el.innerHTML = html;
    var ref = document.body.children[1];
    document.body.insertBefore(el, ref || null);
  }

  /* ── 8. Badge "Mis à jour" ──────────────────────────────── */
  function initUpdateBadges() {
    var MODS = {
      '/index.html':{'key':'idx','date':'2026-09-19'},
      '/stagiaires.html':{'key':'sta','date':'2026-09-19'},
      '/carnet-atmp.html':{'key':'crnt','date':'2026-09-19'},
      '/lexique.html':{'key':'lex','date':'2026-09-01'},
      '/faq-atmp.html':{'key':'faq','date':'2026-09-01'},
    };
    var visited = {};
    try { visited = JSON.parse(localStorage.getItem('cgt_last_visit') || '{}'); } catch(e) {}
    document.querySelectorAll('a[href]').forEach(function(a) {
      var mod = MODS[a.getAttribute('href')];
      if (!mod || (visited[mod.key] && visited[mod.key] >= mod.date)) return;
      var b = document.createElement('span');
      b.style.cssText = 'display:inline-block;margin-left:.35rem;background:#E2001A;color:#fff;font-size:.6rem;font-weight:700;font-family:"Inter",sans-serif;padding:.1em .4em;border-radius:3px;vertical-align:middle;letter-spacing:.5px;text-transform:uppercase';
      b.textContent = 'MÀJ';
      a.appendChild(b);
    });
    var cur = MODS[window.location.pathname];
    if (cur) {
      visited[cur.key] = new Date().toISOString().slice(0,10);
      try { localStorage.setItem('cgt_last_visit', JSON.stringify(visited)); } catch(e) {}
    }
  }

  /* ── Init ──────────────────────────────────────────────── */
  injectLoader();

  document.addEventListener('DOMContentLoaded', function () {
    injectIcons();
    injectTicker();
    injectFooter();
    initReveal();
    initKeyboard();
    injectBreadcrumb();
    initUpdateBadges();
  });

  /* ── 9. Glossaire interactif ────────────────────────────── */
  var GLOSSAIRE = {
    'IPP': 'Incapacité Permanente Partielle — séquelles évaluées par la CPAM après consolidation. Taux ≥ 10% = rente viagère.',
    'IJ': 'Indemnités Journalières — versées par la CPAM en cas d\'arrêt AT. Taux : 60% du salaire journalier de base (80% à partir du 29e jour).',
    'DUER': 'Document Unique d\'Évaluation des Risques — obligatoire dans toute entreprise. Doit être mis à jour chaque année et à chaque changement.',
    'TMS': 'Troubles Musculo-Squelettiques — 1ère cause de maladie professionnelle reconnue en France.',
    'CPAM': 'Caisse Primaire d\'Assurance Maladie — instruit les dossiers AT/MP, verse les IJ et rentes.',
    'CARSAT': 'Caisse d\'Assurance Retraite et de la Santé Au Travail — prévention, tarification AT/MP, retraite.',
    'RQTH': 'Reconnaissance de la Qualité de Travailleur Handicapé — ouvre droit aux aides Agefiph et aménagements de poste.',
    'PASS': 'Plafond Annuel de la Sécurité Sociale — référence de calcul (46 368 € en 2026).',
    'CMI': 'Certificat Médical Initial — document clé lors d\'un AT. Doit décrire toutes les lésions avec précision.',
    'CSSCT': 'Commission Santé Sécurité et Conditions de Travail — émanation du CSE pour les entreprises ≥ 300 salariés.',
    'CSE': 'Comité Social et Économique — instance représentative du personnel. Peut mener des enquêtes AT.',
    'ATI': 'Allocation Temporaire d\'Invalidité — rente versée aux fonctionnaires titulaires victimes d\'AT de service avec séquelles.',
    'CAS': 'Congé pour Accident de Service — équivalent du congé AT pour les fonctionnaires. Maintien du salaire à 100%.',
    'CLM': 'Congé Longue Maladie — pour les fonctionnaires, 3 ans max avec maintien du traitement progressif.',
    'AT': 'Accident du Travail — accident survenu par le fait ou à l\'occasion du travail. Présomption d\'imputabilité.',
    'MP': 'Maladie Professionnelle — maladie causée par l\'exposition professionnelle, reconnue par tableau ou hors tableau.',
  };

  function initGlossaire() {
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1 || path.indexOf('login') !== -1) return;

    var style = document.createElement('style');
    style.textContent = [
      '.cgt-gloss{border-bottom:1px dashed #E2001A;cursor:help;position:relative}',
      '.cgt-gloss-tip{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);',
      'z-index:8000;background:#1A1A1A;border:1px solid #333;border-radius:8px;',
      'padding:.65rem .9rem;font-family:"Inter",sans-serif;font-size:.78rem;',
      'color:#FAFAFA;width:240px;line-height:1.5;pointer-events:none;',
      'box-shadow:0 6px 24px rgba(0,0,0,.6);',
      'animation:fadeUp .15s ease both}',
      '.cgt-gloss-tip::after{content:"";position:absolute;top:100%;left:50%;',
      'transform:translateX(-50%);border:5px solid transparent;border-top-color:#333}'
    ].join('');
    document.head.appendChild(style);

    var terms = Object.keys(GLOSSAIRE);
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.tagName || '';
        if (['SCRIPT','STYLE','A','MARK','KBD'].indexOf(tag) !== -1) return NodeFilter.FILTER_REJECT;
        if (p.classList && (p.classList.contains('cgt-gloss') || p.classList.contains('ticker-inner'))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);

    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function(node) {
      var text = node.nodeValue;
      var found = false;
      terms.forEach(function(term) {
        if (!found && new RegExp('\\b' + term + '\\b').test(text)) found = true;
      });
      if (!found) return;

      var html = text;
      var replaced = {};
      terms.forEach(function(term) {
        if (replaced[term]) return;
        var re = new RegExp('\\b(' + term + ')\\b', 'g');
        if (re.test(html)) {
          replaced[term] = true;
          html = html.replace(new RegExp('\\b(' + term + ')\\b', 'g'), function(m) {
            return '<span class="cgt-gloss" data-term="' + term + '">' + m + '</span>';
          });
        }
      });
      if (html === text) return;
      var span = document.createElement('span');
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    });

    document.body.addEventListener('mouseover', function(e) {
      var t = e.target.closest('.cgt-gloss');
      if (!t || document.querySelector('.cgt-gloss-tip')) return;
      var tip = document.createElement('div');
      tip.className = 'cgt-gloss-tip';
      tip.textContent = GLOSSAIRE[t.dataset.term] || '';
      t.appendChild(tip);
    });
    document.body.addEventListener('mouseout', function(e) {
      var t = e.target.closest('.cgt-gloss');
      if (!t) return;
      var tip = t.querySelector('.cgt-gloss-tip');
      if (tip) tip.remove();
    });
  }

  /* ── 10. Question du jour (espace stagiaire) ────────────── */
  function injectQuestionDuJour() {
    if (window.location.pathname.indexOf('stagiaires') === -1) return;
    var QUESTIONS = [
      {q:'Quel délai pour déclarer un AT à l\'employeur ?',r:['24 heures','48 heures','5 jours','8 jours'],a:0,exp:'Le salarié doit informer l\'employeur dans les 24h (sauf cas de force majeure).'},
      {q:'Combien de morts par AT en France en 2025 ?',r:['700','1 331','2 000','500'],a:1,exp:'1 331 décès par accident du travail selon les données Assurance Maladie / CGT 2026.'},
      {q:'Le taux d\'IPP minimum pour bénéficier d\'une rente est de :',r:['5%','10%','15%','20%'],a:1,exp:'Une rente AT est attribuée si l\'IPP est évaluée à 10% ou plus.'},
      {q:'Le droit de retrait s\'exerce en cas de :',r:['Fatigue excessive','Désaccord avec le chef','Danger grave et imminent','Maladie'],a:2,exp:'Le droit de retrait est réservé aux situations de danger grave et imminent pour la vie ou la santé.'},
      {q:'L\'obligation de sécurité de l\'employeur est :',r:['De moyens','De résultat','Morale','Déclarative'],a:1,exp:'L\'employeur est tenu à une obligation de résultat en matière de sécurité (jurisprudence constante).'},
      {q:'Les IJ AT représentent quel % du salaire journalier de base ?',r:['60% puis 80%','50% puis 75%','100% dès le 1er jour','80% dès le 1er jour'],a:0,exp:'60% du salaire journalier de base pour les 28 premiers jours, puis 80% à partir du 29e jour.'},
      {q:'Le DUER doit être mis à jour au minimum :',r:['Tous les 3 ans','Chaque année','Tous les 5 ans','À chaque AT seulement'],a:1,exp:'Le Document Unique d\'Évaluation des Risques doit être mis à jour chaque année et à chaque changement.'},
      {q:'RQTH signifie :',r:['Registre Qualifié Travail Handicap','Reconnaissance de la Qualité de Travailleur Handicapé','Règlement Qualité Travail Hygiène','Réseau Qualité Travail Humain'],a:1,exp:'La RQTH est délivrée par la MDPH et ouvre droit aux aides Agefiph et aménagements de poste.'},
      {q:'Le taux d\'emploi obligatoire de travailleurs handicapés est de :',r:['4%','6%','8%','10%'],a:1,exp:'Toute entreprise de 20 salariés et plus doit employer au moins 6% de travailleurs handicapés.'},
      {q:'Les IJ journalières AT représentent combien en 2025 ?',r:['2,1 Md€','3,8 Md€','5,4 Md€','7,2 Md€'],a:2,exp:'5,4 milliards d\'euros d\'indemnités journalières AT versés en 2025, en hausse de +10,5%.'},
    ];

    var today = new Date().getDay(); // 0-6
    var idx = (new Date().getDate() + new Date().getMonth() * 31) % QUESTIONS.length;
    var q = QUESTIONS[idx];

    var style = document.createElement('style');
    style.textContent = [
      '.qdj{background:#1A1A1A;border:1px solid #2C2C2C;border-radius:12px;',
      'padding:1.5rem;margin:1.5rem 0;font-family:"Inter",sans-serif}',
      '.qdj-label{font-size:.72rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase;',
      'color:#FFD200;margin-bottom:.75rem}',
      '.qdj-q{font-size:1rem;font-weight:600;color:#FAFAFA;margin-bottom:1rem;line-height:1.4}',
      '.qdj-choices{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}',
      '@media(max-width:480px){.qdj-choices{grid-template-columns:1fr}}',
      '.qdj-btn{background:#111;border:1px solid #333;border-radius:6px;',
      'padding:.6rem .9rem;color:#FAFAFA;font-size:.85rem;cursor:pointer;',
      'text-align:left;transition:border-color .15s,background .15s}',
      '.qdj-btn:hover{border-color:#E2001A;background:#1F1F1F}',
      '.qdj-btn.correct{border-color:#2D7A2D;background:#0D1F0D;color:#7FD47F}',
      '.qdj-btn.wrong{border-color:#7A2020;background:#1F0D0D;color:#D47F7F}',
      '.qdj-exp{margin-top:.75rem;font-size:.82rem;color:#999;line-height:1.5;display:none}',
      '.qdj-exp.show{display:block}'
    ].join('');
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.className = 'qdj';
    el.innerHTML = '<div class="qdj-label">⚡ Question du jour</div>' +
      '<div class="qdj-q">' + q.q + '</div>' +
      '<div class="qdj-choices">' +
      q.r.map(function(r, i) {
        return '<button class="qdj-btn" data-i="' + i + '">' + r + '</button>';
      }).join('') +
      '</div>' +
      '<div class="qdj-exp" id="qdj-exp"></div>';

    el.addEventListener('click', function(e) {
      var btn = e.target.closest('.qdj-btn');
      if (!btn || btn.disabled) return;
      var i = parseInt(btn.dataset.i);
      el.querySelectorAll('.qdj-btn').forEach(function(b, bi) {
        b.disabled = true;
        if (bi === q.a) b.classList.add('correct');
        else if (bi === i) b.classList.add('wrong');
      });
      var exp = el.querySelector('#qdj-exp');
      exp.textContent = (i === q.a ? '✓ Correct ! ' : '✗ Incorrect. ') + q.exp;
      exp.classList.add('show');
    });

    // Insérer avant le footer ou à la fin du main
    var main = document.querySelector('main') || document.querySelector('.modules-grid') || document.querySelector('.content');
    var target = main ? main.parentNode : document.body;
    var ref = main ? main.nextSibling : document.querySelector('.cgt-footer');
    if (main) {
      main.appendChild(el);
    } else {
      target.insertBefore(el, ref);
    }
  }

  /* ── 11. Toggle thème sombre/clair ─────────────────────── */
  (function() {
    var saved = localStorage.getItem('cgt_theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else if (saved === 'light') document.documentElement.setAttribute('data-theme','light');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.setAttribute('data-theme','light');
  })();

  function injectDarkToggle() {
    var path = window.location.pathname;
    if (path.indexOf('/presentations/') !== -1 || path.indexOf('login') !== -1) return;

    var style = document.createElement('style');
    style.textContent = [
      '.cgt-theme-btn{position:fixed;bottom:40px;right:12px;z-index:9100;',
      'width:38px;height:38px;border-radius:50%;',
      'background:rgba(20,20,20,.9);border:1px solid #444;',
      'cursor:pointer;display:flex;align-items:center;justify-content:center;',
      'transition:background .15s,border-color .15s;box-shadow:0 2px 10px rgba(0,0,0,.5)}',
      '[data-theme="light"] .cgt-theme-btn{background:rgba(240,240,240,.95);border-color:#bbb;box-shadow:0 2px 10px rgba(0,0,0,.15)}',
      '.cgt-theme-btn:hover{background:#E2001A !important;border-color:#E2001A !important}',
      '.cgt-theme-btn svg{pointer-events:none}',
      '@media print{.cgt-theme-btn{display:none}}'
    ].join('');
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.className = 'cgt-theme-btn';
    btn.setAttribute('aria-label', 'Basculer thème sombre/clair');
    btn.setAttribute('title', 'Basculer thème sombre/clair');

    function updateIcon() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark
        ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFD200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    updateIcon();

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cgt_theme', next);
      updateIcon();
    });

    document.body.appendChild(btn);
  }

  /* ── Init ──────────────────────────────────────────────── */
  injectLoader();

  document.addEventListener('DOMContentLoaded', function () {
    injectIcons();
    injectTicker();
    injectFooter();
    initReveal();
    initKeyboard();
    injectBreadcrumb();
    initUpdateBadges();
    initGlossaire();
    injectQuestionDuJour();
    injectDarkToggle();
  });

  if ('serviceWorker' in navigator) {
    var _d = (window.location.pathname.match(/\//g) || []).length - 1;
    var _sw = _d > 0 ? Array(_d).fill('..').join('/') + '/sw.js' : '/sw.js';
    navigator.serviceWorker.register(_sw).catch(function(){});
  }

})();
