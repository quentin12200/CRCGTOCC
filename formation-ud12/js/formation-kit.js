/**
 * Formation CGT - Briques communes aux modules interactifs (rôles, statuts…)
 * Cartes à révéler, quiz, mode projection, sommaire et thème.
 * Exposé dans window.FK ; chaque page fournit ses données et branche les briques.
 */
(function () {
  'use strict';

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'text') node.textContent = v;
      else if (k === 'className') node.className = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach(c => c && node.appendChild(c));
    return node;
  }

  // Tire `length` questions au hasard ; les QCM ont leurs réponses mélangées
  function drawQuestions(pool, length) {
    return shuffle(pool).slice(0, length).map(q => ({
      ...q,
      options: q.type === 'vf' ? ['Vrai', 'Faux'] : shuffle(q.options)
    }));
  }

  /* ---------- Cartes à révéler ---------- */

  function setExpanded(card, open) {
    const btn = card.querySelector('.reveal-btn');
    const panel = card.querySelector('.role-panel');
    card.classList.toggle('revealed', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Masquer' : 'Révéler';
    panel.hidden = !open;
  }

  // badge : { cls, text } facultatif
  function buildCard({ id, icon, label, title, question, badge, body }) {
    const panelId = 'panel-' + id;
    const btn = el('button', { type: 'button', className: 'reveal-btn', 'aria-expanded': 'false', 'aria-controls': panelId, text: 'Révéler' });
    const card = el('article', { className: 'role-card', id: 'role-' + id, 'aria-labelledby': 'title-' + id }, [
      el('div', { className: 'role-head' }, [
        el('span', { className: 'role-icon', 'aria-hidden': 'true', text: icon }),
        el('div', {}, [
          el('span', { className: 'role-cat', text: label }),
          el('h3', { id: 'title-' + id, text: title }),
          badge ? el('span', { className: 'role-badge ' + (badge.cls || ''), text: badge.text }) : null
        ])
      ]),
      el('p', { className: 'role-question', text: question }),
      btn,
      el('div', { className: 'role-panel', id: panelId, hidden: '' }, body)
    ]);
    btn.addEventListener('click', () => setExpanded(card, btn.getAttribute('aria-expanded') !== 'true'));
    return card;
  }

  // Ouvre une carte, la fait défiler à l'écran et la met en évidence
  function highlightCard(card) {
    setExpanded(card, true);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('highlight');
    void card.offsetWidth; // relance l'animation
    card.classList.add('highlight');
    card.querySelector('.reveal-btn').focus({ preventScroll: true });
  }

  /* ---------- Modes exploration / quiz ---------- */

  function initModes({ onQuiz }) {
    const explorationBtn = document.getElementById('exploration-mode');
    const quizBtn = document.getElementById('quiz-mode');
    const explorationPanel = document.getElementById('exploration-panel');
    const quizPanel = document.getElementById('quiz-panel');

    function setMode(mode) {
      const quiz = mode === 'quiz';
      explorationBtn.classList.toggle('active', !quiz);
      quizBtn.classList.toggle('active', quiz);
      explorationBtn.setAttribute('aria-selected', String(!quiz));
      quizBtn.setAttribute('aria-selected', String(quiz));
      explorationPanel.hidden = quiz;
      quizPanel.hidden = !quiz;
    }

    explorationBtn.addEventListener('click', () => setMode('exploration'));
    quizBtn.addEventListener('click', () => {
      setMode('quiz');
      if (onQuiz) onQuiz();
    });
    return { setMode, isQuiz: () => !quizPanel.hidden };
  }

  /* ---------- Quiz ---------- */

  // onSeeCard(question) : ouvre la fiche liée à une question (lien « Voir la fiche »)
  function createQuiz({ pool, length, onSeeCard, results }) {
    const title = document.getElementById('quiz-title');
    const text = document.getElementById('quiz-text');
    const options = document.getElementById('quiz-options');
    const checkBtn = document.getElementById('quiz-check');
    const nextBtn = document.getElementById('quiz-next');
    const feedback = document.getElementById('quiz-feedback');
    const progress = document.getElementById('quiz-progress-bar');

    let questions = [];
    let current = 0;
    let selected = null;
    let score = 0;
    let missed = [];

    function seeCardLink(q) {
      if (!onSeeCard || !q.role) return null;
      const link = el('button', { type: 'button', className: 'link-btn', text: 'Voir la fiche →' });
      link.addEventListener('click', () => onSeeCard(q));
      return link;
    }

    function start() {
      questions = drawQuestions(pool, length);
      current = 0;
      score = 0;
      missed = [];
      showQuestion();
    }

    function showQuestion() {
      const q = questions[current];
      selected = null;
      title.textContent = `Question ${current + 1}/${questions.length}` + (q.type === 'vf' ? ' — Vrai ou faux ?' : '');
      text.textContent = q.question;
      progress.style.width = (current / questions.length * 100) + '%';
      options.innerHTML = '';
      options.className = 'quiz-options' + (q.type === 'vf' ? ' quiz-options--vf' : '');

      q.options.forEach(option => {
        const btn = el('button', { type: 'button', className: 'quiz-option', 'aria-pressed': 'false', text: option });
        btn.addEventListener('click', () => {
          if (checkBtn.dataset.done === '1') return;
          options.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('selected');
            o.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('selected');
          btn.setAttribute('aria-pressed', 'true');
          selected = option;
          checkBtn.disabled = false;
        });
        options.appendChild(btn);
      });

      checkBtn.hidden = false;
      nextBtn.hidden = false;
      checkBtn.disabled = true;
      checkBtn.dataset.done = '0';
      nextBtn.disabled = true;
      nextBtn.textContent = current === questions.length - 1 ? 'Voir mon résultat' : 'Question suivante';
      feedback.className = 'quiz-feedback';
      feedback.innerHTML = '';
    }

    checkBtn.addEventListener('click', () => {
      if (selected === null) return;
      const q = questions[current];
      const ok = selected === q.answer;
      if (ok) score++; else missed.push(q);

      options.querySelectorAll('.quiz-option').forEach(o => {
        o.disabled = true;
        if (o.textContent === q.answer) o.classList.add('correct');
        else if (o.textContent === selected) o.classList.add('incorrect');
      });

      feedback.className = 'quiz-feedback visible ' + (ok ? 'correct' : 'incorrect');
      feedback.innerHTML = '';
      feedback.appendChild(el('strong', { text: ok ? 'Bonne réponse ! ' : `Pas tout à fait. La bonne réponse : ${q.answer}. ` }));
      feedback.appendChild(document.createTextNode(q.explanation + ' '));
      const link = seeCardLink(q);
      if (link) feedback.appendChild(link);

      checkBtn.disabled = true;
      checkBtn.dataset.done = '1';
      nextBtn.disabled = false;
      nextBtn.focus();
    });

    nextBtn.addEventListener('click', () => {
      current++;
      if (current < questions.length) showQuestion();
      else showResults();
    });

    function showResults() {
      const total = questions.length;
      const ratio = score / total;
      progress.style.width = '100%';
      title.textContent = `Résultat : ${score}/${total}`;
      text.textContent = ratio === 1 ? results.perfect
        : ratio >= 0.7 ? 'Très bien ! Revoyez les quelques points ci-dessous.'
        : ratio >= 0.4 ? 'C\'est un bon début. Reprenez les fiches ci-dessous puis retentez le quiz.'
        : 'Prenez le temps de relire les fiches en mode exploration, puis retentez votre chance.';
      options.innerHTML = '';
      options.className = 'quiz-options';
      feedback.className = 'quiz-feedback';
      feedback.innerHTML = '';
      checkBtn.hidden = true;
      nextBtn.hidden = true;

      if (missed.length) {
        const list = el('ul', { className: 'quiz-recap' });
        missed.forEach(q => {
          list.appendChild(el('li', {}, [
            el('p', { className: 'quiz-recap-q', text: q.question }),
            el('p', { text: '✔ ' + q.answer + ' — ' + q.explanation }),
            seeCardLink(q)
          ]));
        });
        options.appendChild(el('h4', { text: 'À revoir' }));
        options.appendChild(list);
      }

      const restart = el('button', { type: 'button', className: 'quiz-restart', text: 'Recommencer avec d\'autres questions' });
      restart.addEventListener('click', start);
      options.appendChild(restart);
      restart.focus();
    }

    return { start };
  }

  /* ---------- Sommaire ---------- */

  function initToc() {
    const toc = document.getElementById('table-of-contents');
    const overlay = document.getElementById('toc-overlay');
    const button = document.querySelector('.toc-button');
    const close = document.getElementById('close-toc');
    if (!toc || !overlay || !button || !close) return;

    function setToc(open) {
      toc.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      toc.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
      if (open) close.focus();
    }
    button.addEventListener('click', () => setToc(!toc.classList.contains('active')));
    close.addEventListener('click', () => { setToc(false); button.focus(); });
    overlay.addEventListener('click', () => setToc(false));
    // Un lien interne (#ancre) referme le sommaire
    toc.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setToc(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toc.classList.contains('active')) { setToc(false); button.focus(); }
    });
  }

  /* ---------- Mode projection (diaporama animateur) ---------- */
  // Une diapo à la fois : la question d'abord, la réponse au 2e appui.
  // Clavier / télécommande : → ou PageDown = avancer, ← ou PageUp = reculer,
  // Espace ou Entrée = révéler, F = plein écran, Échap = quitter.

  // Diapo « carte » : icône, catégorie, titre, badge, question puis réponse
  function renderCardSlide(stage, { icon, cat, title, badge, question, answer }, revealed) {
    stage.appendChild(el('div', { className: 'proj-head' }, [
      el('span', { className: 'proj-icon', 'aria-hidden': 'true', text: icon }),
      el('div', {}, [
        el('span', { className: 'proj-cat', text: cat }),
        el('h2', { className: 'proj-title', text: title }),
        badge ? el('span', { className: 'role-badge ' + (badge.cls || ''), text: badge.text }) : null
      ])
    ]));
    stage.appendChild(el('p', { className: 'proj-question', text: question }));
    if (revealed) stage.appendChild(answer());
  }

  // Diapo « liste » : réponse en une colonne
  function listAnswer(points, source) {
    return () => el('div', { className: 'proj-answer proj-answer--full' }, [
      el('ul', { className: 'proj-list' }, points.map(m => el('li', { text: m }))),
      source ? el('p', { className: 'proj-source', text: '📖 ' + source }) : null
    ]);
  }

  function renderQuizSlide(stage, item, revealed) {
    stage.appendChild(el('span', { className: 'proj-cat', text: item.type === 'vf' ? 'Vrai ou faux ?' : 'Question' }));
    stage.appendChild(el('h2', { className: 'proj-title proj-title--quiz', text: item.question }));
    const letters = 'ABCD';
    stage.appendChild(el('ol', { className: 'proj-options' + (item.type === 'vf' ? ' proj-options--vf' : '') },
      item.options.map((o, i) => el('li', {
        className: revealed ? (o === item.answer ? 'good' : 'bad') : ''
      }, [el('span', { className: 'proj-letter', text: item.type === 'vf' ? '' : letters[i] }), document.createTextNode(o)]))));
    if (revealed) {
      stage.appendChild(el('p', { className: 'proj-explanation', text: item.explanation }));
    }
  }

  // decks : { nom: { build: () => diapos, render: (stage, diapo, revealed) => void } }
  // initialDeck : () => nom du jeu à ouvrir
  function initProjection({ decks, initialDeck }) {
    const proj = document.getElementById('projection');
    if (!proj) return;
    const stage = document.getElementById('proj-stage');
    const counter = document.getElementById('proj-counter');
    const revealBtn = document.getElementById('proj-reveal');
    const prevBtn = document.getElementById('proj-prev');
    const nextBtn = document.getElementById('proj-next');
    const tabs = proj.querySelectorAll('.proj-tab');
    const openBtn = document.querySelector('.presentation-button');

    let deck = null;
    let slides = [];
    let index = 0;
    let revealed = false;
    let lastFocus = null;

    function render() {
      stage.innerHTML = '';
      counter.textContent = `${index + 1} / ${slides.length}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1 && revealed;
      revealBtn.textContent = revealed ? 'Masquer la réponse' : 'Révéler la réponse';
      if (slides.length) decks[deck].render(stage, slides[index], revealed);
    }

    function goTo(i) {
      if (i < 0 || i >= slides.length) return;
      index = i;
      revealed = false;
      render();
    }

    // « Avancer » révèle d'abord la réponse, puis passe à la diapo suivante
    function advance() {
      if (!revealed) { revealed = true; render(); }
      else goTo(index + 1);
    }

    function toggleReveal() {
      revealed = !revealed;
      render();
    }

    function setDeck(name) {
      deck = name;
      tabs.forEach(t => {
        const on = t.dataset.deck === name;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
      });
      slides = decks[name].build();
      index = 0;
      revealed = false;
      render();
    }

    function toggleFullscreen() {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (proj.requestFullscreen) proj.requestFullscreen().catch(() => {});
      } catch (e) {}
    }

    function open() {
      lastFocus = document.activeElement;
      proj.hidden = false;
      document.body.classList.add('proj-open');
      openBtn.setAttribute('aria-expanded', 'true');
      setDeck(initialDeck());
      try {
        if (proj.requestFullscreen) proj.requestFullscreen().catch(() => {});
      } catch (e) {}
      nextBtn.focus();
    }

    function close() {
      proj.hidden = true;
      document.body.classList.remove('proj-open');
      openBtn.setAttribute('aria-expanded', 'false');
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
      if (lastFocus) lastFocus.focus();
    }

    openBtn.addEventListener('click', open);
    document.getElementById('proj-close').addEventListener('click', close);
    document.getElementById('proj-fullscreen').addEventListener('click', toggleFullscreen);
    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', advance);
    revealBtn.addEventListener('click', toggleReveal);
    tabs.forEach(t => t.addEventListener('click', () => setDeck(t.dataset.deck)));

    document.addEventListener('keydown', e => {
      if (proj.hidden) return;
      // Laisse les boutons du bandeau réagir normalement à Entrée / Espace
      const onButton = e.target.closest && e.target.closest('.proj-bar button');
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': e.preventDefault(); advance(); break;
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); goTo(index - 1); break;
        case ' ': case 'Enter':
          if (onButton) return;
          e.preventDefault(); toggleReveal(); break;
        case 'Home': e.preventDefault(); goTo(0); break;
        case 'End': e.preventDefault(); goTo(slides.length - 1); break;
        case 'f': case 'F': toggleFullscreen(); break;
        // En plein écran, le navigateur intercepte le 1er Échap pour quitter le plein écran
        case 'Escape': close(); break;
      }
    });
  }

  /* ---------- Thème (l'enregistrement est géré par occitanie.js) ---------- */

  function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = document.querySelector('.theme-icon');
    if (!themeSwitch || !themeIcon) return;
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    themeSwitch.checked = isDark();
    themeIcon.textContent = isDark() ? '☀️' : '🌙';
    themeSwitch.addEventListener('change', () => {
      const t = themeSwitch.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('theme', t); } catch (e) {}
      themeIcon.textContent = themeSwitch.checked ? '☀️' : '🌙';
    });
  }

  window.FK = {
    shuffle, el, drawQuestions,
    setExpanded, buildCard, highlightCard,
    initModes, createQuiz, initToc, initTheme,
    initProjection, renderCardSlide, renderQuizSlide, listAnswer
  };
})();
