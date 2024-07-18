// pages/api/generateImage.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const generateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiKey = process.env.CLOUDFLARE_API_KEY;
  const email = process.env.CLOUDFLARE_EMAIL;
  const aut = process.env.CLOUDFLARE_AUT;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!accountId || !apiKey || !email || !aut) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${aut}`,
          'X-Auth-Email': email,
          'X-Auth-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: "gato" }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.errors[0].message });
    }

    const data = await response.json();
    return res.status(200).json(data.result);
  } catch (err) {
    console.error('Error in generateImage:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default generateImage;
