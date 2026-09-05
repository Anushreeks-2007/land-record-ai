import React from 'react';
import { ValidationResponse } from '../types/landRecord';
import { X, Printer, ShieldCheck, Download, Award, QrCode } from 'lucide-react';
import jsPDF from 'jspdf';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ValidationResponse;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const score = data.ml_risk_assessment.land_health_score;
  const isClear = data.ml_risk_assessment.risk_level === 'LOW_RISK';

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('GOVERNMENT OF KARNATAKA - REVENUE DEPARTMENT', 105, 20, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Digital India Land Records Modernization Programme (DILRMP)', 105, 27, { align: 'center' });
    doc.text('LAND TITLE DUE-DILIGENCE & CADASTRAL VALIDATION CERTIFICATE', 105, 34, { align: 'center' });

    doc.line(20, 38, 190, 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`ULPIN (Bhu-Aadhaar): ${data.ulpin}`, 20, 48);
    doc.text(`Audit Record ID: ${data.record_id}`, 20, 56);
    doc.text(`Title Health Score: ${score.toFixed(1)} / 100 (${data.ml_risk_assessment.risk_level})`, 20, 64);

    doc.setFont('helvetica', 'normal');
    doc.text(`Survey & Hissa Number: ${data.extracted_entities.display_survey}`, 20, 76);
    doc.text(`Village / Hobli: ${data.extracted_entities.village}, Kasaba Hobli`, 20, 84);
    doc.text(`Taluk & District: ${data.extracted_entities.taluk}, ${data.extracted_entities.district}`, 20, 92);
    doc.text(`Titleholder / Khatedar: ${data.extracted_entities.vendor_name}`, 20, 100);
    doc.text(`Deed Claimed Extent: ${data.spatial_verification.deed_extent.acres} Acres ${data.spatial_verification.deed_extent.guntas} Guntas`, 20, 108);
    doc.text(`Cadastral Survey Extent: ${data.spatial_verification.cadastre_extent.acres} Acres ${data.spatial_verification.cadastre_extent.guntas} Guntas`, 20, 116);
    doc.text(`Variance: ${data.spatial_verification.area_discrepancy.diff_percentage.toFixed(2)}% (Tolerance: 2.0%)`, 20, 124);

    doc.line(20, 132, 190, 132);

    doc.setFont('helvetica', 'bold');
    doc.text('STATUTORY & COMPLIANCE FINDINGS:', 20, 142);
    doc.setFont('helvetica', 'normal');
    doc.text(`1. Section 22-A Prohibited Land Overlap: ${data.spatial_verification.has_encroachment ? 'VIOLATION DETECTED' : 'CLEAR (Nil Encroachment)'}`, 25, 150);
    doc.text(`2. Distance to Lake/Forest Buffer: ${data.spatial_verification.distance_to_buffer_m.toFixed(1)} meters`, 25, 158);
    doc.text(`3. Encumbrance Register (Form 15): ${data.spatial_verification.encumbrance_status}`, 25, 166);

    doc.line(20, 176, 190, 176);

    doc.setFontSize(9);
    doc.text(`Cryptographic Merkle Proof: ${data.cryptographic_ledger.block_hash}`, 20, 186);
    doc.text(`Certified electronically via Bhu-Praman Automated GIS Reconciliation Engine.`, 20, 194);
    doc.text(`Smart India Hackathon (SIH) National Land Governance Innovation.`, 20, 202);

    doc.save(`BhuPraman_Certificate_${data.extracted_entities.display_survey.replace('/', '_')}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital India Bhu-Aadhaar Certificate Viewer</span>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadPdf}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg transition"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Canvas */}
        <div className="p-8 sm:p-10 font-serif border-[12px] border-double border-slate-300 m-4 rounded-xl bg-gradient-to-b from-amber-50/20 via-white to-amber-50/10">
          {/* Header */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-slate-900">
            <div className="flex justify-center mb-1">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-slate-600">
              Government of Karnataka &bull; Department of Land Resources
            </h2>
            <h1 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-slate-950">
              LAND TITLE DUE-DILIGENCE & CADASTRAL VALIDATION CERTIFICATE
            </h1>
            <p className="text-[11px] font-sans text-slate-500">
              Issued under the Digital India Land Records Modernization Programme (DILRMP) Standards
            </p>
          </div>

          {/* Core Metadata Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Bhu-Aadhaar (ULPIN)
              </span>
              <span className="font-mono text-sm font-black text-emerald-700">
                {data.ulpin}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Audit Record ID
              </span>
              <span className="font-mono text-xs font-bold text-slate-800">
                {data.record_id}
              </span>
            </div>
          </div>

          {/* Land Schedule Details */}
          <div className="mt-5 space-y-2 text-xs font-sans text-slate-800">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Survey & Hissa Number:</span>
              <span className="font-bold">Survey No. {data.extracted_entities.display_survey}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Village / Hobli / Taluk:</span>
              <span className="font-semibold">
                {data.extracted_entities.village}, Kasaba Hobli, {data.extracted_entities.taluk}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Registered Khatedar / Owner:</span>
              <span className="font-bold text-slate-900">{data.extracted_entities.vendor_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Deed Claimed Extent:</span>
              <span className="font-semibold">
                {data.spatial_verification.deed_extent.acres} Acres {data.spatial_verification.deed_extent.guntas} Guntas ({data.spatial_verification.deed_extent.sq_meters.toLocaleString()} sq.m)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Cadastral Survey Extent:</span>
              <span className="font-bold text-emerald-800">
                {data.spatial_verification.cadastre_extent.acres} Acres {data.spatial_verification.cadastre_extent.guntas} Guntas ({data.spatial_verification.cadastre_extent.sq_meters.toLocaleString()} sq.m)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Physical Area Variance:</span>
              <span
                className={`font-bold ${
                  data.spatial_verification.area_discrepancy.within_legal_tolerance
                    ? 'text-emerald-700'
                    : 'text-rose-700'
                }`}
              >
                {data.spatial_verification.area_discrepancy.diff_percentage.toFixed(2)}% (Tolerance &plusmn;2%)
              </span>
            </div>
          </div>

          {/* Bottom Verification Seal & QR Section */}
          <div className="mt-6 pt-4 border-t-2 border-slate-300 flex items-center justify-between font-sans">
            <div className="flex items-center space-x-3">
              {/* Simulated QR Code */}
              <div className="w-16 h-16 bg-slate-950 p-1 rounded-xl flex items-center justify-center">
                <QrCode className="w-12 h-12 text-white" />
              </div>
              <div className="text-[10px] text-slate-600">
                <span className="font-bold text-slate-900 block">Scan to Verify Provenance</span>
                <span>SHA-256 Merkle Provenance Hash</span>
                <span className="font-mono block truncate max-w-[200px] text-slate-500">
                  {data.cryptographic_ledger.block_hash}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 mb-1">
                SCORE: {score.toFixed(0)} / 100 &bull; {data.ml_risk_assessment.risk_level}
              </div>
              <p className="text-[10px] text-slate-500 block">Digitally Certified by</p>
              <p className="text-xs font-bold text-slate-900">Bhu-Praman Automated Cadastre Engine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
