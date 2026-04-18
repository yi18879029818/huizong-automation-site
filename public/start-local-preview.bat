@echo off
set "SITE_ROOT=%~dp0"
start "Huizong Local Preview" powershell -NoExit -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%SITE_ROOT%start-local-preview.ps1" -Port 8080
timeout /t 2 /nobreak >nul
start "" "http://localhost:8080/"
