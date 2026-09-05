export type RiskLevel = 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
export type UserRole = 'CITIZEN' | 'OFFICER';
export type Language = 'en' | 'hi' | 'kn';

export interface BoundingBox {
  field: string;
  box: [number, number, number, number]; // [x, y, width, height]
  value?: string;
  confidence: number;
}

export interface ExtractedEntities {
  survey_no: string;
  hissa_no: string;
  display_survey: string;
  extent_acres: number;
  extent_guntas: number;
  total_extent_acres: number;
  village: string;
  taluk: string;
  district: string;
  state: string;
  vendor_name: string;
  purchaser_name: string;
  consideration_amount: number;
  stamp_duty_paid: number;
  registration_number: string;
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  bounding_boxes: BoundingBox[];
}

export interface DocumentClassification {
  document_type: string;
  display_name: string;
  confidence: number;
}

export interface ProhibitedIntersection {
  zone_name: string;
  category: string;
  legal_act: string;
  overlap_percentage: number;
  severity: string;
}

export interface SpatialVerification {
  found: boolean;
  parcel_id?: string;
  display_survey?: string;
  khatedar_name?: string;
  ulpin?: string;
  cadastre_extent: {
    acres: number;
    guntas: number;
    sq_meters: number;
  };
  deed_extent: {
    acres: number;
    guntas: number;
    sq_meters: number;
  };
  area_discrepancy: {
    diff_sq_meters: number;
    diff_percentage: number;
    status: string;
    within_legal_tolerance: boolean;
  };
  prohibited_zone_intersections: ProhibitedIntersection[];
  distance_to_buffer_m: number;
  has_encroachment: boolean;
  encumbrance_status: string;
  geometry?: any;
}

export interface AuditFlag {
  category: string;
  severity: 'CLEAR' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  resolution?: string;
}

export interface RiskDriver {
  feature: string;
  weight: number;
  value: number;
}

export interface MlRiskAssessment {
  land_health_score: number;
  risk_level: RiskLevel;
  confidence: number;
  top_risk_drivers: RiskDriver[];
}

export interface ValidationResponse {
  record_id: string;
  ulpin: string;
  document_classification: DocumentClassification;
  extracted_entities: ExtractedEntities;
  spatial_verification: SpatialVerification;
  ml_risk_assessment: MlRiskAssessment;
  audit_flags: AuditFlag[];
  cryptographic_ledger: {
    block_hash: string;
    previous_hash: string;
    timestamp: string;
    ledger_verified: boolean;
  };
}

export interface DemoScenario {
  id: string;
  title: string;
  survey_no: string;
  hissa_no: string;
  claimed_acres: number;
  claimed_guntas: number;
  seller_name: string;
  consideration: number;
  expected_risk: RiskLevel;
  expected_score: number;
  description: string;
  raw_text: string;
}

export interface LedgerBlock {
  record_id: string;
  ulpin: string;
  timestamp: string;
  block_hash: string;
  previous_hash: string;
  metadata: any;
}
