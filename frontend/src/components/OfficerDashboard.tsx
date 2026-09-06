import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building2,
  Search,
  UserCheck,
  Clock,
  ArrowRight,
  Gavel,
  Compass,
} from 'lucide-react';
import { ValidationResponse } from '../types/landRecord';

interface OfficerDashboardProps {
  validationResult: ValidationResponse;
  onSelectSurvey: (surveyNo: string) => void;
  officerName?: string;
  onLogout?: () => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  validationResult,
  onSelectSurvey,
  officerName = 'K. S. Narayana Swamy, KAS',
  onLogout,
}) => {
  const [selectedQueueItem, setSelectedQueueItem] = useState<string>('88/2');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queue, setQueue] = useState([
    {
      id: 'Q-01',
      survey_no: '88/2',
      village: 'Mayaganahalli',
      khatedar: 'Venkatesh Murthy',
      claimed_area: '2A 10G',
      cadastre_area: '2A 10G',
      flag: 'Lake Catchment Encroachment (18.4%)',
      status: 'HIGH_RISK',
      date: 'Today, 10:30 AM',
    },
    {
      id: 'Q-02',
      survey_no: '104',
      village: 'Mayaganahalli',
      khatedar: 'Pratap Singh Rathore',
      claimed_area: '3A 20G',
      cadastre_area: '2A 35G',
      flag: 'Excess Area Claim (+21.7%)',
      status: 'AREA_MISMATCH',
      date: 'Yesterday, 04:15 PM',
    },
    {
      id: 'Q-03',
      survey_no: '42/3',
      village: 'Mayaganahalli',
      khatedar: 'Gowramma',
      claimed_area: '1A 10G',
      cadastre_area: '1A 10G',
      flag: 'Canara Bank Active Agricultural Hypothecation',
      status: 'BANK_LIEN',
      date: '04-Sep-2026',
    },
    {
      id: 'Q-04',
      survey_no: '42/1',
      village: 'Mayaganahalli',
      khatedar: 'Ramesh Chandra Gowda',
      claimed_area: '2A 14G',
      cadastre_area: '2A 14G',
      flag: 'Clear Title - 100% Cadastral Match',
      status: 'VALIDATED',
      date: '03-Sep-2026',
    },
    {
      id: 'Q-05',
      survey_no: '51/4',
      village: 'Mayaganahalli',
      khatedar: 'Ananda Gowda',
      claimed_area: '1A 18G',
      cadastre_area: '1A 22G',
      flag: 'Boundary drift detected near northern bund',
      status: 'AREA_MISMATCH',
      date: '03-Sep-2026',
    },
    {
      id: 'Q-06',
      survey_no: '59/1',
      village: 'Mayaganahalli',
      khatedar: 'Latha Narayan',
      claimed_area: '2A 04G',
      cadastre_area: '2A 04G',
      flag: 'Mutation chain updated; no dispute flag',
      status: 'VALIDATED',
      date: '02-Sep-2026',
    },
    {
      id: 'Q-07',
      survey_no: '61/5',
      village: 'Mayaganahalli',
      khatedar: 'Srinivas Prabhu',
      claimed_area: '2A 26G',
      cadastre_area: '2A 14G',
      flag: 'Area over-claimed by 12.5%',
      status: 'AREA_MISMATCH',
      date: '02-Sep-2026',
    },
    {
      id: 'Q-08',
      survey_no: '67/2',
      village: 'Mayaganahalli',
      khatedar: 'Nagaraj Hebbar',
      claimed_area: '1A 08G',
      cadastre_area: '1A 08G',
      flag: 'Duplicate deed references under review',
      status: 'HIGH_RISK',
      date: '01-Sep-2026',
    },
    {
      id: 'Q-09',
      survey_no: '72/1',
      village: 'Mayaganahalli',
      khatedar: 'Shobha Reddy',
      claimed_area: '3A 00G',
      cadastre_area: '2A 38G',
      flag: 'Sub-division mismatch across hissa map',
      status: 'AREA_MISMATCH',
      date: '01-Sep-2026',
    },
    {
      id: 'Q-10',
      survey_no: '79/4',
      village: 'Mayaganahalli',
      khatedar: 'Harish Patil',
      claimed_area: '2A 12G',
      cadastre_area: '2A 12G',
      flag: 'Bank lien discharged; title normal',
      status: 'VALIDATED',
      date: '31-Aug-2026',
    },
    {
      id: 'Q-11',
      survey_no: '84/1',
      village: 'Mayaganahalli',
      khatedar: 'Pushpa Naik',
      claimed_area: '1A 30G',
      cadastre_area: '1A 18G',
      flag: 'Acreage mismatch and downstream mutation issue',
      status: 'AREA_MISMATCH',
      date: '30-Aug-2026',
    },
    {
      id: 'Q-12',
      survey_no: '89/3',
      village: 'Mayaganahalli',
      khatedar: 'Karthik Dev',
      claimed_area: '2A 22G',
      cadastre_area: '2A 22G',
      flag: 'Prohibited-zone overlap on west boundary',
      status: 'HIGH_RISK',
      date: '29-Aug-2026',
    },
    {
      id: 'Q-13',
      survey_no: '92/2',
      village: 'Mayaganahalli',
      khatedar: 'Janardhan Shetty',
      claimed_area: '1A 06G',
      cadastre_area: '1A 06G',
      flag: 'Clear verification after RoR reconciliation',
      status: 'VALIDATED',
      date: '28-Aug-2026',
    },
    {
      id: 'Q-14',
      survey_no: '98/4',
      village: 'Mayaganahalli',
      khatedar: 'Nandini Rao',
      claimed_area: '1A 14G',
      cadastre_area: '1A 25G',
      flag: 'Overstated area in deed summary',
      status: 'AREA_MISMATCH',
      date: '28-Aug-2026',
    },
    {
      id: 'Q-15',
      survey_no: '101/2',
      village: 'Mayaganahalli',
      khatedar: 'Kiran Kumar',
      claimed_area: '2A 30G',
      cadastre_area: '2A 30G',
      flag: 'Title validation complete with robust chain',
      status: 'VALIDATED',
      date: '27-Aug-2026',
    },
    {
      id: 'Q-16',
      survey_no: '106/1',
      village: 'Mayaganahalli',
      khatedar: 'Radhika S',
      claimed_area: '1A 20G',
      cadastre_area: '1A 16G',
      flag: 'Boundary mismatch near irrigation drain',
      status: 'AREA_MISMATCH',
      date: '26-Aug-2026',
    },
    {
      id: 'Q-17',
      survey_no: '110/5',
      village: 'Mayaganahalli',
      khatedar: 'Shivaprasad',
      claimed_area: '2A 18G',
      cadastre_area: '2A 18G',
      flag: 'Owner name mismatch against village Khata',
      status: 'HIGH_RISK',
      date: '25-Aug-2026',
    },
    {
      id: 'Q-18',
      survey_no: '116/3',
      village: 'Mayaganahalli',
      khatedar: 'Anusha Basavaraj',
      claimed_area: '2A 02G',
      cadastre_area: '2A 02G',
      flag: 'Mutation verified and recorded in official register',
      status: 'VALIDATED',
      date: '24-Aug-2026',
    },
    {
      id: 'Q-19',
      survey_no: '122/1',
      village: 'Mayaganahalli',
      khatedar: 'Rahul Venkatesh',
      claimed_area: '3A 12G',
      cadastre_area: '3A 26G',
      flag: 'Extensive acreage divergence and survey gap',
      status: 'AREA_MISMATCH',
      date: '23-Aug-2026',
    },
    {
      id: 'Q-20',
      survey_no: '128/6',
      village: 'Mayaganahalli',
      khatedar: 'Sumanth Gaonkar',
      claimed_area: '1A 09G',
      cadastre_area: '1A 09G',
      flag: 'No encumbrance; deed and cadastre align',
      status: 'VALIDATED',
      date: '22-Aug-2026',
    },
  ]);

  const filteredQueue = queue.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const surveyMatch = item.survey_no.toLowerCase().includes(query);
    const khatedarMatch = item.khatedar.toLowerCase().includes(query);

    return surveyMatch || khatedarMatch;
  });

  const selectedRecord = queue.find((item) => item.survey_no === selectedQueueItem) ?? queue[0];

  const updateCaseStatus = (surveyNo: string, status: string, message: string) => {
    setQueue((currentQueue) =>
      currentQueue.map((item) =>
        item.survey_no === surveyNo ? { ...item, status, actionMessage: message } : item
      )
    );
    setActionSuccess(message);
    window.setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleInspectGIS = () => {
    if (!selectedQueueItem) return;
    onSelectSurvey(selectedQueueItem);
  };

  const handleSection22ARejection = () => {
    const normalizedFlag = (selectedRecord.flag || '').toLowerCase();
    const isSec22A =
      normalizedFlag.includes('22a') ||
      normalizedFlag.includes('lake') ||
      normalizedFlag.includes('prohibited') ||
      normalizedFlag.includes('catchment');

    if (!isSec22A) {
      setActionSuccess('Section 22A rejection is not applicable to this case.');
      window.setTimeout(() => setActionSuccess(null), 5000);
      return;
    }

    updateCaseStatus(
      selectedQueueItem,
      'SECTION_22A_REJECTED',
      `Section 22A rejection order recorded for Survey No. ${selectedQueueItem}.`
    );
  };

  const handleTalukSurveyorReferral = () => {
    updateCaseStatus(
      selectedQueueItem,
      'REFERRED_TO_TALUK_SURVEYOR',
      `Survey No. ${selectedQueueItem} has been referred to Taluk Surveyor for ETS verification.`
    );
  };

  const handleApproveBhuAadhaar = () => {
    const flagText = (selectedRecord.flag || '').toLowerCase();
    const blocked =
      selectedRecord.status === 'HIGH_RISK' ||
      selectedRecord.status === 'AREA_MISMATCH' ||
      selectedRecord.status === 'BANK_LIEN' ||
      flagText.includes('lake') ||
      flagText.includes('prohibited') ||
      flagText.includes('duplicate') ||
      flagText.includes('mismatch') ||
      flagText.includes('over-claimed');

    if (blocked) {
      setActionSuccess('Approval blocked: unresolved high-risk discrepancy requires review.');
      window.setTimeout(() => setActionSuccess(null), 5000);
      return;
    }

    updateCaseStatus(
      selectedQueueItem,
      'APPROVED_BHU_AADHAAR',
      `Approval successful for Survey No. ${selectedQueueItem}. Bhu-Aadhaar workflow is ready.`
    );
  };

  const handleAction = (actionName: string) => {
    setActionSuccess(`Action recorded: ${actionName} applied to Survey No. ${selectedQueueItem}. Notification dispatched to Taluk Land Records office.`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header / KPI Bar */}
      <div className="bp-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-forest-mid" />
              <h2 className="text-xl font-bold text-forest-deep">
                Tahsildar & Revenue Inspector Verification Console
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-ink-muted">
              <span>{officerName}</span>
              <span>&bull;</span>
              <span>Ramanagara Taluk &bull; Kasaba Hobli &bull; DILRMP Bhoomi 3.0</span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="ml-2 px-2 py-0.5 rounded bg-paper-sunken hover:bg-rose-50 text-rose-800 border border-line text-[11px] font-semibold transition cursor-pointer"
                >
                  Logout Session
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-paper-sunken p-2.5 rounded-xl border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Queue</span>
              <span className="text-lg font-black text-ink">20 Deeds</span>
            </div>
            <div className="bg-paper-sunken p-2.5 rounded-xl border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Auto-Clear</span>
              <span className="text-lg font-black text-green-800">82.4%</span>
            </div>
            <div className="bg-paper-sunken p-2.5 rounded-xl border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Encroachments</span>
              <span className="text-lg font-black text-rose-700">3 Blocked</span>
            </div>
            <div className="bg-paper-sunken p-2.5 rounded-xl border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Avg Turnaround</span>
              <span className="text-lg font-black text-forest-mid">4.2 min</span>
            </div>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Review Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verification Ingestion Queue (5 Cols) */}
        <div className="lg:col-span-5 bp-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-line gap-3">
            <h3 className="font-bold text-forest-deep text-sm">Discrepancy & Ingestion Queue</h3>
            <span className="text-xs text-ink-faint font-mono">Priority Order</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or survey number"
              className="w-full bg-paper-sunken border border-line rounded-xl pl-9 pr-3 py-2 text-xs text-ink placeholder-ink-faint focus:border-forest-mid focus:outline-none"
            />
          </div>

          <div className="space-y-2.5">
            {filteredQueue.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-line bg-paper-sunken text-xs text-ink-muted text-center">
                No records match “{searchQuery}”. Try another name or survey number.
              </div>
            ) : (
              filteredQueue.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedQueueItem(item.survey_no);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedQueueItem === item.survey_no
                      ? 'bg-amber-50 border-amber-500 shadow-lg'
                      : 'bg-paper-sunken/70 border-line hover:border-forest-mid/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-ink text-sm">
                        Survey No. {item.survey_no}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sage-mist text-ink-muted">
                        {item.village}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'VALIDATED'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : item.status === 'HIGH_RISK'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-ink">
                    <span className="text-ink-faint">Khatedar:</span> {item.khatedar} &bull;{' '}
                    <span className="text-ink-faint">Deed Area:</span> {item.claimed_area}
                  </div>

                  <div className="mt-1.5 text-[11px] font-semibold text-rose-800 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.flag}</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-line flex items-center justify-between text-[10px] text-ink-faint">
                    <span>Logged: {item.date}</span>
                    <span className="flex items-center text-amber-800 hover:underline">
                      Inspect in Reviewer <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Human-In-The-Loop Discrepancy Resolver (7 Cols) */}
        <div className="lg:col-span-7 bp-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div>
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Human-in-the-Loop Case Review
              </span>
              <h3 className="font-extrabold text-forest-deep text-lg">
                Demarcation & Title Resolution for Survey {selectedRecord.survey_no}
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-sage-mist text-forest font-mono">
              Action Tier 1
            </span>
          </div>

          {/* Form Fields for Officer Override */}
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink-muted mb-1 font-semibold">Survey & Hissa</label>
                <input
                  type="text"
                  readOnly
                  value={selectedRecord.survey_no}
                  className="w-full bg-paper-sunken border border-line rounded-xl px-3 py-2 text-ink font-mono"
                />
              </div>
              <div>
                <label className="block text-ink-muted mb-1 font-semibold">Village / Hobli</label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedRecord.village} / Kasaba`}
                  className="w-full bg-paper-sunken border border-line rounded-xl px-3 py-2 text-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink-muted mb-1 font-semibold">Official Khatedar Name</label>
                <input
                  type="text"
                  value={selectedRecord.khatedar}
                  readOnly
                  className="w-full bg-paper-raised border border-line-strong rounded-xl px-3 py-2 text-ink focus:border-forest-mid focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-ink-muted mb-1 font-semibold">Confirmed Extent (Acres/Guntas)</label>
                <input
                  type="text"
                  value={`${selectedRecord.claimed_area} (${selectedRecord.cadastre_area})`}
                  readOnly
                  className="w-full bg-paper-raised border border-line-strong rounded-xl px-3 py-2 text-ink focus:border-forest-mid focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-ink-muted mb-1 font-semibold">
                AI Cadastral Discrepancy Finding
              </label>
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-xs text-rose-800">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{selectedRecord.flag}</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  {selectedRecord.status === 'VALIDATED'
                    ? 'Cadastral verification is consistent with the registered deed and no statutory objection is active for the selected parcel.'
                    : selectedRecord.status === 'HIGH_RISK'
                    ? 'The geospatial and title review indicates a high-risk condition requiring officer action and legal review before sanctioning mutation or transfer.'
                    : 'The selected parcel has an area or boundary discrepancy that requires field verification, mutation review, and correction before final action.'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-ink-muted mb-1 font-semibold">Tahsildar Remark / Order Note</label>
              <textarea
                rows={3}
                value={
                  selectedRecord.status === 'VALIDATED'
                    ? `Verified with electronic cadastre overlay. The selected parcel matches the registered deed and is suitable for routine processing.`
                    : selectedRecord.status === 'SECTION_22A_REJECTED'
                    ? `Section 22A rejection order prepared for Survey No. ${selectedRecord.survey_no}. The selected parcel requires legal follow-up and formal documentation.`
                    : selectedRecord.status === 'REFERRED_TO_TALUK_SURVEYOR'
                    ? `Survey has been referred to Taluk Surveyor for ETS review and field verification.`
                    : selectedRecord.status === 'APPROVED_BHU_AADHAAR'
                    ? `Approval granted for Survey No. ${selectedRecord.survey_no}. Bhu-Aadhaar certificate actions are ready for issuance.`
                    : `Verification is pending. The selected parcel requires review for ${selectedRecord.flag.toLowerCase()} and appropriate cadastral/administrative action.`
                }
                readOnly
                className="w-full bg-paper-raised border border-line-strong rounded-xl p-3 text-ink focus:border-forest-mid focus:outline-none resize-none font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Decision CTAs */}
          <div className="pt-3 border-t border-line flex flex-wrap gap-2.5">
            <button
              onClick={handleInspectGIS}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs shadow-lg shadow-sky-900/20 flex items-center justify-center space-x-1.5 transition"
            >
              <Compass className="w-4 h-4" />
              <span>Inspect GIS</span>
            </button>

            <button
              onClick={handleSection22ARejection}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-900/20 flex items-center justify-center space-x-1.5 transition"
            >
              <Gavel className="w-4 h-4" />
              <span>Issue Sec 22A Rejection Order</span>
            </button>

            <button
              onClick={handleTalukSurveyorReferral}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-900/20 flex items-center justify-center space-x-1.5 transition"
            >
              <Compass className="w-4 h-4" />
              <span>Refer to Taluk Surveyor (ETS)</span>
            </button>

            <button
              onClick={handleApproveBhuAadhaar}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-mid text-white font-bold text-xs shadow-lg shadow-forest-deep/20 flex items-center justify-center space-x-1.5 transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>Approve & Issue Bhu-Aadhaar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
