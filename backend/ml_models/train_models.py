"""
Bhu-Praman ML Training Pipeline
Trains:
1. Document Classifier: Multiclass NLP Model for Indian Revenue Documents (Sale Deed, RTC/7-12, Partition, Gift Deed, Encumbrance Cert).
2. Title Fraud & Discrepancy Risk Predictor: Random Forest Classifier + Regressor predicting Land Health Score (0-100) and Risk Category.
"""

import json
import os
import random
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

# Set random seeds for reproducibility
np.random.seed(42)
random.seed(42)

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# -------------------------------------------------------------
# 1. TRAIN DOCUMENT CLASSIFIER (NLP)
# -------------------------------------------------------------
DOCUMENT_TYPES = [
    "SALE_DEED",
    "ROR_RTC_712",
    "PARTITION_DEED",
    "GIFT_DEED",
    "ENCUMBRANCE_CERTIFICATE",
]

SAMPLE_TEXTS = {
    "SALE_DEED": [
        "THIS INDENTURE OF ABSOLUTE SALE DEED made this day between Vendor and Purchaser for agricultural land Survey No",
        "Registered Sale Deed conveyed in Sub-Registrar Office consideration amount paid Rs stamp duty Khatedar rights transferred",
        "Absolute Sale Deed execution with boundaries North South East West land extent in acres guntas consideration receipt",
        "विक्रय विलेख (Sale Deed) द्वारा विक्रेता ने क्रेता को भूमि खसरा संख्या रकबा हेक्टेयर का पूर्ण स्वामित्व अंतरित किया",
        "ಮಾರಾಟ ಪತ್ರ (Absolute Sale Deed) ಸರ್ವೆ ನಂಬರ್ ವಿಸ್ತೀರ್ಣ ಎಕರೆ ಗುಂಟೆ ಖರೀಸಿದಾರರಿಗೆ ನೋಂದಾಯಿಸಲಾದ ಪತ್ರ",
        "Bhoomi Karnataka Registered Deed of Conveyance with consideration and vacant peaceful possession of plot parcel",
        "Conveyance deed executed before Sub Registrar transferring free from all encumbrances agricultural parcel hissa",
        "Absolute sale transfer deed acknowledging receipt of sale price with market guideline value stamp duty endorsement",
    ],
    "ROR_RTC_712": [
        "Government of Karnataka Revenue Department Form 16 Record of Rights RTC Tenancy and Crops Survey Hissa Khata",
        "सात-बारा उतारा (7/12 Extract) महाराष्ट्र शासन महसूल विभाग भूमापन क्रमांक खातेदार क्षेत्र पोटखराब",
        "उत्तर प्रदेश भूलेख खतौनी उद्धरण खसरा संख्या खातेदार का नाम फसली वर्ष श्रेणी 1-क संक्रमणीय भूमिधर",
        "Pahani RTC extract owner name father name soil type water source crop details mutation register reference",
        "Record of Rights register showing Khatedar share extent dry land wet land irrigation cess mutation pending",
        "Jamabandi register record of rights khewat khatauni gata number village tehsil district revenue inspector entry",
        "Patta Chitta extract Government of Tamil Nadu Revenue survey number sub division dry land wet land area",
        "AnyRoR Gujarat 7/12 village form no 7 land ownership record survey number holding type farmer account",
    ],
    "PARTITION_DEED": [
        "Registered Deed of Family Partition between legal heirs of late Khatedar dividing ancestral land parcel into schedules",
        "Family settlement and partition deed distributing survey parcel amongst brothers and sisters with boundary schedules",
        "Hissa Bantwara partition deed demarcating distinct sub-division plots A Schedule B Schedule C Schedule boundaries",
        "पारिवारिक बँटवारा विलेख (Partition Deed) पैतृक कृषि भूमि का वारिसानों में आपसी सहमति से विभाजन",
        "ಕುಟುಂಬ ವಿಭಾಗ ಪತ್ರ (Family Partition Deed) ಪೂರ್ವಜರ ಆಸ್ತಿ ಸರ್ವೆ ನಂಬರ್ ಹಿಸ್ಸೆಗಳ ಹಂಚಿಕೆ ಪತ್ರ",
        "Partition deed registered between co-owners mutually allotting distinct survey hissa portions without monetary consideration",
        "Joint family property partition deed allocating western portion to coparcener and eastern portion to party of first part",
    ],
    "GIFT_DEED": [
        "Deed of Gift executed out of natural love and affection without monetary consideration donating agricultural land",
        "Absolute Gift Deed Danapatra transferring immovable property to son/daughter/charitable trust stamp duty concession",
        "दान पत्र (Gift Deed) द्वारा बिना किसी प्रतिफल के प्रेमवश भूमि दान की गई",
        "ದಾನ ಪತ್ರ (Gift Deed) ಪ್ರೀತಿ ವಾತ್ಸಲ್ಯದಿಂದ ಮಗನಿಗೆ/ಮಗಳಿಗೆ ನೋಂದಾಯಿಸಿಕೊಟ್ಟ ಕೃಷಿ ಜಮೀನು",
        "Gift settlement deed conveying agricultural parcel Survey No without financial consideration donor and donee acceptance",
        "Irrevocable deed of gift delivering peaceful possession to donor's kin executed before Sub-Registrar",
    ],
    "ENCUMBRANCE_CERTIFICATE": [
        "Encumbrance Certificate Form No 15 issued by Department of Stamps and Registration showing search of nil encumbrances",
        "Nil Encumbrance Certificate Form 16 certifying no registered liabilities or mortgage deeds for property during period",
        "भार प्रमाण पत्र (Encumbrance Certificate) विगत 30 वर्षों का विलेख विवरण या ऋण मुक्त प्रमाण",
        "ಬೋಜಾ ಪ್ರಮಾಣ ಪತ್ರ (Encumbrance Certificate Form 15) ನೋಂದಾಯಿತ ಕ್ರಯ ಅಡಮಾನ ಅಥವಾ ಋಣಭಾರ ವಿವರಣೆ",
        "Certificate of Encumbrance on property evidencing bank hypothecation agricultural loan from State Bank of India",
        "Search report Form 15 from Sub-Registrar confirming property has clear marketable title without lien or court attachment",
    ],
}


def generate_doc_dataset(num_samples=1500):
    texts = []
    labels = []
    for _ in range(num_samples):
        doc_type = random.choice(DOCUMENT_TYPES)
        base_samples = SAMPLE_TEXTS[doc_type]
        base = random.choice(base_samples)
        survey_no = f"Survey No. {random.randint(1, 400)}/{random.randint(1, 10)}"
        area = f"Extent {random.randint(1, 10)} Acres {random.randint(0, 39)} Guntas"
        tokens = [base, survey_no, area]
        if random.random() > 0.5:
            tokens.append(f"Village {random.choice(['Ramanagara', 'Bidadi', 'Hulimavu', 'Kengeri', 'Nelamangala', 'Anekal'])}")
        text = " ".join(tokens)
        texts.append(text)
        labels.append(doc_type)
    return texts, labels


def train_doc_classifier():
    print("[1/2] Training Document Classification ML Model...")
    texts, labels = generate_doc_dataset(2500)
    X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), max_features=3000)),
        ('clf', RandomForestClassifier(n_estimators=100, random_state=42)),
    ])
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    report = classification_report(y_test, y_pred, output_dict=True)
    accuracy = report["accuracy"]
    print(f" -> Document Classifier Accuracy: {accuracy * 100:.2f}%")

    model_path = os.path.join(CURRENT_DIR, "doc_classifier.joblib")
    joblib.dump(pipeline, model_path)
    print(f" -> Saved to: {model_path}")
    return report


# -------------------------------------------------------------
# 2. TRAIN TITLE FRAUD & DISCREPANCY RISK PREDICTOR
# -------------------------------------------------------------
FEATURE_NAMES = [
    "area_ratio",                  # deed_area / cadastre_area (ideal = 1.0)
    "area_diff_pct",                # abs(deed - cadastre) / cadastre * 100
    "subdivision_overflow_pct",     # hissa sum / parent parcel (0 = normal, >0 = overflow)
    "lake_forest_proximity_m",      # distance to buffer (0 = inside, >50 = safe)
    "prohibited_zone_overlap_pct",  # overlap with Sec 22A/waterbody
    "chain_of_title_gap_years",     # gap in mutation chain (>30 or <0 is suspicious)
    "stamp_duty_valuation_ratio",   # paid consideration / guideline value (<0.8 = undervaluation)
    "seller_name_match_score",      # fuzzy score 0-100 with RoR Khatedar
    "duplicate_reg_180d_count",     # previous attempts on same parcel
    "active_bank_lien",             # 0 or 1
    "archival_weathering_index",    # document quality metric 0-1
]


def generate_risk_dataset(n_samples=6000):
    X = []
    y_class = []  # 0: LOW_RISK (Clear), 1: MODERATE_RISK (Review), 2: HIGH_RISK (Dispute/Fraud)
    y_score = []  # Land Health Score: 0 to 100

    for _ in range(n_samples):
        scenario = np.random.choice(["clear", "moderate_discrepancy", "severe_fraud"], p=[0.55, 0.25, 0.20])

        if scenario == "clear":
            area_ratio = np.random.normal(1.0, 0.015)
            area_diff_pct = abs(area_ratio - 1.0) * 100
            subdivision_overflow_pct = 0.0
            lake_forest_proximity_m = np.random.uniform(75, 800)
            prohibited_zone_overlap_pct = 0.0
            chain_of_title_gap_years = np.random.uniform(2, 18)
            stamp_duty_valuation_ratio = np.random.uniform(0.95, 1.4)
            seller_name_match_score = np.random.uniform(90, 100)
            duplicate_reg_180d_count = 0
            active_bank_lien = 0 if np.random.random() > 0.1 else 1
            archival_weathering_index = np.random.uniform(0.05, 0.35)

            score = 100.0 - (area_diff_pct * 1.5) - (5 if active_bank_lien else 0) - np.random.uniform(0, 5)
            score = max(82.0, min(100.0, score))
            cls = 0  # LOW_RISK

        elif scenario == "moderate_discrepancy":
            area_ratio = np.random.choice([np.random.uniform(1.06, 1.18), np.random.uniform(0.85, 0.94)])
            area_diff_pct = abs(area_ratio - 1.0) * 100
            subdivision_overflow_pct = np.random.choice([0.0, np.random.uniform(1.0, 6.0)])
            lake_forest_proximity_m = np.random.uniform(25, 75)
            prohibited_zone_overlap_pct = 0.0
            chain_of_title_gap_years = np.random.uniform(15, 35)
            stamp_duty_valuation_ratio = np.random.uniform(0.75, 0.95)
            seller_name_match_score = np.random.uniform(65, 88)
            duplicate_reg_180d_count = 0
            active_bank_lien = 1 if np.random.random() > 0.4 else 0
            archival_weathering_index = np.random.uniform(0.3, 0.7)

            score = 78.0 - (area_diff_pct * 1.2) - (subdivision_overflow_pct * 2) - (8 if active_bank_lien else 0)
            score = max(55.0, min(81.0, score))
            cls = 1  # MODERATE_RISK

        else:
            has_encroachment = np.random.random() > 0.4
            prohibited_zone_overlap_pct = np.random.uniform(10.0, 45.0) if has_encroachment else 0.0
            lake_forest_proximity_m = 0.0 if has_encroachment else np.random.uniform(5, 30)

            area_ratio = np.random.choice([np.random.uniform(1.25, 2.10), np.random.uniform(0.5, 0.7)])
            area_diff_pct = abs(area_ratio - 1.0) * 100
            subdivision_overflow_pct = np.random.uniform(8.0, 40.0) if np.random.random() > 0.5 else 0.0
            chain_of_title_gap_years = np.random.choice([np.random.uniform(38, 70), -1.0])
            stamp_duty_valuation_ratio = np.random.uniform(0.3, 0.7)
            seller_name_match_score = np.random.uniform(20, 60)
            duplicate_reg_180d_count = np.random.choice([1, 2, 3]) if np.random.random() > 0.4 else 0
            active_bank_lien = 1
            archival_weathering_index = np.random.uniform(0.4, 0.9)

            score = 50.0 - (prohibited_zone_overlap_pct * 0.8) - (area_diff_pct * 0.4) - (duplicate_reg_180d_count * 10)
            score = max(10.0, min(54.0, score))
            cls = 2  # HIGH_RISK

        features = [
            area_ratio,
            area_diff_pct,
            subdivision_overflow_pct,
            lake_forest_proximity_m,
            prohibited_zone_overlap_pct,
            chain_of_title_gap_years,
            stamp_duty_valuation_ratio,
            seller_name_match_score,
            duplicate_reg_180d_count,
            active_bank_lien,
            archival_weathering_index,
        ]
        X.append(features)
        y_class.append(cls)
        y_score.append(score)

    return np.array(X), np.array(y_class), np.array(y_score)


def train_risk_predictor():
    print("[2/2] Training Land Title Fraud & Discrepancy Risk Model...")
    X, y_class, y_score = generate_risk_dataset(7500)
    X_train, X_test, yc_train, yc_test, ys_train, ys_test = train_test_split(
        X, y_class, y_score, test_size=0.2, random_state=42
    )

    # 1. Classification Model (Low / Moderate / High Risk)
    clf = RandomForestClassifier(n_estimators=150, max_depth=12, random_state=42)
    clf.fit(X_train, yc_train)
    yc_pred = clf.predict(X_test)
    class_report = classification_report(yc_test, yc_pred, target_names=["LOW_RISK", "MODERATE_RISK", "HIGH_RISK"], output_dict=True)
    print(f" -> Risk Classifier Accuracy: {class_report['accuracy'] * 100:.2f}%")

    # 2. Continuous Score Regressor (0 to 100 Land Health Score)
    reg = GradientBoostingRegressor(n_estimators=120, max_depth=5, learning_rate=0.08, random_state=42)
    reg.fit(X_train, ys_train)
    ys_pred = reg.predict(X_test)
    r2 = r2_score(ys_test, ys_pred)
    rmse = np.sqrt(mean_squared_error(ys_test, ys_pred))
    print(f" -> Land Health Score R2: {r2:.4f}, RMSE: {rmse:.2f}")

    # Feature Importances
    importances = dict(zip(FEATURE_NAMES, [round(float(v), 4) for v in clf.feature_importances_]))
    sorted_importances = dict(sorted(importances.items(), key=lambda item: item[1], reverse=True))
    print(" -> Top 3 Risk Drivers:", list(sorted_importances.items())[:3])

    bundle = {
        "classifier": clf,
        "regressor": reg,
        "feature_names": FEATURE_NAMES,
        "feature_importances": sorted_importances,
        "class_names": ["LOW_RISK", "MODERATE_RISK", "HIGH_RISK"],
        "metrics": {
            "classification_accuracy": class_report["accuracy"],
            "regression_r2": r2,
            "regression_rmse": rmse,
        },
    }

    model_path = os.path.join(CURRENT_DIR, "land_risk_model.joblib")
    joblib.dump(bundle, model_path)
    print(f" -> Saved to: {model_path}")

    # Also export metrics JSON for frontend / presentation
    metrics_path = os.path.join(CURRENT_DIR, "model_metrics.json")
    with open(metrics_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "document_classifier": {"classes": DOCUMENT_TYPES},
                "risk_predictor": {
                    "accuracy": class_report["accuracy"],
                    "r2": r2,
                    "rmse": rmse,
                    "feature_importances": sorted_importances,
                    "classification_report": class_report,
                },
            },
            f,
            indent=2,
        )
    print(f" -> Exported metrics to: {metrics_path}")


if __name__ == "__main__":
    train_doc_classifier()
    train_risk_predictor()
    print("\n[SUCCESS] All ML models trained and serialized successfully!")
