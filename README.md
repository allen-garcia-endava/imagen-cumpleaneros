# Banner de Cumpleañeros

Este proyecto genera una imagen semanal con los cumpleaños del equipo y la guarda en la carpeta `cumples-semana`.

## Requisitos
- Node.js instalado
- Dependencias instaladas (ejecuta `npm install` en la carpeta `src`)

## Archivos principales en la raíz
- `generar-imagen.bat`: Genera la imagen usando la fecha actual.
- `generar-imagen-elegir-dia.bat`: Permite elegir el día y mes de inicio para el rango de cumpleaños.
- `cumples.csv`: Archivo con la lista de cumpleaños.
- Carpeta `fotos`: Imágenes de los empleados.
- Carpeta `cumples-semana`: Imágenes generadas.

## Uso
1. Coloca las fotos de los empleados en la carpeta `fotos`.
2. Actualiza el archivo `cumples.csv` con los datos necesarios.
3. Ejecuta uno de los archivos `.bat`:
   - `generar-imagen.bat` para usar la fecha actual.
   - `generar-imagen-elegir-dia.bat` para elegir la fecha de inicio.
4. La imagen se guardará en la carpeta `cumples-semana`.

## Instalación de dependencias
Abre una terminal en la carpeta `src` y ejecuta:
```
npm install
```

## Notas
- No borres ni muevas las carpetas `fotos` ni `cumples-semana`.
- Si tienes problemas, revisa que Node.js esté instalado y que las dependencias estén correctamente instaladas.
