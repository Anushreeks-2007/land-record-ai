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
    <div className="space-y-6 py-2">
      {/* Header */}
      <div className="bp-card p-6 border-2 border-line">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-forest-mid" />
              <h2 className="text-xl font-bold text-forest-deep">
                Bhu-Ledger: Cryptographic Land Title Provenance
              </h2>
            </div>
            <p className="text-xs text-ink-muted mt-1 max-w-3xl leading-relaxed">
              Prevents silent revenue database alterations by intermediaries. Every validated
              deed, survey split, and Tahsildar approval is cryptographically anchored in a SHA-256
              Merkle audit chain.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {!tampered ? (
              <button
                onClick={simulateTampering}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Simulate DB Tampering (Judge Demo)</span>
              </button>
            ) : (
              <button
                onClick={restoreLedger}
                className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-mid text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition cursor-pointer"
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
        <div className="p-4 bg-rose-50 border-2 border-rose-500 rounded-2xl text-xs text-rose-900 flex items-start space-x-3 shadow-lg">
          <ShieldAlert className="w-6 h-6 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm text-rose-900">
              CRITICAL AUDIT ALARM: UNAUTHORIZED LEDGER MODIFICATION DETECTED!
            </h4>
            <p className="mt-1 text-rose-800 leading-relaxed">
              Block #1 payload was altered outside the consensus protocol. The calculated SHA-256
              Merkle digest no longer matches Block #2&apos;s <code>previous_hash</code> pointer.
              The system has quarantined the altered record and notified the State Land Governance Authority.
            </p>
          </div>
        </div>
      )}

      {/* Blockchain Blocks List */}
      <div className="space-y-4">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`p-5 rounded-2xl border transition-all ${
              block.status === 'VERIFIED'
                ? 'bp-card'
                : 'bg-rose-50/90 border-rose-400 shadow-xl'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-lg bg-sage-mist flex items-center justify-center font-mono font-bold text-xs text-forest-deep border border-forest/20">
                  #{block.index}
                </span>
                <span className="font-mono text-xs font-bold text-forest-deep">{block.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-paper-sunken text-ink-muted border border-line font-mono">
                  ULPIN: {block.ulpin}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-ink-faint font-mono">{block.timestamp}</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                    block.status === 'VERIFIED'
                      ? 'bg-green-100 text-green-900 border border-green-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {block.status}
                </span>
              </div>
            </div>

            {/* Block Content Grid */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-paper-sunken p-2.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[10px] block">Survey & Extent:</span>
                <span className="font-semibold text-forest-deep">
                  Survey No. {block.survey_no} ({block.extent})
                </span>
              </div>

              <div className="bg-paper-sunken p-2.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[10px] block">Khatedar Titleholder:</span>
                <span
                  className={`font-semibold ${
                    block.status === 'TAMPERED' ? 'text-rose-700 font-bold' : 'text-ink'
                  }`}
                >
                  {block.owner}
                </span>
              </div>

              <div className="bg-paper-sunken p-2.5 rounded-xl border border-line">
                <span className="text-ink-faint text-[10px] block">Chain Link Integrity:</span>
                <span
                  className={`font-semibold ${
                    block.status === 'VERIFIED' ? 'text-green-800' : 'text-rose-700'
                  }`}
                >
                  {block.status === 'VERIFIED' ? 'Merkle Proof Valid' : 'POINTER MISMATCH'}
                </span>
              </div>
            </div>

            {/* Hashes */}
            <div className="mt-3 pt-3 border-t border-line space-y-1 text-[11px] font-mono">
              <div className="flex items-center space-x-2 text-ink-muted truncate">
                <span className="text-ink-faint shrink-0">Previous Hash:</span>
                <span className="text-ink-faint truncate">{block.previous_hash}</span>
              </div>
              <div className="flex items-center space-x-2 text-forest font-semibold truncate">
                <span className="text-ink-faint shrink-0">Block Hash:</span>
                <span className="truncate">{block.block_hash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
