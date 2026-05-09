import type {
  Student, Endorser, Lender, Transaction, Endorsement, Loan,
  BlockchainTransaction, InsurancePool, Repayment
} from './types';

const generateHash = (): string => {
  const chars = '0123456789abcdef';
  return Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * 16)]).join('');
};

const generateWallet = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateSignature = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 88 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const WALLET_GERMANY = generateWallet();
export const WALLET_CHANDA = generateWallet();
export const WALLET_MUTALE = generateWallet();
export const WALLET_CEPHAS = generateWallet();
export const WALLET_LUKUNDO = generateWallet();
export const WALLET_AFRILEND = generateWallet();

// ===== AIRTEL MONEY TRANSACTIONS =====
export const airtelTransactions: Transaction[] = [
  { id: 'TXN-AM-8847291', provider: 'airtel', description: 'School fee — Cavendish University', amount: 2500, date: '2026-04-28', type: 'School Fee', solanaHash: generateHash(), blockNumber: 289401234, slot: 289401234, verified: true },
  { id: 'TXN-AM-8712044', provider: 'airtel', description: 'School fee — Cavendish University', amount: 2500, date: '2026-01-15', type: 'School Fee', solanaHash: generateHash(), blockNumber: 287201234, slot: 287201234, verified: true },
  { id: 'TXN-AM-8201938', provider: 'airtel', description: 'School fee — Cavendish University', amount: 2500, date: '2025-10-03', type: 'School Fee', solanaHash: generateHash(), blockNumber: 285001234, slot: 285001234, verified: true },
  { id: 'TXN-AM-8901234', provider: 'airtel', description: 'ZESCO prepaid electricity', amount: 450, date: '2026-04-30', type: 'Utility', solanaHash: generateHash(), blockNumber: 289501234, slot: 289501234, verified: true },
  { id: 'TXN-AM-8823901', provider: 'airtel', description: 'ZESCO prepaid electricity', amount: 380, date: '2026-03-28', type: 'Utility', solanaHash: generateHash(), blockNumber: 288801234, slot: 288801234, verified: true },
  { id: 'TXN-AM-8756123', provider: 'airtel', description: 'ZESCO prepaid electricity', amount: 420, date: '2026-02-25', type: 'Utility', solanaHash: generateHash(), blockNumber: 288001234, slot: 288001234, verified: true },
  { id: 'TXN-AM-8634512', provider: 'airtel', description: 'ZESCO prepaid electricity', amount: 390, date: '2026-01-29', type: 'Utility', solanaHash: generateHash(), blockNumber: 287401234, slot: 287401234, verified: true },
  { id: 'TXN-AM-8512378', provider: 'airtel', description: 'DStv subscription', amount: 320, date: '2026-04-02', type: 'Subscription', solanaHash: generateHash(), blockNumber: 288901234, slot: 288901234, verified: true },
  { id: 'TXN-AM-8489012', provider: 'airtel', description: 'DStv subscription', amount: 320, date: '2026-03-02', type: 'Subscription', solanaHash: generateHash(), blockNumber: 288201234, slot: 288201234, verified: true },
  { id: 'TXN-AM-8934561', provider: 'airtel', description: 'Shoprite Zambia — groceries', amount: 780, date: '2026-05-01', type: 'Purchase', solanaHash: generateHash(), blockNumber: 289601234, slot: 289601234, verified: true },
  { id: 'TXN-AM-8867234', provider: 'airtel', description: 'Shoprite Zambia — groceries', amount: 650, date: '2026-04-15', type: 'Purchase', solanaHash: generateHash(), blockNumber: 289201234, slot: 289201234, verified: true },
  { id: 'TXN-AM-8798456', provider: 'airtel', description: 'Game Stores Zambia', amount: 1200, date: '2026-03-20', type: 'Purchase', solanaHash: generateHash(), blockNumber: 288601234, slot: 288601234, verified: true },
  { id: 'TXN-AM-8734123', provider: 'airtel', description: 'Shoprite Zambia — groceries', amount: 590, date: '2026-03-05', type: 'Purchase', solanaHash: generateHash(), blockNumber: 288301234, slot: 288301234, verified: true },
  { id: 'TXN-AM-8698345', provider: 'airtel', description: 'Pick n Pay Cairo Road', amount: 430, date: '2026-02-18', type: 'Purchase', solanaHash: generateHash(), blockNumber: 287801234, slot: 287801234, verified: true },
  { id: 'TXN-AM-8956781', provider: 'airtel', description: 'Airtel data bundle 10GB', amount: 150, date: '2026-05-02', type: 'Airtime', solanaHash: generateHash(), blockNumber: 289701234, slot: 289701234, verified: true },
  { id: 'TXN-AM-8912345', provider: 'airtel', description: 'Airtel airtime top-up', amount: 50, date: '2026-04-22', type: 'Airtime', solanaHash: generateHash(), blockNumber: 289301234, slot: 289301234, verified: true },
  { id: 'TXN-AM-8878901', provider: 'airtel', description: 'Airtel data bundle 10GB', amount: 150, date: '2026-04-05', type: 'Airtime', solanaHash: generateHash(), blockNumber: 289001234, slot: 289001234, verified: true },
  { id: 'TXN-AM-8845678', provider: 'airtel', description: 'Airtel airtime top-up', amount: 100, date: '2026-03-14', type: 'Airtime', solanaHash: generateHash(), blockNumber: 288501234, slot: 288501234, verified: true },
  { id: 'TXN-AM-8812345', provider: 'airtel', description: 'Airtel data bundle 10GB', amount: 150, date: '2026-03-01', type: 'Airtime', solanaHash: generateHash(), blockNumber: 288101234, slot: 288101234, verified: true },
  { id: 'TXN-AM-8923456', provider: 'airtel', description: 'Received from Mwale C.', amount: 500, date: '2026-04-18', type: 'Received', solanaHash: generateHash(), blockNumber: 289251234, slot: 289251234, verified: true },
  { id: 'TXN-AM-8889012', provider: 'airtel', description: 'Received from Banda M.', amount: 1000, date: '2026-04-01', type: 'Received', solanaHash: generateHash(), blockNumber: 288851234, slot: 288851234, verified: true },
  { id: 'TXN-AM-8756789', provider: 'airtel', description: 'Received from Zulu C. (Dr.)', amount: 200, date: '2026-02-10', type: 'Received', solanaHash: generateHash(), blockNumber: 287601234, slot: 287601234, verified: true },
  { id: 'TXN-AM-8901567', provider: 'airtel', description: 'Sent to Tembo L.', amount: 300, date: '2026-04-25', type: 'Sent', solanaHash: generateHash(), blockNumber: 289351234, slot: 289351234, verified: true },
  { id: 'TXN-AM-8834890', provider: 'airtel', description: 'Sent to Phiri J.', amount: 150, date: '2026-03-22', type: 'Sent', solanaHash: generateHash(), blockNumber: 288651234, slot: 288651234, verified: true },
  { id: 'TXN-AM-8723456', provider: 'airtel', description: 'Sent to Mwale C.', amount: 200, date: '2026-02-08', type: 'Sent', solanaHash: generateHash(), blockNumber: 287551234, slot: 287551234, verified: true },
  { id: 'TXN-AM-8945678', provider: 'airtel', description: 'Ulendo ride — Lusaka CBD', amount: 85, date: '2026-05-01', type: 'Transport', solanaHash: generateHash(), blockNumber: 289611234, slot: 289611234, verified: true },
  { id: 'TXN-AM-8878234', provider: 'airtel', description: 'Ulendo ride — Levy Mall', amount: 70, date: '2026-04-12', type: 'Transport', solanaHash: generateHash(), blockNumber: 289151234, slot: 289151234, verified: true },
  { id: 'TXN-AM-8823567', provider: 'airtel', description: 'Ulendo ride — Woodlands', amount: 95, date: '2026-03-28', type: 'Transport', solanaHash: generateHash(), blockNumber: 288811234, slot: 288811234, verified: true },
  { id: 'TXN-AM-8967890', provider: 'airtel', description: 'Hungry Lion — Arcades', amount: 180, date: '2026-05-03', type: 'Food', solanaHash: generateHash(), blockNumber: 289801234, slot: 289801234, verified: true },
  { id: 'TXN-AM-8845901', provider: 'airtel', description: 'KFC Zambia — Manda Hill', amount: 220, date: '2026-04-08', type: 'Food', solanaHash: generateHash(), blockNumber: 289051234, slot: 289051234, verified: true },
  { id: 'TXN-AM-8789234', provider: 'airtel', description: "Nando's Zambia", amount: 310, date: '2026-03-15', type: 'Food', solanaHash: generateHash(), blockNumber: 288551234, slot: 288551234, verified: true },
];

// ===== MTN MOMO TRANSACTIONS =====
export const mtnTransactions: Transaction[] = [
  { id: 'MMP-ZM-20260430-001', provider: 'mtn', description: 'School fee installment — Cavendish', amount: 1250, date: '2026-04-30', type: 'School Fee', solanaHash: generateHash(), blockNumber: 289501334, slot: 289501334, verified: true },
  { id: 'MMP-ZM-20260415-002', provider: 'mtn', description: 'Lusaka Water and Sewerage', amount: 280, date: '2026-04-15', type: 'Utility', solanaHash: generateHash(), blockNumber: 289201334, slot: 289201334, verified: true },
  { id: 'MMP-ZM-20260410-003', provider: 'mtn', description: 'Received salary — Part-time tutoring', amount: 2000, date: '2026-04-10', type: 'Received', solanaHash: generateHash(), blockNumber: 289101334, slot: 289101334, verified: true },
  { id: 'MMP-ZM-20260405-004', provider: 'mtn', description: 'MTN data bundle 15GB', amount: 175, date: '2026-04-05', type: 'Airtime', solanaHash: generateHash(), blockNumber: 289001334, slot: 289001334, verified: true },
  { id: 'MMP-ZM-20260401-005', provider: 'mtn', description: 'Sent to Banda M.', amount: 400, date: '2026-04-01', type: 'Sent', solanaHash: generateHash(), blockNumber: 288901334, slot: 288901334, verified: true },
  { id: 'MMP-ZM-20260328-006', provider: 'mtn', description: 'Shoprite Zambia', amount: 520, date: '2026-03-28', type: 'Purchase', solanaHash: generateHash(), blockNumber: 288801334, slot: 288801334, verified: true },
  { id: 'MMP-ZM-20260322-007', provider: 'mtn', description: 'Loan repayment — CreditChain', amount: 350, date: '2026-03-22', type: 'Repayment', solanaHash: generateHash(), blockNumber: 288701334, slot: 288701334, verified: true },
  { id: 'MMP-ZM-20260315-008', provider: 'mtn', description: 'MTN airtime', amount: 75, date: '2026-03-15', type: 'Airtime', solanaHash: generateHash(), blockNumber: 288551334, slot: 288551334, verified: true },
  { id: 'MMP-ZM-20260310-009', provider: 'mtn', description: 'Received from Zulu C. (Dr.)', amount: 500, date: '2026-03-10', type: 'Received', solanaHash: generateHash(), blockNumber: 288451334, slot: 288451334, verified: true },
  { id: 'MMP-ZM-20260305-010', provider: 'mtn', description: 'ZESCO electricity', amount: 360, date: '2026-03-05', type: 'Utility', solanaHash: generateHash(), blockNumber: 288301334, slot: 288301334, verified: true },
  { id: 'MMP-ZM-20260228-011', provider: 'mtn', description: 'Ulendo ride share', amount: 65, date: '2026-02-28', type: 'Transport', solanaHash: generateHash(), blockNumber: 288101334, slot: 288101334, verified: true },
  { id: 'MMP-ZM-20260222-012', provider: 'mtn', description: 'School fee installment — Cavendish', amount: 1250, date: '2026-02-22', type: 'School Fee', solanaHash: generateHash(), blockNumber: 287901334, slot: 287901334, verified: true },
  { id: 'MMP-ZM-20260215-013', provider: 'mtn', description: 'Sent to Tembo L.', amount: 250, date: '2026-02-15', type: 'Sent', solanaHash: generateHash(), blockNumber: 287751334, slot: 287751334, verified: true },
  { id: 'MMP-ZM-20260210-014', provider: 'mtn', description: 'Pick n Pay Manda Hill', amount: 475, date: '2026-02-10', type: 'Purchase', solanaHash: generateHash(), blockNumber: 287601334, slot: 287601334, verified: true },
  { id: 'MMP-ZM-20260205-015', provider: 'mtn', description: 'MTN data bundle 10GB', amount: 150, date: '2026-02-05', type: 'Airtime', solanaHash: generateHash(), blockNumber: 287401334, slot: 287401334, verified: true },
  { id: 'MMP-ZM-20260131-016', provider: 'mtn', description: 'Loan repayment — CreditChain', amount: 350, date: '2026-01-31', type: 'Repayment', solanaHash: generateHash(), blockNumber: 287301334, slot: 287301334, verified: true },
  { id: 'MMP-ZM-20260120-017', provider: 'mtn', description: 'Received — freelance work', amount: 1500, date: '2026-01-20', type: 'Received', solanaHash: generateHash(), blockNumber: 287101334, slot: 287101334, verified: true },
  { id: 'MMP-ZM-20260115-018', provider: 'mtn', description: 'DStv subscription', amount: 320, date: '2026-01-15', type: 'Subscription', solanaHash: generateHash(), blockNumber: 286951334, slot: 286951334, verified: true },
];

// ===== ZANACO TRANSACTIONS =====
export const zanacoTransactions: Transaction[] = [
  { id: 'ZNC-TXN-20260425-001', provider: 'zanaco', description: 'School fee payment — Cavendish University', amount: 2500, date: '2026-04-25', type: 'School Fee', solanaHash: generateHash(), blockNumber: 289351434, slot: 289351434, verified: true },
  { id: 'ZNC-TXN-20260420-002', provider: 'zanaco', description: 'Salary credit — part-time research assistant', amount: 3500, date: '2026-04-20', type: 'Received', solanaHash: generateHash(), blockNumber: 289251434, slot: 289251434, verified: true },
  { id: 'ZNC-TXN-20260415-003', provider: 'zanaco', description: 'ZESCO electricity token', amount: 500, date: '2026-04-15', type: 'Utility', solanaHash: generateHash(), blockNumber: 289201434, slot: 289201434, verified: true },
  { id: 'ZNC-TXN-20260410-004', provider: 'zanaco', description: 'ATM withdrawal — Levy Junction', amount: 800, date: '2026-04-10', type: 'Withdrawal', solanaHash: generateHash(), blockNumber: 289101434, slot: 289101434, verified: true },
  { id: 'ZNC-TXN-20260405-005', provider: 'zanaco', description: 'Debit card — Shoprite Arcades', amount: 620, date: '2026-04-05', type: 'Purchase', solanaHash: generateHash(), blockNumber: 289001434, slot: 289001434, verified: true },
  { id: 'ZNC-TXN-20260401-006', provider: 'zanaco', description: 'CreditChain loan repayment', amount: 350, date: '2026-04-01', type: 'Repayment', solanaHash: generateHash(), blockNumber: 288901434, slot: 288901434, verified: true },
  { id: 'ZNC-TXN-20260325-007', provider: 'zanaco', description: 'School fee payment — Cavendish University', amount: 2500, date: '2026-03-25', type: 'School Fee', solanaHash: generateHash(), blockNumber: 288751434, slot: 288751434, verified: true },
  { id: 'ZNC-TXN-20260320-008', provider: 'zanaco', description: 'Salary credit — part-time research assistant', amount: 3500, date: '2026-03-20', type: 'Received', solanaHash: generateHash(), blockNumber: 288651434, slot: 288651434, verified: true },
  { id: 'ZNC-TXN-20260315-009', provider: 'zanaco', description: 'Lusaka Water and Sewerage Board', amount: 180, date: '2026-03-15', type: 'Utility', solanaHash: generateHash(), blockNumber: 288551434, slot: 288551434, verified: true },
  { id: 'ZNC-TXN-20260310-010', provider: 'zanaco', description: 'Debit card — Game Stores Manda Hill', amount: 1450, date: '2026-03-10', type: 'Purchase', solanaHash: generateHash(), blockNumber: 288451434, slot: 288451434, verified: true },
  { id: 'ZNC-TXN-20260305-011', provider: 'zanaco', description: 'Transfer to Tembo L.', amount: 500, date: '2026-03-05', type: 'Sent', solanaHash: generateHash(), blockNumber: 288301434, slot: 288301434, verified: true },
  { id: 'ZNC-TXN-20260301-012', provider: 'zanaco', description: 'CreditChain loan repayment', amount: 350, date: '2026-03-01', type: 'Repayment', solanaHash: generateHash(), blockNumber: 288201434, slot: 288201434, verified: true },
  { id: 'ZNC-TXN-20260225-013', provider: 'zanaco', description: 'School fee payment — Cavendish University', amount: 2500, date: '2026-02-25', type: 'School Fee', solanaHash: generateHash(), blockNumber: 288001434, slot: 288001434, verified: true },
  { id: 'ZNC-TXN-20260220-014', provider: 'zanaco', description: 'Salary credit — part-time research assistant', amount: 3500, date: '2026-02-20', type: 'Received', solanaHash: generateHash(), blockNumber: 287901434, slot: 287901434, verified: true },
  { id: 'ZNC-TXN-20260215-015', provider: 'zanaco', description: 'ZESCO electricity token', amount: 430, date: '2026-02-15', type: 'Utility', solanaHash: generateHash(), blockNumber: 287751434, slot: 287751434, verified: true },
  { id: 'ZNC-TXN-20260210-016', provider: 'zanaco', description: 'ATM withdrawal — Manda Hill', amount: 600, date: '2026-02-10', type: 'Withdrawal', solanaHash: generateHash(), blockNumber: 287601434, slot: 287601434, verified: true },
  { id: 'ZNC-TXN-20260205-017', provider: 'zanaco', description: 'Debit card — Pick n Pay', amount: 390, date: '2026-02-05', type: 'Purchase', solanaHash: generateHash(), blockNumber: 287401434, slot: 287401434, verified: true },
  { id: 'ZNC-TXN-20260131-018', provider: 'zanaco', description: 'Transfer received from Banda M.', amount: 1000, date: '2026-01-31', type: 'Received', solanaHash: generateHash(), blockNumber: 287301434, slot: 287301434, verified: true },
  { id: 'ZNC-TXN-20260125-019', provider: 'zanaco', description: 'School fee payment — Cavendish University', amount: 2500, date: '2026-01-25', type: 'School Fee', solanaHash: generateHash(), blockNumber: 287151434, slot: 287151434, verified: true },
  { id: 'ZNC-TXN-20260120-020', provider: 'zanaco', description: 'Salary credit — part-time research assistant', amount: 3500, date: '2026-01-20', type: 'Received', solanaHash: generateHash(), blockNumber: 287101434, slot: 287101434, verified: true },
  { id: 'ZNC-TXN-20260115-021', provider: 'zanaco', description: 'Debit card — Hungry Lion Cairo Road', amount: 175, date: '2026-01-15', type: 'Food', solanaHash: generateHash(), blockNumber: 286951434, slot: 286951434, verified: true },
  { id: 'ZNC-TXN-20260110-022', provider: 'zanaco', description: 'Insurance premium — ZSIC Life', amount: 280, date: '2026-01-10', type: 'Subscription', solanaHash: generateHash(), blockNumber: 286851434, slot: 286851434, verified: true },
];

// ===== FNB ZAMBIA TRANSACTIONS =====
export const fnbTransactions: Transaction[] = [
  { id: 'FNB-ZM-20260428-001', provider: 'fnb', description: 'Freelance payment received — web design', amount: 4200, date: '2026-04-28', type: 'Received', solanaHash: generateHash(), blockNumber: 289401534, slot: 289401534, verified: true },
  { id: 'FNB-ZM-20260422-002', provider: 'fnb', description: 'Debit order — DStv Premium', amount: 320, date: '2026-04-22', type: 'Subscription', solanaHash: generateHash(), blockNumber: 289301534, slot: 289301534, verified: true },
  { id: 'FNB-ZM-20260418-003', provider: 'fnb', description: 'POS purchase — Nakumatt Woodlands', amount: 540, date: '2026-04-18', type: 'Purchase', solanaHash: generateHash(), blockNumber: 289251534, slot: 289251534, verified: true },
  { id: 'FNB-ZM-20260412-004', provider: 'fnb', description: 'Online transfer — school library fee', amount: 150, date: '2026-04-12', type: 'School Fee', solanaHash: generateHash(), blockNumber: 289151534, slot: 289151534, verified: true },
  { id: 'FNB-ZM-20260406-005', provider: 'fnb', description: 'ATM cash — FNB Levy Branch', amount: 700, date: '2026-04-06', type: 'Withdrawal', solanaHash: generateHash(), blockNumber: 289001534, slot: 289001534, verified: true },
  { id: 'FNB-ZM-20260328-006', provider: 'fnb', description: 'Freelance payment received — tutoring', amount: 2800, date: '2026-03-28', type: 'Received', solanaHash: generateHash(), blockNumber: 288801534, slot: 288801534, verified: true },
  { id: 'FNB-ZM-20260322-007', provider: 'fnb', description: 'Debit order — DStv Premium', amount: 320, date: '2026-03-22', type: 'Subscription', solanaHash: generateHash(), blockNumber: 288701534, slot: 288701534, verified: true },
  { id: 'FNB-ZM-20260316-008', provider: 'fnb', description: 'POS purchase — Shoprite East Park Mall', amount: 680, date: '2026-03-16', type: 'Purchase', solanaHash: generateHash(), blockNumber: 288551534, slot: 288551534, verified: true },
  { id: 'FNB-ZM-20260310-009', provider: 'fnb', description: 'ZESCO prepaid electricity', amount: 450, date: '2026-03-10', type: 'Utility', solanaHash: generateHash(), blockNumber: 288451534, slot: 288451534, verified: true },
  { id: 'FNB-ZM-20260304-010', provider: 'fnb', description: 'Online transfer — sent to Phiri J.', amount: 300, date: '2026-03-04', type: 'Sent', solanaHash: generateHash(), blockNumber: 288251534, slot: 288251534, verified: true },
  { id: 'FNB-ZM-20260228-011', provider: 'fnb', description: 'Freelance payment received — design project', amount: 3600, date: '2026-02-28', type: 'Received', solanaHash: generateHash(), blockNumber: 288101534, slot: 288101534, verified: true },
  { id: 'FNB-ZM-20260222-012', provider: 'fnb', description: 'Debit order — DStv Premium', amount: 320, date: '2026-02-22', type: 'Subscription', solanaHash: generateHash(), blockNumber: 287901534, slot: 287901534, verified: true },
  { id: 'FNB-ZM-20260216-013', provider: 'fnb', description: 'POS purchase — KFC Manda Hill', amount: 230, date: '2026-02-16', type: 'Food', solanaHash: generateHash(), blockNumber: 287801534, slot: 287801534, verified: true },
  { id: 'FNB-ZM-20260210-014', provider: 'fnb', description: 'Lusaka Water and Sewerage', amount: 220, date: '2026-02-10', type: 'Utility', solanaHash: generateHash(), blockNumber: 287601534, slot: 287601534, verified: true },
  { id: 'FNB-ZM-20260204-015', provider: 'fnb', description: 'ATM cash — FNB Arcades Branch', amount: 500, date: '2026-02-04', type: 'Withdrawal', solanaHash: generateHash(), blockNumber: 287401534, slot: 287401534, verified: true },
  { id: 'FNB-ZM-20260128-016', provider: 'fnb', description: 'Freelance payment received — consultancy', amount: 5000, date: '2026-01-28', type: 'Received', solanaHash: generateHash(), blockNumber: 287251534, slot: 287251534, verified: true },
  { id: 'FNB-ZM-20260122-017', provider: 'fnb', description: 'Online transfer — sent to Mwale C.', amount: 400, date: '2026-01-22', type: 'Sent', solanaHash: generateHash(), blockNumber: 287101534, slot: 287101534, verified: true },
];

// ===== STANBIC ZAMBIA TRANSACTIONS =====
export const stanbicTransactions: Transaction[] = [
  { id: 'STB-ZM-20260426-001', provider: 'stanbic', description: 'Salary credit — campus bookshop assistant', amount: 2200, date: '2026-04-26', type: 'Received', solanaHash: generateHash(), blockNumber: 289371634, slot: 289371634, verified: true },
  { id: 'STB-ZM-20260420-002', provider: 'stanbic', description: 'Standing order — student accommodation', amount: 1800, date: '2026-04-20', type: 'Utility', solanaHash: generateHash(), blockNumber: 289251634, slot: 289251634, verified: true },
  { id: 'STB-ZM-20260414-003', provider: 'stanbic', description: 'Debit card — Shoprite Kafue Road', amount: 480, date: '2026-04-14', type: 'Purchase', solanaHash: generateHash(), blockNumber: 289181634, slot: 289181634, verified: true },
  { id: 'STB-ZM-20260408-004', provider: 'stanbic', description: 'ATM withdrawal — Stanbic Cairo Road', amount: 600, date: '2026-04-08', type: 'Withdrawal', solanaHash: generateHash(), blockNumber: 289051634, slot: 289051634, verified: true },
  { id: 'STB-ZM-20260402-005', provider: 'stanbic', description: 'Online transfer — school fee top-up', amount: 1200, date: '2026-04-02', type: 'School Fee', solanaHash: generateHash(), blockNumber: 288901634, slot: 288901634, verified: true },
  { id: 'STB-ZM-20260326-006', provider: 'stanbic', description: 'Salary credit — campus bookshop assistant', amount: 2200, date: '2026-03-26', type: 'Received', solanaHash: generateHash(), blockNumber: 288771634, slot: 288771634, verified: true },
  { id: 'STB-ZM-20260320-007', provider: 'stanbic', description: 'Standing order — student accommodation', amount: 1800, date: '2026-03-20', type: 'Utility', solanaHash: generateHash(), blockNumber: 288651634, slot: 288651634, verified: true },
  { id: 'STB-ZM-20260314-008', provider: 'stanbic', description: "Debit card — Nando's Zambia Arcades", amount: 310, date: '2026-03-14', type: 'Food', solanaHash: generateHash(), blockNumber: 288531634, slot: 288531634, verified: true },
  { id: 'STB-ZM-20260308-009', provider: 'stanbic', description: 'ZESCO electricity token', amount: 360, date: '2026-03-08', type: 'Utility', solanaHash: generateHash(), blockNumber: 288411634, slot: 288411634, verified: true },
  { id: 'STB-ZM-20260226-010', provider: 'stanbic', description: 'Salary credit — campus bookshop assistant', amount: 2200, date: '2026-02-26', type: 'Received', solanaHash: generateHash(), blockNumber: 288051634, slot: 288051634, verified: true },
  { id: 'STB-ZM-20260220-011', provider: 'stanbic', description: 'Standing order — student accommodation', amount: 1800, date: '2026-02-20', type: 'Utility', solanaHash: generateHash(), blockNumber: 287901634, slot: 287901634, verified: true },
  { id: 'STB-ZM-20260214-012', provider: 'stanbic', description: 'Online transfer — sent to Banda M.', amount: 350, date: '2026-02-14', type: 'Sent', solanaHash: generateHash(), blockNumber: 287801634, slot: 287801634, verified: true },
  { id: 'STB-ZM-20260208-013', provider: 'stanbic', description: 'Debit card — Game Stores Zambia', amount: 920, date: '2026-02-08', type: 'Purchase', solanaHash: generateHash(), blockNumber: 287571634, slot: 287571634, verified: true },
  { id: 'STB-ZM-20260126-014', provider: 'stanbic', description: 'Salary credit — campus bookshop assistant', amount: 2200, date: '2026-01-26', type: 'Received', solanaHash: generateHash(), blockNumber: 287201634, slot: 287201634, verified: true },
];

// ===== ENDORSEMENTS =====
export const seedEndorsements: Endorsement[] = [
  {
    id: 'end-001',
    endorserId: 'endorser-cephas',
    endorserName: 'Dr. Cephas Zulu',
    endorserTitle: 'Senior Lecturer',
    studentId: 'student-germany',
    studentName: 'Germany Phiri',
    studentWallet: WALLET_GERMANY,
    amountSOL: 0.5,
    status: 'locked',
    date: '2026-03-15',
    solanaSignature: generateSignature(),
    isRealTransaction: false,
  },
  {
    id: 'end-002',
    endorserId: 'endorser-cephas',
    endorserName: 'Dr. Cephas Zulu',
    endorserTitle: 'Senior Lecturer',
    studentId: 'student-mutale',
    studentName: 'Mutale Banda',
    studentWallet: WALLET_MUTALE,
    amountSOL: 1.0,
    status: 'withdrawable',
    date: '2026-02-20',
    solanaSignature: generateSignature(),
    isRealTransaction: false,
  },
  {
    id: 'end-003',
    endorserId: 'endorser-lukundo',
    endorserName: 'Lukundo Tembo',
    endorserTitle: 'Employer',
    studentId: 'student-chanda',
    studentName: 'Chanda Mwale',
    studentWallet: WALLET_CHANDA,
    amountSOL: 0.25,
    status: 'withdrawable',
    date: '2026-04-01',
    solanaSignature: generateSignature(),
    isRealTransaction: false,
  },
];

// ===== LOANS =====
const germanyRepayments: Repayment[] = [
  { id: 'rep-001', loanId: 'loan-001', amountUSD: 27.5, date: '2026-03-01', solanaSignature: generateSignature(), month: 1 },
  { id: 'rep-002', loanId: 'loan-001', amountUSD: 27.5, date: '2026-04-01', solanaSignature: generateSignature(), month: 2 },
];

export const seedLoans: Loan[] = [
  {
    id: 'loan-001',
    studentId: 'student-germany',
    studentName: 'Germany Phiri',
    studentWallet: WALLET_GERMANY,
    lenderId: 'lender-afrilend',
    lenderName: 'AfriLend Capital',
    amountUSD: 150,
    interestRate: 10,
    termMonths: 6,
    monthlyPayment: 27.5,
    paidMonths: 2,
    status: 'active',
    startDate: '2026-02-01',
    solanaSignature: generateSignature(),
    isRealTransaction: false,
    repayments: germanyRepayments,
  },
];

// ===== BLOCKCHAIN TRANSACTIONS =====
export const seedBlockchainTransactions: BlockchainTransaction[] = [
  {
    id: 'bc-001',
    type: 'endorsement',
    description: 'Dr. Cephas Zulu endorsed Germany Phiri — 0.5 SOL staked',
    solanaSignature: seedEndorsements[0].solanaSignature,
    isReal: false,
    walletFrom: WALLET_CEPHAS,
    walletTo: WALLET_GERMANY,
    amount: '0.5 SOL',
    timestamp: '2026-03-15T14:30:00Z',
    slot: 288551234,
    blockNumber: 288551234,
    status: 'confirmed',
  },
  {
    id: 'bc-002',
    type: 'endorsement',
    description: 'Dr. Cephas Zulu endorsed Mutale Banda — 1.0 SOL staked',
    solanaSignature: seedEndorsements[1].solanaSignature,
    isReal: false,
    walletFrom: WALLET_CEPHAS,
    walletTo: WALLET_MUTALE,
    amount: '1.0 SOL',
    timestamp: '2026-02-20T10:15:00Z',
    slot: 287901234,
    blockNumber: 287901234,
    status: 'confirmed',
  },
  {
    id: 'bc-003',
    type: 'endorsement',
    description: 'Lukundo Tembo endorsed Chanda Mwale — 0.25 SOL staked',
    solanaSignature: seedEndorsements[2].solanaSignature,
    isReal: false,
    walletFrom: WALLET_LUKUNDO,
    walletTo: WALLET_CHANDA,
    amount: '0.25 SOL',
    timestamp: '2026-04-01T09:45:00Z',
    slot: 288901234,
    blockNumber: 288901234,
    status: 'confirmed',
  },
  {
    id: 'bc-004',
    type: 'loan_disbursement',
    description: 'AfriLend Capital funded $150 loan to Germany Phiri',
    solanaSignature: seedLoans[0].solanaSignature,
    isReal: false,
    walletFrom: WALLET_AFRILEND,
    walletTo: WALLET_GERMANY,
    amount: '$150.00',
    timestamp: '2026-02-01T11:00:00Z',
    slot: 287301234,
    blockNumber: 287301234,
    status: 'confirmed',
  },
  {
    id: 'bc-005',
    type: 'repayment',
    description: 'Germany Phiri — loan repayment $27.50 (month 1 of 6)',
    solanaSignature: germanyRepayments[0].solanaSignature,
    isReal: false,
    walletFrom: WALLET_GERMANY,
    walletTo: WALLET_AFRILEND,
    amount: '$27.50',
    timestamp: '2026-03-01T08:30:00Z',
    slot: 288201234,
    blockNumber: 288201234,
    status: 'confirmed',
  },
  {
    id: 'bc-006',
    type: 'repayment',
    description: 'Germany Phiri — loan repayment $27.50 (month 2 of 6)',
    solanaSignature: germanyRepayments[1].solanaSignature,
    isReal: false,
    walletFrom: WALLET_GERMANY,
    walletTo: WALLET_AFRILEND,
    amount: '$27.50',
    timestamp: '2026-04-01T09:00:00Z',
    slot: 288901234,
    blockNumber: 288901234,
    status: 'confirmed',
  },
];

// ===== INSURANCE POOL =====
export const seedInsurancePool: InsurancePool = {
  totalBalance: 0.15,
  contributions: [],
};

export { generateHash, generateWallet, generateSignature };
