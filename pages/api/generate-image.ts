// pages/api/generate-image.ts

import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const apiUrl = 'https://api.cloudflare.com/client/v4/accounts/cb44248de67e3b2f434020452faa652f/ai/run/@cf/bytedance/stable-diffusion-xl-lightning';
    const headers = {
      'Authorization': 'Bearer tu_token_de_autorizacion',
      'X-Auth-Email': 'bescobar2321@gmail.com',
      'X-Auth-Key': '50e6f077a0dc5bc51db4d2251a1710fedb3b0',
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post(apiUrl, req.body, { headers });

      res.status(response.status).json(response.data);
    } catch (error: unknown) {
      // Manejamos el error
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          res.status(axiosError.response.status).json({ error: axiosError.response.data });
        } else {
          res.status(500).json({ error: axiosError.message });
        }
      } else {
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
