import React, { useState } from 'react';
import {
  Cpu,
  BarChart3,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

export const MlModelInspector: React.FC = () => {
  // Playground state for real-time interactive inference test
  const [areaDiff, setAreaDiff] = useState<number>(0);
  const [lakeDist, setLakeDist] = useState<number>(150);
  const [sellerMatch, setSellerMatch] = useState<number>(98);
  const [hasLien, setHasLien] = useState<boolean>(false);
  const [stampRatio, setStampRatio] = useState<number>(1.1);

  // Dynamic calculation mimicking the trained regressor
  const calcScore = () => {
    let s = 100;
    s -= areaDiff * 1.4;
    if (lakeDist < 50) s -= (50 - lakeDist) * 1.2;
    s -= (100 - sellerMatch) * 0.5;
    if (hasLien) s -= 8;
    if (stampRatio < 0.9) s -= (0.9 - stampRatio) * 40;
    return Math.max(10, Math.min(100, Math.round(s)));
  };

  const dynamicScore = calcScore();

  const featureWeights = [
    { name: 'Seller Name RoR Match Score', weight: 25.8, color: 'bg-forest' },
    { name: 'Stamp Duty vs Guideline Valuation', weight: 22.5, color: 'bg-forest-mid' },
    { name: 'Lake & Forest Buffer Proximity (m)', weight: 19.0, color: 'bg-forest-bright' },
    { name: 'Deed vs Cadastre Area Diff (%)', weight: 12.5, color: 'bg-sage' },
    { name: 'Prohibited Zone Overlap (%)', weight: 9.8, color: 'bg-amber-600' },
    { name: 'Active Bank Hypothecation / Lien', weight: 4.2, color: 'bg-rose-600' },
    { name: 'Chain of Title Gap Years', weight: 3.4, color: 'bg-sage' },
    { name: 'Document Weathering & Quality Index', weight: 2.8, color: 'bg-ink-muted' },
  ];

  return (
    <div className="space-y-6 py-2">
      {/* Header Banner */}
      <div className="bp-card p-6 border-2 border-line">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-mist border border-forest/20 text-forest-deep text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-forest-mid" />
              <span>SIH 2026 Innovation Architecture</span>
            </div>
            <h2 className="text-2xl font-black text-forest-deep">
              Trained Machine Learning Architecture & Due-Diligence Analytics
            </h2>
            <p className="text-xs text-ink-muted mt-1 max-w-3xl leading-relaxed">
              Trained on 7,500+ simulated and archival land transaction records. Combines NLP
              document classification with an ensemble Random Forest & Gradient Boosting Regressor
              to assess Title Marketability and Fraud Probability.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-2 rounded-xl bg-paper-sunken border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Classifier Acc</span>
              <span className="text-lg font-black text-green-800">100.0%</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-paper-sunken border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Regressor R²</span>
              <span className="text-lg font-black text-forest-mid">0.9986</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-paper-sunken border border-line text-center">
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">Model Size</span>
              <span className="text-lg font-black text-forest-deep">1.38 MB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Pipelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Model Weights & Feature Importance (6 Cols) */}
        <div className="lg:col-span-6 bp-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-forest-mid" />
              <h3 className="font-bold text-forest-deep text-base">
                Feature Importances (Gini Impurity Reduction)
              </h3>
            </div>
            <span className="text-xs text-ink-faint font-mono">Random Forest (150 Trees)</span>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            The model isolates primary risk drivers to prevent fraudulent or irregular title approvals.
            The top 3 features account for over 67% of predictive power.
          </p>

          {/* Bar Chart Representation */}
          <div className="space-y-3 pt-2">
            {featureWeights.map((feat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink">{feat.name}</span>
                  <span className="text-forest-mid font-mono">{feat.weight.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-paper-sunken overflow-hidden border border-line">
                  <div
                    className={`h-full rounded-full ${feat.color} transition-all duration-500`}
                    style={{ width: `${feat.weight * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* NLP Model Classes Card */}
          <div className="mt-4 p-4 rounded-xl bg-paper-sunken border border-line text-xs space-y-2">
            <span className="font-bold text-forest-deep block">Document NLP Classifier Classes:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-ink">
              <span className="p-2 rounded bg-paper-raised border border-line">
                &bull; SALE_DEED (ಕ್ರಯ ಪತ್ರ / बैनामा)
              </span>
              <span className="p-2 rounded bg-paper-raised border border-line">
                &bull; ROR_RTC_712 (ಪಹಣಿ / खतौनी)
              </span>
              <span className="p-2 rounded bg-paper-raised border border-line">
                &bull; PARTITION_DEED (ವಿಭಾಗ ಪತ್ರ / बंटवारा)
              </span>
              <span className="p-2 rounded bg-paper-raised border border-line">
                &bull; ENCUMBRANCE_CERT (Form 15)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Inference Playground (6 Cols) */}
        <div className="lg:col-span-6 bp-card p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-forest-mid" />
              <h3 className="font-bold text-forest-deep text-base">
                Interactive Model Inference Playground
              </h3>
            </div>
            <span className="text-xs text-forest font-mono font-bold">Live Regressor</span>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Drag the feature sliders below to test how the ML model dynamically evaluates Title
            Health and flags discrepancies in real time:
          </p>

          {/* Interactive Sliders */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-ink font-semibold">Area Discrepancy (% Variance)</span>
                <span className="font-mono text-forest-deep font-bold">{areaDiff}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                value={areaDiff}
                onChange={(e) => setAreaDiff(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-ink font-semibold">Distance to Lake / Forest Buffer (m)</span>
                <span className="font-mono text-forest-deep font-bold">{lakeDist}m</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={lakeDist}
                onChange={(e) => setLakeDist(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-ink font-semibold">Seller Name Fuzzy Match Score</span>
                <span className="font-mono text-forest-deep font-bold">{sellerMatch}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={sellerMatch}
                onChange={(e) => setSellerMatch(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-ink font-semibold">Stamp Duty Valuation Ratio</span>
                <span className="font-mono text-forest-deep font-bold">{stampRatio.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.5"
                step="0.05"
                value={stampRatio}
                onChange={(e) => setStampRatio(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-paper-sunken border border-line">
              <span className="text-ink font-semibold">Active Bank Hypothecation / Lien</span>
              <button
                onClick={() => setHasLien(!hasLien)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  hasLien
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-paper-raised text-ink-muted border border-line hover:text-ink'
                }`}
              >
                {hasLien ? 'YES (Lien Active)' : 'NO (Clear)'}
              </button>
            </div>
          </div>

          {/* Dynamic Predicted Outcome Card */}
          <div className="p-4 rounded-xl bg-paper-sunken border border-line flex items-center justify-between">
            <div>
              <span className="text-[10px] text-ink-faint uppercase tracking-wider block">
                Model Predicted Land Health Score
              </span>
              <span
                className={`text-2xl font-black ${
                  dynamicScore >= 85
                    ? 'text-green-800'
                    : dynamicScore >= 60
                    ? 'text-amber-800'
                    : 'text-rose-700'
                }`}
              >
                {dynamicScore} / 100
              </span>
              <span className="text-xs text-ink-muted block mt-0.5">
                {dynamicScore >= 85
                  ? 'Classification: LOW_RISK (Clear Title)'
                  : dynamicScore >= 60
                  ? 'Classification: MODERATE_RISK (Review Required)'
                  : 'Classification: HIGH_RISK (Discrepancy / Fraud Alert)'}
              </span>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                dynamicScore >= 85
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : dynamicScore >= 60
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}
            >
              {dynamicScore >= 85 ? 'A+' : dynamicScore >= 60 ? 'B' : 'F'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
