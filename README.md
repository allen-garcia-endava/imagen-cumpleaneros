# Banner de Cumpleañeros

Este proyecto genera una imagen semanal con los cumpleaños del equipo y la guarda en la carpeta `cumples-semana`.

## Instalación rápida
1. Ejecuta el archivo `instalar-todo.bat` para instalar Node.js (si no está instalado) y todas las dependencias automáticamente.
2. Coloca las fotos de los empleados en la carpeta `fotos`.
3. Actualiza el archivo `cumples.csv` con los datos necesarios.

## Uso
- Ejecuta `generar-imagen.bat` para generar la imagen usando la fecha actual.
- Ejecuta `generar-imagen-elegir-dia.bat` para elegir el día y mes de inicio del rango de cumpleaños.
- La imagen se guardará en la carpeta `cumples-semana`.

## Archivos principales
- `instalar-todo.bat`: Instalador automático de Node.js y dependencias.
- `generar-imagen.bat`: Genera la imagen usando la fecha actual.
- `generar-imagen-elegir-dia.bat`: Permite elegir el día y mes de inicio.
- `cumples.csv`: Archivo con la lista de cumpleaños.
- Carpeta `fotos`: Imágenes de los empleados.
- Carpeta `cumples-semana`: Imágenes generadas.

## Notas
- No borres ni muevas las carpetas `fotos` ni `cumples-semana`.
- Si tienes problemas, ejecuta primero `instalar-todo.bat` y revisa que Node.js esté instalado correctamente.