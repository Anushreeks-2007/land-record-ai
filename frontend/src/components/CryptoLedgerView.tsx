import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Link,
  RefreshCw,
  Hash,
  AlertTriangle,
  FileKey,
  CheckCircle2,
} from 'lucide-react';

export const CryptoLedgerView: React.FC = () => {
  const initialBlocks = [
    {
      index: 0,
      id: 'GENESIS_DILRMP_001',
      ulpin: '29200000000000',
      timestamp: '2026-09-01T00:00:00Z',
      survey_no: 'STATE_ORIGIN',
      owner: 'Department of Land Resources (DILRMP)',
      extent: 'State Cadastre Root',
      previous_hash: '0000000000000000000000000000000000000000000000000000000000000000',
      block_hash: '0000a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcd',
      status: 'VERIFIED',
    },
    {
      index: 1,
      id: 'REC-DILRMP-8A49C2F1',
      ulpin: '2920127277284201',
      timestamp: '2026-09-05T09:12:45Z',
      survey_no: '42/1',
      owner: 'Ramesh Chandra Gowda',
      extent: '2A 14G',
      previous_hash: '0000a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcd',
      block_hash: 'c8f384a1e948d3bc89115a39281e01d18721c08e2f893d9b40fa9c183719a842',
      status: 'VERIFIED',
    },
    {
      index: 2,
      id: 'REC-DILRMP-7B9921E0',
      ulpin: '2920127277284202',
      timestamp: '2026-09-05T10:45:20Z',
      survey_no: '42/2',
      owner: 'Suresh Kumar',
      extent: '1A 20G',
      previous_hash: 'c8f384a1e948d3bc89115a39281e01d18721c08e2f893d9b40fa9c183719a842',
      block_hash: '7e9912af44199c08e1a90bc23518291a92e104f98129bcfe21980a42719ba123',
      status: 'VERIFIED',
    },
  ];

  const [blocks, setBlocks] = useState(initialBlocks);
  const [tampered, setTampered] = useState<boolean>(false);

  const simulateTampering = () => {
    setTampered(true);
    const updated = [...blocks];
    // Alter block 1's owner illegally
    updated[1] = {
      ...updated[1],
      owner: 'UNAUTHORIZED TAMPERED ENTITY (FRAUDULENT EDIT)',
      block_hash: 'e899999999999999999999999999999999999999999999999999999999999999',
      status: 'TAMPERED',
    };
    // Block 2's previous hash no longer matches
    updated[2] = {
      ...updated[2],
      status: 'CHAIN_BROKEN',
    };
    setBlocks(updated);
  };

  const restoreLedger = () => {
    setTampered(false);
    setBlocks(initialBlocks);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-bold text-white">
                Bhu-Ledger: Cryptographic Land Title Provenance
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Prevents silent revenue database alterations by intermediaries. Every validated
              deed, survey split, and Tahsildar approval is cryptographically anchored in a SHA-256
              Merkle audit chain.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {!tampered ? (
              <button
                onClick={simulateTampering}
                className="px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 flex items-center space-x-1.5 transition"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Simulate DB Tampering (Judge Demo)</span>
              </button>
            ) : (
              <button
                onClick={restoreLedger}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center space-x-1.5 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restore Legitimate Ledger</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tamper Alert Banner if triggered */}
      {tampered && (
        <div className="p-4 bg-rose-950/80 border-2 border-rose-500 rounded-2xl text-xs text-rose-200 flex items-start space-x-3 shadow-2xl animate-in shake">
          <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm text-white">
              CRITICAL AUDIT ALARM: UNAUTHORIZED LEDGER MODIFICATION DETECTED!
            </h4>
            <p className="mt-1 text-rose-200 leading-relaxed">
              Block #1 payload was altered outside the consensus protocol. The calculated SHA-256
              Merkle digest no longer matches Block #2's <code>previous_hash</code> pointer.
              The system has quarantined the altered record and notified the State Vigilance Commission.
            </p>
          </div>
        </div>
      )}

      {/* Blockchain Blocks List */}
      <div className="space-y-4">
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            className={`p-5 rounded-2xl border transition-all ${
              block.status === 'VERIFIED'
                ? 'bg-slate-900/80 border-slate-800 shadow-xl'
                : 'bg-rose-950/40 border-rose-600 shadow-2xl'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center font-mono font-bold text-xs text-teal-400 border border-slate-800">
                  #{block.index}
                </span>
                <span className="font-mono text-xs font-bold text-white">{block.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  ULPIN: {block.ulpin}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500">{block.timestamp}</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                    block.status === 'VERIFIED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {block.status}
                </span>
              </div>
            </div>

            {/* Block Content Grid */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[10px] block">Survey & Extent:</span>
                <span className="font-semibold text-white">
                  Survey No. {block.survey_no} ({block.extent})
                </span>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[10px] block">Khatedar Titleholder:</span>
                <span
                  className={`font-semibold ${
                    block.status === 'TAMPERED' ? 'text-rose-400 font-bold' : 'text-slate-200'
                  }`}
                >
                  {block.owner}
                </span>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 text-[10px] block">Chain Link Integrity:</span>
                <span
                  className={`font-semibold ${
                    block.status === 'VERIFIED' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {block.status === 'VERIFIED' ? 'Merkle Proof Valid' : 'POINTER MISMATCH'}
                </span>
              </div>
            </div>

            {/* Hashes */}
            <div className="mt-3 pt-3 border-t border-slate-800/60 space-y-1 text-[11px] font-mono">
              <div className="flex items-center space-x-2 text-slate-400 truncate">
                <span className="text-slate-500 shrink-0">Previous Hash:</span>
                <span className="text-slate-400 truncate">{block.previous_hash}</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-400 truncate font-semibold">
                <span className="text-slate-500 shrink-0">Block Hash:</span>
                <span className="truncate">{block.block_hash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
