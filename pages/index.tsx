// pages/index.tsx

import { useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleGenerateImage = async () => {
    try {
      const apiUrl =
        "https://api.cloudflare.com/client/v4/accounts/cb44248de67e3b2f434020452faa652f/ai/run/@cf/bytedance/stable-diffusion-xl-lightning";
      const headers = {
        Authorization: "Bearer tu_token_de_autorizacion",
        "X-Auth-Email": "bescobar2321@gmail.com",
        "X-Auth-Key": "50e6f077a0dc5bc51db4d2251a1710fedb3b0",
        "Content-Type": "application/json",
      };
      const data = {
        prompt: prompt,
      };

      const response = await axios.post(apiUrl, data, { headers });
      if (response.data.result) {
        setImageUrl(response.data.result); // Assuming the API response returns an image URL
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <h1>Generated Image for Prompt:</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button onClick={handleGenerateImage}>Generate Image</button>
      </div>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
};

export default MyComponent;
