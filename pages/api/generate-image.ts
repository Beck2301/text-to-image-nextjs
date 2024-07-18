import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { prompt } = req.query;
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`;
    const headers = {
      Authorization: `Bearer ${process.env.CLOUDFLARE_AUT}`,
      "X-Auth-Email": `${process.env.CLOUDFLARE_EMAIL} `,
      "X-Auth-Key": `${process.env.CLOUDFLARE_API_KEY} `,
      "Content-Type": "application/json",
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ prompt: prompt }),
    });

    const imageBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(Buffer.from(imageBuffer));
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
