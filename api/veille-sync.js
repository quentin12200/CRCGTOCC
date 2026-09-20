/**
 * Vercel Serverless Function — Veille juridique AT/MP
 * Cron : tous les jours à 6h (voir vercel.json)
 *
 * Variables d'environnement requises (Vercel Settings > Env Vars) :
 *   OPENAI_API_KEY        — clé OpenAI
 *   FIREBASE_PROJECT_ID   — crocc-b499f
 *   FIREBASE_CLIENT_EMAIL — depuis le JSON compte de service Firebase
 *   FIREBASE_PRIVATE_KEY  — depuis le JSON compte de service Firebase
 *   CRON_SECRET           — mot de passe pour appel manuel
 *   JUDILIBRE_API_KEY     — (optionnel) clé gratuite sur piste.gouv.fr
 */

const https = require('https');
const { createSign } = require('crypto');

// ── Fetch générique ────────────────────────────────────────────────────────────
function fetchUrl(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'CGT-Occitanie-Veille/1.0', 'Accept': 'application/xml,text/html,*/*', ...opts.headers },
    }, res => {
      // Suivre les redirections
      if ([301, 302, 303, 307].includes(res.statusCode) && res.headers.location) {
        return fetchUrl(res.headers.location, opts).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(12000, () => { req.destroy(); reject(new Error('timeout ' + url)); });
  });
}

// ── Parser RSS ────────────────────────────────────────────────────────────────
function parseRSS(xml, source, cat, limit = 6) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null && items.length < limit) {
    const b = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
      return (r.exec(b) || [])[1]?.trim() || '';
    };
    const title = get('title');
    const desc  = get('description').replace(/<[^>]+>/g, '').trim().slice(0, 500);
    const link  = get('link');
    const date  = get('pubDate');
    if (title.length > 10) {
      items.push({ title, desc, link, date, source, cat });
    }
  }
  return items;
}

// ── Source 1 : Ameli.fr RSS ────────────────────────────────────────────────────
async function fetchAmeli() {
  const urls = [
    'https://www.ameli.fr/l-assurance-maladie/flux-rss.php',
    'https://www.ameli.fr/espace-presse/flux-rss.php',
  ];
  const items = [];
  for (const url of urls) {
    try {
      const r = await fetchUrl(url);
      if (r.status === 200 && r.body.includes('<item>')) {
        parseRSS(r.body, 'Ameli.fr', 'circulaire').forEach(i => items.push(i));
        break;
      }
    } catch(e) { console.warn('[ameli]', e.message); }
  }
  console.log(`[ameli] ${items.length} articles`);
  return items;
}

// ── Source 2 : Agefiph RSS ────────────────────────────────────────────────────
async function fetchAgefiph() {
  const items = [];
  try {
    const r = await fetchUrl('https://www.agefiph.fr/Flux-RSS');
    if (r.status === 200 && r.body.includes('<item>')) {
      parseRSS(r.body, 'Agefiph', 'pratique').forEach(i => items.push(i));
    }
  } catch(e) { console.warn('[agefiph]', e.message); }
  console.log(`[agefiph] ${items.length} articles`);
  return items;
}

// ── Source 3 : API Judilibre (Cour de cassation) ──────────────────────────────
async function fetchJudilibre() {
  const key = process.env.JUDILIBRE_API_KEY;
  if (!key) {
    console.log('[judilibre] Pas de clé API — source ignorée');
    return [];
  }
  const items = [];
  try {
    // Recherche décisions chambre sociale sur AT/MP (30 derniers jours)
    const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const query = encodeURIComponent('accident travail maladie professionnelle');
    const url = `https://api.piste.gouv.fr/cassation/judilibre/v1.0/search?query=${query}&chamber=soc&date_start=${since}&page_size=5&resolve_references=false`;
    const r = await fetchUrl(url, { headers: { 'KeyId': key, 'Accept': 'application/json' } });
    if (r.status === 200) {
      const data = JSON.parse(r.body);
      (data.results || []).forEach(d => {
        items.push({
          title: d.summary || d.title || `Arrêt Cass. soc. ${d.decision_date}`,
          desc: (d.zones?.introduction || '').slice(0, 500),
          link: `https://www.courdecassation.fr/decision/${d.id}`,
          date: d.decision_date,
          source: 'Cour de cassation — Chambre sociale',
          cat: 'arret',
          ref: `Cass. soc., ${d.decision_date}, n° ${d.number}`,
        });
      });
    } else {
      console.warn('[judilibre] Statut', r.status);
    }
  } catch(e) { console.warn('[judilibre]', e.message); }
  console.log(`[judilibre] ${items.length} arrêts`);
  return items;
}

// ── Collecte toutes sources ────────────────────────────────────────────────────
async function collectSources() {
  const [ameli, agefiph, judilibre] = await Promise.all([
    fetchAmeli(),
    fetchAgefiph(),
    fetchJudilibre(),
  ]);
  const all = [...judilibre, ...ameli, ...agefiph];
  console.log(`[collect] Total : ${all.length} articles`);
  return all;
}

// ── Résumé OpenAI avec vraie analyse syndicale ────────────────────────────────
async function resumeWithGPT(item) {
  const prompt = `Tu es un expert juridique et formateur syndical CGT, spécialisé en droit AT/MP (accidents du travail et maladies professionnelles).

Voici une actualité juridique brute :
Source : ${item.source}
${item.ref ? 'Référence : ' + item.ref : ''}
Titre : ${item.title}
${item.desc ? 'Contenu : ' + item.desc : ''}
${item.link ? 'URL : ' + item.link : ''}

Produis une fiche pratique CGT structurée. Réponds UNIQUEMENT en JSON valide :
{
  "title": "Titre clair et percutant pour un militant CGT (80 caractères max)",
  "body": "Résumé factuel en 2-3 phrases : ce qui change, ce qui est confirmé, pourquoi c'est important pour les salariés",
  "detail": "Analyse syndicale en HTML simple (<ul><li>). Inclure obligatoirement : 1) Ce que ça change concrètement pour le salarié victime d'AT/MP, 2) Ce que le délégué CGT doit faire en pratique, 3) L'argument CGT à utiliser en négociation ou en formation, 4) Les pièges à éviter ou les droits à revendiquer",
  "impact": "high | med | low",
  "impactLabel": "Description courte de l'impact (ex: Impact fort — nouveaux droits salariés)",
  "cat": "${item.cat}",
  "angle_cgt": "En une phrase : la position ou la revendication CGT face à cette actualité"
}`;

  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.25,
    max_tokens: 800,
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
          if (json.error) { reject(new Error(json.error.message)); return; }
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

// ── Token Firestore (JWT RS256) ────────────────────────────────────────────────
async function getFirestoreToken() {
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

  const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

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
        try {
          const json = JSON.parse(d);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error('Token Firebase échoué : ' + d.slice(0, 200)));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Sauvegarde dans Firestore ──────────────────────────────────────────────────
async function saveToFirestore(token, doc) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const fields = {};
  Object.entries(doc).forEach(([k, v]) => {
    if (typeof v === 'boolean') fields[k] = { booleanValue: v };
    else fields[k] = { stringValue: String(v || '') };
  });
  fields.createdAt   = { timestampValue: new Date().toISOString() };
  fields.isNew       = { booleanValue: true };

  const body = JSON.stringify({ fields });
  const path = `/v1/projects/${projectId}/databases/(default)/documents/veille/${id}`;

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      path,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve({ id, status: res.statusCode });
        else reject(new Error(`Firestore ${res.statusCode}: ${d.slice(0, 200)}`));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Vérifie si un article existe déjà (évite les doublons) ────────────────────
async function alreadyExists(token, title) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const slug = title.toLowerCase().slice(0, 60).replace(/\s+/g, '-');
  // Simple : on lit les 20 derniers et on compare les titres
  const path = `/v1/projects/${projectId}/databases/(default)/documents/veille?pageSize=20&orderBy=createdAt%20desc`;

  return new Promise(resolve => {
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const docs = json.documents || [];
          const found = docs.some(doc => {
            const t = doc.fields?.title?.stringValue || '';
            return t.toLowerCase().slice(0, 60).replace(/\s+/g, '-') === slug;
          });
          resolve(found);
        } catch { resolve(false); }
      });
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

// ── Handler principal ──────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // Sécurité : cron Vercel ou appel manuel avec secret
  const isCron   = req.headers['x-vercel-cron'] === '1';
  const isManual = req.headers['authorization'] === `Bearer ${process.env.CRON_SECRET}`;
  if (!isCron && !isManual) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY manquante' });
  if (!process.env.FIREBASE_PROJECT_ID) return res.status(500).json({ error: 'FIREBASE_PROJECT_ID manquante' });

  try {
    console.log('[veille-sync] ── Démarrage ──');
    const sources = await collectSources();

    if (!sources.length) {
      return res.status(200).json({ message: 'Aucune source collectée — vérifier les URLs', count: 0 });
    }

    const token = await getFirestoreToken();
    const results = [];
    let saved = 0;

    // Max 6 articles par run pour limiter les coûts OpenAI
    for (const item of sources.slice(0, 6)) {
      try {
        // Éviter les doublons
        const exists = await alreadyExists(token, item.title);
        if (exists) {
          console.log(`[skip] Déjà en base : "${item.title.slice(0, 50)}"`);
          results.push({ ok: false, reason: 'doublon', title: item.title });
          continue;
        }

        const fiche = await resumeWithGPT(item);
        fiche.source    = item.source;
        fiche.sourceUrl = item.link || '';
        fiche.date      = (item.date ? new Date(item.date) : new Date()).toISOString().slice(0, 10);
        fiche.ref       = item.ref || '';

        const s = await saveToFirestore(token, fiche);
        saved++;
        results.push({ ok: true, id: s.id, title: fiche.title });
        console.log(`[ok] Sauvegardé : "${fiche.title.slice(0, 60)}"`);

      } catch(e) {
        console.error(`[erreur] "${item.title.slice(0, 50)}" :`, e.message);
        results.push({ ok: false, title: item.title, error: e.message });
      }
    }

    return res.status(200).json({
      message: `Sync terminée — ${saved} article(s) ajouté(s)`,
      total_collectes: sources.length,
      traites: results.length,
      sauvegardes: saved,
      results,
    });

  } catch(e) {
    console.error('[veille-sync] Erreur globale :', e);
    return res.status(500).json({ error: e.message });
  }
};
