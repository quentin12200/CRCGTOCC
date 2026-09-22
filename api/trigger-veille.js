/**
 * Vercel Serverless Function — Déclenchement manuel de la veille
 * POST /api/trigger-veille
 * Réservé aux administrateurs (cgt_auth côté client + CRON_SECRET côté serveur)
 */

const syncHandler = require('./veille-sync');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Accepte : Authorization: Bearer <CRON_SECRET>
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token || token !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Non autorisé — token administrateur requis' });
  }

  // Réutilise le handler veille-sync en simulant un appel cron
  const fakeReq = { headers: { 'x-vercel-cron': '1' }, method: 'POST' };
  return syncHandler(fakeReq, res);
};
