const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'dnab30cey',      // ← cambia esto
  api_key: '635785478322796',       // ← cambia esto
  api_secret: 'GBhfosyg_UJimD36qUbeXRjaW6M'  // ← cambia esto
});

// Ruta local de la imagen
const filePath = path.resolve(__dirname, 'cumples-semana.png');

// Subida
cloudinary.uploader.upload(filePath, {
  folder: 'cumples',
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  resource_type: 'image'
}, (error, result) => {
  if (error) {
    console.error('❌ Error al subir:', error);
  } else {
    console.log('✅ Imagen subida a Cloudinary');
    console.log('🌐 URL pública:', result.secure_url);
  }
});