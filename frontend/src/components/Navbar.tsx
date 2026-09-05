import React from 'react';
import { UserRole, Language } from '../types/landRecord';
import { UI_STRINGS } from '../data/mockData';
import { ShieldCheck, MapPin, Database, Award, Activity, FileCheck, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: 'portal' | 'gis' | 'ml' | 'ledger';
  setCurrentTab: (tab: 'portal' | 'gis' | 'ml' | 'ledger') => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  backendOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  lang,
  setLang,
  backendOnline,
}) => {
  const t = UI_STRINGS[lang];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Gov-Tech Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900/70 via-indigo-950/80 to-amber-950/70 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3 text-slate-300">
          <span className="flex items-center space-x-1.5 font-semibold text-amber-400">
            <Award className="w-3.5 h-3.5" />
            <span>Smart India Hackathon (SIH)</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">
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
            <span className="text-[11px] text-slate-400">
              {backendOnline ? 'ML & GIS Core Live (Port 8000)' : 'Client Engine Active'}
            </span>
          </div>

          <span className="text-slate-700">|</span>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 text-[11px]">
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 rounded transition ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-1.5 py-0.5 rounded transition ${
                lang === 'hi'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-1.5 py-0.5 rounded transition ${
                lang === 'kn'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
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
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('portal')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-700 p-0.5 shadow-lg shadow-emerald-950/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>{t.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    v2.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.subtitle}</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('portal')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'portal'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{role === 'CITIZEN' ? 'Validation Studio' : 'Officer Console'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('gis')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'gis'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.gisTab}</span>
            </button>

            <button
              onClick={() => setCurrentTab('ml')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'ml'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{t.mlTab}</span>
            </button>

            <button
              onClick={() => setCurrentTab('ledger')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'ledger'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>{t.ledgerTab}</span>
            </button>
          </nav>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setRole('CITIZEN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'CITIZEN'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Citizen View
            </button>
            <button
              onClick={() => setRole('OFFICER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'OFFICER'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tahsildar Mode
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
