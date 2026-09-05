import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CitizenPortal } from './components/CitizenPortal';
import { OfficerDashboard } from './components/OfficerDashboard';
import { CadastralMap } from './components/CadastralMap';
import { MlModelInspector } from './components/MlModelInspector';
import { CryptoLedgerView } from './components/CryptoLedgerView';
import { CertificateModal } from './components/CertificateModal';
import { ValidationResponse, UserRole, Language } from './types/landRecord';
import { INITIAL_VALIDATION_RESULT } from './data/mockData';
import { checkBackendHealth } from './services/api';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'portal' | 'gis' | 'ml' | 'ledger'>('portal');
  const [role, setRole] = useState<UserRole>('CITIZEN');
  const [lang, setLang] = useState<Language>('en');
  const [validationResult, setValidationResult] = useState<ValidationResponse>(INITIAL_VALIDATION_RESULT);
  const [selectedSurveyForGis, setSelectedSurveyForGis] = useState<string>('42/1');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);

  // Poll backend health
  useEffect(() => {
    const check = async () => {
      const isUp = await checkBackendHealth();
      setBackendOnline(isUp);
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGis = (surveyNo: string) => {
    setSelectedSurveyForGis(surveyNo);
    setCurrentTab('gis');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        backendOnline={backendOnline}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {currentTab === 'portal' && (
          <>
            {role === 'CITIZEN' ? (
              <CitizenPortal
                validationResult={validationResult}
                setValidationResult={setValidationResult}
                lang={lang}
                onOpenGis={handleOpenGis}
                onOpenCertificate={() => setIsCertificateOpen(true)}
              />
            ) : (
              <OfficerDashboard
                validationResult={validationResult}
                onSelectSurvey={(sNo) => {
                  setSelectedSurveyForGis(sNo);
                }}
              />
            )}
          </>
        )}

        {currentTab === 'gis' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Mayaganahalli Village Cadastral GIS Vector Layer
                </h2>
                <p className="text-xs text-slate-400">
                  Electronic Total Station (ETS) Vector Polygons &bull; WGS-84 Projection &bull; Section 22A Prohibited Buffers
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                Active Selection: Survey {selectedSurveyForGis}
              </span>
            </div>

            <CadastralMap
              selectedSurvey={selectedSurveyForGis}
              onSelectParcel={(s, h) => {
                const combined = h && h !== '0' ? `${s}/${h}` : s;
                setSelectedSurveyForGis(combined);
              }}
            />
          </div>
        )}

        {currentTab === 'ml' && <MlModelInspector />}

        {currentTab === 'ledger' && <CryptoLedgerView />}
      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        data={validationResult}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">Bhu-Praman (भू-प्रमाण)</span>
            <span>&bull;</span>
            <span>National Level Hackathon (SIH 2026) Platform</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>DILRMP Bhu-Aadhaar ULPIN Protocol</span>
            <span>&bull;</span>
            <span>Section 22A Automated Prevention</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold">Trained ML Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
