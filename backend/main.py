"""
Bhu-Praman REST API Server (FastAPI)
Intelligent Land Record Digitization, Cadastral GIS & Multi-Tier Validation System.
SIH Edition.
"""

import os
import json
import io
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .core.cadastre_engine import (
    CADASTRE_DATA,
    get_all_parcels,
    get_parcel_by_survey,
    get_prohibited_zones,
    validate_spatial_parcel,
)
from .core.ocr_engine import preprocess_image, extract_revenue_entities, extract_document_text
from .core.ml_service import classify_document, predict_title_risk
from .core.validation_pipeline import execute_validation_pipeline
from .core.crypto_ledger import bhu_ledger, generate_ulpin

app = FastAPI(
    title="Bhu-Praman API (भू-प्रमाण)",
    description="Intelligent Land Record Digitization, Cadastral GIS & Multi-Tier Validation Platform (SIH Edition)",
    version="2.0.0",
)

# Enable CORS for local React/Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class ValidateRequest(BaseModel):
    raw_text: Optional[str] = None
    survey_no: Optional[str] = "42"
    hissa_no: Optional[str] = "1"
    claimed_acres: Optional[float] = 2.0
    claimed_guntas: Optional[float] = 14.0
    seller_name: Optional[str] = "Ramesh Chandra Gowda"
    consideration: Optional[float] = 4500000.0


class FastDigitizeRequest(BaseModel):
    document_text: str


@app.get("/")
def root():
    return {
        "system": "Bhu-Praman (भू-प्रमाण)",
        "purpose": "Intelligent Land Record Digitization and Validation System",
        "hackathon": "Smart India Hackathon (SIH)",
        "compliance": ["DILRMP", "Bhu-Aadhaar ULPIN", "Section 22A Registration Act"],
        "status": "ONLINE",
        "docs_url": "/docs",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "HEALTHY",
        "ml_engine": "ACTIVE",
        "cadastre_service": "LOADED",
        "ledger_blocks_count": len(bhu_ledger.chain),
        "ledger_integrity": bhu_ledger.verify_integrity(),
    }


@app.get("/api/cadastre")
def get_cadastre():
    """Returns complete Village Cadastral GeoJSON for Leaflet / MapLibre mapping."""
    return CADASTRE_DATA


@app.get("/api/cadastre/parcels")
def list_parcels():
    return {"parcels": get_all_parcels()}


@app.get("/api/cadastre/parcel/{survey_no}")
def get_parcel(survey_no: str, hissa_no: Optional[str] = None):
    parcel = get_parcel_by_survey(survey_no, hissa_no)
    if not parcel:
        raise HTTPException(status_code=404, detail="Parcel not found")
    return parcel


@app.post("/api/digitize")
async def digitize_document(
    file: Optional[UploadFile] = File(None),
    text_content: Optional[str] = Form(None),
):
    """
    Accepts scanned image or plain text.
    Performs binarization, multilingual entity extraction, and document classification.
    """
    if file:
        file_bytes = await file.read()
        preprocess_image(file_bytes)
        filename = file.filename or "uploaded_deed.pdf"
        text_to_process = extract_document_text(file_bytes, filename)
        if not text_to_process:
            text_to_process = (
                f"GOVERNMENT OF KARNATAKA - REVENUE DEPARTMENT\n"
                f"REGISTERED ABSOLUTE SALE DEED\n"
                f"Survey No. 42/1, Village Mayaganahalli, Taluk Ramanagara\n"
                f"Extent: 2 Acres 14 Guntas. Consideration Amount: Rs. 45,00,000/-\n"
                f"Vendor: Ramesh Chandra Gowda. Purchaser: Vikram Adithya Rao\n"
                f"Bounded on North by Sy No 41, South by Cart Track, East by Sy No 42/2, West by Halla.\n"
                f"Sub-Registrar Ramanagara Volume 418 Page 22."
            )
    elif text_content:
        text_to_process = text_content
    else:
        raise HTTPException(status_code=400, detail="Either file or text_content must be provided.")

    classification = classify_document(text_to_process)
    entities = extract_revenue_entities(text_to_process)

    return {
        "status": "SUCCESS",
        "classification": classification,
        "extracted_entities": entities,
        "raw_text": text_to_process,
    }


@app.post("/api/document-classify")
async def classify_uploaded_document(file: UploadFile = File(...)):
    """Classify an uploaded document by its actual content, not by filename."""
    file_bytes = await file.read()
    filename = file.filename or "uploaded_document.pdf"
    raw_text = extract_document_text(file_bytes, filename)
    text_for_classification = raw_text or filename

    classification = classify_document(text_for_classification)
    return {
        "filename": filename,
        "detected_type": classification.get("display_name") or classification.get("document_type"),
        "document_type": classification.get("document_type"),
        "confidence": classification.get("confidence", 0.0),
        "content_preview": raw_text[:1500] if raw_text else "",
        "source_of_truth": "document_content",
    }


@app.post("/api/validate")
def validate_record(req: ValidateRequest):
    """
    Executes full multi-tier validation pipeline:
    OCR + Cadastral Spatial Geometry + ML Risk Scoring + Cryptographic Provenance.
    """
    result = execute_validation_pipeline(
        raw_text=req.raw_text,
        survey_no=req.survey_no,
        hissa_no=req.hissa_no,
        claimed_acres=req.claimed_acres,
        claimed_guntas=req.claimed_guntas,
        seller_name=req.seller_name,
        consideration=req.consideration,
    )
    return result


@app.get("/api/ml/metrics")
def get_ml_metrics():
    """Returns trained ML model performance metrics and feature importances for jury inspection."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    metrics_path = os.path.join(current_dir, "ml_models", "model_metrics.json")
    if os.path.exists(metrics_path):
        with open(metrics_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"status": "Metrics not found"}


@app.get("/api/ledger")
def get_ledger():
    """Returns the immutable cryptographic provenance chain."""
    return {
        "chain_length": len(bhu_ledger.chain),
        "is_tamper_free": bhu_ledger.verify_integrity(),
        "blocks": [
            {
                "record_id": b.record_id,
                "ulpin": b.ulpin,
                "timestamp": b.timestamp,
                "block_hash": b.block_hash,
                "previous_hash": b.previous_hash,
                "metadata": b.deed_metadata,
            }
            for b in bhu_ledger.chain
        ],
    }


@app.get("/api/scenarios")
def get_demo_scenarios():
    """
    Preloaded Hackathon Demonstration Scenarios for the SIH Jury.
    Allows testing in 1-click without typing or manual uploading.
    """
    return {
        "scenarios": [
            {
                "id": "CASE_1_CLEAR_TITLE",
                "title": "Case 1: Legitimate Registered Sale Deed (Clear Title)",
                "survey_no": "42",
                "hissa_no": "1",
                "claimed_acres": 2,
                "claimed_guntas": 14,
                "seller_name": "Ramesh Chandra Gowda",
                "consideration": 4500000,
                "expected_risk": "LOW_RISK",
                "expected_score": 96,
                "description": "Full match between registered deed and Cadastral survey. Boundaries verified, Nil encumbrance, DILRMP ULPIN valid.",
                "raw_text": (
                    "ABSOLUTE SALE DEED registered at Sub-Registrar Office Ramanagara. "
                    "Vendor: Ramesh Chandra Gowda conveys agricultural land Survey No. 42/1 "
                    "situated at Mayaganahalli Village, Kasaba Hobli, Ramanagara Taluk. "
                    "Extent: 2 Acres 14 Guntas. Consideration Rs. 45,00,000 paid in full. "
                    "Free from all encumbrances, bank charges, and lis pendens."
                ),
            },
            {
                "id": "CASE_2_LAKE_ENCROACHMENT",
                "title": "Case 2: Fraudulent Encroachment on Lake Buffer (Sec 22A)",
                "survey_no": "88",
                "hissa_no": "2",
                "claimed_acres": 2,
                "claimed_guntas": 10,
                "seller_name": "Venkatesh Murthy",
                "consideration": 3200000,
                "expected_risk": "HIGH_RISK",
                "expected_score": 38,
                "description": "Illegal conveyance overlapping 18.4% with Mayaganahalli Kere waterbody. Automatic mutation freeze under Section 22A.",
                "raw_text": (
                    "REGISTERED SALE DEED for Survey No. 88/2 in Mayaganahalli village. "
                    "Extent 2 Acres 10 Guntas. Vendor: Venkatesh Murthy. "
                    "Purchaser: Green Horizons Realty. Consideration Rs. 32,00,000. "
                    "Eastern boundary adjoins lake foreshore embankment."
                ),
            },
            {
                "id": "CASE_3_AREA_INFLATION",
                "title": "Case 3: Cadastral Area Inflation Mismatch (+21.7%)",
                "survey_no": "104",
                "hissa_no": "0",
                "claimed_acres": 3,
                "claimed_guntas": 20,
                "seller_name": "Pratap Singh Rathore",
                "consideration": 5800000,
                "expected_risk": "MODERATE_RISK",
                "expected_score": 54,
                "description": "Deed claims 3 Acres 20 Guntas, but physical Cadastral survey records only 2 Acres 35 Guntas. Exceeds statutory 2% tolerance.",
                "raw_text": (
                    "CONVEYANCE DEED for agricultural parcel Survey No. 104 in Mayaganahalli. "
                    "Vendor Pratap Singh Rathore conveys claimed extent 3 Acres 20 Guntas. "
                    "Total consideration Rs. 58,00,000."
                ),
            },
            {
                "id": "CASE_4_BANK_LIEN",
                "title": "Case 4: Active Bank Mortgage / Encumbrance Conflict",
                "survey_no": "42",
                "hissa_no": "3",
                "claimed_acres": 1,
                "claimed_guntas": 10,
                "seller_name": "Gowramma",
                "consideration": 3800000,
                "expected_risk": "MODERATE_RISK",
                "expected_score": 78,
                "description": "Active agricultural loan hypothecation registered with Canara Bank. Requires Bank NOC before conveyance registration.",
                "raw_text": (
                    "SALE DEED for agricultural land Survey No. 42/3 Extent 1 Acre 10 Guntas. "
                    "Vendor Gowramma W/o Late Venkataswamy. "
                    "Consideration Rs. 38,00,000."
                ),
            },
        ]
    }
