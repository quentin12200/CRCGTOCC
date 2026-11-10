#!/usr/bin/env node
/* Construit l'index de la recherche instantanée : assets/recherche-index.js
   Sources : modules de formation (assets/modules-data.js), pages et fiches
   AT/MP (SEARCH_INDEX de recherche.html), lexique (TERMS de lexique.html),
   tableaux de maladies professionnelles (MP de maladies-pro.html).
   À relancer après une modification de ces contenus :
     node scripts/maj-recherche.js
*/
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RACINE = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(RACINE, f), 'utf8');

// Extrait un tableau littéral « const NOM = [ ... ]; » d'une page et l'évalue
function tableau(fichier, nom) {
  const src = lire(fichier);
  const debut = src.indexOf('const ' + nom + ' = [');
  if (debut < 0) throw new Error(nom + ' introuvable dans ' + fichier);
  let i = src.indexOf('[', debut), prof = 0, chaine = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (chaine) {
      if (c === '\\') { j++; continue; }
      if (c === chaine) chaine = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { chaine = c; continue; }
    if (c === '[') prof++;
    else if (c === ']' && --prof === 0) return vm.runInNewContext('(' + src.slice(i, j + 1) + ')');
  }
  throw new Error('fin de ' + nom + ' introuvable');
}

const texte = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const court = (t, n) => (t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : t);

const entrees = [];

// 1. Modules de formation
const w = {};
vm.runInNewContext(lire('assets/modules-data.js'), { window: w });
w.CGT_MODULES.forEach(m => {
  const kit = Object.values(m.kit).flat().map(r => r.t).join(' ');
  entrees.push({ c: 'Modules de formation', t: m.titre, d: court(m.desc, 150), u: '/index.html#module-' + m.id, k: [m.mots, kit, m.type].join(' ') });
});

// 2. Pages, fiches et outils AT/MP (index de la page Recherche)
tableau('recherche.html', 'SEARCH_INDEX').forEach(e => {
  // Accueil formateur : couvert par les modules ; définitions : couvertes par le lexique complet
  if (e.page === 'index.html' || e.cat === 'lexique') return;
  entrees.push({ c: /fiches-memo|fiches\.html/.test(e.page) ? 'Fiches mémo' : 'Fiches & outils AT/MP', t: e.title, d: court(texte(e.excerpt), 150),
    u: '/' + e.page.replace(/^\//, ''), k: [(e.tags || []).join(' '), e.section].join(' ') });
});

// 3. Lexique
tableau('lexique.html', 'TERMS').forEach(e => {
  const def = texte(e.def).replace(/⚡ Point syndical CGT.*/, '');
  entrees.push({ c: 'Lexique', t: e.term + (e.abbr ? ' (' + e.abbr + ')' : ''), d: court(def, 150),
    u: '/lexique.html?q=' + encodeURIComponent(e.term), k: e.abbr || '' });
});

// 4. Tableaux de maladies professionnelles
tableau('maladies-pro.html', 'MP').forEach(e => {
  const maladies = (e.rows || []).map(r => r[0]).join(' ');
  entrees.push({ c: 'Tableaux de maladies professionnelles', t: 'Tableau ' + e.n + ' — ' + e.titre, d: court(texte(e.synth), 150),
    u: '/maladies-pro.html#tableau-' + String(e.n).replace(/\s+/g, '-'), k: ['tableau ' + e.n, 'T' + e.n, maladies, (e.exposes || []).join(' ')].join(' ').slice(0, 600) });
});

const sortie = '/* Généré par scripts/maj-recherche.js — ne pas modifier à la main */\nwindow.CGT_RECHERCHE = ' +
  JSON.stringify(entrees) + ';\n';
fs.writeFileSync(path.join(RACINE, 'assets/recherche-index.js'), sortie);
const parCat = {};
entrees.forEach(e => { parCat[e.c] = (parCat[e.c] || 0) + 1; });
console.log(entrees.length + ' entrées (' + Math.round(sortie.length / 1024) + ' Ko) :', parCat);
