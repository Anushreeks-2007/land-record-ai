import React from 'react';
import { AppView, UserRole, Language } from '../types/landRecord';
import { UI_STRINGS } from '../data/mockData';
import {
  ShieldCheck,
  MapPin,
  Database,
  Award,
  Activity,
  Home,
  FileCheck2,
  Building2,
  User,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  backendOnline: boolean;
  isOfficerAuthenticated: boolean;
  onOpenCertificate?: () => void;
  isCitizenValidated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  role,
  setRole,
  lang,
  setLang,
  backendOnline,
  isOfficerAuthenticated,
  onOpenCertificate,
  isCitizenValidated = false,
}) => {
  const t = UI_STRINGS[lang];

  const handleSelectHome = () => {
    setCurrentView('landing');
  };

  const handleSelectCitizen = () => {
    setRole('CITIZEN');
    setCurrentView('citizen');
  };

  const handleSelectOfficer = () => {
    setRole('OFFICER');
    if (isOfficerAuthenticated) {
      setCurrentView('officer-dashboard');
    } else {
      setCurrentView('officer-login');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-forest-deep/96 backdrop-blur-md border-b border-forest-mid shadow-[0_8px_24px_rgba(18,53,44,0.28)]">
      {/* Top Gov-Tech Ribbon */}
      <div className="bg-forest/80 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3 text-sand">
          <span className="flex items-center space-x-1.5 font-semibold text-sand">
            <Award className="w-3.5 h-3.5" />
            <span>Smart India Hackathon (SIH 2026)</span>
          </span>
          <span className="text-white/25">|</span>
          <span className="text-sand-warm hidden sm:inline">
            Ministry of Rural Development &bull; Department of Land Resources (DILRMP)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Backend Status indicator */}
          <div className="flex items-center space-x-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-[11px] text-sand">
              {backendOnline ? 'ML & GIS Engine Online' : 'Client Fallback Engine Active'}
            </span>
          </div>

          <span className="text-white/20">|</span>

          {/* Multilingual Selector (EN / हिन्दी / ಕನ್ನಡ) */}
          <div className="flex items-center space-x-1 text-[11px]">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'en'
                  ? 'bg-forest-bright text-white font-bold shadow-sm'
                  : 'text-sand hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'hi'
                  ? 'bg-forest-bright text-white font-bold shadow-sm'
                  : 'text-sand hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'kn'
                  ? 'bg-forest-bright text-white font-bold shadow-sm'
                  : 'text-sand hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Government Branding */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleSelectHome}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-sand/20 p-0.5 shadow-lg border border-sand/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-forest rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sand" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                  <span>{t.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-sand border border-white/15 font-medium">
                    SIH 2026
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-sand font-medium tracking-wide mt-1 uppercase">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* CITIZEN MODE NAVIGATION */}
          {role === 'CITIZEN' && currentView !== 'landing' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-black/20 p-1 rounded-xl border border-white/10">
                <button
                  onClick={handleSelectHome}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sand hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{t.home}</span>
                </button>

                <button
                  onClick={handleSelectCitizen}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentView === 'citizen'
                      ? 'bg-forest-mid text-white shadow-md'
                      : 'text-sand hover:text-white hover:bg-white/10'
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Validate Land</span>
                </button>

                <button
                  onClick={() => {
                    if (!isCitizenValidated) return;
                    setCurrentView('citizen');
                    setTimeout(() => {
                      document.getElementById('citizen-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                  disabled={!isCitizenValidated}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    !isCitizenValidated
                      ? 'text-sand/50 cursor-not-allowed opacity-70'
                      : currentView === 'citizen'
                      ? 'bg-forest-mid text-white shadow-md cursor-pointer'
                      : 'text-sand hover:text-white hover:bg-white/10 cursor-pointer'
                  }`}
                  title={isCitizenValidated ? 'Open your validated result' : 'Result unlocks after validation'}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>My Result</span>
                </button>

                <button
                  onClick={() => {
                    if (isCitizenValidated) setCurrentView('gis');
                  }}
                  disabled={!isCitizenValidated}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    !isCitizenValidated
                      ? 'text-sand/50 cursor-not-allowed opacity-70'
                      : currentView === 'gis'
                      ? 'bg-forest-mid text-white shadow-md cursor-pointer'
                      : 'text-sand hover:text-white hover:bg-white/10 cursor-pointer'
                  }`}
                  title={isCitizenValidated ? 'Open cadastral map' : 'Map unlocks after validation'}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>My Cadastral Map</span>
                </button>

                {onOpenCertificate ? (
                  <button
                    onClick={onOpenCertificate}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isCitizenValidated ? 'text-sand hover:text-white hover:bg-white/10' : 'text-sand/50 cursor-not-allowed opacity-70'
                    }`}
                    disabled={!isCitizenValidated}
                    title={isCitizenValidated ? 'Download validation certificate' : 'Certificate will be available after successful validation'}
                  >
                    <span>📄</span>
                    <span>{isCitizenValidated ? 'Certificate' : 'Certificate — Available after validation'}</span>
                  </button>
                ) : null}
              </nav>
            </div>
          )}

          {/* OFFICER MODE NAVIGATION (PRESERVED FULL OFFICER TOOLS) */}
          {role === 'OFFICER' && currentView !== 'landing' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-black/20 p-1 rounded-xl border border-white/10">
                <button
                  onClick={handleSelectOfficer}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentView === 'officer-dashboard' || currentView === 'officer-login'
                      ? 'bg-forest-mid text-white shadow-md'
                      : 'text-sand hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Officer Console</span>
                </button>

                <button
                  onClick={() => setCurrentView('gis')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentView === 'gis'
                      ? 'bg-forest-mid text-white shadow-md'
                      : 'text-sand hover:text-white hover:bg-white/10'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.gisTab}</span>
                </button>

                <button
                  onClick={() => setCurrentView('ledger')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentView === 'ledger'
                      ? 'bg-forest-mid text-white shadow-md'
                      : 'text-sand hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{t.ledgerTab}</span>
                </button>
              </nav>

              {/* Discreet Citizen Portal switch */}
              <button
                onClick={handleSelectCitizen}
                className="inline-flex items-center space-x-1 text-xs text-sand/80 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
                title="Switch to Citizen Portal"
              >
                <User className="w-3.5 h-3.5 text-sand/70" />
                <span>Citizen View →</span>
              </button>
            </div>
          )}

          {/* LANDING VIEW NAVIGATION */}
          {currentView === 'landing' && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSelectCitizen}
                className="px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest-mid text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                {t.citizenRoleTitle} Portal
              </button>
              <button
                onClick={handleSelectOfficer}
                className="px-3.5 py-1.5 rounded-xl bg-paper-raised/15 hover:bg-white/20 text-sand hover:text-white text-xs font-semibold border border-white/20 transition cursor-pointer flex items-center space-x-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t.officerRoleTitle} Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
