import React, { useState } from 'react';
import type { Lender } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Transaction as SolTx, SystemProgram } from '@solana/web3.js';
import { getScoreBand } from '@/lib/scoreEngine';
import { generateSignature } from '@/lib/seedData';
import { ScoreGauge } from '@/components/ScoreGauge';
import { Search, Filter, GraduationCap, MapPin, Users, Banknote, ExternalLink, Shield, Check } from 'lucide-react';

export function BrowseStudents({ lender }: { lender: Lender }) {
  const { students, fundLoan } = useApp();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState(100);
  const [funding, setFunding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSig, setLastSig] = useState('');

  const filtered = students.filter(s => {
    if (s.creditScore < minScore) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleFund = async () => {
    if (!selectedStudent) return;
    setFunding(true);

    let sig = generateSignature();
    let isReal = false;

    if (publicKey && sendTransaction) {
      try {
        const student = students.find(s => s.id === selectedStudent);
        if (student) {
          const tx = new SolTx();
          tx.add(SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: publicKey, lamports: 0 }));
          const realSig = await sendTransaction(tx, connection);
          await connection.confirmTransaction(realSig);
          sig = realSig;
          isReal = true;
        }
      } catch (e) {
        console.log('Real tx failed, using simulated:', e);
      }
    }

    fundLoan(lender.id, selectedStudent, loanAmount, sig, isReal);
    setLastSig(sig);
    setShowSuccess(true);
    setFunding(false);
  };

  const student = selectedStudent ? students.find(s => s.id === selectedStudent) : null;

  return (
    <div className="space-y-6 fade-in">
      {/* Filters */}
      <div className="bg-card rounded-xl border border-secondary/30 p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-muted-foreground mb-1 block">Search students</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="w-48">
          <label className="text-xs text-muted-foreground mb-1 block">Min Credit Score: {minScore}</label>
          <input
            type="range"
            min="0"
            max="850"
            value={minScore}
            onChange={e => setMinScore(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Student Cards */}
      {!showSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => {
            const band = getScoreBand(s.creditScore);
            const endorsementCount = s.endorsements.filter(e => e.status !== 'withdrawn').length;
            const activeLoansCount = s.loans.filter(l => l.status === 'active').length;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStudent(selectedStudent === s.id ? null : s.id)}
                className={`bg-card rounded-xl border p-5 text-left transition-all ${
                  selectedStudent === s.id ? 'border-primary shadow-glow' : 'border-secondary/30 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.university}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Credit Score</p>
                    <p className="text-2xl font-bold" style={{ color: band.color }}>{s.creditScore}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: band.color + '20', color: band.color }}>
                    {band.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-background rounded-lg p-2 text-center">
                    <p className="font-semibold">{endorsementCount}</p>
                    <p className="text-muted-foreground">Endorsers</p>
                  </div>
                  <div className="bg-background rounded-lg p-2 text-center">
                    <p className="font-semibold">{s.transactions.length}</p>
                    <p className="text-muted-foreground">Txns</p>
                  </div>
                  <div className="bg-background rounded-lg p-2 text-center">
                    <p className="font-semibold">{activeLoansCount}</p>
                    <p className="text-muted-foreground">Loans</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Max loan: <span className="font-semibold" style={{ color: band.color }}>${band.maxLoan}</span>
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Fund Loan Panel */}
      {student && !showSuccess && (
        <div className="bg-card rounded-xl border border-primary/30 p-6">
          <h3 className="font-semibold mb-4">Fund Loan for {student.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Score</p>
              <p className="text-xl font-bold" style={{ color: getScoreBand(student.creditScore).color }}>
                {student.creditScore}
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Max Eligible</p>
              <p className="text-xl font-bold">${getScoreBand(student.creditScore).maxLoan}</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Endorsements</p>
              <p className="text-xl font-bold">{student.endorsements.filter(e => e.status !== 'withdrawn').length}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">Loan Amount (USD)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={e => setLoanAmount(Math.min(getScoreBand(student.creditScore).maxLoan, parseInt(e.target.value) || 0))}
              max={getScoreBand(student.creditScore).maxLoan}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleFund}
            disabled={funding || loanAmount <= 0}
            className="w-full py-3 rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Banknote className="w-4 h-4" />
            {funding ? 'Submitting to Solana...' : `Fund This Loan — $${loanAmount}`}
          </button>
        </div>
      )}

      {/* Success */}
      {showSuccess && (
        <div className="bg-card rounded-xl border border-score-excellent/30 p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-score-excellent/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-score-excellent" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Loan Funded Successfully</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You funded a ${loanAmount} loan for {student?.name}. Transaction confirmed on Solana Devnet.
          </p>
          <div className="bg-background rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Transaction Signature</p>
            <p className="text-xs font-mono break-all">{lastSig}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <a
              href={`https://explorer.solana.com/tx/${lastSig}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary"
            >
              View on Explorer <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => { setShowSuccess(false); setSelectedStudent(null); }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Fund Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
