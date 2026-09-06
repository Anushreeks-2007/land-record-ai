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
    subtitle: 'Land Record Digitization & Validation',
    sihBadge: 'Smart India Hackathon (SIH)',
    dilrmpBadge: 'DILRMP Compliant',
    motto: 'This system helps citizens and officers digitize, compare, and validate land records.',
    home: 'Home',
    citizenTab: 'Citizen Due-Diligence Portal',
    officerTab: 'Revenue Officer (Tehsildar) Portal',
    gisTab: 'Cadastral GIS Map',
    mlTab: 'AI/ML Model Inspector',
    ledgerTab: 'Cryptographic Ledger',
    
    // Landing Page
    landingHeroTitle: 'Intelligent Land Record Digitization & Validation',
    landingHeroSubtitle: 'A national-scale digital land administration platform that empowers citizens to verify property titles with confidence and equips revenue officers with automated cadastral due-diligence.',
    selectPortal: 'Select your access portal to begin:',
    citizenRoleTitle: 'Citizen',
    citizenRoleTag: 'Public Self-Service',
    citizenRoleDesc: 'Check and validate your land records. Guided 5-step verification of sale deeds, RTC / 7-12 extracts, and official survey maps before buying or selling.',
    citizenAction: 'Verify Land Records →',
    officerRoleTitle: 'Officer',
    officerRoleTag: 'Authorized Revenue Official',
    officerRoleDesc: 'Access advanced land-record verification tools. Complete cadastral GIS spatial scrutiny, Section 22A compliance checks, mutation queues, and discrepancy resolution.',
    officerAction: 'Officer Login & Console →',
    systemWorkflowTitle: 'End-to-End Digitization & Validation Workflow',
    systemWorkflowSubtitle: 'How Bhu-Praman validates your land title in 5 automated phases',

    // Citizen Dedicated Homepage
    citizenHomeTitle: 'Citizen Land Record Verification',
    citizenHomeSubtitle: 'Upload your land documents and we will compare the available information to identify inconsistencies that may require verification.',
    uploadLandDocsTitle: 'Upload Land Documents',
    uploadLandDocsSubtitle: 'Submit your property deed, 7/12 / RoR extract, or survey sketch for automated comparison with official government cadastre records.',
    docTabSaleDeed: 'Sale Deed (ಕ್ರಯ ಪತ್ರ / बैनामा)',
    docTabRor: '7/12 / RoR Record (ಪಹಣಿ / खतौनी)',
    docTabSurvey: 'Survey Document / Map (ನಕ್ಷೆ / नक्शा)',
    validateActionBtn: 'Validate Land Record',
    comparingNote: 'Compare your land details with the available official records.',
    
    // Compact Dynamic Processing Steps
    procStep1: '1. Reading documents',
    procStep2: '2. Extracting land details',
    procStep3: '3. Comparing records',
    procStep4: '4. Checking cadastral information',
    procStep5: '5. Preparing result',

    // Results & Cards
    resultGreenTitle: 'LAND RECORDS CONSISTENT',
    resultGreenSubtitle: 'No major inconsistencies were detected.',
    resultOrangeTitle: 'REVIEW REQUIRED',
    resultOrangeSubtitle: 'We found inconsistencies that should be verified by an authorized officer.',
    resultRedTitle: 'HIGH RISK / VERIFICATION REQUIRED',
    resultRedSubtitle: 'Important conflicts or restrictions were detected.',
    resultDisclaimer: 'Disclaimer: This platform presents automated algorithmic findings based on available digitized records and does not substitute judicial decrees or statutory court pronouncements.',

    ownerName: 'Owner / Khatedar',
    surveyNumber: 'Survey & Hissa No.',
    landArea: 'Land Area',
    validationStatus: 'Validation Status',
    issuesFound: 'Issues Detected',
    viewDetails: 'View Details',
    viewTechnicalDetails: 'View Technical Details',
    hideTechnicalDetails: 'Hide Technical Details',
    downloadCert: 'Download Certificate',
    inspectGis: 'View Cadastral Map',
    exitToPortalSelection: 'Exit to Portal Selection',
    switchToOfficer: 'Officer Portal',

    // Officer Login
    officerLoginTitle: 'Revenue Officer Login Gateway',
    officerLoginSubtitle: 'Department of Land Resources & Revenue Administration (DILRMP)',
    officerIdLabel: 'Officer ID / Employee Code',
    officerPasswordLabel: 'Password',
    officerTalukLabel: 'Taluk / District Jurisdiction',
    officerLoginBtn: 'Login to Officer Console',
    demoLoginBtn: '⚡ Quick Demo Login (Tahsildar Ramanagara)',
    demoAuthNote: 'Note: Demonstration authentication gateway for Smart India Hackathon. Real deployment connects to state Bhoomi SSO / OAuth2 gateway.',
    officerLogout: 'Logout Session',
  },
  hi: {
    title: 'भू-प्रमाण',
    subtitle: 'भू-अभिलेख डिजिटलीकरण एवं सत्यापन प्रणाली',
    sihBadge: 'स्मार्ट इंडिया हैकथॉन (SIH)',
    dilrmpBadge: 'DILRMP प्रमाणित',
    motto: 'यह प्रणाली नागरिकों और अधिकारियों को भू-अभिलेखों को डिजिटाइज़, तुलना और सत्यापित करने में मदद करती है।',
    home: 'मुख्य पृष्ठ',
    citizenTab: 'नागरिक स्वत्व सत्यापन पोर्टल',
    officerTab: 'राजस्व अधिकारी (तहसीलदार) पोर्टल',
    gisTab: 'भू-कर जीआईएस मानचित्र',
    mlTab: 'एआई/एमएल मॉडल विश्लेषण',
    ledgerTab: 'अपरिवर्तनीय ब्लॉकचेन बहीखाता',
    
    // Landing Page
    landingHeroTitle: 'बुद्धिमान भू-अभिलेख डिजिटलीकरण एवं सत्यापन प्रणाली',
    landingHeroSubtitle: 'एक राष्ट्रीय डिजिटल भूमि प्रशासन मंच जो नागरिकों को भूमि विलेखों की निष्पक्ष जांच करने और राजस्व अधिकारियों को त्वरित भू-कर जांच की सुविधा देता है।',
    selectPortal: 'आरंभ करने के लिए अपना प्रवेश विकल्प चुनें:',
    citizenRoleTitle: 'नागरिक',
    citizenRoleTag: 'सार्वजनिक स्व-सेवा',
    citizenRoleDesc: 'अपने भू-अभिलेखों की जांच और सत्यापन करें। विक्रय विलेख (बैनामा), खतौनी / 7-12 और सरकारी सर्वेक्षण मानचित्र का सरल सत्यापन।',
    citizenAction: 'भू-अभिलेख सत्यापित करें →',
    officerRoleTitle: 'राजस्व अधिकारी',
    officerRoleTag: 'अधिकृत राजस्व प्राधिकारी',
    officerRoleDesc: 'उन्नत भू-अभिलेख सत्यापन उपकरणों तक पहुंच प्राप्त करें। पूर्ण जीआईएस स्थानिक जांच, धारा 22-ए अनुपालन, और नामांतरण कार्यप्रवाह।',
    officerAction: 'अधिकारी लॉगिन एवं कंसोल →',
    systemWorkflowTitle: 'पूर्ण डिजिटलीकरण एवं सत्यापन कार्यप्रवाह',
    systemWorkflowSubtitle: 'भू-प्रमाण किस प्रकार 5 स्वचालित चरणों में आपके भूमि स्वत्व का सत्यापन करता है',

    // Citizen Dedicated Homepage
    citizenHomeTitle: 'नागरिक भू-अभिलेख सत्यापन',
    citizenHomeSubtitle: 'अपने भूमि दस्तावेज अपलोड करें और हम उपलब्ध आधिकारिक अभिलेखों से जानकारी की तुलना करके विसंगतियों की पहचान करेंगे।',
    uploadLandDocsTitle: 'भूमि दस्तावेज अपलोड करें',
    uploadLandDocsSubtitle: 'अपने विक्रय विलेख (बैनामा), खतौनी / 7-12 या भू-कर सर्वेक्षण नक्शे को सरकारी रिकॉर्ड से मिलान हेतु प्रस्तुत करें।',
    docTabSaleDeed: 'विक्रय विलेख (बैनामा)',
    docTabRor: 'खतौनी / 7-12 अभिलेख',
    docTabSurvey: 'सर्वेक्षण दस्तावेज / नक्शा',
    validateActionBtn: 'भू-अभिलेख सत्यापित करें',
    comparingNote: 'अपने भूमि विवरण की उपलब्ध आधिकारिक अभिलेखों से तुलना करें।',

    // Compact Dynamic Processing Steps
    procStep1: '1. दस्तावेज पढ़े जा रहे हैं',
    procStep2: '2. भूमि विवरण निकाला जा रहा है',
    procStep3: '3. अभिलेखों की तुलना की जा रही है',
    procStep4: '4. भू-कर जानकारी जांची जा रही है',
    procStep5: '5. परिणाम तैयार किया जा रहा है',

    // Results & Cards
    resultGreenTitle: 'भू-अभिलेख सुसंगत हैं',
    resultGreenSubtitle: 'कोई बड़ी विसंगति नहीं पाई गई।',
    resultOrangeTitle: 'समीक्षा आवश्यक है',
    resultOrangeSubtitle: 'हमें विसंगतियां मिलीं जिन्हें किसी अधिकृत अधिकारी द्वारा सत्यापित किया जाना चाहिए।',
    resultRedTitle: 'उच्च जोखिम / सत्यापन अनिवार्य',
    resultRedSubtitle: 'महत्वपूर्ण विवाद या वैधानिक प्रतिबंध पहचाने गए हैं।',
    resultDisclaimer: 'अस्वीकरण: यह मंच उपलब्ध डिजीटल अभिलेखों के आधार पर स्वचालित तकनीकी निष्कर्ष प्रदान करता है और राजस्व अदालतों का विकल्प नहीं है।',

    ownerName: 'भूमि स्वामी / खातेदार',
    surveyNumber: 'खसरा / सर्वे संख्या',
    landArea: 'भूमि क्षेत्रफल',
    validationStatus: 'सत्यापन स्थिति',
    issuesFound: 'पहचाने गए मुद्दे',
    viewDetails: 'विवरण देखें',
    viewTechnicalDetails: 'तकनीकी विवरण देखें',
    hideTechnicalDetails: 'तकनीकी विवरण छिपाएं',
    downloadCert: 'प्रमाण पत्र डाउनलोड करें',
    inspectGis: 'भू-कर मानचित्र देखें',
    exitToPortalSelection: 'पोर्टल चयन पर वापस जाएं',
    switchToOfficer: 'अधिकारी पोर्टल',

    // Officer Login
    officerLoginTitle: 'राजस्व अधिकारी लॉगिन प्रवेश द्वार',
    officerLoginSubtitle: 'भूमि संसाधन विभाग एवं राजस्व प्रशासन (DILRMP)',
    officerIdLabel: 'अधिकारी आईडी / कर्मचारी कोड',
    officerPasswordLabel: 'पासवर्ड',
    officerTalukLabel: 'तहसील / जिला अधिकार क्षेत्र',
    officerLoginBtn: 'अधिकारी कंसोल में प्रवेश करें',
    demoLoginBtn: '⚡ त्वरित डेमो लॉगिन (तहसीलदार रामनगर)',
    demoAuthNote: 'सूचना: स्मार्ट इंडिया हैकथॉन हेतु प्रदर्शन प्रमाणीकरण। वास्तविक प्रणाली राज्य भूमि एसएसओ से जुड़ी होगी।',
    officerLogout: 'सत्र से बाहर निकलें',
  },
  kn: {
    title: 'ಭೂ-ಪ್ರಮಾಣ',
    subtitle: 'ಭೂ ದಾಖಲೆ ಗಣಕೀಕರಣ ಮತ್ತು ದೃಢೀಕರಣ ವ್ಯವಸ್ಥೆ',
    sihBadge: 'ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ (SIH)',
    dilrmpBadge: 'DILRMP ಪ್ರಮಾಣಿತ',
    motto: 'ಈ ವ್ಯವಸ್ಥೆಯು ನಾಗರಿಕರಿಗೆ ಮತ್ತು ಅಧಿಕಾರಿಗಳಿಗೆ ಭೂ ದಾಖಲೆಗಳನ್ನು ಗಣಕೀಕರಿಸಲು, ಹೋಲಿಸಲು ಮತ್ತು ದೃಢೀಕರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    home: 'ಮುಖಪುಟ',
    citizenTab: 'ನಾಗರಿಕ ಭೂ-ಹಕ್ಕು ಪರಿಶೀಲನಾ ಪೋರ್ಟಲ್',
    officerTab: 'ಕಂದಾಯ ಅಧಿಕಾರಿ (ತಹಶೀಲ್ದಾರ್) ಪೋರ್ಟಲ್',
    gisTab: 'ಭೂ-ಮಾಪನ ಜಿಐಎಸ್ ನಕ್ಷೆ',
    mlTab: 'ಎಐ/ಎಂಎಲ್ ಮಾದರಿ ವಿವರಣೆ',
    ledgerTab: 'ಬ್ಲಾಕ್‌ಚೇನ್ ಆಡಿಟ್ ಲೆಡ್ಜರ್',
    
    // Landing Page
    landingHeroTitle: 'ಬುದ್ಧಿವಂತ ಭೂ ದಾಖಲೆ ಗಣಕೀಕರಣ ಮತ್ತು ದೃಢೀಕರಣ ವೇದಿಕೆ',
    landingHeroSubtitle: 'ಖರೀದಿಸುವ ಅಥವಾ ಮಾರಾಟ ಮಾಡುವ ಮುನ್ನ ಭೂ-ಹಕ್ಕು ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ನಾಗರಿಕರಿಗೆ ಅಧಿಕಾರ ನೀಡುವ ಮತ್ತು ಅಧಿಕಾರಿಗಳಿಗೆ ಸುಲಭ ತಪಾಸಣೆ ಒದಗಿಸುವ ವ್ಯವಸ್ಥೆ.',
    selectPortal: 'ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಪ್ರವೇಶ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ:',
    citizenRoleTitle: 'ನಾಗರಿಕ',
    citizenRoleTag: 'ಸಾರ್ವಜನಿಕ ಸ್ವಯಂ-ಸೇವೆ',
    citizenRoleDesc: 'ನಿಮ್ಮ ಸ್ವಂತ ಭೂ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ. ಕ್ರಯ ಪತ್ರ, ಪಹಣಿ/ಆರ್‌ಟಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ಸರ್ವೆ ನಕ್ಷೆಯನ್ನು ಸುಲಭವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
    citizenAction: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ ಆರಂಭಿಸಿ →',
    officerRoleTitle: 'ಕಂದಾಯ ಅಧಿಕಾರಿ',
    officerRoleTag: 'ಅಧಿಕೃತ ಕಂದಾಯ ಪ್ರಾಧಿಕಾರ',
    officerRoleDesc: 'ಸುಧಾರಿತ ಭೂ ದಾಖಲೆ ಪರಿಶೀಲನಾ ಸಾಧನಗಳನ್ನು ಪ್ರವೇಶಿಸಿ. ನಕ್ಷೆ ಪರಿಶೀಲನೆ, ಸೆಕ್ಷನ್ 22-ಎ ಕೆರೆ/ಅರಣ್ಯ ಒತ್ತುವರಿ ತಪಾಸಣೆ ಮತ್ತು ಮ್ಯುಟೇಶನ್ ನಿರ್ವಹಣೆ.',
    officerAction: 'ಅಧಿಕಾರಿ ಲಾಗಿನ್ ಮತ್ತು ಕನ್ಸೋಲ್ →',
    systemWorkflowTitle: 'ಸಮಗ್ರ ಗಣಕೀಕರಣ ಮತ್ತು ದೃಢೀಕರಣ ಕಾರ್ಯವಿಧಾನ',
    systemWorkflowSubtitle: 'ಭೂ-ಪ್ರಮಾಣವು ನಿಮ್ಮ ಭೂಮಿಯ ದಾಖಲೆಯನ್ನು 5 ಸ್ವಯಂಚಾಲಿತ ಹಂತಗಳಲ್ಲಿ ಹೇಗೆ ಪರಿಶೀಲಿಸುತ್ತದೆ',

    // Citizen Dedicated Homepage
    citizenHomeTitle: 'ನಾಗರಿಕ ಭೂ ದಾಖಲೆ ಪರಿಶೀಲನೆ',
    citizenHomeSubtitle: 'ನಿಮ್ಮ ಭೂ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ನಾವು ಲಭ್ಯವಿರುವ ಮಾಹಿತಿಯನ್ನು ಹೋಲಿಸಿ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿರುವ ವ್ಯತ್ಯಾಸಗಳನ್ನು ಗುರುತಿಸುತ್ತೇವೆ.',
    uploadLandDocsTitle: 'ಭೂ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadLandDocsSubtitle: 'ನಿಮ್ಮ ಕ್ರಯ ಪತ್ರ, 7/12 ಅಥವಾ ಆರ್‌ಟಿಸಿ ಮತ್ತು ಸರ್ವೆ ನಕ್ಷೆಯನ್ನು ಸರ್ಕಾರಿ ಭೂ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹೋಲಿಕೆ ಮಾಡಲು ಸಲ್ಲಿಸಿ.',
    docTabSaleDeed: 'ಕ್ರಯ ಪತ್ರ (Sale Deed)',
    docTabRor: '7/12 / ಪಹಣಿ ದಾಖಲೆ (RoR/RTC)',
    docTabSurvey: 'ಸರ್ವೆ ನಕ್ಷೆ ದಾಖಲೆ (Survey Sketch)',
    validateActionBtn: 'ಭೂ ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ',
    comparingNote: 'ನಿಮ್ಮ ಭೂಮಿಯ ವಿವರಗಳನ್ನು ಲಭ್ಯವಿರುವ ಅಧಿಕೃತ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ.',

    // Compact Dynamic Processing Steps
    procStep1: '1. ದಾಖಲೆಗಳನ್ನು ಓದಲಾಗುತ್ತಿದೆ',
    procStep2: '2. ಭೂ ವಿವರಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ',
    procStep3: '3. ದಾಖಲೆಗಳನ್ನು ಹೋಲಿಸಲಾಗುತ್ತಿದೆ',
    procStep4: '4. ನಕ್ಷೆ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ',
    procStep5: '5. ಫಲಿತಾಂಶ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ',

    // Results & Cards
    resultGreenTitle: 'ಭೂ ದಾಖಲೆಗಳು ಹೊಂದಾಣಿಕೆಯಾಗಿವೆ',
    resultGreenSubtitle: 'ಯಾವುದೇ ಪ್ರಮುಖ ವ್ಯತ್ಯಾಸಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    resultOrangeTitle: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
    resultOrangeSubtitle: 'ನಾವು ವ್ಯತ್ಯಾಸಗಳನ್ನು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ; ಇವುಗಳನ್ನು ಅಧಿಕೃತ ಅಧಿಕಾರಿಯಿಂದ ಪರಿಶೀಲಿಸಬೇಕು.',
    resultRedTitle: 'ಅಧಿಕ ಅಪಾಯ / ಪರಿಶೀಲನೆ ಕಡ್ಡಾಯ',
    resultRedSubtitle: 'ಪ್ರಮುಖ ವಿವಾದಗಳು ಅಥವಾ ನಿರ್ಬಂಧಗಳು ಪತ್ತೆಯಾಗಿವೆ.',
    resultDisclaimer: 'ಹಕ್ಕುತ್ಯಾಗ: ಈ ವ್ಯವಸ್ಥೆಯು ಲಭ್ಯವಿರುವ ಗಣಕೀಕೃತ ದಾಖಲೆಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ವಯಂಚಾಲಿತ ತಾಂತ್ರಿಕ ವಿವರಗಳನ್ನು ನೀಡುತ್ತದೆ ಮತ್ತು ಇದು ಕಂದಾಯ ನ್ಯಾಯಾಲಯಗಳ ಆದೇಶಗಳಿಗೆ ಪರ್ಯಾಯವಲ್ಲ.',

    ownerName: 'ಭೂ ಮಾಲೀಕರು / ಖಾತೆದಾರರು',
    surveyNumber: 'ಸರ್ವೆ ಮತ್ತು ಹಿಸ್ಸಾ ಸಂಖ್ಯೆ',
    landArea: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ',
    validationStatus: 'ದೃಢೀಕರಣ ಸ್ಥಿತಿ',
    issuesFound: 'ಪತ್ತೆಯಾದ ಸಮಸ್ಯೆಗಳು',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    viewTechnicalDetails: 'ತಾಂತ್ರಿಕ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    hideTechnicalDetails: 'ತಾಂತ್ರಿಕ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ',
    downloadCert: 'ಪ್ರಮಾಣ ಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    inspectGis: 'ಸರ್ವೆ ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
    exitToPortalSelection: 'ಪ್ರವೇಶ ಆಯ್ಕೆಗೆ ಹಿಂತಿರುಗಿ',
    switchToOfficer: 'ಅಧಿಕಾರಿ ಪೋರ್ಟಲ್',

    // Officer Login
    officerLoginTitle: 'ಕಂದಾಯ ಅಧಿಕಾರಿ ಲಾಗಿನ್ ಪ್ರವೇಶ',
    officerLoginSubtitle: 'ಭೂ ದಾಖಲೆಗಳ ಇಲಾಖೆ ಮತ್ತು ಕಂದಾಯ ಆಡಳಿತ (DILRMP)',
    officerIdLabel: 'ಅಧಿಕಾರಿ ಐಡಿ / ಸಿಬ್ಬಂದಿ ಕೋಡ್',
    officerPasswordLabel: 'ಗುಪ್ತಪದ (Password)',
    officerTalukLabel: 'ತಾಲೂಕು / ಜಿಲ್ಲಾ ವ್ಯಾಪ್ತಿ',
    officerLoginBtn: 'ಅಧಿಕಾರಿ ಕನ್ಸೋಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ',
    demoLoginBtn: '⚡ ತ್ವರಿತ ಡೆಮೊ ಲಾಗಿನ್ (ತಹಶೀಲ್ದಾರ್ ರಾಮನಗರ)',
    demoAuthNote: 'ಸೂಚನೆ: ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಾಗಿ ಪ್ರಾಯೋಗಿಕ ಲಾಗಿನ್. ನೈಜ ವ್ಯವಸ್ಥೆಯು ರಾಜ್ಯ ಭೂಮಿ ಎಸ್‌ಎಸ್‌ಒಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    officerLogout: 'ಲಾಗ್‌ಔಟ್ ಮಾಡಿ',
  },
};

export interface PlainLanguageDetail {
  title: string;
  explanation: string;
  action: string;
  technicalCode: string;
  severity: 'CLEAR' | 'WARNING' | 'CRITICAL';
}

export const getPlainLanguageExplanation = (categoryOrCode: string, lang: 'en' | 'hi' | 'kn' = 'en'): PlainLanguageDetail => {
  const code = categoryOrCode.toUpperCase();
  
  if (code.includes('AREA') || code.includes('INFLAT')) {
    if (lang === 'hi') {
      return {
        title: '⚠️ क्षेत्रफल में विसंगति पाई गई',
        explanation: 'प्रस्तुत दस्तावेज में उल्लिखित रकबा उपलब्ध सरकारी भू-कर अभिलेख से भिन्न है।',
        action: 'डीजीपीएस के साथ अधिकृत सरकारी सीमांकन का अनुरोध करें।',
        technicalCode: 'AREA_MISMATCH_EXCEEDS_2PCT_TOLERANCE',
        severity: 'WARNING',
      };
    }
    if (lang === 'kn') {
      return {
        title: '⚠️ ವಿಸ್ತೀರ್ಣದಲ್ಲಿ ವ್ಯತ್ಯಾಸ ಕಂಡುಬಂದಿದೆ',
        explanation: 'ದಾಖಲೆಯಲ್ಲಿ ನಮೂದಿಸಿದ ವಿಸ್ತೀರ್ಣವು ಸರ್ಕಾರದ ಅಧಿಕೃತ ಸರ್ವೆ ನಕ್ಷೆಯ ವಿಸ್ತೀರ್ಣಕ್ಕಿಂತ ಭಿನ್ನವಾಗಿದೆ.',
        action: 'ಸರ್ಕಾರಿ ಸರ್ವೆಯರ್ ಮೂಲಕ ಮರು ಅಳತೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
        technicalCode: 'AREA_MISMATCH_EXCEEDS_2PCT_TOLERANCE',
        severity: 'WARNING',
      };
    }
    return {
      title: '⚠️ Area mismatch detected',
      explanation: 'The area mentioned in the submitted document is different from the available land record.',
      action: 'Request an official demarcation survey through the Taluk Land Records office.',
      technicalCode: 'AREA_MISMATCH_EXCEEDS_2PCT_TOLERANCE',
      severity: 'WARNING',
    };
  }

  if (code.includes('PROHIBIT') || code.includes('22A') || code.includes('ENCROACH') || code.includes('LAKE')) {
    if (lang === 'hi') {
      return {
        title: '🚫 संरक्षित / निषिद्ध क्षेत्र चेतावनी (धारा 22-ए)',
        explanation: 'इस भूमि का एक हिस्सा संरक्षित सरकारी जल निकाय (झील) या वन बफर क्षेत्र में आता है।',
        action: 'यह संपत्ति धारा 22-ए के तहत निषिद्ध है; नामांतरण नहीं किया जा सकता।',
        technicalCode: 'SECTION_22A_WATERBODY_INTERSECTION',
        severity: 'CRITICAL',
      };
    }
    if (lang === 'kn') {
      return {
        title: '🚫 ನಿಷೇಧಿತ ವಲಯ ಒತ್ತುವರಿ (ಸೆಕ್ಷನ್ 22-ಎ)',
        explanation: 'ಈ ಜಮೀನಿನ ಒಂದು ಭಾಗವು ಸರ್ಕಾರದ ಕೆರೆ ಅಥವಾ ಅರಣ್ಯ ಸಂರಕ್ಷಿತ ಬಫರ್ ವಲಯದಲ್ಲಿ ಬರುತ್ತದೆ.',
        action: 'ಸೆಕ್ಷನ್ 22-ಎ ಪ್ರಕಾರ ಈ ಜಮೀನಿನ ನೋಂದಣಿ ಮತ್ತು ಹಕ್ಕು ವರ್ಗಾವಣೆ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
        technicalCode: 'SECTION_22A_WATERBODY_INTERSECTION',
        severity: 'CRITICAL',
      };
    }
    return {
      title: '🚫 Prohibited zone alert (Section 22A)',
      explanation: 'Part of this land intersects with a protected government waterbody buffer or state reserve.',
      action: 'Registration and mutation are statutorily blocked under Section 22A.',
      technicalCode: 'SECTION_22A_WATERBODY_INTERSECTION',
      severity: 'CRITICAL',
    };
  }

  if (code.includes('LIEN') || code.includes('MORTGAGE') || code.includes('HYPOTHECATION')) {
    if (lang === 'hi') {
      return {
        title: '🏦 बैंक ऋण / बंधक दर्ज है',
        explanation: 'इस भूमि पर बैंक का बकाया कृषि ऋण या बंधक दर्ज है।',
        action: 'स्वामित्व हस्तांतरण से पूर्व संबंधित बैंक से अनापत्ति प्रमाण पत्र (NOC) प्राप्त करें।',
        technicalCode: 'FORM_15_ACTIVE_BANK_LIEN',
        severity: 'WARNING',
      };
    }
    if (lang === 'kn') {
      return {
        title: '🏦 ಬ್ಯಾಂಕ್ ಸಾಲ / ಅಡಮಾನ ದಾಖಲಾಗಿದೆ',
        explanation: 'ಈ ಜಮೀನಿನ ಮೇಲೆ ಬ್ಯಾಂಕ್ ಕೃಷಿ ಸಾಲ ಅಥವಾ ಅಡಮಾನ ಜಾರಿಯಲ್ಲಿದೆ.',
        action: 'ಖರೀದಿಸುವ ಮುನ್ನ ಸಂಬಂಧಪಟ್ಟ ಬ್ಯಾಂಕಿನಿಂದ ನಿರಾಕ್ಷೇಪಣಾ ಪ್ರಮಾಣಪತ್ರ (NOC) ಪಡೆಯಿರಿ.',
        technicalCode: 'FORM_15_ACTIVE_BANK_LIEN',
        severity: 'WARNING',
      };
    }
    return {
      title: '🏦 Active bank loan or mortgage charge',
      explanation: 'An active bank loan or hypothecation charge is recorded on this property in Form 15.',
      action: 'Obtain an official Bank Clearance / No Objection Certificate (NOC) prior to registration.',
      technicalCode: 'FORM_15_ACTIVE_BANK_LIEN',
      severity: 'WARNING',
    };
  }

  // Default clean / consistent
  if (lang === 'hi') {
    return {
      title: '✅ भू-अभिलेख पूरी तरह सुसंगत हैं',
      explanation: 'दस्तावेज का विवरण सरकारी भू-कर मानचित्र और राजस्व रिकॉर्ड से पूर्णतः मेल खाता है।',
      action: 'किसी अतिरिक्त राजस्व सत्यापन की आवश्यकता नहीं है।',
      technicalCode: 'DILRMP_CADASTRAL_CONGRUENT',
      severity: 'CLEAR',
    };
  }
  if (lang === 'kn') {
    return {
      title: '✅ ದಾಖಲೆಗಳು ಅಧಿಕೃತ ನಕ್ಷೆಗೆ ಹೊಂದಿಕೆಯಾಗಿವೆ',
      explanation: 'ದಾಖಲೆಯ ವಿವರಗಳು ಸರ್ಕಾರದ ಭೂ-ಮಾಪನ ನಕ್ಷೆ ಮತ್ತು ಕಂದಾಯ ದಾಖಲೆಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತವೆ.',
      action: 'ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಕಂದಾಯ ಪರಿಶೀಲನೆಯ ಅಗತ್ಯವಿಲ್ಲ.',
      technicalCode: 'DILRMP_CADASTRAL_CONGRUENT',
      severity: 'CLEAR',
    };
  }
  return {
    title: '✅ Records match official survey',
    explanation: 'The document details match available government cadastral and registration records.',
    action: 'No immediate corrective demarcation required.',
    technicalCode: 'DILRMP_CADASTRAL_CONGRUENT',
    severity: 'CLEAR',
  };
};

