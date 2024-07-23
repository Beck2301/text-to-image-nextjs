import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: `${process.env.AWS_REGION}`,
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const listParams = {
        Bucket: `${BUCKET_NAME}`,
      };

      const { Contents } = await s3.listObjectsV2(listParams).promise();

      if (!Contents) {
        return res.status(404).json({ error: "No images found" });
      }

      const imageUrls = Contents.map((item) => {
        return {
          imageUrl: s3.getSignedUrl("getObject", {
            Bucket: BUCKET_NAME,
            Key: item.Key as string,
          }),
        };
      });

      res.status(200).json(imageUrls);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve images" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
