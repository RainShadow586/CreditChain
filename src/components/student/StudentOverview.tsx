import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { Student } from '@/lib/types';
import { ScoreGauge } from '@/components/ScoreGauge';
import { calculateCreditScore, getScoreBand, getScoreFactors } from '@/lib/scoreEngine';
import { Wallet, Droplets, Users, Banknote, CreditCard, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function StudentOverview({ student }: { student: Student }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = React.useState<number | null>(null);
  const [airdropping, setAirdropping] = React.useState(false);

  const score = calculateCreditScore(student.transactions, student.endorsements, student.loans);
  const band = getScoreBand(student.creditScore);
  const factors = getScoreFactors();

  React.useEffect(() => {
    if (publicKey && connection) {
      connection.getBalance(publicKey).then(b => setSolBalance(b / LAMPORTS_PER_SOL)).catch(() => {});
    }
  }, [publicKey, connection]);

  const handleAirdrop = async () => {
    if (!publicKey || !connection) return;
    setAirdropping(true);
    try {
      const sig = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(sig);
      const b = await connection.getBalance(publicKey);
      setSolBalance(b / LAMPORTS_PER_SOL);
    } catch (e) {
      console.error(e);
    }
    setAirdropping(false);
  };

  const scoreValues = [
    { name: 'School Fees', value: score.schoolFees, max: 212 },
    { name: 'Mobile Money', value: score.mobileMoney, max: 170 },
    { name: 'Banking', value: score.mobileBanking, max: 170 },
    { name: 'Endorsements', value: score.endorsements, max: 127 },
    { name: 'Staked SOL', value: score.stakedSOL, max: 102 },
    { name: 'Repayments', value: score.loanRepayment, max: 69 },
  ];

  const quickStats = [
    { label: 'Connected Accounts', value: student.connectedProviders.length, icon: CreditCard },
    { label: 'Total Transactions', value: student.transactions.length, icon: TrendingUp },
    { label: 'Endorsements', value: student.endorsements.filter(e => e.status !== 'withdrawn').length, icon: Users },
    { label: 'Active Loans', value: student.loans.filter(l => l.status === 'active').length, icon: Banknote },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score */}
        <div className="bg-card rounded-xl border border-secondary/30 p-6 flex flex-col items-center">
          <h3 className="text-sm text-muted-foreground mb-4">Credit Score</h3>
          <ScoreGauge score={student.creditScore} />
          <p className="text-sm text-muted-foreground mt-3">
            Eligible for loans up to <span className="font-semibold" style={{ color: band.color }}>${band.maxLoan}</span>
          </p>
        </div>

        {/* Wallet */}
        <div className="bg-card rounded-xl border border-secondary/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-primary" />
            <h3 className="text-sm text-muted-foreground">Devnet Wallet</h3>
          </div>
          <div className="bg-background rounded-lg p-3 mb-3">
            <p className="text-xs text-muted-foreground mb-1">Address</p>
            <p className="text-xs font-mono break-all">
              {publicKey ? publicKey.toBase58() : student.walletAddress}
            </p>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-3">
            <div>
              <p className="text-xs text-muted-foreground">SOL Balance</p>
              <p className="text-xl font-bold">
                {solBalance !== null ? solBalance.toFixed(4) : '—'} SOL
              </p>
            </div>
            <button
              onClick={handleAirdrop}
              disabled={airdropping || !publicKey}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <Droplets className="w-3.5 h-3.5" />
              {airdropping ? 'Airdropping...' : 'Get Test SOL'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border border-secondary/30 p-4">
              <stat.icon className="w-4 h-4 text-primary mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Breakdown Chart */}
      <div className="bg-card rounded-xl border border-secondary/30 p-6">
        <h3 className="text-sm font-semibold mb-1">Score Breakdown</h3>
        <p className="text-xs text-muted-foreground mb-6">Points earned across all six scoring factors</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreValues}>
              <CartesianGrid strokeDasharray="3 3" stroke="#162E93" />
              <XAxis dataKey="name" tick={{ fill: '#A0AEC0', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#A0AEC0', fontSize: 11 }} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1953', border: '1px solid #162E93', borderRadius: '8px' }}
                labelStyle={{ color: 'white' }}
                itemStyle={{ color: '#A0AEC0' }}
              />
              <Bar dataKey="value" fill="#2F2FE4" radius={[4, 4, 0, 0]} name="Points" />
              <Bar dataKey="max" fill="#162E93" radius={[4, 4, 0, 0]} name="Max" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Factor Table */}
        <div className="mt-4 space-y-2">
          {factors.map((f, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-secondary/20 last:border-0">
              <span className="text-muted-foreground">{f.name} ({f.weight})</span>
              <span className="font-medium">
                {scoreValues[i].value} <span className="text-muted-foreground">/ {f.maxPoints}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
