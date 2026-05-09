import React, { useState } from 'react';
import type { Endorser } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { Lock, ExternalLink } from 'lucide-react';

export function MyEndorsements({ endorser }: { endorser: Endorser }) {
  const { withdrawEndorsement, hasActiveLoan } = useApp();
  const [hoveredLocked, setHoveredLocked] = useState<string | null>(null);

  const getStatusBadge = (endorsement: typeof endorser.endorsements[0]) => {
    const hasLoan = hasActiveLoan(endorsement.studentId);

    // Override status based on live loan state
    let effectiveStatus = endorsement.status;
    if (hasLoan && effectiveStatus === 'withdrawable') effectiveStatus = 'locked';
    if (!hasLoan && effectiveStatus === 'locked') effectiveStatus = 'withdrawable';

    switch (effectiveStatus) {
      case 'withdrawable':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-score-excellent/20 text-score-excellent">
            Withdrawable
          </span>
        );
      case 'locked':
        return (
          <div className="relative">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground flex items-center gap-1 cursor-default"
              onMouseEnter={() => setHoveredLocked(endorsement.id)}
              onMouseLeave={() => setHoveredLocked(null)}
            >
              <Lock className="w-3 h-3" />
              Locked — Active Loan
            </span>
            {hoveredLocked === endorsement.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-lg bg-background border border-secondary text-xs text-foreground z-50 shadow-lg">
                Cannot withdraw — this student has an active loan backed by this endorsement. Withdrawal is available once the loan is fully repaid.
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-b border-r border-secondary rotate-45 -mt-1" />
              </div>
            )}
          </div>
        );
      case 'slashed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            Slashed — Defaulted
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-score-very-good/20 text-score-very-good">
            Completed
          </span>
        );
      case 'withdrawn':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Withdrawn
          </span>
        );
      default:
        return null;
    }
  };

  const getAction = (endorsement: typeof endorser.endorsements[0]) => {
    const hasLoan = hasActiveLoan(endorsement.studentId);
    let effectiveStatus = endorsement.status;
    if (hasLoan && effectiveStatus === 'withdrawable') effectiveStatus = 'locked';
    if (!hasLoan && effectiveStatus === 'locked') effectiveStatus = 'withdrawable';

    if (effectiveStatus === 'withdrawable') {
      return (
        <button
          onClick={() => withdrawEndorsement(endorsement.id)}
          className="px-3 py-1.5 rounded-lg bg-primary text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          Withdraw
        </button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="bg-card rounded-xl border border-secondary/30 overflow-hidden">
        <div className="p-4 border-b border-secondary/30">
          <h3 className="font-semibold">My Endorsements</h3>
          <p className="text-sm text-muted-foreground">All students you have endorsed with staked SOL</p>
        </div>

        {endorser.endorsements.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            You haven't endorsed any students yet. Search for a student to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/30 text-xs text-muted-foreground">
                  <th className="text-left p-3 font-medium">Student</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Transaction</th>
                  <th className="text-right p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {endorser.endorsements.map(e => (
                  <tr key={e.id} className="border-b border-secondary/20 hover:bg-secondary/20 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {e.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{e.studentName}</p>
                          <p className="text-xs font-mono text-muted-foreground truncate max-w-[140px]">{e.studentWallet}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm font-semibold">{e.amountSOL} SOL</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-3">{getStatusBadge(e)}</td>
                    <td className="p-3">
                      <a
                        href={`https://explorer.solana.com/tx/${e.solanaSignature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 text-xs"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-3 text-right">{getAction(e)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
