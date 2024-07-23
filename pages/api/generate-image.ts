import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { prompt } = req.query;

    if (!process.env.AWS_S3_BUCKET_NAME) {
      res.status(500).json({ error: "S3 bucket name is not defined" });
      return;
    }

    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`;
    const headers = {
      Authorization: `Bearer ${process.env.CLOUDFLARE_AUT}`,
      "X-Auth-Email": `${process.env.CLOUDFLARE_EMAIL}`,
      "X-Auth-Key": `${process.env.CLOUDFLARE_API_KEY}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        res.status(response.status).json({ error: "Failed to generate image" });
        return;
      }

      const imageBuffer = await response.arrayBuffer();
      res.status(200).send(Buffer.from(imageBuffer));
      const buffer = Buffer.from(imageBuffer);

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}-${prompt}.png`,
        Body: buffer,
        ContentType: "image/png",
      };

      const s3Response = await s3.upload(uploadParams).promise();
      const imageUrl = s3Response.Location;

      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error("Error uploading to S3", error);
      res.status(500).json({ error: "Failed to upload image to S3" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
