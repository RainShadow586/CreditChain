import React from 'react';
import type { Endorser } from '@/lib/types';
import { Shield, Users, TrendingUp, Coins } from 'lucide-react';

export function EndorserImpact({ endorser }: { endorser: Endorser }) {
  const activeEndorsements = endorser.endorsements.filter(e => e.status !== 'withdrawn');
  const totalStaked = activeEndorsements.reduce((sum, e) => sum + e.amountSOL, 0);
  const uniqueStudents = new Set(activeEndorsements.map(e => e.studentId)).size;
  const lockedCount = activeEndorsements.filter(e => e.status === 'locked').length;

  const stats = [
    { label: 'Total Endorsements', value: activeEndorsements.length, icon: Shield, color: '#2F2FE4' },
    { label: 'Students Endorsed', value: uniqueStudents, icon: Users, color: '#14B8A6' },
    { label: 'Total SOL Staked', value: `${totalStaked.toFixed(2)} SOL`, icon: Coins, color: '#EAB308' },
    { label: 'Active Loans Backed', value: lockedCount, icon: TrendingUp, color: '#22C55E' },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border border-secondary/30 p-5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: stat.color + '20' }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-secondary/30 p-6">
        <h3 className="font-semibold mb-1">Your Impact</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your endorsements help students build verifiable credit profiles and access microloans.
        </p>
        <div className="space-y-3">
          {activeEndorsements.map(e => (
            <div key={e.id} className="flex items-center gap-4 bg-background rounded-lg p-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {e.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{e.studentName}</p>
                <p className="text-xs text-muted-foreground">Staked {e.amountSOL} SOL on {new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                e.status === 'locked' ? 'bg-secondary text-muted-foreground' :
                e.status === 'withdrawable' ? 'bg-score-excellent/20 text-score-excellent' :
                'bg-muted text-muted-foreground'
              }`}>
                {e.status === 'locked' ? 'Locked' : e.status === 'withdrawable' ? 'Active' : e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
