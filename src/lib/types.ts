export type UserRole = 'student' | 'endorser' | 'lender';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  university: string;
  city: string;
  program: string;
  yearOfStudy: number;
  studentId: string;
  creditScore: number;
  endorsements: Endorsement[];
  loans: Loan[];
  connectedProviders: ProviderConnection[];
  transactions: Transaction[];
}

export interface Endorser extends User {
  role: 'endorser';
  title: string;
  relationship: string;
  organization: string;
  endorsements: Endorsement[];
}

export interface Lender extends User {
  role: 'lender';
  organization: string;
  totalFunded: number;
  activeLoans: Loan[];
}

export type ProviderName = 'airtel' | 'mtn' | 'zanaco' | 'fnb' | 'stanbic';

export interface ProviderConnection {
  provider: ProviderName;
  connected: boolean;
  accountId?: string;
  lastSynced?: string;
  transactionCount?: number;
}

export type TransactionType =
  | 'School Fee'
  | 'Utility'
  | 'Purchase'
  | 'Airtime'
  | 'Received'
  | 'Sent'
  | 'Repayment'
  | 'Transport'
  | 'Food'
  | 'Subscription'
  | 'Withdrawal';

export interface Transaction {
  id: string;
  provider: ProviderName;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  solanaHash: string;
  blockNumber: number;
  slot: number;
  verified: boolean;
}

export type EndorsementStatus = 'withdrawable' | 'locked' | 'slashed' | 'completed' | 'withdrawn';

export interface Endorsement {
  id: string;
  endorserId: string;
  endorserName: string;
  endorserTitle: string;
  studentId: string;
  studentName: string;
  studentWallet: string;
  amountSOL: number;
  status: EndorsementStatus;
  date: string;
  solanaSignature: string;
  isRealTransaction: boolean;
}

export type LoanStatus = 'pending' | 'active' | 'completed' | 'defaulted';

export interface Loan {
  id: string;
  studentId: string;
  studentName: string;
  studentWallet: string;
  lenderId: string;
  lenderName: string;
  amountUSD: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  paidMonths: number;
  status: LoanStatus;
  startDate: string;
  solanaSignature: string;
  isRealTransaction: boolean;
  repayments: Repayment[];
}

export interface Repayment {
  id: string;
  loanId: string;
  amountUSD: number;
  date: string;
  solanaSignature: string;
  month: number;
}

export interface BlockchainTransaction {
  id: string;
  type: 'endorsement' | 'loan_disbursement' | 'repayment' | 'score_update' | 'endorsement_unlocked' | 'slash_event' | 'withdrawal';
  description: string;
  solanaSignature: string;
  isReal: boolean;
  walletFrom: string;
  walletTo: string;
  amount?: string;
  timestamp: string;
  slot: number;
  blockNumber: number;
  status: 'confirmed';
}

export interface ScoreBreakdown {
  schoolFees: number;
  mobileMoney: number;
  mobileBanking: number;
  endorsements: number;
  stakedSOL: number;
  loanRepayment: number;
  total: number;
}

export interface InsurancePool {
  totalBalance: number;
  contributions: InsuranceContribution[];
}

export interface InsuranceContribution {
  id: string;
  endorserName: string;
  studentName: string;
  amount: number;
  date: string;
  reason: string;
}
