import React from 'react';
import { Language } from '../types/landRecord';
import { UI_STRINGS } from '../data/mockData';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  FileCheck,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  Lock,
  Database,
  Search,
} from 'lucide-react';

interface LandingPageProps {
  lang: Language;
  onSelectCitizen: () => void;
  onSelectOfficer: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onSelectCitizen,
  onSelectOfficer,
}) => {
  const t = UI_STRINGS[lang];

  return (
    <div className="space-y-10 py-2">
      {/* Hero Section */}
      <section className="cadastral-hero rounded-3xl border border-line p-8 md:p-12 shadow-[0_16px_40px_rgba(18,53,44,0.08)] relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          {/* Government / Track Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest text-white text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-sand" />
              <span>DILRMP &bull; Bhu-Aadhaar ULPIN Protocol</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-mist border border-forest/15 text-forest text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-forest-mid" />
              <span>Smart India Hackathon 2026</span>
            </span>
          </div>

          {/* Main Title & Problem Statement Alignment */}
          <h1 className="text-3xl sm:text-5xl font-black text-forest-deep tracking-tight leading-tight">
            {t.landingHeroTitle}
          </h1>

          {/* Primary Directive Quote */}
          <div className="mt-4 p-4 rounded-2xl bg-paper-raised/90 border border-line-strong/60 shadow-sm inline-block">
            <p className="text-base sm:text-lg font-bold text-forest-mid">
              &ldquo;{t.motto}&rdquo;
            </p>
          </div>

          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
            {t.landingHeroSubtitle}
          </p>
        </div>
      </section>

      {/* Two Large Portal Entry Options */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-forest-mid uppercase tracking-widest block">
            Role-Based Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-deep mt-1">
            {t.selectPortal}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-2">
          {/* Option 1: Citizen Portal */}
          <div
            onClick={onSelectCitizen}
            className="group relative bp-card p-8 hover:border-forest transition-all duration-300 hover:shadow-[0_20px_40px_rgba(27,77,62,0.16)] cursor-pointer flex flex-col justify-between corner-ticks border-2 border-line hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest-deep group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <UserCheck className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-forest-mid/10 text-forest-deep border border-forest-mid/20">
                  {t.citizenRoleTag}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-2xl">👤</span>
                <h3 className="text-2xl font-black text-forest-deep group-hover:text-forest transition-colors">
                  {t.citizenRoleTitle}
                </h3>
              </div>

              <p className="text-base font-semibold text-forest-mid mt-2">
                &ldquo;Check and validate your land records&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
                {t.citizenRoleDesc}
              </p>

              {/* Workflow Pill checklist preview */}
              <div className="mt-5 space-y-1.5 pt-4 border-t border-line text-xs text-ink-muted">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>5-Step guided validation in simple plain language</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>Cadastral area & prohibited lake buffer verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>Instant Title Due-Diligence Certificate</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                className="w-full py-3.5 px-5 rounded-xl bg-forest group-hover:bg-forest-mid text-white font-bold text-sm shadow-[0_8px_20px_rgba(27,77,62,0.25)] flex items-center justify-center space-x-2 transition"
              >
                <span>{t.citizenAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Option 2: Officer Console */}
          <div
            onClick={onSelectOfficer}
            className="group relative bp-card p-8 hover:border-forest transition-all duration-300 hover:shadow-[0_20px_40px_rgba(27,77,62,0.16)] cursor-pointer flex flex-col justify-between corner-ticks border-2 border-line hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-sand/60 border border-line flex items-center justify-center text-forest-deep group-hover:bg-forest-deep group-hover:text-sand transition-colors duration-300">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-paper-sunken text-ink-muted border border-line">
                  {t.officerRoleTag}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏛️</span>
                <h3 className="text-2xl font-black text-forest-deep group-hover:text-forest transition-colors">
                  {t.officerRoleTitle}
                </h3>
              </div>

              <p className="text-base font-semibold text-forest-mid mt-2">
                &ldquo;Access advanced land-record verification tools&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
                {t.officerRoleDesc}
              </p>

              {/* Officer capabilities preview */}
              <div className="mt-5 space-y-1.5 pt-4 border-t border-line text-xs text-ink-muted">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>Electronic Mutation & Section 22A compliance queue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>Electronic Total Station (ETS) GIS vector overlay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-mid shrink-0" />
                  <span>AI/ML feature weights & blockchain Merkle ledger</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                className="w-full py-3.5 px-5 rounded-xl bg-forest-deep group-hover:bg-forest text-sand font-bold text-sm shadow-[0_8px_20px_rgba(18,53,44,0.25)] flex items-center justify-center space-x-2 transition"
              >
                <span>{t.officerAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete System Workflow Visualizer */}
      <section className="bp-card p-6 md:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-forest-mid uppercase tracking-widest">
            Architecture at a Glance
          </span>
          <h3 className="text-xl md:text-2xl font-black text-forest-deep mt-1">
            {t.systemWorkflowTitle}
          </h3>
          <p className="text-xs text-ink-muted mt-1">
            {t.systemWorkflowSubtitle}
          </p>
        </div>

        {/* 5-Phase Horizontal Connector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          <div className="p-4 rounded-xl bg-paper-sunken border border-line text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-2">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-forest-mid uppercase">Step 1</span>
            <h4 className="text-xs font-bold text-forest-deep mt-0.5">Upload Documents</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">
              Sale deed, RTC 7-12 extract, or survey sketch
            </p>
          </div>

          <div className="p-4 rounded-xl bg-paper-sunken border border-line text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-forest-mid uppercase">Step 2</span>
            <h4 className="text-xs font-bold text-forest-deep mt-0.5">AI Reads Details</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">
              Vision OCR extracts khatedar, survey no & extent
            </p>
          </div>

          <div className="p-4 rounded-xl bg-paper-sunken border border-line text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-forest-mid uppercase">Step 3</span>
            <h4 className="text-xs font-bold text-forest-deep mt-0.5">Compare Records</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">
              Cross-references Bhoomi & registration data
            </p>
          </div>

          <div className="p-4 rounded-xl bg-paper-sunken border border-line text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-forest-mid uppercase">Step 4</span>
            <h4 className="text-xs font-bold text-forest-deep mt-0.5">Check the Land</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">
              Cadastral boundaries, Section 22A & bank liens
            </p>
          </div>

          <div className="p-4 rounded-xl bg-forest/10 border border-forest/30 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-forest-mid uppercase">Step 5</span>
            <h4 className="text-xs font-bold text-forest-deep mt-0.5">Get Your Result</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">
              Clear status card & cryptographic certificate
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bp-card p-5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-green-50 text-green-800 border border-green-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-forest-deep">Section 22A Protection</h4>
              <span className="text-[11px] text-ink-faint">Automated Buffer Scrutiny</span>
            </div>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Instantly flags intersections with protected water bodies, lake foreshores, and state reserve forests before illegal registration occurs.
          </p>
        </div>

        <div className="bp-card p-5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-forest-deep">14-Digit Bhu-Aadhaar</h4>
              <span className="text-[11px] text-ink-faint">DILRMP ULPIN Standard</span>
            </div>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Assigns a unique geo-coded land identification number to eliminate duplicate claims, fuzzy boundary disputes, and area inflation.
          </p>
        </div>

        <div className="bp-card p-5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-sand/60 text-forest-deep flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-forest-deep">Cryptographic Audit Chain</h4>
              <span className="text-[11px] text-ink-faint">Tamper-Proof Merkle Roots</span>
            </div>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Every digitization step, OCR trace, and officer action is stamped into a cryptographic audit ledger for complete legal accountability.
          </p>
        </div>
      </section>
    </div>
  );
};
