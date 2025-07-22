
const fetch = require('node-fetch');
const webhookUrl = 'https://prod-06.westeurope.logic.azure.com:443/workflows/e679ec5d91f44d1c9dfdcd3ac8f66053/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0a40bu9ZfDsQ8sAwyJcQieq7q5DpGVFc8JH56jqw9xg'; // tu webhook


// URL pública de la imagen generada

async function enviarMensaje() {
  const mensaje = {
    text: "🎂 ¡Estos son los cumpleañeros de esta semana!",
    attachments: [
      {
        contentType: "image/png",
        contentUrl: imagenUrl,
        name: "cumples-semana.png"
      }
    ]
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mensaje)
  });

  if (response.ok) {
    console.log("✅ Imagen enviada a Teams");
  } else {
    console.error("❌ Error al enviar a Teams:", response.statusText);
  }
}

enviarMensaje();

