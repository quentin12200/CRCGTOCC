/**
 * Boîte à outils d'animation — Formation vie syndicale (UD CGT Aveyron)
 *  - Minuteur (préréglages, plein écran, signal sonore, pastille flottante)
 *  - Tirage au sort d'un·e stagiaire et constitution de groupes
 *  - Quiz live / quiz solo / évaluation avec QR codes à projeter
 * Ouverture : bouton « Outils » de la barre basse, boutons ⏱ de chaque séquence,
 * ou touche « O ».
 */
(function () {
  'use strict';

  var NAMES_KEY = 'ud12_stagiaires';
  var origin = location.origin;
  var LINKS = {
    quizLive: '/quiz-live-host.html?set=vie-syndicale',
    quizSolo: origin + '/quiz/quiz-vie-syndicale.html',
    evalForm: origin + '/evaluation-formation.html?f=vie-syndicale',
    evalRes:  '/evaluation-resultats.html?f=vie-syndicale'
  };

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Construction du panneau ─────────────────────────────── */
  var html = ''
    + '<div class="ot-modal" id="ot-modal" role="dialog" aria-modal="true" aria-labelledby="ot-title" hidden>'
    + ' <div class="ot-box">'
    + '  <div class="ot-head">'
    + '   <h2 id="ot-title">Outils d\'animation</h2>'
    + '   <button class="ot-close" type="button" aria-label="Fermer" data-ot-close>&times;</button>'
    + '  </div>'
    + '  <div class="ot-tabs" role="tablist">'
    + '   <button type="button" role="tab" data-tab="timer" class="active">⏱ Minuteur</button>'
    + '   <button type="button" role="tab" data-tab="draw">🎲 Tirage &amp; groupes</button>'
    + '   <button type="button" role="tab" data-tab="quiz">📱 Quiz &amp; évaluation</button>'
    + '  </div>'

    /* Minuteur */
    + '  <section class="ot-panel active" data-panel="timer">'
    + '   <div class="ot-presets">'
    + '    <button type="button" data-min="1">1 min</button><button type="button" data-min="3">3 min</button>'
    + '    <button type="button" data-min="5">5 min</button><button type="button" data-min="10">10 min</button>'
    + '    <button type="button" data-min="15">15 min</button><button type="button" data-min="20">20 min</button>'
    + '    <span class="ot-custom"><input type="number" id="ot-custom-min" min="1" max="180" placeholder="min" aria-label="Durée personnalisée en minutes"><button type="button" id="ot-custom-go">OK</button></span>'
    + '   </div>'
    + '   <div class="ot-timer" id="ot-timer-display">05:00</div>'
    + '   <div class="ot-timer-bar"><div id="ot-timer-fill"></div></div>'
    + '   <input type="text" class="ot-timer-label" id="ot-timer-label" placeholder="Consigne affichée (ex : travail en binôme)" aria-label="Consigne">'
    + '   <div class="ot-actions">'
    + '    <button type="button" class="ot-primary" id="ot-start">Démarrer</button>'
    + '    <button type="button" id="ot-reset">Réinitialiser</button>'
    + '    <button type="button" id="ot-plus">+1 min</button>'
    + '    <button type="button" id="ot-full">Plein écran</button>'
    + '   </div>'
    + '  </section>'

    /* Tirage au sort */
    + '  <section class="ot-panel" data-panel="draw">'
    + '   <label class="ot-label" for="ot-names">Prénoms des stagiaires (un par ligne) — mémorisés sur cet appareil</label>'
    + '   <textarea id="ot-names" rows="6" placeholder="Camille&#10;Karim&#10;Nadia&#10;…"></textarea>'
    + '   <div class="ot-actions">'
    + '    <button type="button" class="ot-primary" id="ot-pick">Tirer un nom</button>'
    + '    <label class="ot-inline">Groupes de <input type="number" id="ot-group-size" min="2" max="10" value="3"> personnes</label>'
    + '    <button type="button" id="ot-groups">Former les groupes</button>'
    + '   </div>'
    + '   <div class="ot-draw-result" id="ot-draw-result" aria-live="polite"></div>'
    + '  </section>'

    /* Quiz & évaluation */
    + '  <section class="ot-panel" data-panel="quiz">'
    + '   <div class="ot-cards">'
    + '    <div class="ot-card">'
    + '     <h3>Quiz live en salle</h3>'
    + '     <p>15 questions projetées, les stagiaires répondent sur leur téléphone via QR code. Classement en direct.</p>'
    + '     <a class="ot-primary" href="' + LINKS.quizLive + '" target="_blank" rel="noopener">Lancer une session</a>'
    + '    </div>'
    + '    <div class="ot-card">'
    + '     <h3>Quiz solo stagiaire</h3>'
    + '     <p>Auto-évaluation individuelle avec correction commentée. À scanner pendant une pause ou en fin de journée.</p>'
    + '     <div class="ot-qr" data-qr="' + LINKS.quizSolo + '"></div>'
    + '     <a href="' + LINKS.quizSolo + '" target="_blank" rel="noopener">Ouvrir le quiz</a>'
    + '    </div>'
    + '    <div class="ot-card">'
    + '     <h3>Évaluation de fin de formation</h3>'
    + '     <p>Questionnaire anonyme (5 thèmes notés de 1 à 10 + commentaire). Résultats en temps réel.</p>'
    + '     <div class="ot-qr" data-qr="' + LINKS.evalForm + '"></div>'
    + '     <a href="' + LINKS.evalRes + '" target="_blank" rel="noopener">Voir les résultats</a>'
    + '    </div>'
    + '   </div>'
    + '  </section>'
    + ' </div>'
    + '</div>'
    + '<button type="button" class="ot-pill" id="ot-pill" hidden aria-label="Ouvrir le minuteur"></button>'
    + '<div class="ot-fullscreen" id="ot-fullscreen" hidden>'
    + ' <div class="ot-fs-label" id="ot-fs-label"></div>'
    + ' <div class="ot-fs-time" id="ot-fs-time">05:00</div>'
    + ' <div class="ot-fs-actions"><button type="button" id="ot-fs-toggle">Pause</button><button type="button" id="ot-fs-exit">Quitter le plein écran</button></div>'
    + '</div>';

  var wrap = document.createElement('div');
  wrap.innerHTML = html;
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

  var $ = function (id) { return document.getElementById(id); };
  var modal = $('ot-modal');

  /* ── Ouverture / onglets ─────────────────────────────────── */
  var qrDone = false;
  function renderQRs() {
    if (qrDone || !window.QRCode) return;
    qrDone = true;
    Array.prototype.forEach.call(document.querySelectorAll('.ot-qr'), function (el) {
      new window.QRCode(el, {
        text: el.getAttribute('data-qr'), width: 150, height: 150,
        colorDark: '#1A2540', colorLight: '#FFFFFF',
        correctLevel: window.QRCode.CorrectLevel.M
      });
    });
  }

  function showTab(name) {
    Array.prototype.forEach.call(modal.querySelectorAll('[data-tab]'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-tab') === name);
    });
    Array.prototype.forEach.call(modal.querySelectorAll('[data-panel]'), function (p) {
      p.classList.toggle('active', p.getAttribute('data-panel') === name);
    });
    if (name === 'quiz') renderQRs();
  }

  function open(tab) {
    modal.hidden = false;
    showTab(tab || 'timer');
  }
  function close() { modal.hidden = true; }

  window.ouvrirOutils = open;

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.hasAttribute('data-ot-close')) close();
    var tab = e.target.getAttribute && e.target.getAttribute('data-tab');
    if (tab) showTab(tab);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!$('ot-fullscreen').hidden) exitFull();
      else if (!modal.hidden) close();
      return;
    }
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if (!typing && (e.key === 'o' || e.key === 'O') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      modal.hidden ? open() : close();
    }
  });

  /* ── Minuteur ────────────────────────────────────────────── */
  var total = 300, remaining = 300, running = false, endAt = 0, tick = null;

  function fmt(s) {
    s = Math.max(0, Math.ceil(s));
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }

  function paint() {
    var txt = fmt(remaining);
    $('ot-timer-display').textContent = txt;
    $('ot-fs-time').textContent = txt;
    $('ot-timer-fill').style.width = (total ? (1 - remaining / total) * 100 : 0) + '%';
    var low = remaining <= 30 && remaining > 0;
    var done = remaining <= 0;
    [$('ot-timer-display'), $('ot-fs-time'), $('ot-pill')].forEach(function (el) {
      el.classList.toggle('low', low);
      el.classList.toggle('done', done);
    });
    $('ot-start').textContent = running ? 'Pause' : (remaining < total && remaining > 0 ? 'Reprendre' : 'Démarrer');
    $('ot-fs-toggle').textContent = running ? 'Pause' : 'Reprendre';
    var pill = $('ot-pill');
    pill.hidden = !(running || (remaining < total));
    pill.textContent = '⏱ ' + (done ? 'Terminé' : txt);
  }

  function beep() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx();
      [0, .35, .7].forEach(function (d) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = 880;
        g.gain.setValueAtTime(.0001, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(.4, ctx.currentTime + d + .02);
        g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d + .3);
        o.connect(g); g.connect(ctx.destination);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + .32);
      });
    } catch (e) {}
  }

  function loop() {
    remaining = (endAt - Date.now()) / 1000;
    if (remaining <= 0) {
      remaining = 0; running = false; clearInterval(tick); tick = null;
      beep();
    }
    paint();
  }

  function start() {
    if (remaining <= 0) remaining = total;
    running = true;
    endAt = Date.now() + remaining * 1000;
    clearInterval(tick);
    tick = setInterval(loop, 250);
    paint();
  }
  function pause() {
    running = false; clearInterval(tick); tick = null;
    remaining = Math.max(0, (endAt - Date.now()) / 1000);
    paint();
  }
  function setMinutes(m) {
    pause();
    total = remaining = Math.round(m * 60);
    paint();
  }

  modal.querySelector('.ot-presets').addEventListener('click', function (e) {
    var m = e.target.getAttribute('data-min');
    if (m) { setMinutes(+m); start(); }
  });
  $('ot-custom-go').addEventListener('click', function () {
    var m = parseFloat($('ot-custom-min').value);
    if (m > 0) { setMinutes(Math.min(m, 180)); start(); }
  });
  $('ot-start').addEventListener('click', function () { running ? pause() : start(); });
  $('ot-reset').addEventListener('click', function () { pause(); remaining = total; paint(); });
  $('ot-plus').addEventListener('click', function () {
    total += 60;
    if (running) { endAt += 60000; remaining += 60; } else { remaining += 60; }
    paint();
  });

  function enterFull() {
    $('ot-fs-label').textContent = $('ot-timer-label').value.trim();
    $('ot-fullscreen').hidden = false;
    close();
    if (!running && remaining > 0) start();
  }
  function exitFull() { $('ot-fullscreen').hidden = true; }
  $('ot-full').addEventListener('click', enterFull);
  $('ot-fs-exit').addEventListener('click', exitFull);
  $('ot-fs-toggle').addEventListener('click', function () { running ? pause() : start(); });
  $('ot-pill').addEventListener('click', function () { open('timer'); });

  /* ── Tirage au sort / groupes ───────────────────────────── */
  var namesEl = $('ot-names');
  namesEl.value = store(NAMES_KEY) || '';
  namesEl.addEventListener('input', function () { store(NAMES_KEY, namesEl.value); });

  function names() {
    return namesEl.value.split(/\n|,|;/).map(function (n) { return n.trim(); }).filter(Boolean);
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var out = $('ot-draw-result');
  function needNames(min) {
    var n = names();
    if (n.length < min) {
      out.innerHTML = '<p class="ot-hint">Saisissez au moins ' + min + ' prénom' + (min > 1 ? 's' : '') + '.</p>';
      return null;
    }
    return n;
  }

  $('ot-pick').addEventListener('click', function () {
    var n = needNames(1); if (!n) return;
    var steps = 14, i = 0;
    out.innerHTML = '<div class="ot-picked rolling"></div>';
    var el = out.firstChild;
    (function roll() {
      el.textContent = n[Math.floor(Math.random() * n.length)];
      if (++i < steps) setTimeout(roll, 40 + i * 12);
      else el.classList.remove('rolling');
    })();
  });

  $('ot-groups').addEventListener('click', function () {
    var n = needNames(2); if (!n) return;
    var size = Math.max(2, parseInt($('ot-group-size').value, 10) || 3);
    var count = Math.max(1, Math.round(n.length / size));
    var groups = [];
    for (var g = 0; g < count; g++) groups.push([]);
    shuffle(n).forEach(function (name, i) { groups[i % count].push(name); });
    out.innerHTML = '<div class="ot-groups">' + groups.map(function (gr, i) {
      return '<div class="ot-group"><div class="ot-group-title">Groupe ' + (i + 1) + '</div>'
        + gr.map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div>';
    }).join('') + '</div>';
  });

  /* ── Points d'entrée dans la formation ───────────────────── */
  // Bouton ⏱ dans chaque séquence
  Array.prototype.forEach.call(document.querySelectorAll('.slide-actions'), function (bar) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ot-slide-btn';
    b.textContent = '⏱ Minuteur';
    b.addEventListener('click', function () {
      var slide = bar.closest('.slide');
      var h = slide && slide.querySelector('.card-header h2');
      if (h) $('ot-timer-label').value = h.textContent.trim();
      // Durée prévue de la séquence (« 9h30 - 10h15 ») pré-réglée sans démarrer
      var m = slide && slide.textContent.match(/(\d{1,2})h(\d{2})?\s*-\s*(\d{1,2})h(\d{2})?/);
      if (m && !running) {
        var mins = (+m[3] * 60 + (+m[4] || 0)) - (+m[1] * 60 + (+m[2] || 0));
        if (mins > 0) setMinutes(mins);
      }
      open('timer');
    });
    bar.appendChild(b);
  });

  paint();
})();
