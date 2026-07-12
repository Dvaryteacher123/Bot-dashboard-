// Hii ni logic inayokimbia kwenye server ya Vercel pekee
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { phone, amount } = req.body;

  try {
    const response = await fetch('https://api.harakapaya.com/v1/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HARAKA_PAYA_KEY}` // Vercel itaingiza key hapa
      },
      body: JSON.stringify({ phone, amount })
    });

    const result = await response.json();
    res.status(200).json({ success: true, message: 'Ombi limepokelewa!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Hitilafu imetokea' });
  }
}

