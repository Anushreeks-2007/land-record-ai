# Bhu-Praman (भू-प्रमाण)
### Intelligent Land Record Digitization, Cadastral GIS Reconciliation & Multi-Tier Validation System
**Smart India Hackathon (SIH 2026) Edition** &bull; **Aligned with Digital India Land Records Modernization Programme (DILRMP)**

---

## 🏛️ Executive Summary & Real-World Impact
In India, land disputes account for approximately **66% of all civil litigation** and take an average of **20 years** to resolve in court. The root cause lies in legacy paper archives:
1. **Weathered & Multilingual Archival Deeds**: Historical sale deeds, RTCs/7-12 extracts, Jamabandis, and Tippan/FMB sketches in Hindi, Kannada, Urdu, Marathi, and English with non-standard terminology.
2. **Spatial vs. Deed Discrepancies**: Deeds claiming extents (e.g., 2.5 Acres) that exceed actual physical Cadastral GIS parcels (e.g., 2.1 Acres), or cumulative sub-divisions (Hissas) exceeding parent parcel limits.
3. **Double Registration & Encroachment Fraud**: Fraudulent double-selling of the same parcel, or unmonitored encroachment into Government Poramboke, Forest Buffer (ESZ), and Lake Catchments.
4. **Database Tampering Risks**: Illegitimate alterations in revenue databases without tamper-evident cryptographic provenance.

**Bhu-Praman** resolves this by delivering an automated, end-to-end platform featuring **Multilingual Vision OCR**, an **Interactive Cadastral GIS Engine**, **Fully Trained Machine Learning Risk Predictors**, **Section 22A Prohibited Land Encroachment Detection**, and a **Tamper-Evident SHA-256 Merkle Provenance Ledger**.

---

## 🌟 Key System Capabilities

| Feature | Description | Real-World Compliance |
| :--- | :--- | :--- |
| **Multilingual AI Entity Extraction** | Pre-processes archival paper (adaptive thresholding, deskew, noise removal) and extracts Survey No, Hissa, Khatedar, Extent (Acres/Guntas), Boundaries, and Consideration with interactive bounding-box overlays. | State Revenue Departments (Bhoomi, Bhulekh, Banglarbhumi, Dharani) |
| **Interactive Cadastral GIS** | Leaflet-based geospatial cadastre map with Vector polygons, Satellite hybrid basemaps, survey search, and boundary dimension inspectors. | Bhuvan (ISRO) & DILRMP Spatial Cadastre Standard |
| **Cadastral Extent Reconciliation** | Compares Deed Claimed Area vs. Cadastral GIS Polygon Area and flags discrepancies exceeding statutory survey tolerance (±2.0%). | Survey and Settlement Department |
| **Section 22A Encroachment Sentinel** | Computes topological polygon intersections between claimed land and prohibited zones (Lake foreshore buffer, Reserve Forest ESZ, Highway Right-of-Way). | Section 22-A, Registration Act 1908 & Section 67 Karnataka Land Revenue Act |
| **Trained ML Title Risk Model** | 150-tree Random Forest Classifier & Gradient Boosting Regressor predicting **Land Health Score (0-100)** and Risk Category based on spatial and transaction features. | Explainable AI (Gini Impurity Feature Attribution) |
| **Bhu-Aadhaar (ULPIN)** | Computes 14-character alphanumeric Unique Land Parcel Identification Number from polygon centroid coordinates and survey check codes. | Department of Land Resources (DoLR), Government of India |
| **Bhu-Ledger (Merkle Blockchain)** | Anchors each approved record in a SHA-256 Merkle audit block. Features a live tamper simulation demonstrating detection of unauthorized DB edits. | National Blockchain Framework |
| **Official Due Diligence Certificate** | Generates an official, printable/downloadable title validation certificate with digital seal and scannable verification QR code. | Citizen Consumer Protection & Bank Mortgage Due-Diligence |

---

## 🧠 Machine Learning Architecture (Trained Models)

The system includes two fully trained, production-serialized models stored in `backend/ml_models/`:

### 1. Document Classification Model (`doc_classifier.joblib`)
- **Type**: Multiclass NLP Pipeline (TF-IDF N-Gram Vectorizer + Random Forest Classifier).
- **Target Classes**: `SALE_DEED`, `ROR_RTC_712`, `PARTITION_DEED`, `GIFT_DEED`, `ENCUMBRANCE_CERTIFICATE`.
- **Vocabulary**: Trained on English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ) revenue terminology.
- **Accuracy**: **100.0%** on validation test split.

### 2. Land Title Fraud & Discrepancy Risk Model (`land_risk_model.joblib`)
- **Type**: Ensemble Random Forest Classifier + Gradient Boosting Regressor.
- **Training Set**: 7,500 synthetic transactions simulating real-world Indian revenue anomalies.
- **Metrics**:
  - Classification Accuracy: **100.0%**
  - Continuous Health Score R²: **0.9986**
  - Root Mean Squared Error (RMSE): **1.16**
- **Top 5 Predictive Risk Drivers**:
  1. `seller_name_match_score` (25.8%): Fuzzy consistency between seller and RoR Khatedar.
  2. `stamp_duty_valuation_ratio` (22.5%): Under-valuation vs Circle Rate.
  3. `lake_forest_proximity_m` (19.0%): Proximity to eco-sensitive buffer zones.
  4. `area_diff_pct` (12.5%): Percentage variance between Deed and Cadastre area.
  5. `prohibited_zone_overlap_pct` (9.8%): Encroachment into Section 22A land.

---

## 🗂️ Project Directory Structure

```
land-record-ai/
│
├── backend/
│   ├── api/                     # REST API route handlers
│   ├── core/
│   │   ├── cadastre_engine.py   # Shapely GIS spatial topology & area reconciliation
│   │   ├── crypto_ledger.py     # SHA-256 Merkle blockchain & ULPIN generator
│   │   ├── ml_service.py        # Serialized ML inference service
│   │   ├── ocr_engine.py        # Image pre-processing & multilingual NER extractor
│   │   └── validation_pipeline.py # Multi-tier validation orchestrator
│   ├── data/
│   │   └── village_cadastre.json# Mayaganahalli Village Cadastral GeoJSON
│   ├── ml_models/
│   │   ├── doc_classifier.joblib# Trained NLP Document Classifier (~673 KB)
│   │   ├── land_risk_model.joblib # Trained Fraud & Health Risk Predictor (~709 KB)
│   │   ├── model_metrics.json   # Exported metrics & feature importances
│   │   └── train_models.py      # Retraining pipeline script
│   └── main.py                  # FastAPI REST Server entrypoint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CadastralMap.tsx        # Leaflet GIS vector map with satellite toggle
│   │   │   ├── CertificateModal.tsx    # Official downloadable/printable certificate (PDF)
│   │   │   ├── CitizenPortal.tsx       # 1-click test cases, OCR viewer, score gauge
│   │   │   ├── CryptoLedgerView.tsx    # Blockchain Merkle trail & tamper simulator
│   │   │   ├── MlModelInspector.tsx    # Live ML playground & feature importance chart
│   │   │   ├── Navbar.tsx              # Gov-Tech header with language & role switch
│   │   │   └── OfficerDashboard.tsx    # Tahsildar queue & human-in-the-loop editor
│   │   ├── data/                       # Mock data, translations, GeoJSON exports
│   │   ├── services/api.ts             # Resilient API client with fallback
│   │   ├── types/landRecord.ts         # TypeScript interfaces
│   │   └── App.tsx                     # Main application layout
│   └── vite.config.ts
│
├── sample_deeds/                # Real-world test deeds for judge evaluation
│   ├── deed_case1_clear_title.txt
│   ├── deed_case2_lake_encroachment.txt
│   ├── deed_case3_area_mismatch.txt
│   └── deed_case4_bank_lien.txt
│
├── run_bhu_praman.bat           # 1-click launcher for Windows
├── run_bhu_praman.ps1           # 1-click launcher for PowerShell
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+ (installed via `py` launcher or `python`)
- Node.js v18+ and npm

### 1. Launch with One Click
Simply double-click:
```bash
run_bhu_praman.bat
```
*(Or execute `./run_bhu_praman.ps1` in PowerShell)*

### 2. Manual Startup

**Start Backend API:**
```bash
cd backend
py -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*API Swagger Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)*

**Start Frontend Application:**
```bash
cd frontend
npm run dev
```
*Web Platform: [http://localhost:5173](http://localhost:5173)*

---

## 🎯 Step-by-Step Hackathon Presentation Walkthrough (For Judges)

### Step 1: Open the Portal (Citizen Mode)
1. Navigate to [http://localhost:5173](http://localhost:5173).
2. Point out the **Smart India Hackathon** ribbon, **DILRMP Compliance badge**, and multilingual selector (**English, हिन्दी, ಕನ್ನಡ**).

### Step 2: Test Case 1 - Legitimate Clear Title (Survey 42/1)
1. Click **"Case 1: Legitimate Registered Sale Deed (Clear Title)"** under the Judge Presets.
2. Click **"Run AI Digitization & Multi-Tier Audit"**.
3. **Notice**:
   - Confetti triggers celebrating clear title!
   - Score: **98 / 100** (`LOW_RISK - Clear Marketable Title`).
   - Area match: Deed claimed **2A 14G** vs Cadastre **2A 14G** (0.00% variance).
   - Distance to buffer: 145.2m outside eco-sensitive zones.
   - Bhu-Aadhaar ULPIN issued: `2920127277284201`.
4. Click **"Validation Cert"** to view and download the official signed certificate with scannable QR code!

### Step 3: Test Case 2 - Section 22A Lake Encroachment (Survey 88/2)
1. Click **"Case 2: Prohibited Lake Catchment Encroachment"**.
2. Click **"Run AI Digitization & Multi-Tier Audit"**.
3. **Notice**:
   - Score drops to **38 / 100** (`HIGH_RISK`).
   - Red critical alarm: *"Parcel polygon intersects 18.4% with Mayaganahalli Kere Lake Catchment Buffer"*.
   - Statutory bar: Blocked under Section 22-A of Registration Act.
4. Click **"Inspect GIS"** to switch to the Cadastral GIS map and see the red polygon overlapping directly with the blue lake catchment layer!

### Step 4: Test Case 3 - Area Inflation (+21.7% Discrepancy) (Survey 104)
1. Click **"Case 3: Cadastral Area Inflation Mismatch"**.
2. **Notice**:
   - Deed claims **3 Acres 20 Guntas**, but Electronic Total Station (ETS) Cadastral survey records only **2 Acres 35 Guntas**.
   - Variance of +21.74% is flagged in amber/red as exceeding statutory 2% tolerance.

### Step 5: Switch to Tahsildar / Officer Mode
1. Click **"Tahsildar Mode"** in the top-right role switcher.
2. Showcase the **Discrepancy Queue** with real-time turn-around analytics.
3. Select Survey 88/2 and demonstrate the **Human-in-the-Loop Reviewer**.
4. Click **"Issue Sec 22A Rejection Order"** to demonstrate statutory enforcement.

### Step 6: Showcase Trained ML Architecture
1. Click the **"AI/ML Model Inspector"** tab.
2. Show the judges the live metrics: 100% classification accuracy, 0.9986 R², and Gini feature importances.
3. Drag the **Interactive Inference Sliders** (e.g. adjust Area Discrepancy or Lake Proximity) to prove the ML model evaluates risk dynamically in real time!

### Step 7: Showcase Bhu-Ledger (Tamper Prevention)
1. Click the **"Cryptographic Ledger"** tab.
2. Show the connected SHA-256 Merkle blockchain.
3. Click **"Simulate DB Tampering (Judge Demo)"**!
4. Watch the chain turn red with a critical alarm: *"UNAUTHORIZED LEDGER MODIFICATION DETECTED! Merkle pointer broken."*
5. Explain to judges: *"This guarantees corrupt actors cannot secretly alter land extents in revenue databases."*

---

## 🏆 Why Bhu-Praman Wins SIH
1. **Not a generic OCR wrapper**: Combines OCR + Cadastral Spatial Geometry + Trained ML Models + Cryptographic Blockchain.
2. **Built on Real Indian Laws**: Aligned with Section 22-A of Registration Act 1908, Karnataka Land Revenue Act Section 67, and DILRMP ULPIN standards.
3. **Production-Ready UX**: Includes dual Citizen and Revenue Officer workflows, interactive GIS maps, multilingual vernacular accessibility, and 1-click judge presets.
4. **Offline Resilient**: Complete fallback architecture guarantees zero embarrassing network failures during the hackathon pitch!

---
*Built with ❤️ for the Smart India Hackathon (SIH 2026).*
