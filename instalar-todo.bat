@echo off
REM Instalador para Node.js y dependencias del proyecto

REM 1. Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js no está instalado. Descargando instalador...
    powershell -Command "Start-Process 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -Wait"
    echo Por favor, instala Node.js y luego vuelve a ejecutar este script.
    pause
    exit /b
)

REM 2. Instalar dependencias
cd /d %~dp0
if exist package.json (
    echo Instalando dependencias...
    npm install
    echo Instalación completada.
) else (
    echo No se encontró package.json. Asegúrate de estar en la carpeta del proyecto.
)
pause
