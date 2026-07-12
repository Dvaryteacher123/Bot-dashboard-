export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method si sahihi' });

  const { phone, amount, description } = req.body;

  const response = await fetch('https://harakapay.net/api/v1/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.HARAKA_PAYA_KEY
    },
    body: JSON.stringify({ phone, amount, description: description || "Malipo" })
  });

  const data = await response.json();
  res.status(200).json(data);
}
