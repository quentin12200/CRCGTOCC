/**
 * Vercel Serverless Function — Générateur de courrier AT/MP IA
 * POST /api/generate-courrier
 * Body JSON: { type, expediteur, destinataire, situation, details }
 */

const https = require('https');

function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Tu es un expert juridique en droit du travail français spécialisé AT/MP (accidents du travail et maladies professionnelles), formé par la CGT Occitanie.
Tu rédiges des courriers officiels en français formel, précis et juridiquement solides.
Tes courriers :
- Citent les articles de loi pertinents (Code de la sécurité sociale, Code du travail)
- Utilisent un ton assertif mais courtois, jamais agressif
- Incluent toutes les mentions légales obligatoires
- Se terminent par "Dans l'attente de votre réponse, veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
- N'inventent JAMAIS d'informations : si une info manque, mets [À COMPLÉTER]
Réponds UNIQUEMENT avec le texte du courrier, sans explication ni commentaire.`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1200,
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
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

const TYPES = {
  declaration_at_salarie: 'Déclaration d\'accident du travail par le salarié (employeur défaillant) — CPAM',
  contestation_refus: 'Contestation d\'un refus de prise en charge AT/MP par la CPAM',
  rechute: 'Déclaration de rechute d\'un accident du travail',
  faute_inexcusable: 'Mise en demeure pour faute inexcusable de l\'employeur',
  reconnaissance_mp: 'Demande de reconnaissance de maladie professionnelle',
  inaptitude: 'Contestation d\'une décision d\'inaptitude après AT',
  taux_iipp: 'Contestation du taux d\'IPP (incapacité permanente partielle)',
  licenciement: 'Mise en demeure suite à licenciement abusif pendant arrêt AT',
  employeur_declaration: 'Mise en demeure à l\'employeur pour déclaration AT non effectuée',
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY manquante' });
  }

  let body = '';
  req.on('data', c => body += c);
  await new Promise(r => req.on('end', r));

  let data;
  try { data = JSON.parse(body); } catch {
    return res.status(400).json({ error: 'JSON invalide' });
  }

  const { type, expediteur, destinataire, situation } = data;

  if (!type || !TYPES[type]) return res.status(400).json({ error: 'Type de courrier invalide' });
  if (!expediteur?.nom) return res.status(400).json({ error: 'Informations expéditeur manquantes' });

  const typeLabel = TYPES[type];

  const prompt = `Rédige un courrier officiel de type : "${typeLabel}".

EXPÉDITEUR :
- Nom complet : ${expediteur.nom}
- Adresse : ${expediteur.adresse || '[À COMPLÉTER]'}
- Code postal, ville : ${expediteur.cp_ville || '[À COMPLÉTER]'}
- Numéro de sécurité sociale : ${expediteur.nss || '[À COMPLÉTER]'}
- Téléphone : ${expediteur.telephone || '[À COMPLÉTER]'}
- Employeur : ${expediteur.employeur || '[À COMPLÉTER]'}

DESTINATAIRE :
${destinataire || '[À définir selon le type de courrier]'}

SITUATION :
${situation || 'Situation standard — adapter selon les éléments fournis.'}

DATE DU COURRIER : ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}

Rédige le courrier complet avec : coordonnées expéditeur en haut à gauche, destinataire à droite, lieu et date, objet en gras, corps du courrier avec références légales précises, formule de politesse, signature.
Les zones d'information manquantes doivent apparaître comme [À COMPLÉTER].`;

  try {
    const courrier = await callOpenAI(prompt);
    res.status(200).json({ courrier, type: typeLabel });
  } catch (err) {
    console.error('[generate-courrier]', err.message);
    res.status(500).json({ error: `Erreur IA : ${err.message}` });
  }
};
