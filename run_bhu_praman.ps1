# Bhu-Praman Launch Script for PowerShell
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "    BHU-PRAMAN : Intelligent Land Record Digitization & Validation System      " -ForegroundColor Green
Write-Host "    Smart India Hackathon (SIH 2026) Platform                                  " -ForegroundColor Yellow
Write-Host "===============================================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# 1. Check ML Models
if (-not (Test-Path "$scriptDir\backend\ml_models\land_risk_model.joblib")) {
    Write-Host "[*] Training ML Models..." -ForegroundColor Yellow
    py "$scriptDir\backend\ml_models\train_models.py"
}

# 2. Launch Backend
Write-Host "[1/2] Launching Backend API on http://localhost:8000..." -ForegroundColor Green
Start-Process -FilePath "py" -ArgumentList "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" -WorkingDirectory $scriptDir

# 3. Launch Frontend
Write-Host "[2/2] Launching Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "$scriptDir\frontend"

Start-Sleep -Seconds 3
Start-Process "http://localhost:5173"

Write-Host "Done! Access the platform at http://localhost:5173" -ForegroundColor Cyan
