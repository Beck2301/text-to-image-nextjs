import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const MyComponent = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleGenerateImage = async () => {
    try {
      const apiUrl = '/api/generate-image'; 
      const response = await axios.post(apiUrl, {
        prompt: prompt,
      });

      // Verificamos la estructura de la respuesta
      if (response.data.result && typeof response.data.result === 'string') {
        setImageUrl(response.data.result); // Asignamos la URL de la imagen generada
      } else {
        console.error('No se recibió la URL de la imagen en la respuesta');
      }
    } catch (error: unknown) {
      // Manejo de errores
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error de Axios:', axiosError.message);
      } else {
        console.error('Error desconocido:', error);
      }
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
          <p>Imagen generada:</p>
          <img src={imageUrl} alt="Generated Image" />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
