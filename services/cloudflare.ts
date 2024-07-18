// services/cloudflare.ts
export const generateImage = async (text: string): Promise<string> => {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate image');
    }
  
    const data = await response.json();
    return data.result.url; // Ajusta según la respuesta de la API
  };
