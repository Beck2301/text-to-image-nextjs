import { useState } from "react";

const MyComponent = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleGenerateImage = async () => {
    try {
      const apiUrl = `/api/generate-image?prompt=${encodeURIComponent(prompt)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await response.blob();
      const imageURL = URL.createObjectURL(blob);

      setImageUrl(imageURL);
    } catch (error) {
      console.error("Error fetching image:", error);
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
      {imageUrl && (
        <div>
          <p>Generated Image:</p>
          <img
            src={imageUrl}
            alt="Generated Image"
            style={{ display: "block", userSelect: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
