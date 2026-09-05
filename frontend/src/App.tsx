import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CitizenPortal } from './components/CitizenPortal';
import { OfficerLogin } from './components/OfficerLogin';
import { OfficerDashboard } from './components/OfficerDashboard';
import { CadastralMap } from './components/CadastralMap';
import { MlModelInspector } from './components/MlModelInspector';
import { CryptoLedgerView } from './components/CryptoLedgerView';
import { CertificateModal } from './components/CertificateModal';
import { ValidationResponse, UserRole, Language, AppView } from './types/landRecord';
import { INITIAL_VALIDATION_RESULT } from './data/mockData';
import { checkBackendHealth } from './services/api';
import { ShieldCheck, ArrowLeft, Building2, MapPin } from 'lucide-react';

export function App() {
  // Default entry screen is 'landing'
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [role, setRole] = useState<UserRole>('CITIZEN');
  const [lang, setLang] = useState<Language>('en');
  const [validationResult, setValidationResult] = useState<ValidationResponse>(INITIAL_VALIDATION_RESULT);
  const [selectedSurveyForGis, setSelectedSurveyForGis] = useState<string>('42/1');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);

  // Demo officer authentication session
  const [isOfficerAuthenticated, setIsOfficerAuthenticated] = useState<boolean>(false);
  const [officerSession, setOfficerSession] = useState<{ id: string; name: string; role: string } | null>(null);

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
    setCurrentView('gis');
  };

  const handleSelectCitizenFromLanding = () => {
    setRole('CITIZEN');
    setCurrentView('citizen');
  };

  const handleSelectOfficerFromLanding = () => {
    setRole('OFFICER');
    if (isOfficerAuthenticated) {
      setCurrentView('officer-dashboard');
    } else {
      setCurrentView('officer-login');
    }
  };

  const handleOfficerLoginSuccess = (info: { id: string; name: string; role: string }) => {
    setIsOfficerAuthenticated(true);
    setOfficerSession(info);
    setRole('OFFICER');
    setCurrentView('officer-dashboard');
  };

  const handleOfficerLogout = () => {
    setIsOfficerAuthenticated(false);
    setOfficerSession(null);
    setCurrentView('landing');
  };

  return (
    <div className="cadastral-page min-h-screen text-ink flex flex-col selection:bg-forest selection:text-white">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        role={role}
        setRole={setRole}
        lang={lang}
        setLang={setLang}
        backendOnline={backendOnline}
        isOfficerAuthenticated={isOfficerAuthenticated}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'landing' && (
          <LandingPage
            lang={lang}
            onSelectCitizen={handleSelectCitizenFromLanding}
            onSelectOfficer={handleSelectOfficerFromLanding}
          />
        )}

        {/* VIEW 2: CITIZEN 5-STEP GUIDED FLOW */}
        {currentView === 'citizen' && (
          <CitizenPortal
            validationResult={validationResult}
            setValidationResult={setValidationResult}
            lang={lang}
            onOpenGis={handleOpenGis}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onBackToLanding={() => setCurrentView('landing')}
          />
        )}

        {/* VIEW 3: DEMO OFFICER LOGIN */}
        {currentView === 'officer-login' && (
          <OfficerLogin
            lang={lang}
            onLoginSuccess={handleOfficerLoginSuccess}
            onBackToLanding={() => setCurrentView('landing')}
          />
        )}

        {/* VIEW 4: OFFICER ADVANCED DASHBOARD */}
        {currentView === 'officer-dashboard' && (
          <OfficerDashboard
            validationResult={validationResult}
            onSelectSurvey={(sNo) => {
              setSelectedSurveyForGis(sNo);
              setCurrentView('gis');
            }}
            officerName={officerSession ? `${officerSession.name} (${officerSession.role})` : 'K. S. Narayana Swamy, KAS (Tahsildar Ramanagara)'}
            onLogout={handleOfficerLogout}
          />
        )}

        {/* VIEW 5: CADASTRAL GIS VECTOR MAP */}
        {currentView === 'gis' && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-line">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView(role === 'CITIZEN' ? 'citizen' : 'officer-dashboard')}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-paper-sunken hover:bg-sage-mist border border-line text-xs font-semibold text-forest-deep transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to {role === 'CITIZEN' ? 'Citizen Portal' : 'Officer Console'}</span>
                </button>
                <div>
                  <h2 className="text-xl font-bold text-forest-deep">
                    {role === 'CITIZEN'
                      ? `Cadastral Parcel Map: Survey No. ${selectedSurveyForGis}`
                      : 'Mayaganahalli Village Cadastral GIS Vector Layer'}
                  </h2>
                  <p className="text-xs text-ink-muted">
                    {role === 'CITIZEN'
                      ? 'Official Digital Cadastre Vector Layer • Electronic Total Station (ETS) Verified Boundaries'
                      : 'Electronic Total Station (ETS) Vector Polygons • WGS-84 Projection • Section 22A Prohibited Buffers'}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-paper-raised border border-line text-forest-mid font-semibold">
                Active Selection: Survey {selectedSurveyForGis}
              </span>
            </div>

            <CadastralMap
              selectedSurvey={selectedSurveyForGis}
              isCitizenView={role === 'CITIZEN'}
              onSelectParcel={(s, h) => {
                const combined = h && h !== '0' ? `${s}/${h}` : s;
                setSelectedSurveyForGis(combined);
              }}
            />
          </div>
        )}

        {/* VIEW 6: ML MODEL INSPECTOR */}
        {currentView === 'ml' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-2 border-b border-line">
              <button
                onClick={() => setCurrentView('landing')}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-paper-sunken hover:bg-sage-mist border border-line text-xs font-semibold text-forest-deep transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Landing</span>
              </button>
            </div>
            <MlModelInspector />
          </div>
        )}

        {/* VIEW 7: CRYPTOGRAPHIC LEDGER */}
        {currentView === 'ledger' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-2 border-b border-line">
              <button
                onClick={() => setCurrentView('landing')}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-paper-sunken hover:bg-sage-mist border border-line text-xs font-semibold text-forest-deep transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Landing</span>
              </button>
            </div>
            <CryptoLedgerView />
          </div>
        )}
      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        data={validationResult}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-line bg-paper-raised/90 backdrop-blur-md py-6 text-xs text-ink-faint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-forest-mid" />
            <span className="text-forest-deep font-bold">Bhu-Praman (भू-प्रमाण)</span>
            <span>&bull;</span>
            <span>National Level Hackathon (SIH 2026) Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-ink-muted">
            <span>DILRMP Bhu-Aadhaar ULPIN Protocol</span>
            <span>&bull;</span>
            <span>Section 22A Automated Prevention</span>
            <span>&bull;</span>
            <span className="text-forest-mid font-semibold">Trained ML & GIS Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
