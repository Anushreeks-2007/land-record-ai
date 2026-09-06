export type SyntheticParcelDescriptor = {
  parcel_id: string;
  survey_no: string;
  hissa_no: string;
  display_survey: string;
  village: string;
  hobli: string;
  taluk: string;
  district: string;
  state: string;
  land_class: string;
  khatedar_name: string;
  extent_acres: number;
  extent_guntas: number;
  extent_sq_meters: number;
  status: string;
  risk_level: string;
  has_dispute: boolean;
  encumbrance_status: string;
  uLPIN?: string;
};

export const SYNTHETIC_LAND_RECORDS: SyntheticParcelDescriptor[] = [
  {
    parcel_id: 'PARCEL_42_1',
    survey_no: '42',
    hissa_no: '1',
    display_survey: '42/1',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural (ಖುಷ್ಕಿ)',
    khatedar_name: 'Ramesh Chandra Gowda',
    extent_acres: 2,
    extent_guntas: 14,
    extent_sq_meters: 9510.15,
    status: 'VALIDATED',
    risk_level: 'LOW_RISK',
    has_dispute: false,
    encumbrance_status: 'NIL_ENCUMBRANCE',
    uLPIN: '2920127277284201',
  },
  {
    parcel_id: 'PARCEL_42_3',
    survey_no: '42',
    hissa_no: '3',
    display_survey: '42/3',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Wet Agricultural',
    khatedar_name: 'Gowramma',
    extent_acres: 1,
    extent_guntas: 10,
    extent_sq_meters: 5058.57,
    status: 'VALIDATED',
    risk_level: 'MODERATE_RISK',
    has_dispute: false,
    encumbrance_status: 'ACTIVE_BANK_LIEN (Canara Bank Kisan Credit)',
    uLPIN: '2920127277284203',
  },
  {
    parcel_id: 'PARCEL_51_4',
    survey_no: '51',
    hissa_no: '4',
    display_survey: '51/4',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural',
    khatedar_name: 'Ananda Gowda',
    extent_acres: 1,
    extent_guntas: 18,
    extent_sq_meters: 7125.0,
    status: 'AREA_MISMATCH',
    risk_level: 'MODERATE_RISK',
    has_dispute: true,
    encumbrance_status: 'BOUNDARY_DRIFT_PENDING',
    uLPIN: '2920127277285104',
  },
  {
    parcel_id: 'PARCEL_59_1',
    survey_no: '59',
    hissa_no: '1',
    display_survey: '59/1',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural',
    khatedar_name: 'Latha Narayan',
    extent_acres: 2,
    extent_guntas: 4,
    extent_sq_meters: 8468.0,
    status: 'VALIDATED',
    risk_level: 'LOW_RISK',
    has_dispute: false,
    encumbrance_status: 'NIL_ENCUMBRANCE',
    uLPIN: '2920127277285901',
  },
  {
    parcel_id: 'PARCEL_61_5',
    survey_no: '61',
    hissa_no: '5',
    display_survey: '61/5',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural',
    khatedar_name: 'Srinivas Prabhu',
    extent_acres: 2,
    extent_guntas: 26,
    extent_sq_meters: 10370.0,
    status: 'AREA_MISMATCH',
    risk_level: 'MODERATE_RISK',
    has_dispute: true,
    encumbrance_status: 'AREA_DISCREPANCY_PENDING',
    uLPIN: '2920127277286105',
  },
  {
    parcel_id: 'PARCEL_67_2',
    survey_no: '67',
    hissa_no: '2',
    display_survey: '67/2',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural',
    khatedar_name: 'Nagaraj Hebbar',
    extent_acres: 1,
    extent_guntas: 8,
    extent_sq_meters: 5140.0,
    status: 'HIGH_RISK',
    risk_level: 'HIGH_RISK',
    has_dispute: true,
    encumbrance_status: 'DUPLICATE_DEED_REVIEW',
    uLPIN: '2920127277286702',
  },
  {
    parcel_id: 'PARCEL_88_2',
    survey_no: '88',
    hissa_no: '2',
    display_survey: '88/2',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Disputed / Wetland Buffer',
    khatedar_name: 'Venkatesh Murthy & Shivananda',
    extent_acres: 2,
    extent_guntas: 10,
    extent_sq_meters: 9105.42,
    status: 'DISPUTED',
    risk_level: 'HIGH_RISK',
    has_dispute: true,
    encumbrance_status: 'SECTION_22A_PROHIBITED',
    uLPIN: '2920127277288802',
  },
  {
    parcel_id: 'PARCEL_104',
    survey_no: '104',
    hissa_no: '0',
    display_survey: '104',
    village: 'Mayaganahalli',
    hobli: 'Kasaba',
    taluk: 'Ramanagara',
    district: 'Ramanagara',
    state: 'Karnataka',
    land_class: 'Dry Agricultural',
    khatedar_name: 'Pratap Singh Rathore',
    extent_acres: 2,
    extent_guntas: 35,
    extent_sq_meters: 11634.7,
    status: 'AREA_MISMATCH',
    risk_level: 'HIGH_RISK',
    has_dispute: true,
    encumbrance_status: 'UNDER_CIVIL_APPEAL',
    uLPIN: '2920127277281040',
  },
];

export const normalizeSurveyToken = (value?: string | null) => {
  if (!value) return '';
  return value.toString().trim().replace(/\s+/g, '').toLowerCase();
};

export const buildParcelIdentity = (properties: Record<string, any>) => {
  const surveyNo = properties?.survey_no ?? '';
  const hissaNo = properties?.hissa_no ?? '0';
  const displaySurvey = properties?.display_survey ?? '';
  const candidates = [
    normalizeSurveyToken(displaySurvey),
    normalizeSurveyToken(`${surveyNo}/${hissaNo}`),
    normalizeSurveyToken(surveyNo),
  ];
  return candidates.filter(Boolean);
};

export const findCadastralParcel = (surveyValue?: string | null) => {
  if (!surveyValue) {
    return null;
  }

  const target = normalizeSurveyToken(surveyValue);
  const parcel = CADASTRE_DATA.features.find((feature: any) => {
    const properties = feature?.properties || {};
    const candidates = buildParcelIdentity(properties);
    return candidates.includes(target);
  });

  return parcel ?? null;
};

export const findSyntheticLandRecord = (surveyValue?: string | null) => {
  if (!surveyValue) {
    return null;
  }

  const target = normalizeSurveyToken(surveyValue);
  return SYNTHETIC_LAND_RECORDS.find((record) => {
    return (
      normalizeSurveyToken(record.display_survey) === target ||
      normalizeSurveyToken(`${record.survey_no}/${record.hissa_no}`) === target ||
      normalizeSurveyToken(record.survey_no) === target
    );
  }) ?? null;
};

export const CADASTRE_DATA = {
  "type": "FeatureCollection",
  "name": "Mayaganahalli_Village_Cadastre",
  "features": [
    {
      "type": "Feature",
      "id": "PARCEL_42_1",
      "properties": {
        "survey_no": "42",
        "hissa_no": "1",
        "display_survey": "42/1",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 2,
        "extent_guntas": 14,
        "extent_sq_meters": 9510.15,
        "land_class": "Dry Agricultural (ಖುಷ್ಕಿ)",
        "khatedar_name": "Ramesh Chandra Gowda",
        "father_name": "Late Chennegowda",
        "guideline_rate_per_acre": 3500000,
        "ulpin": "2920127277284201",
        "status": "VALIDATED",
        "has_dispute": false,
        "encumbrance_status": "NIL_ENCUMBRANCE",
        "risk_level": "LOW_RISK",
        "risk_score": 96
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2801, 12.7230],
            [77.2812, 12.7230],
            [77.2813, 12.7221],
            [77.2802, 12.7220],
            [77.2801, 12.7230]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_42_2",
      "properties": {
        "survey_no": "42",
        "hissa_no": "2",
        "display_survey": "42/2",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 1,
        "extent_guntas": 20,
        "extent_sq_meters": 6070.28,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Suresh Kumar",
        "father_name": "Muniyappa",
        "guideline_rate_per_acre": 3500000,
        "ulpin": "2920127277284202",
        "status": "VALIDATED",
        "has_dispute": false,
        "encumbrance_status": "NIL_ENCUMBRANCE",
        "risk_level": "LOW_RISK",
        "risk_score": 94
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2812, 12.7230],
            [77.2821, 12.7231],
            [77.2822, 12.7222],
            [77.2813, 12.7221],
            [77.2812, 12.7230]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_42_3",
      "properties": {
        "survey_no": "42",
        "hissa_no": "3",
        "display_survey": "42/3",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 1,
        "extent_guntas": 10,
        "extent_sq_meters": 5058.57,
        "land_class": "Wet Agricultural",
        "khatedar_name": "Gowramma",
        "father_name": "W/o Late Venkataswamy",
        "guideline_rate_per_acre": 3800000,
        "ulpin": "2920127277284203",
        "status": "VALIDATED",
        "has_dispute": false,
        "encumbrance_status": "ACTIVE_BANK_LIEN (Canara Bank Kisan Credit)",
        "risk_level": "MODERATE_RISK",
        "risk_score": 78
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2821, 12.7231],
            [77.2830, 12.7231],
            [77.2831, 12.7223],
            [77.2822, 12.7222],
            [77.2821, 12.7231]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_51_4",
      "properties": {
        "survey_no": "51",
        "hissa_no": "4",
        "display_survey": "51/4",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 1,
        "extent_guntas": 18,
        "extent_sq_meters": 7125,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Ananda Gowda",
        "father_name": "Late Nanjegowda",
        "guideline_rate_per_acre": 3300000,
        "ulpin": "2920127277285104",
        "status": "AREA_MISMATCH",
        "has_dispute": true,
        "encumbrance_status": "BOUNDARY_DRIFT_PENDING",
        "risk_level": "MODERATE_RISK",
        "risk_score": 64
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2790, 12.7246],
            [77.2802, 12.7247],
            [77.2805, 12.7238],
            [77.2794, 12.7236],
            [77.2790, 12.7246]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_59_1",
      "properties": {
        "survey_no": "59",
        "hissa_no": "1",
        "display_survey": "59/1",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 2,
        "extent_guntas": 4,
        "extent_sq_meters": 8468,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Latha Narayan",
        "father_name": "Late Narayanappa",
        "guideline_rate_per_acre": 3350000,
        "ulpin": "2920127277285901",
        "status": "VALIDATED",
        "has_dispute": false,
        "encumbrance_status": "NIL_ENCUMBRANCE",
        "risk_level": "LOW_RISK",
        "risk_score": 90
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2776, 12.7251],
            [77.2790, 12.7252],
            [77.2791, 12.7240],
            [77.2777, 12.7239],
            [77.2776, 12.7251]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_61_5",
      "properties": {
        "survey_no": "61",
        "hissa_no": "5",
        "display_survey": "61/5",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 2,
        "extent_guntas": 26,
        "extent_sq_meters": 10370,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Srinivas Prabhu",
        "father_name": "Late Krishna Prabhu",
        "guideline_rate_per_acre": 3400000,
        "ulpin": "2920127277286105",
        "status": "AREA_MISMATCH",
        "has_dispute": true,
        "encumbrance_status": "AREA_DISCREPANCY_PENDING",
        "risk_level": "MODERATE_RISK",
        "risk_score": 68
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2760, 12.7248],
            [77.2775, 12.7249],
            [77.2777, 12.7238],
            [77.2761, 12.7237],
            [77.2760, 12.7248]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_67_2",
      "properties": {
        "survey_no": "67",
        "hissa_no": "2",
        "display_survey": "67/2",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 1,
        "extent_guntas": 8,
        "extent_sq_meters": 5140,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Nagaraj Hebbar",
        "father_name": "Laxman Hebbar",
        "guideline_rate_per_acre": 3200000,
        "ulpin": "2920127277286702",
        "status": "HIGH_RISK",
        "has_dispute": true,
        "encumbrance_status": "DUPLICATE_DEED_REVIEW",
        "risk_level": "HIGH_RISK",
        "risk_score": 42
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2750, 12.7232],
            [77.2765, 12.7233],
            [77.2767, 12.7220],
            [77.2751, 12.7218],
            [77.2750, 12.7232]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_88_1",
      "properties": {
        "survey_no": "88",
        "hissa_no": "1",
        "display_survey": "88/1",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 3,
        "extent_guntas": 5,
        "extent_sq_meters": 12646.42,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Mohammed Farooq",
        "father_name": "Abdul Rasheed",
        "guideline_rate_per_acre": 3200000,
        "ulpin": "2920127277288801",
        "status": "VALIDATED",
        "has_dispute": false,
        "encumbrance_status": "NIL_ENCUMBRANCE",
        "risk_level": "LOW_RISK",
        "risk_score": 92
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2800, 12.7218],
            [77.2815, 12.7218],
            [77.2816, 12.7208],
            [77.2801, 12.7207],
            [77.2800, 12.7218]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_88_2",
      "properties": {
        "survey_no": "88",
        "hissa_no": "2",
        "display_survey": "88/2",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 2,
        "extent_guntas": 10,
        "extent_sq_meters": 9105.42,
        "land_class": "Disputed / Wetland Buffer",
        "khatedar_name": "Venkatesh Murthy & Shivananda",
        "father_name": "Anjanappa",
        "guideline_rate_per_acre": 3200000,
        "ulpin": "2920127277288802",
        "status": "DISPUTED",
        "has_dispute": true,
        "encumbrance_status": "SECTION_22A_PROHIBITED",
        "risk_level": "HIGH_RISK",
        "risk_score": 38,
        "dispute_reason": "Intersects 18.4% with Mayaganahalli Kere Lake Catchment Buffer Zone. Prohibited under Karnataka Land Revenue Act Section 67 & Sec 22A."
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2815, 12.7218],
            [77.2832, 12.7219],
            [77.2830, 12.7206],
            [77.2816, 12.7208],
            [77.2815, 12.7218]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "PARCEL_104",
      "properties": {
        "survey_no": "104",
        "hissa_no": "0",
        "display_survey": "104",
        "village": "Mayaganahalli",
        "hobli": "Kasaba",
        "taluk": "Ramanagara",
        "district": "Ramanagara",
        "state": "Karnataka",
        "extent_acres": 2,
        "extent_guntas": 35,
        "extent_sq_meters": 11634.7,
        "land_class": "Dry Agricultural",
        "khatedar_name": "Pratap Singh Rathore",
        "father_name": "Bhairav Singh",
        "guideline_rate_per_acre": 2800000,
        "ulpin": "2920127277281040",
        "status": "AREA_MISMATCH",
        "has_dispute": true,
        "encumbrance_status": "UNDER_CIVIL_APPEAL",
        "risk_level": "HIGH_RISK",
        "risk_score": 52,
        "dispute_reason": "Physical Cadastral survey area is 2 Acres 35 Guntas (11,635 sq.m), but recently registered conveyance deed claimed 3 Acres 20 Guntas (14,164 sq.m). Area inflated by +21.7%."
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2785, 12.7229],
            [77.2798, 12.7229],
            [77.2799, 12.7216],
            [77.2786, 12.7215],
            [77.2785, 12.7229]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "WATERBODY_KERE_01",
      "properties": {
        "name": "Mayaganahalli Kere (Government Lake Reserve)",
        "type": "PROHIBITED_ZONE",
        "category": "Waterbody / Lake Catchment",
        "legal_act": "Karnataka Tank Conservation and Development Authority Act, 2014 & Sec 22A Registration Act",
        "color": "#0ea5e9",
        "is_buffer_zone": true
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2825, 12.7215],
            [77.2845, 12.7215],
            [77.2848, 12.7198],
            [77.2826, 12.7200],
            [77.2825, 12.7215]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "FOREST_BUFFER_01",
      "properties": {
        "name": "Ramadevarabetta Reserve Forest Buffer",
        "type": "PROHIBITED_ZONE",
        "category": "Protected Forest Buffer (100m ESZ)",
        "legal_act": "Forest (Conservation) Act, 1980",
        "color": "#15803d",
        "is_buffer_zone": true
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2770, 12.7240],
            [77.2783, 12.7240],
            [77.2783, 12.7210],
            [77.2770, 12.7210],
            [77.2770, 12.7240]
          ]
        ]
      }
    }
  ]
};
