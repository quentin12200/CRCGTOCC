/**
 * Vercel Serverless Function — Veille juridique AT/MP
 * Déclenché par cron toutes les 24h (voir vercel.json)
 * Scrape RSS + sites, résume via OpenAI, sauvegarde dans Firestore
 */

const https = require('https');
const http  = require('http');

// ── Helpers fetch ──────────────────────────────────────────────────────────────
function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'CGT-Occitanie-Veille/1.0' }, ...options }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ── Parser RSS minimaliste ─────────────────────────────────────────────────────
function parseRSS(xml, limit = 5) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null && items.length < limit) {
    const block = m[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                   block.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const desc  = (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                   block.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    const link  = (block.match(/<link>(.*?)<\/link>/) || [])[1] || '';
    const date  = (block.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
    if (title.trim()) items.push({ title: title.trim(), desc: desc.replace(/<[^>]+>/g, '').trim().slice(0, 400), link: link.trim(), date: date.trim() });
  }
  return items;
}

// ── Scraper HTML simple (extrait titres + liens d'une page) ───────────────────
function scrapeActualites(html, baseUrl, limit = 5) {
  const items = [];
  // Cherche les liens contenant "actualite" ou "actualites" dans le href
  const re = /<a[^>]+href="([^"]*(?:actualite|actualit)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const seen = new Set();
  while ((m = re.exec(html)) !== null && items.length < limit) {
    const href  = m[1].startsWith('http') ? m[1] : baseUrl + m[1];
    const label = m[2].replace(/<[^>]+>/g, '').trim();
    if (label.length > 20 && !seen.has(href)) {
      seen.add(href);
      items.push({ title: label.slice(0, 200), link: href, desc: '', date: '' });
    }
  }
  return items;
}

// ── Collecte toutes les sources ────────────────────────────────────────────────
async function collectSources() {
  const sources = [];

  const tasks = [
    // Ameli.fr — flux RSS presse
    fetchUrl('https://ameli.fr/espace-presse/flux-rss.php')
      .then(r => { if (r.status === 200) parseRSS(r.body).forEach(i => sources.push({ ...i, source: 'Ameli.fr', cat: 'circulaire' })); })
      .catch(() => {}),

    // Agefiph — flux RSS
    fetchUrl('https://www.agefiph.fr/Flux-RSS')
      .then(r => { if (r.status === 200) parseRSS(r.body).forEach(i => sources.push({ ...i, source: 'Agefiph', cat: 'pratique' })); })
      .catch(() => {}),

    // Cour de cassation — chambre sociale (RSS)
    fetchUrl('https://www.courdecassation.fr/rss/decision.xml?chambre=sociale&formation=&solution=&publication=&date=')
      .then(r => { if (r.status === 200) parseRSS(r.body).forEach(i => sources.push({ ...i, source: 'Cour de cassation', cat: 'arret' })); })
      .catch(() => {}),

    // CARSAT Languedoc-Roussillon — scraping
    fetchUrl('https://www.carsat-lr.fr/home/nous-connaitre/actualites-nous-connaitre.html')
      .then(r => { if (r.status === 200) scrapeActualites(r.body, 'https://www.carsat-lr.fr').forEach(i => sources.push({ ...i, source: 'CARSAT LR', cat: 'circulaire' })); })
      .catch(() => {}),

    // CARSAT Midi-Pyrénées — scraping
    fetchUrl('https://www.carsat-mp.fr/home/nous-connaitre/actualites---nous-connaitre.html')
      .then(r => { if (r.status === 200) scrapeActualites(r.body, 'https://www.carsat-mp.fr').forEach(i => sources.push({ ...i, source: 'CARSAT MP', cat: 'circulaire' })); })
      .catch(() => {}),
  ];

  await Promise.allSettled(tasks);
  return sources;
}

// ── Résumé OpenAI ──────────────────────────────────────────────────────────────
async function resumeWithGPT(item) {
  const prompt = `Tu es un expert juridique CGT spécialisé AT/MP.
Transforme cette actualité en fiche pratique syndicale concise.

Source : ${item.source}
Titre : ${item.title}
${item.desc ? 'Contenu : ' + item.desc : ''}
${item.link ? 'URL : ' + item.link : ''}

Réponds UNIQUEMENT en JSON valide avec ces champs :
{
  "title": "titre reformulé clair pour militant CGT (max 90 cars)",
  "body": "résumé 2-3 phrases, langage syndical accessible",
  "detail": "impact pratique pour les formations CGT, conseils militants (HTML simple : <ul><li>...)",
  "impact": "high | med | low",
  "impactLabel": "label court décrivant l'impact (ex: Impact fort — faute inexcusable)",
  "cat": "${item.cat}"
}`;

  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 600,
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const content = json.choices?.[0]?.message?.content || '';
          const match = content.match(/\{[\s\S]*\}/);
          if (match) resolve(JSON.parse(match[0]));
          else reject(new Error('No JSON in GPT response'));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('OpenAI timeout')); });
    req.write(payload);
    req.end();
  });
}

// ── Firestore (Admin SDK via REST) ────────────────────────────────────────────
async function getFirestoreToken() {
  const { createSign } = require('crypto');
  const projectId  = process.env.FIREBASE_PROJECT_ID;
  const email      = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: email, sub: email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/datastore',
  })).toString('base64url');

  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const sig = sign.sign(privateKey, 'base64url');
  const jwt = `${header}.${payload}.${sig}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  }).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const json = JSON.parse(d);
        if (json.access_token) resolve(json.access_token);
        else reject(new Error('No access token: ' + d));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function saveToFirestore(token, doc) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const id = `veille_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/veille/${id}`;

  const toValue = v => typeof v === 'string' ? { stringValue: v } : { booleanValue: v };
  const fields = {};
  Object.entries(doc).forEach(([k, v]) => { fields[k] = toValue(v); });
  fields.createdAt = { timestampValue: new Date().toISOString() };
  fields.isNew = { booleanValue: true };

  const body = JSON.stringify({ fields });

  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ id, status: res.statusCode }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Handler principal ──────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // Sécurité : uniquement cron Vercel ou appel avec secret
  const authHeader = req.headers['authorization'] || '';
  const cronHeader = req.headers['x-vercel-cron'] || '';
  if (!cronHeader && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('[veille-sync] Démarrage collecte sources...');
    const sources = await collectSources();
    console.log(`[veille-sync] ${sources.length} articles collectés`);

    if (!sources.length) {
      return res.status(200).json({ message: 'Aucune source collectée', count: 0 });
    }

    const token = await getFirestoreToken();
    const results = [];

    // Traiter max 8 articles par run (limite coût OpenAI)
    const toProcess = sources.slice(0, 8);

    for (const item of toProcess) {
      try {
        const fiche = await resumeWithGPT(item);
        fiche.source = item.source;
        fiche.sourceUrl = item.link || '';
        fiche.date = new Date().toISOString().slice(0, 10);
        const saved = await saveToFirestore(token, fiche);
        results.push({ ok: true, id: saved.id, title: fiche.title });
        console.log(`[veille-sync] Sauvegardé : ${fiche.title}`);
      } catch(e) {
        console.error(`[veille-sync] Erreur sur "${item.title}":`, e.message);
        results.push({ ok: false, title: item.title, error: e.message });
      }
    }

    return res.status(200).json({ message: 'Sync terminée', count: results.filter(r => r.ok).length, results });

  } catch (e) {
    console.error('[veille-sync] Erreur globale:', e);
    return res.status(500).json({ error: e.message });
  }
};
