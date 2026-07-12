export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { phone, amount } = req.body;

  try {
    console.log("Inajaribu kuunganisha na Haraka Paya..."); // Hii itatokea kwenye logs

    const response = await fetch('https://api.harakapaya.com/v1/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HARAKA_PAYA_KEY}`
      },
      body: JSON.stringify({ phone, amount })
    });

    const result = await response.json();
    
    // Kama response haikufanikiwa, tunataka kuona kosa hilo
    if (!response.ok) {
      console.error("KOSA KUTOKA HARAKA PAYA:", result);
      return res.status(response.status).json(result);
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("KOSA LA SYSTEM:", error.message); // Hii ndiyo itatusaidia kuona shida
    res.status(500).json({ success: false, message: error.message });
  }
}
