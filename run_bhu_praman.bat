@echo off
title Bhu-Praman - SIH Land Record Intelligence System
echo ===============================================================================
echo     BHU-PRAMAN (bhu-praman) : Intelligent Land Record Digitization & Validation
echo     Smart India Hackathon (SIH 2026) Edition
echo ===============================================================================
echo.

cd /d "%~dp0"

echo [1/3] Verifying ML model weights and environment...
if not exist "backend\ml_models\land_risk_model.joblib" (
    echo [*] Training ML Models first...
    py backend\ml_models\train_models.py
)

echo [2/3] Starting FastAPI Backend on http://localhost:8000 ...
start "Bhu-Praman Backend API" cmd /k "py -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"

echo [3/3] Starting Vite Frontend on http://localhost:5173 ...
cd frontend
start "Bhu-Praman Web Portal" cmd /k "npm run dev"

echo.
echo ===============================================================================
echo   Bhu-Praman is launching!
echo   - Backend API Docs: http://localhost:8000/docs
echo   - Citizen & Tahsildar Portal: http://localhost:5173
echo ===============================================================================
echo Opening browser...
timeout /t 3 >nul
start http://localhost:5173
