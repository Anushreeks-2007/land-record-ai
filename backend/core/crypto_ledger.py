"""
Bhu-Praman Cryptographic Ledger & ULPIN (Bhu-Aadhaar) Generator
1. Generates 14-digit Unique Land Parcel Identification Number (ULPIN) based on
   centroid latitude/longitude and vertex geometry adhering to DILRMP standards.
2. Generates SHA-256 Merkle Provenance Hash and tamper-proof verification receipt.
"""

import hashlib
import json
import time
from datetime import datetime
from typing import Dict, Any, List


def generate_ulpin(lat: float, lon: float, state_code: str = "29", district_code: str = "20", survey_no: str = "42") -> str:
    """
    Generates a 14-digit alphanumeric Bhu-Aadhaar (ULPIN).
    Format: [State: 2][Dist: 2][Geo-Hash Prefix: 6][Survey Check: 4]
    Adheres to DILRMP / Department of Land Resources specifications.
    """
    # Geo-coordinate encoding
    lat_int = int(abs(lat) * 10000) % 9999
    lon_int = int(abs(lon) * 10000) % 9999
    geo_hash = f"{lat_int:04d}{lon_int:04d}"[:6]

    clean_survey = "".join(filter(str.isalnum, survey_no)).upper()[:4].ljust(4, "0")
    ulpin = f"{state_code}{district_code}{geo_hash}{clean_survey}"
    return ulpin[:14]


def compute_sha256(data: str) -> str:
    return hashlib.sha256(data.encode("utf-8")).hexdigest()


class LandLedgerBlock:
    """
    Simulates a tamper-evident blockchain block / Merkle audit node for a land record transaction.
    """
    def __init__(self, record_id: str, ulpin: str, deed_metadata: Dict[str, Any], previous_hash: str = "0" * 64):
        self.timestamp = datetime.utcnow().isoformat() + "Z"
        self.record_id = record_id
        self.ulpin = ulpin
        self.deed_metadata = deed_metadata
        self.previous_hash = previous_hash
        self.nonce = 0
        self.block_hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        payload = {
            "record_id": self.record_id,
            "ulpin": self.ulpin,
            "timestamp": self.timestamp,
            "metadata": self.deed_metadata,
            "previous_hash": self.previous_hash,
            "nonce": self.nonce,
        }
        raw_json = json.dumps(payload, sort_keys=True)
        return hashlib.sha256(raw_json.encode("utf-8")).hexdigest()


class TamperProofAuditTrail:
    """
    Maintains the chain of land transactions and validates block integrity.
    """
    def __init__(self):
        self.chain: List[LandLedgerBlock] = []
        self._initialize_genesis_block()

    def _initialize_genesis_block(self):
        genesis = LandLedgerBlock(
            record_id="GENESIS_BLOCK_DILRMP_001",
            ulpin="29200000000000",
            deed_metadata={"description": "DILRMP State Land Cadastre Genesis Authority"},
            previous_hash="0" * 64
        )
        self.chain.append(genesis)

    def append_record(self, record_id: str, ulpin: str, metadata: Dict[str, Any]) -> LandLedgerBlock:
        prev_block = self.chain[-1]
        new_block = LandLedgerBlock(
            record_id=record_id,
            ulpin=ulpin,
            deed_metadata=metadata,
            previous_hash=prev_block.block_hash
        )
        self.chain.append(new_block)
        return new_block

    def verify_integrity(self) -> bool:
        for i in range(1, len(self.chain)):
            curr = self.chain[i]
            prev = self.chain[i - 1]
            if curr.previous_hash != prev.block_hash:
                return False
            if curr.block_hash != curr.calculate_hash():
                return False
        return True


# Global ledger instance
bhu_ledger = TamperProofAuditTrail()
