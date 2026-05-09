import type { Transaction, Endorsement, Loan, ScoreBreakdown } from './types';

export function calculateCreditScore(
  transactions: Transaction[],
  endorsements: Endorsement[],
  loans: Loan[]
): ScoreBreakdown {
  // Factor 1: School fee payment consistency (25% = max 212)
  const schoolFeePayments = transactions.filter(t => t.type === 'School Fee');
  const schoolFeeScore = Math.min(212, Math.round((schoolFeePayments.length / 10) * 212));

  // Factor 2: Mobile money transaction history (20% = max 170)
  const mobileMoneyTxns = transactions.filter(t => t.provider === 'airtel' || t.provider === 'mtn');
  const mobileMoneyScore = Math.min(170, Math.round((mobileMoneyTxns.length / 49) * 170));

  // Factor 3: Mobile banking transaction history (20% = max 170)
  const mobileBankingTxns = transactions.filter(t => t.provider === 'zanaco' || t.provider === 'fnb' || t.provider === 'stanbic');
  const mobileBankingScore = Math.min(170, Math.round((mobileBankingTxns.length / 53) * 170));

  // Factor 4: Number of endorsements (15% = max 127)
  const activeEndorsements = endorsements.filter(e => e.status !== 'withdrawn' && e.status !== 'slashed');
  const endorsementScore = Math.min(127, Math.round((activeEndorsements.length / 5) * 127));

  // Factor 5: Total SOL staked (12% = max 102)
  const totalStaked = activeEndorsements.reduce((sum, e) => sum + e.amountSOL, 0);
  const stakedScore = Math.min(102, Math.round((totalStaked / 3) * 102));

  // Factor 6: Loan repayment history (8% = max 69)
  const totalRepayments = loans.reduce((sum, l) => sum + l.paidMonths, 0);
  const totalDue = loans.reduce((sum, l) => sum + l.termMonths, 0);
  const repaymentScore = totalDue > 0 ? Math.min(69, Math.round((totalRepayments / totalDue) * 69)) : 0;

  const total = schoolFeeScore + mobileMoneyScore + mobileBankingScore + endorsementScore + stakedScore + repaymentScore;

  return {
    schoolFees: schoolFeeScore,
    mobileMoney: mobileMoneyScore,
    mobileBanking: mobileBankingScore,
    endorsements: endorsementScore,
    stakedSOL: stakedScore,
    loanRepayment: repaymentScore,
    total: Math.min(850, total),
  };
}

export function getScoreBand(score: number): { label: string; color: string; maxLoan: number } {
  if (score <= 300) return { label: 'Poor', color: '#EF4444', maxLoan: 0 };
  if (score <= 500) return { label: 'Fair', color: '#F97316', maxLoan: 50 };
  if (score <= 650) return { label: 'Good', color: '#EAB308', maxLoan: 200 };
  if (score <= 750) return { label: 'Very Good', color: '#14B8A6', maxLoan: 500 };
  return { label: 'Excellent', color: '#22C55E', maxLoan: 1000 };
}

export function getScoreFactors() {
  return [
    { name: 'School Fee Payments', weight: '25%', maxPoints: 212 },
    { name: 'Mobile Money Activity', weight: '20%', maxPoints: 170 },
    { name: 'Mobile Banking Activity', weight: '20%', maxPoints: 170 },
    { name: 'Community Endorsements', weight: '15%', maxPoints: 127 },
    { name: 'Total SOL Staked', weight: '12%', maxPoints: 102 },
    { name: 'Loan Repayment History', weight: '8%', maxPoints: 69 },
  ];
}
