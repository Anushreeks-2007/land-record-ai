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
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  validationResult,
  onSelectSurvey,
}) => {
  const [selectedQueueItem, setSelectedQueueItem] = useState<string>('88/2');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const queue = [
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
  ];

  const handleAction = (actionName: string) => {
    setActionSuccess(`Action recorded: ${actionName} applied to Survey No. ${selectedQueueItem}. Notification dispatched to Taluk Land Records office.`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header / KPI Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                Tahsildar & Revenue Inspector Verification Console
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ramanagara Taluk &bull; Kasaba Hobli &bull; DILRMP Electronic Mutation Gateway (Bhoomi 3.0)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Queue</span>
              <span className="text-lg font-black text-white">14 Deeds</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Auto-Clear</span>
              <span className="text-lg font-black text-emerald-400">82.4%</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Encroachments</span>
              <span className="text-lg font-black text-rose-400">3 Blocked</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Avg Turnaround</span>
              <span className="text-lg font-black text-indigo-400">4.2 min</span>
            </div>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Review Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verification Ingestion Queue (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Discrepancy & Ingestion Queue</h3>
            <span className="text-xs text-slate-400 font-mono">Priority Order</span>
          </div>

          <div className="space-y-2.5">
            {queue.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedQueueItem(item.survey_no);
                  onSelectSurvey(item.survey_no);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  selectedQueueItem === item.survey_no
                    ? 'bg-slate-800/90 border-amber-500 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">
                      Survey No. {item.survey_no}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.village}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'VALIDATED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : item.status === 'HIGH_RISK'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-300">
                  <span className="text-slate-500">Khatedar:</span> {item.khatedar} &bull;{' '}
                  <span className="text-slate-500">Deed Area:</span> {item.claimed_area}
                </div>

                <div className="mt-1.5 text-[11px] font-semibold text-rose-300/90 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.flag}</span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Logged: {item.date}</span>
                  <span className="flex items-center text-amber-400 hover:underline">
                    Inspect in Reviewer <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Human-In-The-Loop Discrepancy Resolver (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Human-in-the-Loop Case Review
              </span>
              <h3 className="font-extrabold text-white text-lg">
                Demarcation & Title Resolution for Survey {selectedQueueItem}
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
              Action Tier 1
            </span>
          </div>

          {/* Form Fields for Officer Override */}
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Survey & Hissa</label>
                <input
                  type="text"
                  readOnly
                  value={selectedQueueItem}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Village / Hobli</label>
                <input
                  type="text"
                  readOnly
                  value="Mayaganahalli / Kasaba"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Official Khatedar Name</label>
                <input
                  type="text"
                  defaultValue="Venkatesh Murthy & Shivananda"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Confirmed Extent (Acres/Guntas)</label>
                <input
                  type="text"
                  defaultValue="2 Acres 10 Guntas (9,105 sq.m)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                AI Cadastral Discrepancy Finding
              </label>
              <div className="p-3.5 bg-rose-950/40 border border-rose-800/70 rounded-xl text-rose-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-xs text-rose-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Section 22A Statutory Prohibition Triggered</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Geospatial polygon overlay confirms parcel intersects 18.4% with the Mayaganahalli Kere Lake foreshore buffer zone. Under the Karnataka Land Revenue Act, Sec 67 & Sec 22A, no alienation of government catchment can be sanctioned.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Tahsildar Remark / Order Note</label>
              <textarea
                rows={3}
                defaultValue="Verified with Electronic Total Station (ETS) cadastre overlay. The 18.4% lake catchment overlap is affirmed. Issue statutory notice to applicant and reject mutation application under Sec 22A."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 focus:outline-none resize-none font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Decision CTAs */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2.5">
            <button
              onClick={() => handleAction('REJECT_SECTION_22A')}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 flex items-center justify-center space-x-1.5 transition"
            >
              <Gavel className="w-4 h-4" />
              <span>Issue Sec 22A Rejection Order</span>
            </button>

            <button
              onClick={() => handleAction('ORDER_DGPS_RESURVEY')}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 flex items-center justify-center space-x-1.5 transition"
            >
              <Compass className="w-4 h-4" />
              <span>Refer to Taluk Surveyor (ETS)</span>
            </button>

            <button
              onClick={() => handleAction('APPROVE_AND_SEAL')}
              className="flex-1 min-w-[160px] py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center justify-center space-x-1.5 transition"
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
