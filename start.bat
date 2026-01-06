@echo off
echo ======================================
echo   Starting NoteX Application
echo ======================================
echo.

echo Starting Backend Server...
start "NoteX Backend" cmd /k "cd /d %~dp0server && npm start"
timeout /t 3 >nul

echo Starting Frontend Server...
start "NoteX Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ======================================
echo   NoteX is starting!
echo ======================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
