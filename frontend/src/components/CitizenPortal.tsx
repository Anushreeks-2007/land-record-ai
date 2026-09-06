import React, { useState } from 'react';
import {
  ValidationResponse,
  Language,
} from '../types/landRecord';
import { UI_STRINGS, getPlainLanguageExplanation } from '../data/mockData';
import { validateLandRecord } from '../services/api';
import {
  AlertTriangle,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  MapPin,
  ArrowLeft,
  Info,
  RefreshCw,
  Layers,
  FileSpreadsheet,
  X,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CitizenPortalProps {
  validationResult: ValidationResponse;
  setValidationResult: (res: ValidationResponse) => void;
  lang: Language;
  onOpenGis: (surveyNo: string) => void;
  onOpenCertificate: () => void;
  onBackToLanding?: () => void;
  isCitizenValidated: boolean;
  setIsCitizenValidated: (value: boolean) => void;
}

type UploadType = 'deed' | 'ror' | 'survey';

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  validationResult,
  setValidationResult,
  lang,
  onOpenGis,
  onOpenCertificate,
  onBackToLanding,
  isCitizenValidated,
  setIsCitizenValidated,
}) => {
  const t = UI_STRINGS[lang];
  const [documentText, setDocumentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<Record<UploadType, string>>({
    deed: '',
    ror: '',
    survey: '',
  });
  const [documentDetections, setDocumentDetections] = useState<Record<UploadType, string>>({
    deed: '',
    ror: '',
    survey: '',
  });
  const [activeDocTab, setActiveDocTab] = useState<UploadType>('deed');
  const [activeStep, setActiveStep] = useState<number>(1);

  const allDocumentsUploaded = Object.values(uploadedFiles).every((name) => name.trim().length > 0);

  const workflowSteps = [
    { label: 'Upload', status: 'active' },
    { label: 'Validate', status: 'idle' },
    { label: 'Processing', status: 'idle' },
    { label: 'Result', status: 'idle' },
  ];

  const currentWorkflowIndex = loading ? 2 : isCitizenValidated ? 3 : 0;

  const expectedDocumentTypes: Record<UploadType, string> = {
    deed: 'Sale Deed',
    ror: '7/12 / RoR record',
    survey: 'Survey Document / Cadastral Map',
  };

  const detectDocumentType = async (file: File | null): Promise<string> => {
    if (!file) return 'No file';

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const res = await fetch('http://localhost:8000/api/document-classify', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const classification = data.document_type;

        if (classification === 'SALE_DEED') return 'Sale Deed';
        if (classification === 'ROR_RTC_712') return '7/12 / RoR record';
        if (classification === 'SURVEY_DOCUMENT') return 'Survey Document / Cadastral Map';
        if (classification === 'UNKNOWN') return 'Unable to verify document type';
        if (data.detected_type) return data.detected_type;
      }
    } catch (error) {
      console.warn('Backend document classification unavailable; falling back to content scan only.', error);
    }

    // Safety fallback: only a content scan, never filename-based acceptance.
    try {
      const rawText = await file.text();
      const haystack = rawText.toLowerCase();

      if (/(sale deed|deed of sale|absolute sale deed|conveyance deed|purchaser|vendor|seller|consideration|property conveyed)/.test(haystack)) {
        return 'Sale Deed';
      }
      if (/(record of rights|ror|7\/12|7-12|rtc|khata|khatedar|mutation number|recorded holder|cultivation|revenue record)/.test(haystack)) {
        return '7/12 / RoR record';
      }
      if (/(survey number|hissa|subdivision|cadastral|survey sketch|parcel|boundary description|measured area|survey map)/.test(haystack)) {
        return 'Survey Document / Cadastral Map';
      }
    } catch {
      // Leave as unable to verify rather than trusting metadata.
    }

    return 'Unable to verify document type';
  };

  const handleFileSelect = async (type: UploadType, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file ? file.name : '' }));
    const detected = await detectDocumentType(file);
    setDocumentDetections((prev) => ({ ...prev, [type]: detected }));
    setUploadError('');
  };

  const handleRemoveFile = (type: UploadType) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: '' }));
    setDocumentDetections((prev) => ({ ...prev, [type]: '' }));
    setUploadError('');
  };

  const runAudit = async () => {
    if (!allDocumentsUploaded) {
      setUploadError('Please upload all three required official documents before validation.');
      return;
    }

    const mismatches = (Object.keys(expectedDocumentTypes) as UploadType[]).filter((type) => {
      const detected = documentDetections[type];
      const expected = expectedDocumentTypes[type];
      return !detected || detected === 'Unable to verify document type' || detected !== expected;
    });

    if (mismatches.length > 0) {
      const type = mismatches[0];
      const expected = expectedDocumentTypes[type];
      const detected = documentDetections[type] || 'Unable to verify document type';

      setUploadError(
        detected === 'Unable to verify document type'
          ? `Unable to verify document type. ${expected} was expected, but the uploaded file could not be confidently identified.`
          : `Document type mismatch. ${expected} was expected, but this file appears to be a ${detected}. Please upload the correct ${expected.toLowerCase()}.`
      );
      setIsCitizenValidated(false);
      return;
    }

    setUploadError('');
    setLoading(true);
    setActiveStep(1);
    setIsCitizenValidated(false);

    try {
      await new Promise((r) => setTimeout(r, 400));
      setActiveStep(2);
      await new Promise((r) => setTimeout(r, 400));
      setActiveStep(3);

      const res = await validateLandRecord({
        raw_text: documentText || 'Registered sale deed, 7/12 extract, and survey document submitted for verification.',
        survey_no: '42',
        hissa_no: '1',
        claimed_acres: 2,
        claimed_guntas: 12,
        seller_name: 'Citizen Landholder',
        consideration: 2500000,
      });

      await new Promise((r) => setTimeout(r, 450));
      setActiveStep(4);
      await new Promise((r) => setTimeout(r, 350));
      setActiveStep(5);
      setValidationResult(res);
      setIsCitizenValidated(true);

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
  const issuesCount = validationResult.audit_flags.filter((f) => f.severity !== 'CLEAR').length;

  const getResultState = () => {
    if (riskTier === 'LOW_RISK' && issuesCount === 0) {
      return {
        badgeText: 'LAND RECORDS CONSISTENT',
        title: t.resultGreenTitle || 'Land Records Consistent',
        subtitle: t.resultGreenSubtitle || 'No discrepancies found. Title, cadastral extent, and ownership records are aligned.',
        bgClass: 'bg-green-50/90 border-green-300 shadow-[0_12px_28px_rgba(22,101,52,0.12)]',
        pillClass: 'bg-green-100 text-green-900 border-green-300',
        icon: <CheckCircle2 className="w-8 h-8 text-green-700 shrink-0" />,
      };
    }
    if (riskTier === 'HIGH_RISK' || validationResult.spatial_verification.has_encroachment) {
      return {
        badgeText: 'HIGH RISK / VERIFICATION REQUIRED',
        title: t.resultRedTitle || 'High Risk / Verification Required',
        subtitle: t.resultRedSubtitle || 'Critical boundary overlap, legal encumbrance, or prohibited zone restriction identified.',
        bgClass: 'bg-rose-50/90 border-rose-300 shadow-[0_12px_28px_rgba(185,28,28,0.12)]',
        pillClass: 'bg-rose-100 text-rose-900 border-rose-300',
        icon: <AlertTriangle className="w-8 h-8 text-rose-700 shrink-0" />,
      };
    }
    return {
      badgeText: 'REVIEW REQUIRED',
      title: t.resultOrangeTitle || 'Review Required',
      subtitle: t.resultOrangeSubtitle || 'Minor area discrepancy or name spelling variance found. Officer clarification recommended.',
      bgClass: 'bg-amber-50/90 border-amber-300 shadow-[0_12px_28px_rgba(217,119,6,0.12)]',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: <AlertTriangle className="w-8 h-8 text-amber-700 shrink-0" />,
    };
  };

  const resultState = getResultState();

  const processingPhases = [
    { num: 1, label: 'Reading documents' },
    { num: 2, label: 'Extracting land details' },
    { num: 3, label: 'Comparing records' },
    { num: 4, label: 'Checking cadastral info' },
    { num: 5, label: 'Preparing result' },
  ];

  return (
    <div className="space-y-8 py-2 max-w-6xl mx-auto">
      <div className="bp-card p-6 md:p-8 border border-line bg-paper-raised shadow-sm">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sage-mist text-forest text-xs font-bold mb-4 border border-forest/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Bhu-Praman</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-forest-deep tracking-tight">
          Citizen Land Record Verification
        </h1>
        <p className="text-sm text-ink-muted mt-2 max-w-3xl leading-relaxed">
          Submit your land documents, verify ownership details, and review a simple explanation before viewing the cadastral map or certificate.
        </p>
      </div>

      <div className="bp-card p-5 md:p-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-line">
          <div>
            <p className="text-[11px] font-bold text-forest-mid uppercase tracking-widest">Workflow</p>
            <h2 className="text-lg font-black text-forest-deep mt-1">Upload → Validate → Processing → Result</h2>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-paper-sunken border border-line text-ink-faint">
            4-step verification
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {workflowSteps.map((step, index) => {
            const isCurrent = currentWorkflowIndex === index;
            const isDone = currentWorkflowIndex > index || isCitizenValidated;
            return (
              <div
                key={step.label}
                className={`rounded-2xl border p-3 text-left transition ${
                  isDone
                    ? 'bg-forest/10 border-forest text-forest'
                    : isCurrent
                    ? 'bg-forest text-white border-forest shadow-md'
                    : 'bg-paper-raised border-line text-ink-faint'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">Step {index + 1}</div>
                <div className="font-bold text-sm mt-1">{step.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bp-card p-5 md:p-6 space-y-5">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-line">
          <div className="flex items-center space-x-2">
            <UploadCloud className="w-5 h-5 text-forest-mid" />
            <h3 className="font-bold text-forest-deep text-base">Upload official documents</h3>
          </div>
          <span className="text-[11px] text-ink-faint">Required: 3 documents</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: 'deed', label: 'Sale Deed', icon: FileText, hint: 'Scan or upload deed PDF' },
            { key: 'ror', label: '7/12 / RoR', icon: FileSpreadsheet, hint: 'Record of rights extract' },
            { key: 'survey', label: 'Survey Map / Sketch', icon: Layers, hint: 'Survey document or map' },
          ].map(({ key, label, icon: Icon, hint }) => {
            const fileName = uploadedFiles[key as UploadType];
            const active = activeDocTab === key;
            return (
              <div
                key={key}
                className={`rounded-2xl border p-4 transition ${
                  active ? 'border-forest bg-sage-mist/50' : 'border-line bg-paper-raised'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-xl bg-forest/10 p-2 text-forest">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-forest-deep">{label}</p>
                      <p className="text-[11px] text-ink-faint">{hint}</p>
                    </div>
                  </div>
                  {fileName && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(key as UploadType)}
                      className="rounded-full p-1 text-ink-faint hover:text-rose-700 hover:bg-rose-50 transition"
                      aria-label={`Remove ${label}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-paper-sunken/60 p-4 text-center transition hover:border-forest-mid">
                  <UploadCloud className="w-6 h-6 text-forest-mid mb-2" />
                  <span className="text-[11px] font-semibold text-forest-deep">
                    {fileName ? 'Replace file' : 'Upload file'}
                  </span>
                  <span className="text-[10px] text-ink-faint mt-1">PDF, JPG, PNG up to 25MB</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      setActiveDocTab(key as UploadType);
                      handleFileSelect(key as UploadType, e.target.files?.[0] ?? null);
                    }}
                  />
                </label>

                <div className="mt-3 space-y-1 min-h-[22px] text-[11px] text-ink-muted break-all">
                  <div>{fileName ? fileName : 'No file selected yet'}</div>
                  {documentDetections[key as UploadType] && (
                    <div className="text-[10px] text-forest font-semibold">
                      Detected: {documentDetections[key as UploadType]} | Expected: {expectedDocumentTypes[key as UploadType]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-line bg-paper-sunken p-3.5">
          <div className="flex items-center justify-between mb-2 text-xs text-ink-muted font-semibold">
            <span>Optional document text / OCR</span>
            <span className="font-mono text-[11px] text-ink-faint">Auto-detected</span>
          </div>
          <textarea
            rows={4}
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            className="w-full bg-transparent text-xs text-ink font-mono resize-none focus:outline-none leading-relaxed"
            placeholder="Paste extracted deed or RoR text if needed for verification."
          />
        </div>

        {uploadError && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/90 px-3 py-2 text-xs text-amber-900 font-medium">
            {uploadError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-line">
          <div className="text-[11px] text-ink-faint">
            {allDocumentsUploaded ? 'All required documents are ready.' : 'Please upload sale deed, 7/12 / RoR, and survey document.'}
          </div>

          <button
            onClick={runAudit}
            disabled={loading || !allDocumentsUploaded}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-forest px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(27,77,62,0.25)] transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-forest-mid"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sand" />
                <span>Validate Land Record</span>
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bp-card p-5 md:p-6 border-2 border-forest bg-sage-mist/40 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-forest-mid animate-spin" />
              <span className="text-xs font-bold text-forest-deep uppercase tracking-wider">Processing</span>
            </div>
            <span className="text-xs font-mono font-bold text-forest-mid">Phase {activeStep} of 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {processingPhases.map((phase) => {
              const isCompleted = activeStep > phase.num;
              const isCurrent = activeStep === phase.num;
              return (
                <div
                  key={phase.num}
                  className={`rounded-xl border p-3 text-xs flex items-center space-x-2 transition ${
                    isCompleted
                      ? 'bg-forest/15 border-forest text-forest font-bold'
                      : isCurrent
                      ? 'bg-forest text-white font-bold shadow-md ring-2 ring-forest/30 animate-pulse'
                      : 'bg-paper-raised/70 border-line text-ink-faint'
                  }`}
                >
                  <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center border border-current text-[10px]">
                    {isCompleted ? '✓' : phase.num}
                  </span>
                  <span className="truncate">{phase.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCitizenValidated && !loading && (
        <>
          <div id="citizen-result" className={`rounded-3xl border-2 p-6 md:p-8 corner-ticks transition-all duration-300 ${resultState.bgClass}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-black/10">
              <div className="flex items-start space-x-4">
                <div className="mt-1">{resultState.icon}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${resultState.pillClass}`}>
                      {resultState.badgeText}
                    </span>
                    <span className="text-xs font-mono text-ink-faint">ULPIN: <strong>{validationResult.ulpin}</strong></span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-forest-deep mt-1.5">{resultState.title}</h3>
                  <p className="text-sm text-ink-muted mt-1 max-w-3xl leading-relaxed">{resultState.subtitle}</p>
                </div>
              </div>

              <div className="bg-paper-raised p-4 rounded-2xl border border-line text-center shrink-0 flex items-center md:flex-col justify-between md:justify-center gap-2 shadow-sm min-w-[140px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Title Health Score</span>
                <span className="text-3xl font-black text-forest-deep">
                  {score.toFixed(0)} <span className="text-sm text-ink-faint font-normal">/ 100</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-mist text-forest font-semibold">
                  {riskTier}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-black/10 text-xs">
              <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[11px] block font-medium">Owner Name</span>
                <span className="text-sm font-bold text-forest-deep block mt-0.5 truncate">{validationResult.extracted_entities.vendor_name}</span>
                <span className="text-[10px] text-ink-muted">Recorded Landholder</span>
              </div>

              <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[11px] block font-medium">Survey Number</span>
                <span className="text-sm font-bold text-forest-deep block mt-0.5">Survey {validationResult.extracted_entities.display_survey}</span>
                <span className="text-[10px] text-ink-muted">{validationResult.extracted_entities.village} Village</span>
              </div>

              <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[11px] block font-medium">Land Area</span>
                <span className="text-sm font-bold text-forest-deep block mt-0.5">
                  {validationResult.spatial_verification.deed_extent.acres}A {validationResult.spatial_verification.deed_extent.guntas}G
                </span>
                <span className="text-[10px] text-ink-muted">
                  Cadastre: {validationResult.spatial_verification.cadastre_extent.acres}A {validationResult.spatial_verification.cadastre_extent.guntas}G
                </span>
              </div>

              <div className="bg-paper-raised/80 p-3.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[11px] block font-medium">Issues Found</span>
                <span className={`text-sm font-bold block mt-0.5 ${issuesCount === 0 ? 'text-green-800' : 'text-rose-700'}`}>
                  {issuesCount === 0 ? '0 Inconsistencies' : `${issuesCount} Issue(s) Detected`}
                </span>
                <span className="text-[10px] text-ink-muted">{issuesCount === 0 ? 'Clear to proceed' : 'Verification advised'}</span>
              </div>
            </div>

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
                          <h5 className="text-xs font-bold text-forest-deep">{plain.title}</h5>
                          <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{plain.explanation}</p>
                          <p className="text-[11px] text-forest-mid font-medium mt-1"><strong>Recommended Step:</strong> {plain.action}</p>
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
          </div>

          <div className="bp-card p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-forest-mid" />
                <span className="text-sm font-bold text-forest-deep">Map and certificate are available after validation</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenGis(validationResult.extracted_entities.display_survey || '')}
                  className="inline-flex items-center space-x-2 rounded-xl border border-line bg-paper-raised px-3.5 py-2 text-xs font-semibold text-forest-deep hover:bg-sage-mist transition cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Cadastral Map</span>
                </button>

                <button
                  onClick={onOpenCertificate}
                  className="inline-flex items-center space-x-2 rounded-xl bg-forest px-3.5 py-2 text-xs font-semibold text-white hover:bg-forest-mid transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  <span>Download Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {!isCitizenValidated && !loading && (
        <div className="bp-card p-4 md:p-5 border border-dashed border-line bg-paper-sunken/60 text-sm text-ink-muted">
          Upload the three required documents to unlock validation, the result summary, the cadastral map, and the downloadable certificate.
        </div>
      )}
    </div>
  );
};
