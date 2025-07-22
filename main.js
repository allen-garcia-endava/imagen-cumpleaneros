const cron = require('node-cron');
const { exec } = require('child_process');

// Función para ejecutar el generador
function generarBanner() {
  exec('node birthday-banner.js', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error generando imagen:', err);
    } else {
      console.log('✅ Imagen generada:');
      console.log(stdout);
    }
  });
}

// 🕒 Ejecutar cada lunes a las 9:00 AM
/*cron.schedule('0 9 * * 1', () => {
  console.log('⏰ Ejecutando tarea semanal...');
  generarBanner();
});*/

// 🚀 Ejecutar inmediatamente al iniciar
console.log('🚀 Generando imagen ahora mismo...');
generarBanner();
