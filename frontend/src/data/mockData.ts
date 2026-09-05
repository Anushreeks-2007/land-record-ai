import { DemoScenario, ValidationResponse } from '../types/landRecord';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'CASE_1_CLEAR_TITLE',
    title: 'Case 1: Legitimate Registered Sale Deed (Clear Title)',
    survey_no: '42',
    hissa_no: '1',
    claimed_acres: 2,
    claimed_guntas: 14,
    seller_name: 'Ramesh Chandra Gowda',
    consideration: 4500000,
    expected_risk: 'LOW_RISK',
    expected_score: 96,
    description: 'Deed extent matches Cadastral GIS polygon within 0.2%. Boundaries verified, Nil encumbrance, valid Bhu-Aadhaar ULPIN.',
    raw_text: `GOVERNMENT OF KARNATAKA - DEPARTMENT OF STAMPS AND REGISTRATION
OFFICE OF THE SUB-REGISTRAR, RAMANAGARA TALUK
ABSOLUTE SALE DEED (ಕ್ರಯ ಪತ್ರ) - DOCUMENT NO: RMN-1-04982-2024

Vendor: Sri. RAMESH CHANDRA GOWDA, S/o Late Chennegowda, Mayaganahalli Village.
In favour of Purchaser: Sri. VIKRAM ADITHYA RAO.
Schedule Property: Agricultural land bearing Survey No. 42/1, Mayaganahalli, Kasaba Hobli, Ramanagara Taluk.
Extent: 2 Acres 14 Guntas. Classification: Dry Agricultural (ಖುಷ್ಕಿ).
Consideration Amount: Rs. 45,00,000/- paid in full.
Boundaries:
  - North: Sy No 41 property of K. Mariswamy
  - South: Gramatana Cart Track (ಗ್ರಾಮ ಬಂಡಿದಾರಿ)
  - East: Sy No 42/2 of Suresh Kumar
  - West: Halla / Natural Drainage Canal
Property is free from encumbrances and Section 22A statutory restrictions.`,
  },
  {
    id: 'CASE_2_LAKE_ENCROACHMENT',
    title: 'Case 2: Prohibited Lake Catchment Encroachment (Sec 22A)',
    survey_no: '88',
    hissa_no: '2',
    claimed_acres: 2,
    claimed_guntas: 10,
    seller_name: 'Venkatesh Murthy',
    consideration: 3200000,
    expected_risk: 'HIGH_RISK',
    expected_score: 38,
    description: 'Claimed parcel overlaps 18.4% with Mayaganahalli Kere Lake Catchment Buffer. Immediate mutation lock under Section 22A.',
    raw_text: `GOVERNMENT OF KARNATAKA - DEPARTMENT OF STAMPS AND REGISTRATION
PROVISIONAL CONVEYANCE ENTRY: RMN-1-08119-2024
Vendor: Sri. VENKATESH MURTHY, S/o Late Anjanappa.
Purchaser: M/s. GREEN HORIZONS REALTY VENTURES LLP.
Property: Survey No. 88/2, Mayaganahalli Village, Ramanagara.
Claimed Extent: 2 Acres 10 Guntas (9,105 Sq. Meters).
Consideration: Rs. 32,00,000/-.
Boundaries:
  - North: Sy No 88/1 of Mohammed Farooq
  - South: Sy No 89 Agricultural Land
  - East: Mayaganahalli Kere Lake Foreshore (ಕೆರೆ ಅಂಗಳ)
  - West: Approach Cart Road
CRITICAL: Eastern portion overlaps Mayaganahalli Kere Waterbody Buffer Zone!`,
  },
  {
    id: 'CASE_3_AREA_INFLATION',
    title: 'Case 3: Cadastral Area Inflation Mismatch (+21.7%)',
    survey_no: '104',
    hissa_no: '0',
    claimed_acres: 3,
    claimed_guntas: 20,
    seller_name: 'Pratap Singh Rathore',
    consideration: 5800000,
    expected_risk: 'HIGH_RISK',
    expected_score: 52,
    description: 'Deed claims 3 Acres 20 Guntas, but physical Cadastral survey polygon records only 2 Acres 35 Guntas. Exceeds legal 2% tolerance.',
    raw_text: `GOVERNMENT OF KARNATAKA - DEPARTMENT OF STAMPS AND REGISTRATION
REGISTERED CONVEYANCE DEED: RMN-1-03201-2023
Vendor: Sri. PRATAP SINGH RATHORE, S/o Bhairav Singh.
Purchaser: Sri. SUNIL DESHMUKH.
Schedule Property: Survey No. 104, Mayaganahalli Village.
Claimed Extent: 3 Acres 20 Guntas (14,164 Sq. Meters).
Consideration: Rs. 58,00,000/-.
Boundaries:
  - North: Sy No 103 Land
  - South: Forest Department Boundary Stone
  - East: Village Cart Road
  - West: Sy No 105 Agriculture
DISCREPANCY: Electronic Total Station (ETS) Cadastral map records 2 Acres 35 Guntas. Excess of 25 Guntas (+21.7%).`,
  },
  {
    id: 'CASE_4_BANK_LIEN',
    title: 'Case 4: Active Bank Mortgage / Encumbrance Conflict',
    survey_no: '42',
    hissa_no: '3',
    claimed_acres: 1,
    claimed_guntas: 10,
    seller_name: 'Gowramma',
    consideration: 3800000,
    expected_risk: 'MODERATE_RISK',
    expected_score: 78,
    description: 'Active agricultural loan hypothecation registered with Canara Bank. Requires Bank NOC prior to title transfer.',
    raw_text: `GOVERNMENT OF KARNATAKA - DEPARTMENT OF STAMPS AND REGISTRATION
CONVEYANCE DEED - SURVEY NO. 42/3
Vendor: Smt. GOWRAMMA, W/o Late Venkataswamy.
Purchaser: Sri. ANAND VARMA.
Schedule Property: Survey No. 42/3, Mayaganahalli Village.
Extent: 1 Acre 10 Guntas.
Consideration: Rs. 38,00,000/-.
Note: Form 15 reveals active Kisan Credit Card charge by Canara Bank Ramanagara Branch for Rs. 4,50,000/-.`,
  },
];

export const INITIAL_VALIDATION_RESULT: ValidationResponse = {
  record_id: 'REC-DILRMP-8A49C2F1',
  ulpin: '2920127277284201',
  document_classification: {
    document_type: 'SALE_DEED',
    display_name: 'Registered Absolute Sale Deed (ಕ್ರಯ ಪತ್ರ / विक्रय विलेख)',
    confidence: 0.984,
  },
  extracted_entities: {
    survey_no: '42',
    hissa_no: '1',
    display_survey: '42/1',
    extent_acres: 2,
    extent_guntas: 14,
    total_extent_acres: 2.35,
    village: 'Mayaganahalli',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    vendor_name: 'Ramesh Chandra Gowda',
    purchaser_name: 'Vikram Adithya Rao',
    consideration_amount: 4500000,
    stamp_duty_paid: 225000,
    registration_number: 'RMN-1-04982-2024',
    boundaries: {
      north: 'Survey No. 41 Property of K. Mariswamy',
      south: 'Gramatana Cart Track (ಗ್ರಾಮ ರಸ್ತೆ)',
      east: 'Survey No. 42/2 of Suresh Kumar',
      west: 'Halla / Drainage Canal (ಹಳ್ಳ)',
    },
    bounding_boxes: [
      { field: 'Document Header', box: [40, 20, 520, 45], confidence: 0.98 },
      { field: 'Survey & Hissa No', box: [45, 110, 280, 40], value: '42/1', confidence: 0.96 },
      { field: 'Extent / Area', box: [45, 160, 340, 35], value: '2 Acres 14 Guntas', confidence: 0.95 },
      { field: 'Vendor / Khatedar', box: [45, 205, 410, 35], value: 'Ramesh Chandra Gowda', confidence: 0.97 },
      { field: 'Consideration Amount', box: [45, 250, 390, 35], value: 'Rs. 45,00,000', confidence: 0.94 },
      { field: 'Boundaries (Schedule)', box: [45, 295, 480, 55], confidence: 0.92 },
      { field: 'Sub-Registrar Seal', box: [340, 390, 180, 70], confidence: 0.99 },
    ],
  },
  spatial_verification: {
    found: true,
    parcel_id: 'PARCEL_42_1',
    display_survey: '42/1',
    khatedar_name: 'Ramesh Chandra Gowda',
    ulpin: '2920127277284201',
    cadastre_extent: {
      acres: 2,
      guntas: 14,
      sq_meters: 9510.15,
    },
    deed_extent: {
      acres: 2,
      guntas: 14,
      sq_meters: 9510.15,
    },
    area_discrepancy: {
      diff_sq_meters: 0.0,
      diff_percentage: 0.0,
      status: 'MATCH',
      within_legal_tolerance: true,
    },
    prohibited_zone_intersections: [],
    distance_to_buffer_m: 145.2,
    has_encroachment: false,
    encumbrance_status: 'NIL_ENCUMBRANCE',
  },
  ml_risk_assessment: {
    land_health_score: 97.6,
    risk_level: 'LOW_RISK',
    confidence: 0.992,
    top_risk_drivers: [
      { feature: 'seller_name_match_score', weight: 0.258, value: 100 },
      { feature: 'stamp_duty_valuation_ratio', weight: 0.225, value: 1.15 },
      { feature: 'lake_forest_proximity_m', weight: 0.190, value: 145.2 },
      { feature: 'area_diff_pct', weight: 0.124, value: 0.0 },
    ],
  },
  audit_flags: [
    {
      category: 'AREA_VERIFICATION',
      severity: 'CLEAR',
      title: 'Cadastral Extent Validated (100% Match)',
      message: 'Deed claimed extent (2A 14G / 9,510 sq.m) matches Electronic Total Station (ETS) Cadastral parcel with 0.00% deviation.',
    },
    {
      category: 'ENVIRONMENTAL_CLEARANCE',
      severity: 'CLEAR',
      title: 'Buffer Zone Clear',
      message: 'Parcel is safely situated 145.2m outside the Mayaganahalli Kere buffer and Ramadevarabetta Forest ESZ.',
    },
    {
      category: 'ENCUMBRANCE_STATUS',
      severity: 'CLEAR',
      title: 'Clear Marketable Title (Nil Encumbrance)',
      message: 'Sub-Registrar Form 15 search across 30 years indicates zero mortgage charges, court stays, or lis pendens.',
    },
    {
      category: 'BHU_AADHAAR_ULPIN',
      severity: 'CLEAR',
      title: 'Bhu-Aadhaar ULPIN Issued',
      message: '14-digit DILRMP geo-coded ULPIN assigned: 2920127277284201. Merkle proof generated.',
    },
  ],
  cryptographic_ledger: {
    block_hash: 'c8f384a1e948d3bc89115a39281e01d18721c08e2f893d9b40fa9c183719a842',
    previous_hash: '0000000000000000000000000000000000000000000000000000000000000000',
    timestamp: new Date().toISOString(),
    ledger_verified: true,
  },
};

export const UI_STRINGS = {
  en: {
    title: 'Bhu-Praman',
    subtitle: 'Intelligent Land Record Digitization & Validation System',
    sihBadge: 'Smart India Hackathon (SIH)',
    dilrmpBadge: 'DILRMP Compliant',
    citizenTab: 'Citizen Due-Diligence Portal',
    officerTab: 'Revenue Officer (Tehsildar) Portal',
    gisTab: 'Cadastral GIS Map',
    mlTab: 'AI/ML Model Inspector',
    ledgerTab: 'Cryptographic Ledger',
    uploadDeed: 'Upload Archival Deed or Land Document',
    dragDrop: 'Drag and drop deed image/PDF, or select a judge test case',
    runValidation: 'Run AI Digitization & Multi-Tier Audit',
    healthScore: 'Land Health & Title Integrity Score',
    lowRisk: 'Clear Marketable Title',
    moderateRisk: 'Discrepancy / Review Required',
    highRisk: 'High Risk / Severe Discrepancy / Encroachment',
    downloadCert: 'Download Official Title Due-Diligence Certificate',
    cadastreMatch: 'Cadastral Extent Match',
    deedClaimed: 'Deed Claimed Area',
    cadastreRecorded: 'Cadastre Survey Area',
    sec22aCheck: 'Section 22A Encroachment Check',
    ulpinBhuAadhaar: 'Bhu-Aadhaar (ULPIN)',
  },
  hi: {
    title: 'भू-प्रमाण',
    subtitle: 'बुद्धिमान भू-अभिलेख डिजिटलीकरण एवं बहु-स्तरीय सत्यापन प्रणाली',
    sihBadge: 'स्मार्ट इंडिया हैकथॉन (SIH)',
    dilrmpBadge: 'DILRMP प्रमाणित',
    citizenTab: 'नागरिक स्वत्व सत्यापन पोर्टल',
    officerTab: 'राजस्व अधिकारी (तहसीलदार) पोर्टल',
    gisTab: 'भू-कर जीआईएस मानचित्र (Cadastre)',
    mlTab: 'एआई/एमएल मॉडल विश्लेषण',
    ledgerTab: 'अपरिवर्तनीय ब्लॉकचेन बहीखाता',
    uploadDeed: 'दस्तावेज या रजिस्ट्री विलेख अपलोड करें',
    dragDrop: 'दस्तावेज खींचें और छोड़ें या परीक्षण परिदृश्य चुनें',
    runValidation: 'एआई डिजिटलीकरण एवं सत्यापन चलाएं',
    healthScore: 'भूमि स्वत्व अखंडता स्कोर',
    lowRisk: 'स्पष्ट एवं निर्विवाद स्वत्व (Clear Title)',
    moderateRisk: 'समीक्षा आवश्यक / मामूली विसंगति',
    highRisk: 'उच्च जोखिम / अतिक्रमण / विवाद',
    downloadCert: 'आधिकारिक स्वत्व सत्यापन प्रमाण पत्र डाउनलोड करें',
    cadastreMatch: 'भू-कर क्षेत्रफल मिलान',
    deedClaimed: 'विलेख में दावा किया गया रकबा',
    cadastreRecorded: 'भू-कर सर्वेक्षण रकबा',
    sec22aCheck: 'धारा 22-ए निषिद्ध भूमि व अतिक्रमण जांच',
    ulpinBhuAadhaar: 'भू-आधार (ULPIN)',
  },
  kn: {
    title: 'ಭೂ-ಪ್ರಮಾಣ',
    subtitle: 'ಬುದ್ಧಿವಂತ ಭೂ ದಾಖಲೆ ಗಣಕೀಕರಣ ಮತ್ತು ಬಹು-ಹಂತದ ದೃಢೀಕರಣ ವ್ಯವಸ್ಥೆ',
    sihBadge: 'ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ (SIH)',
    dilrmpBadge: 'DILRMP ಪ್ರಮಾಣಿತ',
    citizenTab: 'ನಾಗರಿಕ ಭೂ-ಹಕ್ಕು ಪರಿಶೀಲನಾ ಪೋರ್ಟಲ್',
    officerTab: 'ಕಂದಾಯ ಅಧಿಕಾರಿ (ತಹಶೀಲ್ದಾರ್) ಪೋರ್ಟಲ್',
    gisTab: 'ಭೂ-ಮಾಪನ ಜಿಐಎಸ್ ನಕ್ಷೆ (Cadastre)',
    mlTab: 'ಎಐ/ಎಂಎಲ್ ಮಾದರಿ ವಿವರಣೆ',
    ledgerTab: 'ಬ್ಲಾಕ್‌ಚೇನ್ ಆಡಿಟ್ ಲೆಡ್ಜರ್',
    uploadDeed: 'ಕ್ರಯ ಪತ್ರ ಅಥವಾ ಪಹಣಿ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    dragDrop: 'ದಾಖಲೆಯನ್ನು ಎಳೆದು ಹಾಕಿ ಅಥವಾ ಮಾದರಿ ಆಯ್ಕೆ ಮಾಡಿ',
    runValidation: 'ಎಐ ಗಣಕೀಕರಣ ಮತ್ತು ಪರಿಶೀಲನೆ ಆರಂಭಿಸಿ',
    healthScore: 'ಭೂ-ಸ್ವಾಧೀನ ಆರೋಗ್ಯ ಸ್ಕೋರ್',
    lowRisk: 'ಸ್ಪಷ್ಟ ಮಾರುಕಟ್ಟೆ ಹಕ್ಕು (Clear Title)',
    moderateRisk: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ / ವ್ಯತ್ಯಾಸವಿದೆ',
    highRisk: 'ಅಧಿಕ ಅಪಾಯ / ಅಕ್ರಮ ಒತ್ತುವರಿ / ವಿವಾದ',
    downloadCert: 'ಅಧಿಕೃತ ಭೂ-ಹಕ್ಕು ದೃಢೀಕರಣ ಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    cadastreMatch: 'ಸರ್ವೆ ನಕ್ಷೆ ವಿಸ್ತೀರ್ಣ ಹೊಂದಾಣಿಕೆ',
    deedClaimed: 'ಪತ್ರದಲ್ಲಿ ನಮೂದಿಸಿದ ವಿಸ್ತೀರ್ಣ',
    cadastreRecorded: 'ನಕ್ಷೆಯ ಅಧಿಕೃತ ವಿಸ್ತೀರ್ಣ',
    sec22aCheck: 'ಸೆಕ್ಷನ್ 22-ಎ ಕೆರೆ/ಅರಣ್ಯ ಒತ್ತುವರಿ ಪರಿಶೀಲನೆ',
    ulpinBhuAadhaar: 'ಭೂ-ಆಧಾರ್ (ULPIN)',
  },
};
