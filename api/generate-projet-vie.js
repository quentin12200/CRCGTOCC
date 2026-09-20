/**
 * Vercel Serverless Function — Générateur de projet de vie MDPH
 * POST /api/generate-projet-vie
 */

const https = require('https');

function callOpenAI(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4,
      max_tokens: 2000,
    });

    const req = https.request({
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(new Error(json.error.message));
          resolve(json.choices[0].message.content.trim());
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(45000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY manquante' });

  let body = '';
  req.on('data', c => body += c);
  await new Promise(r => req.on('end', r));

  let data;
  try { data = JSON.parse(body); } catch { return res.status(400).json({ error: 'JSON invalide' }); }

  const { profil, identite, domaines, psychosocial, aspirations, prestations } = data;

  if (!profil || !identite) return res.status(400).json({ error: 'Données manquantes' });

  const estEnfant = profil.type === 'enfant';
  const pronoms = estEnfant
    ? `${identite.prenom} (écrit à la troisième personne, par les parents)`
    : 'je/me/ma (première personne)';

  const systeme = `Tu es un expert en droit du handicap français et en accompagnement MDPH, formé aux pratiques de l'APF France Handicap et de la CNSA.
Tu rédiges des projets de vie MDPH professionnels, complets et personnalisés.

RÈGLES ABSOLUES :
1. Rédige TOUJOURS en ${pronoms}
2. Utilise un langage fonctionnel (impact concret, exemples chiffrés) et non purement médical
3. Structure le texte en 5 parties numérotées avec titres en gras
4. Pour chaque difficulté, applique la logique : RETENTISSEMENT → BESOIN → ATTENTE
5. Chiffre les limitations quand c'est pertinent (distance, durée, fréquence, EVA douleur)
6. Ne minimise jamais les difficultés, décris aussi les mauvais jours
7. Relie explicitement chaque besoin à une prestation demandée
8. Si une information manque, mets [À COMPLÉTER] plutôt qu'inventer
9. Ne copie pas de modèle générique — utilise exclusivement les faits fournis
10. Longueur cible : 2 à 3 pages (600-900 mots), dense mais lisible

STRUCTURE OBLIGATOIRE :
**1. Présentation et contexte**
**2. Impact du handicap sur la vie quotidienne** (domaines GEVA)
**3. Retentissement psychologique et social**
**4. Aspirations et projet de vie**
**5. Besoins identifiés et attentes envers la MDPH**`;

  const contexte = `
PROFIL :
- Type : ${estEnfant ? 'Enfant (rédigé par les parents)' : 'Adulte'}
- Type de handicap : ${profil.typeHandicap || '[À COMPLÉTER]'}
- Rédigé par : ${profil.redacteur || (estEnfant ? 'les parents' : 'la personne elle-même')}

IDENTITÉ :
- Prénom/Nom : ${identite.prenom || '[À COMPLÉTER]'} ${identite.nom || ''}
- Âge / Date de naissance : ${identite.age || '[À COMPLÉTER]'}
- Situation familiale : ${identite.situationFamiliale || '[À COMPLÉTER]'}
- Lieu de vie : ${identite.logement || '[À COMPLÉTER]'}
- Situation professionnelle/scolaire : ${identite.emploiScolarite || '[À COMPLÉTER]'}
- Diagnostic(s) : ${identite.diagnostics || '[À COMPLÉTER]'}
- Médecins / professionnels de santé : ${identite.medecins || '[À COMPLÉTER]'}
- Aides déjà en place : ${identite.aidesActuelles || 'Aucune mentionnée'}

IMPACT SUR LA VIE QUOTIDIENNE (domaines GEVA) :
${domaines ? Object.entries(domaines).filter(([, v]) => v && v.trim()).map(([k, v]) => `- ${k} : ${v}`).join('\n') : '[Non renseigné]'}

RETENTISSEMENT PSYCHOLOGIQUE ET SOCIAL :
${psychosocial || '[Non renseigné]'}

ASPIRATIONS ET PROJET DE VIE :
${aspirations || '[Non renseigné]'}

PRESTATIONS DEMANDÉES :
${prestations && prestations.length > 0 ? prestations.join(', ') : '[Non précisées]'}
`;

  try {
    const result = await callOpenAI([
      { role: 'system', content: systeme },
      { role: 'user', content: `Rédige le projet de vie MDPH complet avec les informations suivantes :\n${contexte}` },
    ]);
    res.status(200).json({ projet: result });
  } catch (err) {
    console.error('[generate-projet-vie]', err.message);
    res.status(500).json({ error: `Erreur IA : ${err.message}` });
  }
};
