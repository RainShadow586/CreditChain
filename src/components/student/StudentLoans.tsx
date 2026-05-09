import React, { useState } from 'react';
import type { Student } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { getScoreBand } from '@/lib/scoreEngine';
import { generateSignature } from '@/lib/seedData';
import { Banknote, Calendar, TrendingUp, Check, ExternalLink } from 'lucide-react';

export function StudentLoans({ student }: { student: Student }) {
  const { makeRepayment } = useApp();
  const [repaying, setRepaying] = useState<string | null>(null);
  const band = getScoreBand(student.creditScore);

  const handleRepayment = async (loanId: string) => {
    setRepaying(loanId);
    const sig = generateSignature();
    setTimeout(() => {
      makeRepayment(loanId, sig);
      setRepaying(null);
    }, 1500);
  };

  const activeLoans = student.loans.filter(l => l.status === 'active');
  const completedLoans = student.loans.filter(l => l.status === 'completed');

  return (
    <div className="space-y-6 fade-in">
      {/* Loan Eligibility */}
      <div className="bg-card rounded-xl border border-secondary/30 p-6">
        <h3 className="font-semibold mb-1">Loan Eligibility</h3>
        <p className="text-sm text-muted-foreground mb-4">Based on your current credit score</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{student.creditScore}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: band.color + '20', color: band.color }}>
              {band.label}
            </span>
          </div>
          <div className="h-8 w-px bg-secondary/30" />
          <div>
            <p className="text-sm text-muted-foreground">Maximum loan amount</p>
            <p className="text-xl font-bold" style={{ color: band.color }}>${band.maxLoan}</p>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      {activeLoans.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Active Loans</h3>
          {activeLoans.map(loan => {
            const progress = (loan.paidMonths / loan.termMonths) * 100;
            const remaining = (loan.termMonths - loan.paidMonths) * loan.monthlyPayment;
            return (
              <div key={loan.id} className="bg-card rounded-xl border border-secondary/30 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="w-4 h-4 text-primary" />
                      <span className="font-semibold">${loan.amountUSD} Loan</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">Active</span>
                    </div>
                    <p className="text-sm text-muted-foreground">From {loan.lenderName} — {loan.interestRate}% interest over {loan.termMonths} months</p>
                  </div>
                  <button
                    onClick={() => handleRepayment(loan.id)}
                    disabled={repaying === loan.id}
                    className="px-4 py-2 rounded-lg bg-primary text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {repaying === loan.id ? 'Processing...' : `Pay $${loan.monthlyPayment}`}
                  </button>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{loan.paidMonths} of {loan.termMonths} payments made</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-background rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="font-semibold text-sm">${loan.monthlyPayment}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-sm">${remaining.toFixed(2)}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Started</p>
                    <p className="font-semibold text-sm">{new Date(loan.startDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>

                {/* Repayment History */}
                {loan.repayments.length > 0 && (
                  <div className="mt-4 border-t border-secondary/30 pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Repayment History</p>
                    <div className="space-y-2">
                      {loan.repayments.map(rep => (
                        <div key={rep.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-score-excellent" />
                            <span>Month {rep.month} — ${rep.amountUSD}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(rep.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            <a
                              href={`https://explorer.solana.com/tx/${rep.solanaSignature}?cluster=devnet`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3 text-primary" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Completed Loans */}
      {completedLoans.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Completed Loans</h3>
          {completedLoans.map(loan => (
            <div key={loan.id} className="bg-card rounded-xl border border-score-very-good/30 p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">${loan.amountUSD} Loan</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-score-very-good/20 text-score-very-good">Completed</span>
                </div>
                <p className="text-xs text-muted-foreground">{loan.lenderName}</p>
              </div>
              <Check className="w-5 h-5 text-score-very-good" />
            </div>
          ))}
        </div>
      )}

      {student.loans.length === 0 && (
        <div className="bg-card rounded-xl border border-secondary/30 p-8 text-center">
          <Banknote className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No active loans. Build your credit score to become eligible for microloans.</p>
        </div>
      )}
    </div>
  );
}
