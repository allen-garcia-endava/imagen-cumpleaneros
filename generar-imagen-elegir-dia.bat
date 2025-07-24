@echo off
set /p DIA=Introduce el día de inicio (ejemplo: 22):
set /p MES=Introduce el mes de inicio (ejemplo: 7):
node src\birthday-banner.js %DIA% %MES%
pause
