/**
 * Vercel Serverless Function — Veille juridique AT/MP
 * Cron : tous les jours à 6h (voir vercel.json)
 *
 * Variables d'environnement requises (Vercel > Settings > Env Vars) :
 *   OPENAI_API_KEY        — clé OpenAI
 *   FIREBASE_PROJECT_ID   — crocc-b499f
 *   FIREBASE_CLIENT_EMAIL — depuis JSON compte de service Firebase
 *   FIREBASE_PRIVATE_KEY  — depuis JSON compte de service Firebase
 *   CRON_SECRET           — mot de passe pour appel manuel
 */

const https = require('https');
const { createSign } = require('crypto');

// ── Fetch via rss2json.com (proxy public, contourne hotlink protection) ────────
// Gratuit jusqu'à 10 000 requêtes/jour — largement suffisant pour un cron 24h
function fetchRSS(feedUrl) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=6`;
  return new Promise((resolve, reject) => {
    const req = https.get(api, {
      headers: { 'User-Agent': 'CGT-Occitanie-Veille/1.0' },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'ok') resolve(json.items || []);
          else reject(new Error(`rss2json erreur : ${json.message || json.status} — ${feedUrl}`));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(14000, () => { req.destroy(); reject(new Error('Timeout RSS : ' + feedUrl)); });
  });
}

// ── Fetch JSON direct (pour APIs) ─────────────────────────────────────────────
function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'CGT-Occitanie-Veille/1.0', 'Accept': 'application/json', ...headers },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(14000, () => { req.destroy(); reject(new Error('Timeout : ' + url)); });
  });
}

// ── Parser RSS générique ──────────────────────────────────────────────────────
function parseRSS(xml, source, cat, limit = 6) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null && items.length < limit) {
    const b = m[1];
    const get = tag => {
      const r = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
      return (r.exec(b) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '';
    };
    const title = get('title');
    const desc  = get('description').slice(0, 600);
    const link  = get('link').trim();
    const date  = get('pubDate') || get('dc:date') || '';
    if (title.length > 10) {
      items.push({ title, desc, link, date, source, cat });
    }
  }
  return items;
}

// ── Convertit un item rss2json en format interne ──────────────────────────────
function r2jToItem(item, source, cat) {
  return {
    title: item.title || '',
    desc: (item.description || item.content || '').replace(/<[^>]+>/g, '').trim().slice(0, 600),
    link: item.link || '',
    date: item.pubDate || '',
    source,
    cat,
  };
}

// ── Source 1 : Ameli.fr ────────────────────────────────────────────────────────
async function fetchAmeli() {
  const urls = [
    'https://www.ameli.fr/l-assurance-maladie/flux-rss.php',
    'https://www.ameli.fr/espace-presse/flux-rss.php',
  ];
  for (const url of urls) {
    try {
      const items = await fetchRSS(url);
      if (items.length) {
        const mapped = items.map(i => r2jToItem(i, 'Ameli.fr', 'circulaire'));
        console.log(`[ameli] ${mapped.length} articles`);
        return mapped;
      }
    } catch(e) { console.warn('[ameli]', e.message); }
  }
  console.warn('[ameli] Aucun flux disponible');
  return [];
}

// ── Source 2 : Agefiph ────────────────────────────────────────────────────────
async function fetchAgefiph() {
  try {
    const items = await fetchRSS('https://www.agefiph.fr/Flux-RSS');
    const mapped = items.map(i => r2jToItem(i, 'Agefiph', 'pratique'));
    console.log(`[agefiph] ${mapped.length} articles`);
    return mapped;
  } catch(e) { console.warn('[agefiph]', e.message); }
  return [];
}

// ── Source 3 : INRS ────────────────────────────────────────────────────────────
async function fetchINRS() {
  const urls = [
    'https://www.inrs.fr/rss/actualites.xml',
    'https://www.inrs.fr/actualites.html',
  ];
  for (const url of urls) {
    try {
      const items = await fetchRSS(url);
      if (items.length) {
        const mapped = items.map(i => r2jToItem(i, 'INRS', 'rapport'));
        console.log(`[inrs] ${mapped.length} articles`);
        return mapped;
      }
    } catch(e) { console.warn('[inrs]', e.message); }
  }
  console.warn('[inrs] Aucun flux disponible');
  return [];
}

// ── Source 4 : Bulletins officiels Min. Travail ───────────────────────────────
async function fetchBulletinsOfficiels() {
  try {
    const items = await fetchRSS('https://bulletins-officiels.social.gouv.fr/flux-rss');
    const mapped = items.map(i => r2jToItem(i, 'Bulletins officiels — Min. Travail', 'decret'));
    console.log(`[bulletins] ${mapped.length} articles`);
    return mapped;
  } catch(e) { console.warn('[bulletins]', e.message); }
  return [];
}

// ── Collecte toutes les sources ────────────────────────────────────────────────
async function collectSources() {
  const [ameli, agefiph, inrs, bulletins] = await Promise.all([
    fetchAmeli(),
    fetchAgefiph(),
    fetchINRS(),
    fetchBulletinsOfficiels(),
  ]);

  // Priorité : INRS + Bulletins (plus juridiques) en premier
  const all = [...inrs, ...bulletins, ...ameli, ...agefiph];
  console.log(`[collect] Total : ${all.length} articles collectés`);
  return all;
}

// ── Analyse GPT avec angle syndical CGT ───────────────────────────────────────
async function resumeWithGPT(item) {
  const prompt = `Tu es un expert juridique et formateur syndical CGT, spécialisé en droit AT/MP.

Voici une actualité brute :
Source : ${item.source}
Titre : ${item.title}
${item.desc ? 'Contenu : ' + item.desc : ''}
${item.link ? 'Lien : ' + item.link : ''}

Produis une fiche pratique CGT. Réponds UNIQUEMENT en JSON valide (pas de texte autour) :
{
  "title": "Titre percutant pour militant CGT, 80 caractères max",
  "body": "Résumé factuel en 2-3 phrases : ce qui change et pourquoi c'est important pour les salariés victimes d'AT/MP",
  "detail": "Analyse syndicale en HTML (<ul><li>). Inclure : 1) Ce que ça change concrètement pour le salarié victime d'AT/MP, 2) Ce que le délégué CGT doit faire en pratique (vérifier, revendiquer, agir), 3) L'argument CGT à utiliser en formation ou en négociation, 4) Les pièges à éviter",
  "angle_cgt": "Position CGT en une phrase courte et directe",
  "impact": "high ou med ou low",
  "impactLabel": "ex: Impact fort — droits nouveaux pour les victimes AT",
  "cat": "${item.cat}"
}`;

  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    max_tokens: 900,
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
          if (json.error) { reject(new Error('OpenAI : ' + json.error.message)); return; }
          const content = json.choices?.[0]?.message?.content || '';
          const match = content.match(/\{[\s\S]*\}/);
          if (match) resolve(JSON.parse(match[0]));
          else reject(new Error('Pas de JSON dans la réponse GPT'));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('OpenAI timeout')); });
    req.write(payload);
    req.end();
  });
}

// ── Token Firebase (JWT RS256) ────────────────────────────────────────────────
async function getFirestoreToken() {
  const email      = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const now        = Math.floor(Date.now() / 1000);

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
  const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error('Token Firebase échoué : ' + d.slice(0, 300)));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Sauvegarde Firestore ──────────────────────────────────────────────────────
async function saveToFirestore(token, doc) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const fields = {};
  Object.entries(doc).forEach(([k, v]) => {
    fields[k] = typeof v === 'boolean' ? { booleanValue: v } : { stringValue: String(v ?? '') };
  });
  fields.createdAt = { timestampValue: new Date().toISOString() };
  fields.isNew     = { booleanValue: true };

  const body = JSON.stringify({ fields });
  const path = `/v1/projects/${projectId}/databases/(default)/documents/veille/${id}`;

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      path, method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve({ id });
        else reject(new Error(`Firestore ${res.statusCode} : ${d.slice(0, 200)}`));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Anti-doublon ──────────────────────────────────────────────────────────────
async function alreadyExists(token, title) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const slug = title.toLowerCase().slice(0, 60);
  const path = `/v1/projects/${projectId}/databases/(default)/documents/veille?pageSize=30`;
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      path, method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const docs = JSON.parse(d).documents || [];
          resolve(docs.some(doc =>
            (doc.fields?.title?.stringValue || '').toLowerCase().slice(0, 60) === slug
          ));
        } catch { resolve(false); }
      });
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

// ── Handler principal ──────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  const isCron   = req.headers['x-vercel-cron'] === '1';
  const isManual = req.headers['authorization'] === `Bearer ${process.env.CRON_SECRET}`;
  if (!isCron && !isManual) return res.status(401).json({ error: 'Non autorisé' });

  if (!process.env.OPENAI_API_KEY)      return res.status(500).json({ error: 'OPENAI_API_KEY manquante' });
  if (!process.env.FIREBASE_PROJECT_ID) return res.status(500).json({ error: 'FIREBASE_PROJECT_ID manquante' });

  try {
    console.log('[veille-sync] ── Démarrage ──');
    const sources = await collectSources();

    if (!sources.length) {
      return res.status(200).json({ message: 'Aucun article collecté', sources_ok: false });
    }

    const token = await getFirestoreToken();
    const results = [];
    let saved = 0;

    for (const item of sources.slice(0, 6)) {
      try {
        const exists = await alreadyExists(token, item.title);
        if (exists) {
          console.log(`[skip] Doublon : "${item.title.slice(0, 50)}"`);
          results.push({ ok: false, reason: 'doublon', title: item.title.slice(0, 60) });
          continue;
        }
        const fiche = await resumeWithGPT(item);
        fiche.source    = item.source;
        fiche.sourceUrl = item.link || '';
        fiche.date      = item.date
          ? new Date(item.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);

        await saveToFirestore(token, fiche);
        saved++;
        results.push({ ok: true, title: fiche.title.slice(0, 70), source: item.source });
        console.log(`[ok] "${fiche.title.slice(0, 60)}" (${item.source})`);

      } catch(e) {
        console.error(`[erreur] "${item.title?.slice(0, 50)}" :`, e.message);
        results.push({ ok: false, title: item.title?.slice(0, 60), error: e.message });
      }
    }

    return res.status(200).json({
      message: `Sync terminée — ${saved} article(s) ajouté(s)`,
      collectes: sources.length,
      sauvegardes: saved,
      results,
    });

  } catch(e) {
    console.error('[veille-sync] Erreur globale :', e.message);
    return res.status(500).json({ error: e.message });
  }
};
