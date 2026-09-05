"""
Bhu-Praman Cadastral Spatial Engine
Performs GIS topology validations:
1. Parcel boundary retrieval and GeoJSON delivery.
2. Deed vs Cadastre area reconciliation (Acres, Guntas, Sq. Meters).
3. Section 22A Prohibited Zone intersection (Lake buffer, Forest ESZ, Highway corridor).
4. Sub-division (Hissa) aggregation checks.
"""

import json
import os
from typing import Dict, Any, List, Optional, Tuple
from shapely.geometry import shape, Polygon, Point
from shapely.ops import unary_union

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(CURRENT_DIR, "..", "data", "village_cadastre.json")

# Standard Indian Land Unit Conversion Constants
SQ_METERS_PER_ACRE = 4046.8564224
SQ_METERS_PER_GUNTA = 101.17141056  # 40 Guntas = 1 Acre
SQ_METERS_PER_CENT = 40.4685642     # 100 Cents = 1 Acre
SQ_METERS_PER_HECTARE = 10000.0


def load_cadastre_geojson() -> Dict[str, Any]:
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


CADASTRE_DATA = load_cadastre_geojson()


def convert_to_sq_meters(acres: float = 0.0, guntas: float = 0.0, cents: float = 0.0, hectares: float = 0.0) -> float:
    total = (acres * SQ_METERS_PER_ACRE) + (guntas * SQ_METERS_PER_GUNTA) + (cents * SQ_METERS_PER_CENT) + (hectares * SQ_METERS_PER_HECTARE)
    return round(total, 2)


def convert_sq_meters_to_acres_guntas(sq_meters: float) -> Tuple[int, float]:
    total_acres = sq_meters / SQ_METERS_PER_ACRE
    acres = int(total_acres)
    remaining_acres = total_acres - acres
    guntas = round(remaining_acres * 40.0, 2)
    return acres, guntas


def get_parcel_by_survey(survey_no: str, hissa_no: Optional[str] = None) -> Optional[Dict[str, Any]]:
    survey_clean = survey_no.strip()
    hissa_clean = str(hissa_no).strip() if hissa_no else None

    # Handle combined formats like "42/1"
    if "/" in survey_clean and not hissa_clean:
        parts = survey_clean.split("/")
        survey_clean = parts[0]
        hissa_clean = parts[1]

    for feature in CADASTRE_DATA["features"]:
        props = feature.get("properties", {})
        if props.get("survey_no") == survey_clean:
            if hissa_clean is None or str(props.get("hissa_no")) == hissa_clean or props.get("hissa_no") == "0":
                return feature
    return None


def get_all_parcels() -> List[Dict[str, Any]]:
    return [f for f in CADASTRE_DATA["features"] if f.get("properties", {}).get("type") != "PROHIBITED_ZONE"]


def get_prohibited_zones() -> List[Dict[str, Any]]:
    return [f for f in CADASTRE_DATA["features"] if f.get("properties", {}).get("type") == "PROHIBITED_ZONE"]


def validate_spatial_parcel(survey_no: str, hissa_no: Optional[str], deed_acres: float, deed_guntas: float) -> Dict[str, Any]:
    """
    Core Spatial Validation Function:
    - Matches parcel in official Cadastre.
    - Computes area discrepancy (Deed vs Cadastre).
    - Checks intersection with prohibited zones (Lake, Forest, Highway).
    """
    parcel = get_parcel_by_survey(survey_no, hissa_no)
    if not parcel:
        return {
            "found": False,
            "error": f"Survey No. {survey_no}{'/' + hissa_no if hissa_no else ''} not found in Village Cadastral Map.",
            "status": "UNMATCHED_PARCEL",
        }

    props = parcel["properties"]
    cadastre_sqm = props.get("extent_sq_meters", 0.0)
    deed_sqm = convert_to_sq_meters(acres=deed_acres, guntas=deed_guntas)

    # Area Difference
    diff_sqm = deed_sqm - cadastre_sqm
    diff_pct = (abs(diff_sqm) / cadastre_sqm) * 100.0 if cadastre_sqm > 0 else 0.0

    cad_acres, cad_guntas = convert_sq_meters_to_acres_guntas(cadastre_sqm)

    # Geometry checks with Shapely
    parcel_geom = shape(parcel["geometry"])
    prohibited_zones = get_prohibited_zones()

    intersections = []
    min_dist_to_prohibited = 9999.0

    for zone in prohibited_zones:
        zone_geom = shape(zone["geometry"])
        zone_props = zone["properties"]
        
        # Check intersection
        if parcel_geom.intersects(zone_geom):
            overlap_geom = parcel_geom.intersection(zone_geom)
            overlap_sqm = overlap_geom.area * 111000 * 111000  # approximate projection conversion for degrees
            overlap_pct = (overlap_geom.area / parcel_geom.area) * 100.0
            intersections.append({
                "zone_name": zone_props.get("name"),
                "category": zone_props.get("category"),
                "legal_act": zone_props.get("legal_act"),
                "overlap_percentage": round(overlap_pct, 2),
                "severity": "CRITICAL_VIOLATION_SEC_22A",
            })
            min_dist_to_prohibited = 0.0
        else:
            # Approximate distance in meters
            dist_deg = parcel_geom.distance(zone_geom)
            dist_m = dist_deg * 111000.0
            if dist_m < min_dist_to_prohibited:
                min_dist_to_prohibited = dist_m

    # Area Tolerance check (legal standard is +/- 2%)
    area_status = "MATCH"
    if diff_pct > 2.0:
        area_status = "EXCESS_DEED_AREA_INFLATION" if diff_sqm > 0 else "DEFICIT_DEED_AREA"

    return {
        "found": True,
        "parcel_id": parcel.get("id"),
        "display_survey": props.get("display_survey"),
        "khatedar_name": props.get("khatedar_name"),
        "ulpin": props.get("ulpin"),
        "cadastre_extent": {
            "acres": cad_acres,
            "guntas": cad_guntas,
            "sq_meters": round(cadastre_sqm, 2),
        },
        "deed_extent": {
            "acres": deed_acres,
            "guntas": deed_guntas,
            "sq_meters": round(deed_sqm, 2),
        },
        "area_discrepancy": {
            "diff_sq_meters": round(diff_sqm, 2),
            "diff_percentage": round(diff_pct, 2),
            "status": area_status,
            "within_legal_tolerance": diff_pct <= 2.0,
        },
        "prohibited_zone_intersections": intersections,
        "distance_to_buffer_m": round(min_dist_to_prohibited, 1),
        "has_encroachment": len(intersections) > 0,
        "encumbrance_status": props.get("encumbrance_status", "NIL_ENCUMBRANCE"),
        "geometry": parcel["geometry"],
    }
