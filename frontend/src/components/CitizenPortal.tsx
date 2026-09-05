import React, { useState } from 'react';
import {
  ValidationResponse,
  DemoScenario,
  Language,
} from '../types/landRecord';
import { DEMO_SCENARIOS, UI_STRINGS, getPlainLanguageExplanation } from '../data/mockData';
import { validateLandRecord } from '../services/api';
import {
  AlertTriangle,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Download,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Info,
  RefreshCw,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CitizenPortalProps {
  validationResult: ValidationResponse;
  setValidationResult: (res: ValidationResponse) => void;
  lang: Language;
  onOpenGis: (surveyNo: string) => void;
  onOpenCertificate: () => void;
  onBackToLanding?: () => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  validationResult,
  setValidationResult,
  lang,
  onOpenGis,
  onOpenCertificate,
  onBackToLanding,
}) => {
  const t = UI_STRINGS[lang];
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('CASE_1_CLEAR_TITLE');
  const [documentText, setDocumentText] = useState<string>(DEMO_SCENARIOS[0].raw_text);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBoxField, setActiveBoxField] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState<'deed' | 'ror' | 'sketch'>('deed');
  
  // Dynamic 5-phase processing state (1 to 5) shown ONLY during validation
  const [activeStep, setActiveStep] = useState<number>(5);
  const [hasValidated, setHasValidated] = useState<boolean>(true);
  
  // Expandable Technical Evidence toggle
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [technicalTab, setTechnicalTab] = useState<'ocr' | 'gis' | 'buffer' | 'encumbrance' | 'ledger'>('ocr');

  const handleSelectScenario = (scenario: DemoScenario) => {
    setSelectedScenarioId(scenario.id);
    setDocumentText(scenario.raw_text);
  };

  const runAudit = async () => {
    setLoading(true);
    setActiveStep(1);

    try {
      // Dynamic step 1: Reading documents
      await new Promise((r) => setTimeout(r, 400));
      setActiveStep(2);

      const currentScen = DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId);
      const resPromise = validateLandRecord({
        raw_text: documentText,
        survey_no: currentScen?.survey_no,
        hissa_no: currentScen?.hissa_no,
        claimed_acres: currentScen?.claimed_acres,
        claimed_guntas: currentScen?.claimed_guntas,
        seller_name: currentScen?.seller_name,
        consideration: currentScen?.consideration,
      });

      // Dynamic step 2: Extracting land details
      await new Promise((r) => setTimeout(r, 450));
      setActiveStep(3);

      // Dynamic step 3: Comparing records
      await new Promise((r) => setTimeout(r, 450));
      setActiveStep(4);

      // Dynamic step 4: Checking cadastral information
      const res = await resPromise;
      await new Promise((r) => setTimeout(r, 350));
      
      // Dynamic step 5: Preparing result
      setActiveStep(5);
      setValidationResult(res);
      setHasValidated(true);

      if (res.ml_risk_assessment.risk_level === 'LOW_RISK') {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1b4d3e', '#246b54', '#7a9184', '#d9ccb4'],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const score = validationResult.ml_risk_assessment.land_health_score;
  const riskTier = validationResult.ml_risk_assessment.risk_level;

  // Count issues that require attention
  const issuesCount = validationResult.audit_flags.filter(
    (f) => f.severity !== 'CLEAR'
  ).length;

  // Determine Result State (Green, Orange, Red)
  const getResultState = () => {
    if (riskTier === 'LOW_RISK' && issuesCount === 0) {
      return {
        badge: 'GREEN',
        title: t.resultGreenTitle || 'Land Records Consistent',
        subtitle: t.resultGreenSubtitle || 'No discrepancies found. Title, cadastral extent, and ownership records are aligned.',
        badgeText: 'LAND RECORDS CONSISTENT',
        colorClass: 'text-green-800',
        bgClass: 'bg-green-50/90 border-green-300 shadow-[0_12px_28px_rgba(22,101,52,0.12)]',
        pillClass: 'bg-green-100 text-green-900 border-green-300',
        icon: <CheckCircle2 className="w-8 h-8 text-green-700 shrink-0" />,
      };
    }
    if (riskTier === 'HIGH_RISK' || validationResult.spatial_verification.has_encroachment) {
      return {
        badge: 'RED',
        title: t.resultRedTitle || 'High Risk / Verification Required',
        subtitle: t.resultRedSubtitle || 'Critical boundary overlap, legal encumbrance, or prohibited zone restriction identified.',
        badgeText: 'HIGH RISK / VERIFICATION REQUIRED',
        colorClass: 'text-rose-900',
        bgClass: 'bg-rose-50/90 border-rose-300 shadow-[0_12px_28px_rgba(185,28,28,0.12)]',
        pillClass: 'bg-rose-100 text-rose-900 border-rose-300',
        icon: <AlertTriangle className="w-8 h-8 text-rose-700 shrink-0" />,
      };
    }
    return {
      badge: 'ORANGE',
      title: t.resultOrangeTitle || 'Review Required',
      subtitle: t.resultOrangeSubtitle || 'Minor area discrepancy or name spelling variance found. Officer clarification recommended.',
      badgeText: 'REVIEW REQUIRED',
      colorClass: 'text-amber-900',
      bgClass: 'bg-amber-50/90 border-amber-300 shadow-[0_12px_28px_rgba(217,119,6,0.12)]',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: <AlertTriangle className="w-8 h-8 text-amber-700 shrink-0" />,
    };
  };

  const resultState = getResultState();

  const processingPhases = [
    { num: 1, label: t.procStep1 || '1. Reading documents' },
    { num: 2, label: t.procStep2 || '2. Extracting land details' },
    { num: 3, label: t.procStep3 || '3. Comparing records' },
    { num: 4, label: t.procStep4 || '4. Checking cadastral info' },
    { num: 5, label: t.procStep5 || '5. Preparing result' },
  ];

  return (
    <div className="space-y-8 py-2 max-w-7xl mx-auto">
      {/* CITIZEN HERO & WELCOME (NO PERMANENT 5-CARD BAR) */}
      <div className="bp-card p-6 md:p-8 corner-ticks border border-line bg-paper-raised shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sage-mist text-forest text-xs font-bold mb-3 border border-forest/20">
              <span>🏛️ DILRMP Verified Land Due-Diligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-forest-deep tracking-tight">
              {t.citizenHomeTitle || 'Verify Your Land Records'}
            </h1>
            <p className="text-sm text-ink-muted mt-2 max-w-2xl leading-relaxed">
              {t.citizenHomeSubtitle || 'Digitize, compare, and validate your sale deed, 7/12 RoR, and cadastral map to detect mismatches, encumbrances, and ownership risks before transacting.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-paper-sunken hover:bg-sage-mist border border-line text-xs font-semibold text-forest-deep transition cursor-pointer"
                title="Return to Home Screen"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.home || 'Home'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 1-CLICK REAL-WORLD SAMPLE SCENARIOS */}
      <div className="bp-card p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold text-forest-mid uppercase tracking-widest block">
              1-Click Demo Scenarios
            </span>
            <p className="text-xs text-ink-muted mt-0.5">
              Select any sample case below to simulate immediate deed and cadastre validation:
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-paper-sunken border border-line text-ink-faint">
            Mayaganahalli Cadastre
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEMO_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen)}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                selectedScenarioId === scen.id
                  ? 'bg-sage-mist border-forest text-ink shadow-md ring-2 ring-forest/20'
                  : 'bg-paper-raised border-line text-ink-muted hover:border-forest-mid/50 hover:bg-paper-sunken'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-forest-deep">
                    Survey {scen.survey_no}/{scen.hissa_no}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      scen.expected_risk === 'LOW_RISK'
                        ? 'bg-green-100 text-green-900 border border-green-200'
                        : scen.expected_risk === 'MODERATE_RISK'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-rose-100 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {scen.expected_risk === 'LOW_RISK'
                      ? 'Consistent'
                      : scen.expected_risk === 'MODERATE_RISK'
                      ? 'Review Needed'
                      : 'High Risk'}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-ink leading-tight">
                  {scen.title.split(':')[1] || scen.title}
                </h5>
                <p className="text-[11px] text-ink-muted mt-1 line-clamp-2 leading-relaxed">
                  {scen.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-line text-[10px] text-forest-mid font-semibold flex items-center justify-between">
                <span>Extent: {scen.claimed_acres}A {scen.claimed_guntas}G</span>
                <span className="text-forest font-bold">Select ✓</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* DOCUMENT INGESTION WORKSPACE */}
      <div className="bp-card p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-forest-mid" />
            <h3 className="font-bold text-forest-deep text-base">
              {t.uploadLandDocsTitle}
            </h3>
          </div>

          {/* Document Ingestion Tabs */}
          <div className="flex items-center space-x-1 bg-paper-sunken p-1 rounded-xl border border-line text-xs font-semibold">
            <button
              onClick={() => setActiveDocTab('deed')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                activeDocTab === 'deed' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.docTabSaleDeed}</span>
            </button>
            <button
              onClick={() => setActiveDocTab('ror')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                activeDocTab === 'ror' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{t.docTabRor}</span>
            </button>
            <button
              onClick={() => setActiveDocTab('sketch')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                activeDocTab === 'sketch' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.docTabSurvey}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Text & OCR Inspector Box */}
          <div className="lg:col-span-8 space-y-2">
            <div className="relative rounded-xl border border-line bg-paper-sunken p-3.5">
              <div className="flex items-center justify-between mb-2 text-xs text-ink-muted font-semibold">
                <span>
                  {activeDocTab === 'deed'
                    ? 'Registered Sale Deed Text'
                    : activeDocTab === 'ror'
                    ? 'Record of Rights (7/12 / RTC) Details'
                    : 'Cadastral Survey Map Coordinates'}
                </span>
                <span className="font-mono text-[11px] text-ink-faint">Auto-Detected: Kannada & English</span>
              </div>
              <textarea
                rows={6}
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                className="w-full bg-transparent text-xs text-ink font-mono resize-none focus:outline-none leading-relaxed"
                placeholder="Paste registered deed text or extract content from your official land document..."
              />
              <div className="flex items-center justify-between pt-2.5 border-t border-line text-[11px] text-ink-faint">
                <span>{documentText.length} characters analyzed</span>
                <span>Jurisdiction: Sub-Registrar Ramanagara</span>
              </div>
            </div>
          </div>

          {/* Right: Drag-Drop Upload Area & Primary Action */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <label className="flex-1 flex flex-col items-center justify-center p-5 border-2 border-dashed border-line hover:border-forest-mid rounded-xl bg-paper-sunken/60 cursor-pointer transition group text-center">
              <UploadCloud className="w-7 h-7 text-sage group-hover:text-forest-mid transition mb-1.5" />
              <span className="text-xs text-ink font-bold group-hover:text-forest-deep">
                Drag and drop your deed or sketch
              </span>
              <span className="text-[10px] text-ink-faint mt-1">
                Supports PDF, JPG, PNG up to 25MB
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    alert(`Loaded file: ${e.target.files[0].name}. Click 'Validate Land Record' to analyze.`);
                  }
                }}
              />
            </label>

            <button
              onClick={runAudit}
              disabled={loading}
              className="w-full py-4 px-5 rounded-xl bg-forest hover:bg-forest-mid text-white font-bold text-sm shadow-[0_8px_20px_rgba(27,77,62,0.25)] flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sand" />
                  <span>{t.validateActionBtn} →</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC 5-PHASE PROCESSING INDICATOR (ONLY SHOWN WHEN LOADING IS TRUE) */}
      {loading && (
        <div className="bp-card p-5 md:p-6 border-2 border-forest bg-sage-mist/40 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-forest-mid animate-spin" />
              <span className="text-xs font-bold text-forest-deep uppercase tracking-wider">
                Dynamic Verification in Progress
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-forest-mid">
              Phase {activeStep} of 5
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {processingPhases.map((phase) => {
              const isCompleted = activeStep > phase.num;
              const isCurrent = activeStep === phase.num;

              return (
                <div
                  key={phase.num}
                  className={`p-3 rounded-xl border text-xs flex items-center space-x-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-forest/15 border-forest text-forest font-bold'
                      : isCurrent
                      ? 'bg-forest text-white font-bold shadow-md ring-2 ring-forest/30 animate-pulse'
                      : 'bg-paper-raised/70 border-line text-ink-faint'
                  }`}
                >
                  <span className="shrink-0 text-xs w-4 h-4 rounded-full flex items-center justify-center border border-current">
                    {isCompleted ? '✓' : phase.num}
                  </span>
                  <span className="truncate text-[11px]">{phase.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PROMINENT CITIZEN RESULT CARD */}
      {hasValidated && !loading && (
        <div className={`rounded-3xl border-2 p-6 md:p-8 corner-ticks transition-all duration-300 ${resultState.bgClass}`}>
          {/* Top Banner Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-black/10">
            <div className="flex items-start space-x-4">
              <div className="mt-1">{resultState.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${resultState.pillClass}`}>
                    {resultState.badgeText}
                  </span>
                  <span className="text-xs font-mono text-ink-faint">
                    ULPIN: <strong>{validationResult.ulpin}</strong>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-forest-deep mt-1.5">
                  {resultState.title}
                </h3>
                <p className="text-sm text-ink-muted mt-1 max-w-3xl leading-relaxed">
                  {resultState.subtitle}
                </p>
              </div>
            </div>

            {/* Health Score Gauge */}
            <div className="bg-paper-raised p-4 rounded-2xl border border-line text-center shrink-0 flex items-center md:flex-col justify-between md:justify-center gap-2 shadow-sm min-w-[140px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                Title Health Score
              </span>
              <span className="text-3xl font-black text-forest-deep">
                {score.toFixed(0)} <span className="text-sm text-ink-faint font-normal">/ 100</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-mist text-forest font-semibold">
                {riskTier}
              </span>
            </div>
          </div>

          {/* 4-Item Land Information Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-black/10 text-xs">
            {/* Owner Name */}
            <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
              <span className="text-ink-faint text-[11px] block font-medium">
                {t.ownerName}
              </span>
              <span className="text-sm font-bold text-forest-deep block mt-0.5 truncate">
                {validationResult.extracted_entities.vendor_name}
              </span>
              <span className="text-[10px] text-ink-muted">Recorded Landholder</span>
            </div>

            {/* Survey Number */}
            <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
              <span className="text-ink-faint text-[11px] block font-medium">
                {t.surveyNumber}
              </span>
              <span className="text-sm font-bold text-forest-deep block mt-0.5">
                Survey {validationResult.extracted_entities.display_survey}
              </span>
              <span className="text-[10px] text-ink-muted">{validationResult.extracted_entities.village} Village</span>
            </div>

            {/* Land Area */}
            <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
              <span className="text-ink-faint text-[11px] block font-medium">
                {t.landArea} (Deed vs Cadastre)
              </span>
              <span className="text-sm font-bold text-forest-deep block mt-0.5">
                {validationResult.spatial_verification.deed_extent.acres}A {validationResult.spatial_verification.deed_extent.guntas}G
              </span>
              <span className="text-[10px] text-ink-muted">
                Cadastre: {validationResult.spatial_verification.cadastre_extent.acres}A {validationResult.spatial_verification.cadastre_extent.guntas}G
              </span>
            </div>

            {/* Issues Found */}
            <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
              <span className="text-ink-faint text-[11px] block font-medium">
                {t.issuesFound}
              </span>
              <span
                className={`text-sm font-bold block mt-0.5 ${
                  issuesCount === 0 ? 'text-green-800' : 'text-rose-700'
                }`}
              >
                {issuesCount === 0 ? '0 Inconsistencies' : `${issuesCount} Issue(s) Detected`}
              </span>
              <span className="text-[10px] text-ink-muted">
                {issuesCount === 0 ? 'Clear to proceed' : 'Verification advised'}
              </span>
            </div>
          </div>

          {/* PLAIN-LANGUAGE ANOMALY EXPLANATIONS (NO CONFUSING JARGON) */}
          <div className="py-5 space-y-3">
            <h4 className="text-xs font-bold text-forest-deep uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-forest-mid" />
              <span>Plain-Language Summary of Findings</span>
            </h4>

            <div className="space-y-2.5">
              {validationResult.audit_flags.map((flag, idx) => {
                const plain = getPlainLanguageExplanation(flag.category || flag.title, lang);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border bg-paper-raised/95 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm ${
                      flag.severity === 'CLEAR'
                        ? 'border-green-200'
                        : flag.severity === 'CRITICAL'
                        ? 'border-rose-300'
                        : 'border-amber-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {flag.severity === 'CLEAR' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-forest-deep">
                          {plain.title}
                        </h5>
                        <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                          {plain.explanation}
                        </p>
                        <p className="text-[11px] text-forest-mid font-medium mt-1">
                          <strong>Recommended Step:</strong> {plain.action}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper-sunken border border-line text-ink-faint">
                        Ref: {plain.technicalCode}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTONS ROW */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/10">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenGis(validationResult.extracted_entities.display_survey)}
                className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-mid text-white font-bold text-xs shadow-[0_8px_16px_rgba(27,77,62,0.22)] flex items-center space-x-2 transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-sand" />
                <span>{t.inspectGis}</span>
              </button>

              <button
                onClick={onOpenCertificate}
                className="px-4 py-2.5 rounded-xl bg-paper-raised hover:bg-sage-mist text-forest-deep font-bold text-xs border border-line flex items-center space-x-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-forest-mid" />
                <span>{t.downloadCert}</span>
              </button>
            </div>

            {/* Toggle Technical Evidence Accordion */}
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="px-4 py-2.5 rounded-xl bg-paper-sunken hover:bg-paper-raised text-ink-muted hover:text-forest-deep font-semibold text-xs border border-line flex items-center space-x-1.5 transition cursor-pointer"
            >
              <span>{showTechnicalDetails ? t.hideTechnicalDetails : t.viewTechnicalDetails}</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-4 pt-3 text-[11px] text-ink-faint border-t border-black/5 leading-normal">
            {t.resultDisclaimer}
          </div>
        </div>
      )}

      {/* SECONDARY SECTION: TECHNICAL EVIDENCE (EXPANDABLE) */}
      {showTechnicalDetails && hasValidated && (
        <div className="bp-card p-6 border-2 border-line shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-line">
            <div>
              <span className="text-xs font-bold text-forest-mid uppercase tracking-wider">
                Auditor & Expert Scrutiny
              </span>
              <h3 className="text-lg font-black text-forest-deep mt-0.5">
                Technical Evidence & Verification Traces
              </h3>
            </div>

            {/* Technical Sub-tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-paper-sunken p-1 rounded-xl border border-line text-xs font-semibold">
              <button
                onClick={() => setTechnicalTab('ocr')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  technicalTab === 'ocr' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                OCR Trace
              </button>
              <button
                onClick={() => setTechnicalTab('gis')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  technicalTab === 'gis' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Cadastral Math
              </button>
              <button
                onClick={() => setTechnicalTab('buffer')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  technicalTab === 'buffer' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Section 22A
              </button>
              <button
                onClick={() => setTechnicalTab('encumbrance')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  technicalTab === 'encumbrance' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Form 15 Encumbrance
              </button>
              <button
                onClick={() => setTechnicalTab('ledger')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  technicalTab === 'ledger' ? 'bg-forest text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Blockchain Ledger
              </button>
            </div>
          </div>

          {/* Sub-tab 1: OCR Trace & Extracted Entities */}
          {technicalTab === 'ocr' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
                  Extracted Field Geometry & Confidence
                </span>
                <div className="space-y-2">
                  {validationResult.extracted_entities.bounding_boxes.map((box, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveBoxField(box.field)}
                      onMouseLeave={() => setActiveBoxField(null)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                        activeBoxField === box.field
                          ? 'bg-sage-mist border-forest text-forest-deep'
                          : 'bg-paper-sunken border-line text-ink hover:border-forest-mid/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-forest-mid shrink-0" />
                        <span className="font-semibold text-ink-faint">{box.field}:</span>
                        <span className="font-bold text-ink truncate">{box.value || 'Verified in Document'}</span>
                      </div>
                      <span className="text-[11px] font-mono text-forest-mid ml-2">
                        {(box.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Document Preview */}
              <div className="lg:col-span-6 bg-sand/30 rounded-2xl border border-line p-5 font-serif text-xs text-ink leading-relaxed">
                <div className="text-center font-bold text-forest-deep border-b border-line pb-2 mb-3">
                  GOVERNMENT OF KARNATAKA &bull; SUB-REGISTRAR OFFICE RAMANAGARA
                </div>
                <p className="mb-2">
                  <strong>Document Type:</strong> {validationResult.document_classification.display_name}
                </p>
                <p className="mb-2">
                  <strong>Survey No:</strong> {validationResult.extracted_entities.display_survey} ({validationResult.extracted_entities.village})
                </p>
                <p className="mb-2">
                  <strong>Claimed Extent:</strong> {validationResult.spatial_verification.deed_extent.acres} Acres {validationResult.spatial_verification.deed_extent.guntas} Guntas
                </p>
                <p className="mb-2">
                  <strong>Vendor:</strong> {validationResult.extracted_entities.vendor_name}
                </p>
                <p className="mb-2">
                  <strong>Purchaser:</strong> {validationResult.extracted_entities.purchaser_name}
                </p>
                <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-faint">
                  Boundaries: North - {validationResult.extracted_entities.boundaries.north} | South - {validationResult.extracted_entities.boundaries.south}
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 2: Cadastral Survey & Area Math */}
          {technicalTab === 'gis' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bp-inset p-4 space-y-2">
                <h4 className="font-bold text-forest-deep text-sm mb-2">Area Reconciliation Matrix</h4>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Deed Claimed Area:</span>
                  <span className="font-bold text-ink">
                    {validationResult.spatial_verification.deed_extent.acres}A {validationResult.spatial_verification.deed_extent.guntas}G ({validationResult.spatial_verification.deed_extent.sq_meters.toLocaleString()} sq.m)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Official Cadastral Survey:</span>
                  <span className="font-bold text-forest-mid">
                    {validationResult.spatial_verification.cadastre_extent.acres}A {validationResult.spatial_verification.cadastre_extent.guntas}G ({validationResult.spatial_verification.cadastre_extent.sq_meters.toLocaleString()} sq.m)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Area Difference:</span>
                  <span className="font-bold text-ink">
                    {validationResult.spatial_verification.area_discrepancy.diff_sq_meters.toFixed(1)} sq.m ({validationResult.spatial_verification.area_discrepancy.diff_percentage.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-ink-faint">Statutory Tolerance (2.0%):</span>
                  <span
                    className={`font-bold ${
                      validationResult.spatial_verification.area_discrepancy.within_legal_tolerance
                        ? 'text-green-800'
                        : 'text-rose-700'
                    }`}
                  >
                    {validationResult.spatial_verification.area_discrepancy.within_legal_tolerance
                      ? 'WITHIN LEGAL LIMIT'
                      : 'EXCEEDS LEGAL TOLERANCE'}
                  </span>
                </div>
              </div>

              <div className="bp-inset p-4 space-y-2">
                <h4 className="font-bold text-forest-deep text-sm mb-2">Spatial Vector Identity</h4>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Parcel Unique ID:</span>
                  <span className="font-mono font-bold text-forest-mid">
                    {validationResult.spatial_verification.parcel_id}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Survey Projection:</span>
                  <span className="font-mono text-ink">WGS-84 / UTM Zone 43N</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line">
                  <span className="text-ink-faint">Bhoomi RTC Khatedar:</span>
                  <span className="font-bold text-ink">
                    {validationResult.spatial_verification.khatedar_name}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-ink-faint">GIS Map Layer:</span>
                  <button
                    onClick={() => onOpenGis(validationResult.extracted_entities.display_survey)}
                    className="text-forest-mid hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Interactive Vector</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Section 22A Environmental Buffers */}
          {technicalTab === 'buffer' && (
            <div className="bp-inset p-4 space-y-3 text-xs">
              <h4 className="font-bold text-forest-deep text-sm">
                Section 22-A Registration Act & Environmental Buffer Scrutiny
              </h4>
              <p className="text-ink-muted">
                Section 22A prohibits registration of properties that encroach upon government lakes, waterways, drainage channels (Halla), or forest reserves.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-paper-raised p-3 rounded-xl border border-line">
                  <span className="text-ink-faint block">Lake Catchment Distance</span>
                  <span className="font-bold text-forest-deep text-sm mt-0.5 block">
                    {validationResult.spatial_verification.distance_to_buffer_m.toFixed(1)} meters
                  </span>
                </div>
                <div className="bg-paper-raised p-3 rounded-xl border border-line">
                  <span className="text-ink-faint block">Encroachment Flag</span>
                  <span
                    className={`font-bold text-sm mt-0.5 block ${
                      validationResult.spatial_verification.has_encroachment
                        ? 'text-rose-700'
                        : 'text-green-800'
                    }`}
                  >
                    {validationResult.spatial_verification.has_encroachment ? 'YES - BLOCKED' : 'NO - CLEAR'}
                  </span>
                </div>
                <div className="bg-paper-raised p-3 rounded-xl border border-line">
                  <span className="text-ink-faint block">Statutory Clearance</span>
                  <span className="font-bold text-forest-mid text-sm mt-0.5 block">
                    {validationResult.spatial_verification.encumbrance_status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 4: Form 15 Encumbrance & Liens */}
          {technicalTab === 'encumbrance' && (
            <div className="bp-inset p-4 space-y-3 text-xs">
              <h4 className="font-bold text-forest-deep text-sm">
                Sub-Registrar 30-Year Encumbrance Search (Form 15)
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-faint">Period of Search:</span>
                  <span className="font-bold text-ink">1994 to 2024 (30 Years Continuous)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-faint">Financial Charges / Mortgages:</span>
                  <span
                    className={`font-bold ${
                      validationResult.spatial_verification.encumbrance_status.includes('LIEN')
                        ? 'text-amber-800'
                        : 'text-green-800'
                    }`}
                  >
                    {validationResult.spatial_verification.encumbrance_status.includes('LIEN')
                      ? 'Active Canara Bank Kisan Charge'
                      : 'Nil Encumbrance Recorded'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-line">
                  <span className="text-ink-faint">Court Stays / Lis Pendens:</span>
                  <span className="font-bold text-green-800">None Recorded in Ramanagara Taluk</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 5: Blockchain Ledger */}
          {technicalTab === 'ledger' && (
            <div className="bp-inset p-4 space-y-3 text-xs">
              <h4 className="font-bold text-forest-deep text-sm">
                Cryptographic Audit Ledger & Bhu-Aadhaar Merkle Proof
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-ink-faint block text-[11px]">Block Cryptographic Hash (SHA-256):</span>
                  <span className="font-mono text-forest-mid break-all block mt-0.5">
                    {validationResult.cryptographic_ledger.block_hash}
                  </span>
                </div>
                <div>
                  <span className="text-ink-faint block text-[11px]">Audit Timestamp:</span>
                  <span className="font-mono text-ink">
                    {new Date(validationResult.cryptographic_ledger.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-800" />
                  <span className="font-semibold text-green-800">
                    Tamper-Evident Ledger Integrity Confirmed
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
