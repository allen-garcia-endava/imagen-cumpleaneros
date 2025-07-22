const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const csv = require("csv-parser");
const dayjs = require("dayjs");
const cloudinary = require("cloudinary").v2;
const XLSX = require('xlsx');

const WIDTH = 1366;
const HEIGHT = 768;
const PHOTO_SIZE = 150;

const formatted = dayjs().format("YYMMDDHHmmss");
const OUTPUT_FILE = "cumples-semana" + formatted + ".png";

// 🔐 Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dnab30cey",
  api_key: "635785478322796",
  api_secret: "GBhfosyg_UJimD36qUbeXRjaW6M",
});

const webhookUrl =
  "https://prod-152.westeurope.logic.azure.com:443/workflows/3104fa7d334348a4b0eb40f3db22cf13/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cEcao1AlQ0fgpPdZc-OFMkpBNyIlshpxoxbCMoyDGO0";

const empleados = [];

fs.createReadStream("cumples.csv")
  .pipe(csv())
  .on("data", (row) => empleados.push(row))
  .on("end", async () => {
    try {
      const hoy = dayjs();
      const diasSemana = Array.from({ length: 7 }, (_, i) => hoy.add(i, "day"));

      const cumpleaneros = empleados.filter((emp) => {
        const dia = parseInt(emp.Dia, 10);
        const mes = parseInt(emp.Mes, 10);
        return diasSemana.some(
          (d) => d.date() === dia && d.month() + 1 === mes
        );
      });

      console.log(`🎉 Cumpleañeros de la semana: ${cumpleaneros.length}`);

      const canvas = createCanvas(WIDTH, HEIGHT);
      const ctx = canvas.getContext("2d");

      const background = await loadImage("imagenes/background.png");
      ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

      const maxPorFila = 4;
      const filaYBase = 320;
      const filaAltura = PHOTO_SIZE + 100;

      // Dibuja badge de la semana
      const fechaInicio = hoy.format("MMMM DD");
      const fechaFin = hoy.add(6, "day").format("MMMM DD");
      const textoRango = `${fechaInicio} to ${fechaFin}`;

      ctx.save();
      ctx.translate(1100, 130);
      ctx.rotate(-0.1);
      ctx.fillStyle = "#FF5C45";
      ctx.font = "bold 24px Arial";
      const textWidth = ctx.measureText(textoRango).width;
      const badgeWidth = textWidth + 40;
      const badgeHeight = 40;
      const radius = 20;

      ctx.beginPath();
      ctx.moveTo(-badgeWidth / 2 + radius, -badgeHeight / 2);
      ctx.lineTo(badgeWidth / 2 - radius, -badgeHeight / 2);
      ctx.quadraticCurveTo(
        badgeWidth / 2,
        -badgeHeight / 2,
        badgeWidth / 2,
        -badgeHeight / 2 + radius
      );
      ctx.lineTo(badgeWidth / 2, badgeHeight / 2 - radius);
      ctx.quadraticCurveTo(
        badgeWidth / 2,
        badgeHeight / 2,
        badgeWidth / 2 - radius,
        badgeHeight / 2
      );
      ctx.lineTo(-badgeWidth / 2 + radius, badgeHeight / 2);
      ctx.quadraticCurveTo(
        -badgeWidth / 2,
        badgeHeight / 2,
        -badgeWidth / 2,
        badgeHeight / 2 - radius
      );
      ctx.lineTo(-badgeWidth / 2, -badgeHeight / 2 + radius);
      ctx.quadraticCurveTo(
        -badgeWidth / 2,
        -badgeHeight / 2,
        -badgeWidth / 2 + radius,
        -badgeHeight / 2
      );
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.fillText(textoRango, -textWidth / 2, 8);
      ctx.restore();

      for (let i = 0; i < cumpleaneros.length; i++) {
        const emp = cumpleaneros[i];
        const fila = Math.floor(i / maxPorFila);
        const columna = i % maxPorFila;

        let filaBase = cumpleaneros.length <= 4 ? 400 : filaYBase;
        const personasEnFila = cumpleaneros.slice(
          fila * maxPorFila,
          (fila + 1) * maxPorFila
        );
        const spacingFila = WIDTH / (personasEnFila.length + 1);
        const x = spacingFila * (columna + 1);
        const y = filaBase + fila * filaAltura;

        // Carga de Fotos
        let fotoNombre = emp.Foto && emp.Foto.trim() ? emp.Foto.trim() : "user.png";
        let imagePath = path.join(__dirname, "fotos", fotoNombre);
        console.log("Cargando imagen:", imagePath);

        try {
          const img = await loadImage(imagePath);
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, PHOTO_SIZE / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(
            img,
            x - PHOTO_SIZE / 2,
            y - PHOTO_SIZE / 2,
            PHOTO_SIZE,
            PHOTO_SIZE
          );
          ctx.restore();
        } catch (err) {
          console.log(
            `❌ Error al cargar la imagen ${emp.Foto}:`,
            err.message
          );
          continue;
        }

        const burbuja = await loadImage("./imagenes/day-bubble.png");
        const bubbleWidth = 80;
        const bubbleHeight = 35;
        const bubbleX = x - bubbleWidth / 2 + 80;
        const bubbleY = y - PHOTO_SIZE / 2 - 10;

        ctx.drawImage(burbuja, bubbleX, bubbleY, bubbleWidth, bubbleHeight);

        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "white";
        const diaTexto = String(emp.Dia).padStart(2, "0");
        const anchoDia = ctx.measureText(diaTexto).width;
        ctx.fillText(
          diaTexto,
          x - anchoDia / 2 + 84,
          bubbleY + bubbleHeight / 2 + 2
        );

        ctx.font = "bold 28px Arial";
        const textWidthNombre = ctx.measureText(emp.Nombre).width;
        ctx.fillText(
          emp.Nombre,
          x - textWidthNombre / 2,
          y + PHOTO_SIZE / 2 + 40
        );
      }

      // Guardar imagen localmente
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(OUTPUT_FILE, buffer);
      console.log("✅ Imagen generada:", OUTPUT_FILE);

      // Subir a Cloudinary
      /*
      const uploadResult = await cloudinary.uploader.upload(OUTPUT_FILE, {
        folder: "cumples",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const urlPublica = uploadResult.secure_url;
      console.log("✅ Imagen subida a Cloudinary");
      console.log("🌐 URL pública:", urlPublica);

      // Enviar a Teams
      console.log("🚀 Enviando mensaje a Teams...");

      const mensaje = {
        content: {
          attachments: [
            {
              contentType: "image/png",
              contentUrl: urlPublica,
              name: OUTPUT_FILE,
            },
          ],
        },
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mensaje),
      });

      if (response.ok) {
        console.log("✅ Imagen enviada a Teams");
      } else {
        const errorText = await response.text();
        console.error("❌ Error al enviar a Teams:", response.statusText);
        console.error("🔍 Detalle:", errorText);
      }
      */
    } catch (err) {
      console.error("❌ Error general:", err.message);
    }
  });