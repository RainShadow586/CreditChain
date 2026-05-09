import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  User, Student, Endorser, Lender, Transaction, Endorsement, Loan,
  BlockchainTransaction, InsurancePool, ProviderConnection, ProviderName,
  Repayment, EndorsementStatus
} from './types';
import {
  airtelTransactions, mtnTransactions, zanacoTransactions, fnbTransactions, stanbicTransactions,
  seedEndorsements, seedLoans, seedBlockchainTransactions, seedInsurancePool,
  WALLET_GERMANY, WALLET_CHANDA, WALLET_MUTALE, WALLET_CEPHAS, WALLET_LUKUNDO, WALLET_AFRILEND,
  generateSignature, generateHash
} from './seedData';
import { calculateCreditScore } from './scoreEngine';

interface AppState {
  currentUser: User | null;
  students: Student[];
  endorsers: Endorser[];
  lenders: Lender[];
  blockchainTransactions: BlockchainTransaction[];
  insurancePool: InsurancePool;
  notifications: AppNotification[];
}

export interface AppNotification {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => User | null;
  register: (name: string, email: string, password: string, role: string, extra?: Record<string, string>) => User;
  logout: () => void;
  connectProvider: (studentId: string, provider: ProviderName) => Transaction[];
  getStudentById: (id: string) => Student | undefined;
  addEndorsement: (endorserId: string, studentId: string, amountSOL: number, solSig: string, isReal: boolean) => void;
  withdrawEndorsement: (endorsementId: string) => void;
  fundLoan: (lenderId: string, studentId: string, amountUSD: number, solSig: string, isReal: boolean) => void;
  makeRepayment: (loanId: string, solSig: string) => void;
  addBlockchainTx: (tx: BlockchainTransaction) => void;
  updateStudentScore: (studentId: string) => number;
  getEndorsementsForStudent: (studentId: string) => Endorsement[];
  getEndorsementsForEndorser: (endorserId: string) => Endorsement[];
  getLoansForStudent: (studentId: string) => Loan[];
  getLoansForLender: (lenderId: string) => Loan[];
  hasActiveLoan: (studentId: string) => boolean;
  addNotification: (userId: string, message: string) => void;
  clearNotifications: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 'student-germany',
    name: 'Germany Phiri',
    email: 'germany@cavendish.edu.zm',
    role: 'student',
    walletAddress: WALLET_GERMANY,
    university: 'Cavendish University',
    city: 'Lusaka',
    program: 'Computer Science',
    yearOfStudy: 3,
    studentId: 'CAV-2024-0847',
    creditScore: 687,
    endorsements: [seedEndorsements[0]],
    loans: [seedLoans[0]],
    connectedProviders: [],
    transactions: [],
  },
  {
    id: 'student-chanda',
    name: 'Chanda Mwale',
    email: 'chanda@unza.edu.zm',
    role: 'student',
    walletAddress: WALLET_CHANDA,
    university: 'University of Zambia',
    city: 'Lusaka',
    program: 'Business Administration',
    yearOfStudy: 2,
    studentId: 'UNZA-2025-1234',
    creditScore: 445,
    endorsements: [seedEndorsements[2]],
    loans: [],
    connectedProviders: [],
    transactions: [],
  },
  {
    id: 'student-mutale',
    name: 'Mutale Banda',
    email: 'mutale@cbu.edu.zm',
    role: 'student',
    walletAddress: WALLET_MUTALE,
    university: 'Copperbelt University',
    city: 'Kitwe',
    program: 'Engineering',
    yearOfStudy: 4,
    studentId: 'CBU-2023-0567',
    creditScore: 789,
    endorsements: [seedEndorsements[1]],
    loans: [],
    connectedProviders: [],
    transactions: [],
  },
];

const initialEndorsers: Endorser[] = [
  {
    id: 'endorser-cephas',
    name: 'Dr. Cephas Zulu',
    email: 'cephas@cavendish.edu.zm',
    role: 'endorser',
    walletAddress: WALLET_CEPHAS,
    title: 'Senior Lecturer',
    relationship: 'Lecturer',
    organization: 'Cavendish University',
    endorsements: [seedEndorsements[0], seedEndorsements[1]],
  },
  {
    id: 'endorser-lukundo',
    name: 'Lukundo Tembo',
    email: 'lukundo@techcorp.zm',
    role: 'endorser',
    walletAddress: WALLET_LUKUNDO,
    title: 'Engineering Manager',
    relationship: 'Employer',
    organization: 'TechCorp Zambia',
    endorsements: [seedEndorsements[2]],
  },
];

const initialLenders: Lender[] = [
  {
    id: 'lender-afrilend',
    name: 'AfriLend Capital',
    email: 'admin@afrilend.com',
    role: 'lender',
    walletAddress: WALLET_AFRILEND,
    organization: 'AfriLend Capital',
    totalFunded: 150,
    activeLoans: [seedLoans[0]],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [endorsers, setEndorsers] = useState<Endorser[]>(initialEndorsers);
  const [lenders, setLenders] = useState<Lender[]>(initialLenders);
  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>(seedBlockchainTransactions);
  const [insurancePool, setInsurancePool] = useState<InsurancePool>(seedInsurancePool);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const login = useCallback((email: string, _password: string): User | null => {
    const allUsers: User[] = [...students, ...endorsers, ...lenders];
    const user = allUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  }, [students, endorsers, lenders]);

  const register = useCallback((name: string, email: string, _password: string, role: string, extra?: Record<string, string>): User => {
    const id = `${role}-${Date.now()}`;
    const walletAddress = Array.from({ length: 44 }, () => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[Math.floor(Math.random() * 58)]).join('');

    if (role === 'student') {
      const student: Student = {
        id, name, email, role: 'student', walletAddress,
        university: extra?.university || '',
        city: extra?.city || '',
        program: extra?.program || '',
        yearOfStudy: parseInt(extra?.yearOfStudy || '1'),
        studentId: extra?.studentId || `STU-${Date.now()}`,
        creditScore: 0,
        endorsements: [],
        loans: [],
        connectedProviders: [],
        transactions: [],
      };
      setStudents(prev => [...prev, student]);
      setCurrentUser(student);
      return student;
    } else if (role === 'endorser') {
      const endorser: Endorser = {
        id, name, email, role: 'endorser', walletAddress,
        title: extra?.title || '',
        relationship: extra?.relationship || '',
        organization: extra?.organization || '',
        endorsements: [],
      };
      setEndorsers(prev => [...prev, endorser]);
      setCurrentUser(endorser);
      return endorser;
    } else {
      const lender: Lender = {
        id, name, email, role: 'lender', walletAddress,
        organization: extra?.organization || '',
        totalFunded: 0,
        activeLoans: [],
      };
      setLenders(prev => [...prev, lender]);
      setCurrentUser(lender);
      return lender;
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const connectProvider = useCallback((studentId: string, provider: ProviderName): Transaction[] => {
    const txnMap: Record<ProviderName, Transaction[]> = {
      airtel: airtelTransactions,
      mtn: mtnTransactions,
      zanaco: zanacoTransactions,
      fnb: fnbTransactions,
      stanbic: stanbicTransactions,
    };

    const newTxns = txnMap[provider] || [];

    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const alreadyConnected = s.connectedProviders.some(p => p.provider === provider);
      if (alreadyConnected) return s;

      const connection: ProviderConnection = {
        provider,
        connected: true,
        accountId: `${provider}-${Date.now()}`,
        lastSynced: new Date().toISOString(),
        transactionCount: newTxns.length,
      };

      const updatedTransactions = [...s.transactions, ...newTxns];
      const updatedProviders = [...s.connectedProviders, connection];

      const score = calculateCreditScore(updatedTransactions, s.endorsements, s.loans);

      return {
        ...s,
        connectedProviders: updatedProviders,
        transactions: updatedTransactions,
        creditScore: score.total,
      };
    }));

    if (currentUser?.id === studentId) {
      setCurrentUser(prev => {
        if (!prev || prev.role !== 'student') return prev;
        const student = prev as Student;
        const updatedTransactions = [...student.transactions, ...newTxns];
        const connection: ProviderConnection = {
          provider, connected: true,
          accountId: `${provider}-${Date.now()}`,
          lastSynced: new Date().toISOString(),
          transactionCount: newTxns.length,
        };
        const updatedProviders = [...student.connectedProviders, connection];
        const score = calculateCreditScore(updatedTransactions, student.endorsements, student.loans);
        return { ...student, connectedProviders: updatedProviders, transactions: updatedTransactions, creditScore: score.total };
      });
    }

    return newTxns;
  }, [currentUser]);

  const getStudentById = useCallback((id: string) => students.find(s => s.id === id), [students]);

  const hasActiveLoan = useCallback((studentId: string): boolean => {
    const student = students.find(s => s.id === studentId);
    return student?.loans.some(l => l.status === 'active') || false;
  }, [students]);

  const getEndorsementsForStudent = useCallback((studentId: string): Endorsement[] => {
    return students.find(s => s.id === studentId)?.endorsements || [];
  }, [students]);

  const getEndorsementsForEndorser = useCallback((endorserId: string): Endorsement[] => {
    return endorsers.find(e => e.id === endorserId)?.endorsements || [];
  }, [endorsers]);

  const getLoansForStudent = useCallback((studentId: string): Loan[] => {
    return students.find(s => s.id === studentId)?.loans || [];
  }, [students]);

  const getLoansForLender = useCallback((lenderId: string): Loan[] => {
    return lenders.find(l => l.id === lenderId)?.activeLoans || [];
  }, [lenders]);

  const addEndorsement = useCallback((endorserId: string, studentId: string, amountSOL: number, solSig: string, isReal: boolean) => {
    const endorser = endorsers.find(e => e.id === endorserId);
    const student = students.find(s => s.id === studentId);
    if (!endorser || !student) return;

    const hasActive = student.loans.some(l => l.status === 'active');

    const endorsement: Endorsement = {
      id: `end-${Date.now()}`,
      endorserId,
      endorserName: endorser.name,
      endorserTitle: endorser.title,
      studentId,
      studentName: student.name,
      studentWallet: student.walletAddress,
      amountSOL,
      status: hasActive ? 'locked' : 'withdrawable',
      date: new Date().toISOString().split('T')[0],
      solanaSignature: solSig,
      isRealTransaction: isReal,
    };

    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      const updatedEndorsements = [...s.endorsements, endorsement];
      const score = calculateCreditScore(s.transactions, updatedEndorsements, s.loans);
      return { ...s, endorsements: updatedEndorsements, creditScore: score.total };
    }));

    setEndorsers(prev => prev.map(e => {
      if (e.id !== endorserId) return e;
      return { ...e, endorsements: [...e.endorsements, endorsement] };
    }));

    const bcTx: BlockchainTransaction = {
      id: `bc-${Date.now()}`,
      type: 'endorsement',
      description: `${endorser.name} endorsed ${student.name} — ${amountSOL} SOL staked`,
      solanaSignature: solSig,
      isReal,
      walletFrom: endorser.walletAddress,
      walletTo: student.walletAddress,
      amount: `${amountSOL} SOL`,
      timestamp: new Date().toISOString(),
      slot: 289000000 + Math.floor(Math.random() * 1000000),
      blockNumber: 289000000 + Math.floor(Math.random() * 1000000),
      status: 'confirmed',
    };
    setBlockchainTransactions(prev => [bcTx, ...prev]);
  }, [endorsers, students]);

  const withdrawEndorsement = useCallback((endorsementId: string) => {
    setStudents(prev => prev.map(s => ({
      ...s,
      endorsements: s.endorsements.map(e =>
        e.id === endorsementId ? { ...e, status: 'withdrawn' as EndorsementStatus } : e
      ),
    })));

    setEndorsers(prev => prev.map(e => ({
      ...e,
      endorsements: e.endorsements.map(en =>
        en.id === endorsementId ? { ...en, status: 'withdrawn' as EndorsementStatus } : en
      ),
    })));

    const bcTx: BlockchainTransaction = {
      id: `bc-${Date.now()}`,
      type: 'withdrawal',
      description: `Endorsement withdrawn`,
      solanaSignature: generateSignature(),
      isReal: false,
      walletFrom: '',
      walletTo: '',
      timestamp: new Date().toISOString(),
      slot: 289000000 + Math.floor(Math.random() * 1000000),
      blockNumber: 289000000 + Math.floor(Math.random() * 1000000),
      status: 'confirmed',
    };
    setBlockchainTransactions(prev => [bcTx, ...prev]);
  }, []);

  const fundLoan = useCallback((lenderId: string, studentId: string, amountUSD: number, solSig: string, isReal: boolean) => {
    const lender = lenders.find(l => l.id === lenderId);
    const student = students.find(s => s.id === studentId);
    if (!lender || !student) return;

    const loan: Loan = {
      id: `loan-${Date.now()}`,
      studentId,
      studentName: student.name,
      studentWallet: student.walletAddress,
      lenderId,
      lenderName: lender.name,
      amountUSD,
      interestRate: 10,
      termMonths: 6,
      monthlyPayment: Math.round((amountUSD * 1.1 / 6) * 100) / 100,
      paidMonths: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      solanaSignature: solSig,
      isRealTransaction: isReal,
      repayments: [],
    };

    // Lock all endorsements for this student
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        loans: [...s.loans, loan],
        endorsements: s.endorsements.map(e =>
          e.status === 'withdrawable' ? { ...e, status: 'locked' as EndorsementStatus } : e
        ),
      };
    }));

    setEndorsers(prev => prev.map(e => ({
      ...e,
      endorsements: e.endorsements.map(en =>
        en.studentId === studentId && en.status === 'withdrawable'
          ? { ...en, status: 'locked' as EndorsementStatus }
          : en
      ),
    })));

    setLenders(prev => prev.map(l => {
      if (l.id !== lenderId) return l;
      return { ...l, totalFunded: l.totalFunded + amountUSD, activeLoans: [...l.activeLoans, loan] };
    }));

    const bcTx: BlockchainTransaction = {
      id: `bc-${Date.now()}`,
      type: 'loan_disbursement',
      description: `${lender.name} funded $${amountUSD} loan to ${student.name}`,
      solanaSignature: solSig,
      isReal,
      walletFrom: lender.walletAddress,
      walletTo: student.walletAddress,
      amount: `$${amountUSD.toFixed(2)}`,
      timestamp: new Date().toISOString(),
      slot: 289000000 + Math.floor(Math.random() * 1000000),
      blockNumber: 289000000 + Math.floor(Math.random() * 1000000),
      status: 'confirmed',
    };
    setBlockchainTransactions(prev => [bcTx, ...prev]);
  }, [lenders, students]);

  const makeRepayment = useCallback((loanId: string, solSig: string) => {
    setStudents(prev => prev.map(s => {
      const loanIdx = s.loans.findIndex(l => l.id === loanId);
      if (loanIdx === -1) return s;

      const loan = s.loans[loanIdx];
      const newPaidMonths = loan.paidMonths + 1;
      const isCompleted = newPaidMonths >= loan.termMonths;

      const repayment: Repayment = {
        id: `rep-${Date.now()}`,
        loanId,
        amountUSD: loan.monthlyPayment,
        date: new Date().toISOString().split('T')[0],
        solanaSignature: solSig,
        month: newPaidMonths,
      };

      const updatedLoan: Loan = {
        ...loan,
        paidMonths: newPaidMonths,
        status: isCompleted ? 'completed' : 'active',
        repayments: [...loan.repayments, repayment],
      };

      const updatedLoans = [...s.loans];
      updatedLoans[loanIdx] = updatedLoan;

      // If all loans completed, unlock endorsements
      const allLoansComplete = updatedLoans.every(l => l.status !== 'active');
      const updatedEndorsements = allLoansComplete
        ? s.endorsements.map(e => e.status === 'locked' ? { ...e, status: 'withdrawable' as EndorsementStatus } : e)
        : s.endorsements;

      const score = calculateCreditScore(s.transactions, updatedEndorsements, updatedLoans);

      return { ...s, loans: updatedLoans, endorsements: updatedEndorsements, creditScore: score.total };
    }));

    // Also update endorsers if endorsements unlocked
    setEndorsers(prev => prev.map(e => ({
      ...e,
      endorsements: e.endorsements.map(en => {
        const student = students.find(s => s.id === en.studentId);
        if (!student) return en;
        const loan = student.loans.find(l => l.id === loanId);
        if (!loan) return en;
        const newPaid = loan.paidMonths + 1;
        if (newPaid >= loan.termMonths && en.status === 'locked') {
          return { ...en, status: 'withdrawable' as EndorsementStatus };
        }
        return en;
      }),
    })));

    // Update lender loans
    setLenders(prev => prev.map(l => ({
      ...l,
      activeLoans: l.activeLoans.map(loan => {
        if (loan.id !== loanId) return loan;
        const newPaid = loan.paidMonths + 1;
        return {
          ...loan,
          paidMonths: newPaid,
          status: newPaid >= loan.termMonths ? 'completed' : 'active',
          repayments: [...loan.repayments, {
            id: `rep-${Date.now()}`,
            loanId,
            amountUSD: loan.monthlyPayment,
            date: new Date().toISOString().split('T')[0],
            solanaSignature: solSig,
            month: newPaid,
          }],
        };
      }),
    })));

    const bcTx: BlockchainTransaction = {
      id: `bc-${Date.now()}`,
      type: 'repayment',
      description: `Loan repayment made`,
      solanaSignature: solSig,
      isReal: false,
      walletFrom: '',
      walletTo: '',
      timestamp: new Date().toISOString(),
      slot: 289000000 + Math.floor(Math.random() * 1000000),
      blockNumber: 289000000 + Math.floor(Math.random() * 1000000),
      status: 'confirmed',
    };
    setBlockchainTransactions(prev => [bcTx, ...prev]);
  }, [students]);

  const updateStudentScore = useCallback((studentId: string): number => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    const score = calculateCreditScore(student.transactions, student.endorsements, student.loans);
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, creditScore: score.total } : s));
    return score.total;
  }, [students]);

  const addBlockchainTx = useCallback((tx: BlockchainTransaction) => {
    setBlockchainTransactions(prev => [tx, ...prev]);
  }, []);

  const addNotification = useCallback((userId: string, message: string) => {
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
  }, []);

  const clearNotifications = useCallback((userId: string) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser, students, endorsers, lenders, blockchainTransactions, insurancePool, notifications,
      login, register, logout, connectProvider, getStudentById, addEndorsement, withdrawEndorsement,
      fundLoan, makeRepayment, addBlockchainTx, updateStudentScore, getEndorsementsForStudent,
      getEndorsementsForEndorser, getLoansForStudent, getLoansForLender, hasActiveLoan,
      addNotification, clearNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
