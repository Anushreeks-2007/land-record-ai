import React, { useState } from 'react';
import {
  ValidationResponse,
  DemoScenario,
  Language,
} from '../types/landRecord';
import { DEMO_SCENARIOS, UI_STRINGS } from '../data/mockData';
import { validateLandRecord } from '../services/api';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  UploadCloud,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  MapPin,
  FileCheck2,
  Cpu,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CitizenPortalProps {
  validationResult: ValidationResponse;
  setValidationResult: (res: ValidationResponse) => void;
  lang: Language;
  onOpenGis: (surveyNo: string) => void;
  onOpenCertificate: () => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  validationResult,
  setValidationResult,
  lang,
  onOpenGis,
  onOpenCertificate,
}) => {
  const t = UI_STRINGS[lang];
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('CASE_1_CLEAR_TITLE');
  const [documentText, setDocumentText] = useState<string>(DEMO_SCENARIOS[0].raw_text);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBoxField, setActiveBoxField] = useState<string | null>(null);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setSelectedScenarioId(scenario.id);
    setDocumentText(scenario.raw_text);
  };

  const runAudit = async () => {
    setLoading(true);
    try {
      const currentScen = DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId);
      const res = await validateLandRecord({
        raw_text: documentText,
        survey_no: currentScen?.survey_no,
        hissa_no: currentScen?.hissa_no,
        claimed_acres: currentScen?.claimed_acres,
        claimed_guntas: currentScen?.claimed_guntas,
        seller_name: currentScen?.seller_name,
        consideration: currentScen?.consideration,
      });

      setValidationResult(res);

      if (res.ml_risk_assessment.risk_level === 'LOW_RISK') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#38bdf8', '#fbbf24'],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const score = validationResult.ml_risk_assessment.land_health_score;
  const riskTier = validationResult.ml_risk_assessment.risk_level;

  const getScoreColor = () => {
    if (riskTier === 'LOW_RISK') return 'text-emerald-400 border-emerald-500 shadow-emerald-500/20';
    if (riskTier === 'MODERATE_RISK') return 'text-amber-400 border-amber-500 shadow-amber-500/20';
    return 'text-rose-400 border-rose-500 shadow-rose-500/20';
  };

  const getScoreBg = () => {
    if (riskTier === 'LOW_RISK') return 'bg-emerald-950/40 border-emerald-800/50';
    if (riskTier === 'MODERATE_RISK') return 'bg-amber-950/40 border-amber-800/50';
    return 'bg-rose-950/40 border-rose-800/50';
  };

  return (
    <div className="space-y-8">
      {/* Hero / Hackathon Demo Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH 2026 Innovation Track &bull; Digital India Bhu-Aadhaar Integration</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Automated Land Title Due-Diligence & Cadastral Reconciliation
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
            Upload deed images, historical RoR/7-12 extracts, or survey sketches. Our AI extracts
            revenue entities, reconciles physical GIS cadastre boundaries, flags Section 22A
            prohibited encroachments, and issues a tamper-evident Bhu-Aadhaar certificate.
          </p>

          {/* Quick Scenario Selector for Judges */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
              Judge Quick-Evaluation Scenarios (1-Click Presets):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {DEMO_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => handleSelectScenario(scen)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedScenarioId === scen.id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Survey {scen.survey_no}/{scen.hissa_no}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        scen.expected_risk === 'LOW_RISK'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : scen.expected_risk === 'MODERATE_RISK'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {scen.expected_risk === 'LOW_RISK' ? 'Clear' : scen.expected_risk === 'MODERATE_RISK' ? 'Review' : 'High Risk'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                    {scen.title.split(':')[1] || scen.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Working Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Document Ingestion & Interactive OCR Visualizer (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>Archival Document Ingestion</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Multilingual OCR Engine</span>
            </div>

            {/* Document Text Editor / Uploader */}
            <div className="space-y-3">
              <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-3">
                <textarea
                  rows={8}
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-200 font-mono resize-none focus:outline-none"
                  placeholder="Paste registered deed text or extract content..."
                />
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-500">
                  <span>Detected Script: Indo-Aryan / Kannada / English</span>
                  <span>{documentText.length} characters</span>
                </div>
              </div>

              {/* Upload Dropzone UI */}
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl bg-slate-950/40 cursor-pointer transition group">
                <UploadCloud className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 transition mb-1" />
                <span className="text-xs text-slate-300 font-medium group-hover:text-white">
                  Drop scanned deed, PDF extract, or RTC image
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Supports PNG, JPG, PDF, TIFF</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      alert(`Loaded file: ${e.target.files[0].name}. Triggering pre-processing pipeline.`);
                    }
                  }}
                />
              </label>

              {/* Run Validation CTA Button */}
              <button
                onClick={runAudit}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Vision OCR & Cadastral GIS...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Run AI Digitization & Multi-Tier Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Bounding-Box Document Viewer Preview */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Extracted Field Bounding Boxes (Document Preview)
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">100% Geometry Trace</span>
            </div>

            {/* Simulated Document Canvas with Highlighted Boxes */}
            <div className="relative bg-amber-50/5 rounded-xl border border-slate-800 p-4 font-serif text-[11px] text-slate-300 leading-relaxed overflow-hidden">
              <div className="text-center font-bold text-slate-200 border-b border-slate-800 pb-2 mb-3">
                GOVERNMENT OF KARNATAKA &bull; SUB-REGISTRAR OFFICE RAMANAGARA
              </div>

              {/* Extracted Entity Tags */}
              <div className="space-y-2">
                {validationResult.extracted_entities.bounding_boxes.map((box, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveBoxField(box.field)}
                    onMouseLeave={() => setActiveBoxField(null)}
                    className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                      activeBoxField === box.field
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-sans font-semibold text-[11px] text-slate-400">
                        {box.field}:
                      </span>
                      <span className="font-sans font-bold text-white truncate">
                        {box.value || 'Verified in Document Body'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 ml-2">
                      {(box.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Tier Audit & Validation Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Land Health Score Gauge Card */}
          <div className={`rounded-2xl border p-6 shadow-xl ${getScoreBg()}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-5">
                {/* Circular Score Badge */}
                <div
                  className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-black shadow-lg ${getScoreColor()} bg-slate-950`}
                >
                  <span className="text-3xl tracking-tighter leading-none">{score.toFixed(0)}</span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-sans mt-0.5">
                    / 100
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-white">
                      {riskTier === 'LOW_RISK'
                        ? 'Clear Marketable Title'
                        : riskTier === 'MODERATE_RISK'
                        ? 'Discrepancy / Inconsistency Detected'
                        : 'High Risk / Severe Violation Alert'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {riskTier === 'LOW_RISK'
                      ? 'No boundary encroachments, cadastral area matches perfectly, clear 30-year chain of title.'
                      : riskTier === 'MODERATE_RISK'
                      ? 'Discrepancy between registered deed claims and official government cadastral records.'
                      : 'Severe Section 22A violation, statutory encroachment, or illegal area inflation detected.'}
                  </p>
                  <div className="flex items-center space-x-3 mt-2 text-[11px] font-mono text-slate-400">
                    <span>ULPIN: <strong className="text-emerald-400">{validationResult.ulpin}</strong></span>
                    <span>&bull;</span>
                    <span>Survey No: <strong className="text-white">{validationResult.extracted_entities.display_survey}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={onOpenCertificate}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950 flex items-center justify-center space-x-1.5 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Validation Cert</span>
                </button>
                <button
                  onClick={() => onOpenGis(validationResult.extracted_entities.display_survey)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-1.5 transition"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Inspect GIS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Verification Matrix (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Cadastral Extent Reconciliation */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>1. Area Reconciliation</span>
                </span>
                {validationResult.spatial_verification.area_discrepancy.within_legal_tolerance ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Deed Claimed:</span>
                  <span className="font-semibold text-white">
                    {validationResult.spatial_verification.deed_extent.acres}A{' '}
                    {validationResult.spatial_verification.deed_extent.guntas}G (
                    {validationResult.spatial_verification.deed_extent.sq_meters.toLocaleString()} sq.m)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Cadastre Survey:</span>
                  <span className="font-semibold text-emerald-400">
                    {validationResult.spatial_verification.cadastre_extent.acres}A{' '}
                    {validationResult.spatial_verification.cadastre_extent.guntas}G (
                    {validationResult.spatial_verification.cadastre_extent.sq_meters.toLocaleString()} sq.m)
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-slate-400">Variance:</span>
                  <span
                    className={
                      validationResult.spatial_verification.area_discrepancy.within_legal_tolerance
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }
                  >
                    {validationResult.spatial_verification.area_discrepancy.diff_percentage.toFixed(2)}% (
                    {validationResult.spatial_verification.area_discrepancy.within_legal_tolerance
                      ? 'Within 2% legal limit'
                      : 'EXCEEDS TOLERANCE'}
                    )
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Section 22A Prohibited Encroachment */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>2. Prohibited Zone Check</span>
                </span>
                {!validationResult.spatial_verification.has_encroachment ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Lake/Forest Buffer:</span>
                  <span
                    className={`font-semibold ${
                      validationResult.spatial_verification.has_encroachment
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {validationResult.spatial_verification.has_encroachment
                      ? 'ENCROACHMENT DETECTED'
                      : `${validationResult.spatial_verification.distance_to_buffer_m.toFixed(1)}m (Clear)`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Section 22-A Status:</span>
                  <span className="font-semibold text-slate-200">
                    {validationResult.spatial_verification.encumbrance_status}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Statutory Clearance:</span>
                  <span
                    className={`font-bold ${
                      validationResult.spatial_verification.has_encroachment
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {validationResult.spatial_verification.has_encroachment ? 'BLOCKED' : 'PERMITTED'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: 30-Year Encumbrance & Form 15 */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>3. Encumbrance Search</span>
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">EC Form Search:</span>
                  <span className="font-semibold text-white">Form 15 (1994 - 2024)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Mortgage / Bank Lien:</span>
                  <span
                    className={
                      validationResult.spatial_verification.encumbrance_status.includes('LIEN')
                        ? 'text-amber-400 font-bold'
                        : 'text-emerald-400 font-semibold'
                    }
                  >
                    {validationResult.spatial_verification.encumbrance_status.includes('LIEN')
                      ? 'Active Hypothecation'
                      : 'Nil Encumbrance'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Court Attachment:</span>
                  <span className="font-bold text-emerald-400">None Recorded</span>
                </div>
              </div>
            </div>

            {/* Card 4: Cryptographic Provenance Ledger */}
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>4. Merkle Audit Ledger</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono">
                  SHA-256
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Block Fingerprint:</span>
                  <span className="font-mono text-[11px] text-teal-400 truncate block">
                    {validationResult.cryptographic_ledger.block_hash}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Ledger Status:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Tamper-Free DILRMP Chain</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Granular Audit Flags List */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Detailed Compliance & Anomaly Flags ({validationResult.audit_flags.length})</span>
            </h4>

            <div className="space-y-2.5">
              {validationResult.audit_flags.map((flag, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start space-x-3 ${
                    flag.severity === 'CLEAR'
                      ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                      : flag.severity === 'CRITICAL'
                      ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                      : 'bg-amber-950/30 border-amber-800/40 text-amber-200'
                  }`}
                >
                  {flag.severity === 'CLEAR' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-white">{flag.title}</h5>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{flag.message}</p>
                    {flag.resolution && (
                      <div className="mt-1.5 text-[11px] font-medium text-amber-300 bg-slate-950/50 px-2.5 py-1 rounded-lg border border-slate-800">
                        <strong>Mandatory Action:</strong> {flag.resolution}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
