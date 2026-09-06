import React, { useState } from 'react';
import { Language } from '../types/landRecord';
import { UI_STRINGS } from '../data/mockData';
import {
  Building2,
  Lock,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface OfficerLoginProps {
  lang: Language;
  onLoginSuccess: (officerInfo: { id: string; name: string; role: string }) => void;
  onBackToLanding: () => void;
}

export const OfficerLogin: React.FC<OfficerLoginProps> = ({
  lang,
  onLoginSuccess,
  onBackToLanding,
}) => {
  const t = UI_STRINGS[lang];
  const [officerId, setOfficerId] = useState<string>('REV-KA-RMN-042');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [taluk, setTaluk] = useState<string>('Ramanagara Taluk (Kasaba Hobli)');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setError('Please enter your Officer ID.');
      return;
    }
    // Demo authentication approval
    onLoginSuccess({
      id: officerId,
      name: 'K. S. Narayana Swamy, KAS',
      role: 'Tahsildar & Executive Magistrate',
    });
  };

  const handleQuickDemo = () => {
    setOfficerId('REV-KA-RMN-042');
    setPassword('demo-tahsildar-2026');
    setTaluk('Ramanagara Taluk (Kasaba Hobli)');
    onLoginSuccess({
      id: 'REV-KA-RMN-042',
      name: 'K. S. Narayana Swamy, KAS',
      role: 'Tahsildar & Executive Magistrate',
    });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      {/* Back to Portal Home */}
      <button
        onClick={onBackToLanding}
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-forest-mid hover:text-forest-deep mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Landing Page</span>
      </button>

      {/* Main Login Card */}
      <div className="bp-card p-8 shadow-[0_20px_40px_rgba(18,53,44,0.12)] corner-ticks border-2 border-line">
        {/* Emblem & Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest-deep mb-3 shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-forest-mid/10 text-forest-deep text-[11px] font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DILRMP Authorized Gateway</span>
          </div>
          <h2 className="text-2xl font-black text-forest-deep">
            {t.officerLoginTitle}
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            {t.officerLoginSubtitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-muted mb-1">
              {t.officerTalukLabel}
            </label>
            <select
              value={taluk}
              onChange={(e) => setTaluk(e.target.value)}
              className="w-full bg-paper-sunken border border-line rounded-xl px-3 py-2.5 text-xs text-ink focus:border-forest-mid focus:outline-none"
            >
              <option value="Ramanagara Taluk (Kasaba Hobli)">Ramanagara Taluk &bull; Kasaba Hobli</option>
              <option value="Channapatna Taluk (Virupakshipura)">Channapatna Taluk &bull; Virupakshipura</option>
              <option value="Magadi Taluk (Kudur)">Magadi Taluk &bull; Kudur Hobli</option>
              <option value="Kanakapura Taluk (Harohalli)">Kanakapura Taluk &bull; Harohalli</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-muted mb-1">
              {t.officerIdLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g. REV-KA-RMN-042"
                className="w-full bg-paper-raised border border-line-strong rounded-xl px-3 py-2.5 text-xs text-ink font-mono focus:border-forest-mid focus:outline-none"
              />
              <UserCheck className="w-4 h-4 text-ink-faint absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-muted mb-1">
              {t.officerPasswordLabel}
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-paper-raised border border-line-strong rounded-xl px-3 py-2.5 text-xs text-ink focus:border-forest-mid focus:outline-none"
              />
              <KeyRound className="w-4 h-4 text-ink-faint absolute right-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-forest hover:bg-forest-mid text-white font-bold text-xs shadow-[0_8px_18px_rgba(27,77,62,0.22)] flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <span>{t.officerLoginBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Judge Quick Demo Button */}
        <div className="mt-5 pt-4 border-t border-line">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-4 rounded-xl bg-sage-mist hover:bg-forest/15 text-forest-deep border border-forest/30 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-forest-mid" />
            <span>{t.demoLoginBtn}</span>
          </button>
        </div>

        {/* Demo architecture disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-paper-sunken border border-line text-[11px] text-ink-faint leading-normal">
          <p>{t.demoAuthNote}</p>
        </div>
      </div>
    </div>
  );
};
