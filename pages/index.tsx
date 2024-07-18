import { useState } from "react";

const IAimageGeneate = () => {
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
    <div className="md:max-w-2xl w-3/4">
      <h1 className="text-3xl">Generated Image for Prompt:</h1>
      <div className="my-5 flex gap-5 justify-center" >
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={handlePromptChange}
          className="bg-transparent border-b w-full"
        />
        <button onClick={handleGenerateImage} className="bg-white p-3 text-black rounded-lg">Generate</button>
      </div>
      {imageUrl && (
        <div>
          <p>Generated Image:</p>
          <img
            src={imageUrl}
            alt="Generated Image"
            style={{ display: "block", userSelect: "none" }}
            className="w-full mt-5"
          />
        </div>
      )}
    </div>
  );
};

export default IAimageGeneate;
