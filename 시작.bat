@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 감사 길잡이 (비설치판)
echo ============================================
echo   감사 길잡이 - 비설치(브라우저)판
echo   로컬 서버를 시작합니다 (외부 통신 없음)
echo ============================================
start "감사 길잡이 서버" /min cmd /c "node ""%~dp0server.js"""
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:8787"
echo.
echo 브라우저가 열립니다. http://127.0.0.1:8787
echo 종료하려면 최소화된 "감사 길잡이 서버" 창을 닫으세요.
timeout /t 4 >nul
