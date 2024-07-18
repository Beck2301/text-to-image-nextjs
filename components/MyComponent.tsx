import { useState } from "react";

function MyComponent() {
  const [responseText, setResponseText] = useState("");

  const fetchData = async () => {
    const url = 'https://api.cloudflare.com/client/v4/accounts/cb44248de67e3b2f434020452faa652f/ai/run/@cf/bytedance/stable-diffusion-xl-lightning'
    const promptText = prompt('Introduce el texto:');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer tu_token_de_autorizacion',
            'X-Auth-Email': 'bescobar2321@gmail.com',
            'X-Auth-Key': '50e6f077a0dc5bc51db4d2251a1710fedb3b0',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "guidance": 7.5,
            "height": 1024,
            "image": [0],
            "image_b64": "",
            "lora_weights": [0],
            "loras": ["string"],
            "mask": [0],
            "negative_prompt": "string",
            "num_steps": 20,
            "prompt": promptText,
            "seed": 0,
            "strength": 1,
            "width": 1024
        }),
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (data.success) {
            console.log(data.result); // Maneja la respuesta según tus necesidades
        } else {
            console.error('Error en la solicitud:', data); // Maneja el caso de error según necesites
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
};


  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Respuesta: {responseText}</p>
    </div>
  );
}

export default MyComponent;


