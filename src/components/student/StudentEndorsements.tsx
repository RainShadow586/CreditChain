import React from 'react';
import type { Student } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { Users, Lock, Shield, ExternalLink } from 'lucide-react';

export function StudentEndorsements({ student }: { student: Student }) {
  const { hasActiveLoan } = useApp();
  const activeEndorsements = student.endorsements.filter(e => e.status !== 'withdrawn');
  const totalStaked = activeEndorsements.reduce((sum, e) => sum + e.amountSOL, 0);
  const hasLoan = hasActiveLoan(student.id);

  return (
    <div className="space-y-6 fade-in">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-secondary/30 p-5">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{activeEndorsements.length}</p>
          <p className="text-xs text-muted-foreground">Active Endorsements</p>
        </div>
        <div className="bg-card rounded-xl border border-secondary/30 p-5">
          <Shield className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{totalStaked.toFixed(2)} SOL</p>
          <p className="text-xs text-muted-foreground">Total SOL Staked</p>
        </div>
        <div className="bg-card rounded-xl border border-secondary/30 p-5">
          <Lock className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="text-2xl font-bold">{activeEndorsements.filter(e => e.status === 'locked').length}</p>
          <p className="text-xs text-muted-foreground">Locked Endorsements</p>
        </div>
      </div>

      {/* Endorsement List */}
      <div className="bg-card rounded-xl border border-secondary/30">
        <div className="p-4 border-b border-secondary/30 flex items-center justify-between">
          <h3 className="font-semibold">Your Endorsements</h3>
          <button className="px-4 py-2 rounded-lg bg-primary text-sm font-medium">
            Request Endorsement
          </button>
        </div>

        {activeEndorsements.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No endorsements yet. Share your profile with peers, lecturers, or employers to receive endorsements.
          </div>
        ) : (
          <div className="divide-y divide-secondary/20">
            {activeEndorsements.map(e => (
              <div key={e.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {e.endorserName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{e.endorserName}</span>
                    {e.status === 'locked' && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{e.endorserTitle}</p>
                  {e.status === 'locked' && (
                    <p className="text-xs text-muted-foreground mt-0.5">Endorsement locked until loan is repaid.</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{e.amountSOL} SOL</p>
                  <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <a
                  href={`https://explorer.solana.com/tx/${e.solanaSignature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
