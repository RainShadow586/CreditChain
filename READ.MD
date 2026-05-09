> A decentralized credit scoring system on Solana that builds verifiable financial identities for African students — aggregating school fee payments, mobile money history, and community endorsements into an on-chain credit profile that unlocks access to microloans.

---

## 🏆 Hackathon Submission

- *Track:* Solana
- *Event:* Dev3pack Hackathon
- *Team_Name:* Token Bandits
- *Team_Members:* Daniel Tembo, Jesse Minsula, Raymond Phiri, Jonathan Nyampandu
- *Demo Video:* [https://youtu.be/your-demo-link](#)
- *Live Demo:* [https://creditchain.vercel.app](#)

---

## 📌 Problem Statement

Millions of African students lack formal credit history, making it impossible to access loans — even small ones. Traditional banks require credit scores that don't exist for the unbanked. CreditChain solves this by building a transparent, tamper-proof credit profile on Solana using data students already have: school fee payment history, mobile money transactions, and community trust endorsements.

---

## ✨ Features

- *On-chain Credit Profile* — Each student wallet gets a Program Derived Address (PDA) storing their credit score and history
- *School Fee Verification* — Record and verify tuition payment history on-chain
- *Mobile Money Bridge* — Submit mobile money (Airtel/MTN) transaction proofs as credit evidence
- *Community Endorsements* — Peers, lecturers, or employers stake SOL to vouch for a student's creditworthiness
- *Microloan Gateway* — Students above a credit threshold can request microloans directly from the protocol
- *Score Dashboard* — Frontend UI showing score breakdown, endorsers, and loan history

---

## 🏗️ Architecture


creditchain/
├── programs/
│   └── creditchain/
│       └── src/
│           ├── lib.rs                  # Program entry point
│           ├── instructions/
│           │   ├── initialize.rs       # Create student credit profile PDA
│           │   ├── add_payment.rs      # Record school fee / mobile money payment
│           │   ├── endorse.rs          # Community endorsement with SOL stake
│           │   ├── request_loan.rs     # Request microloan based on score
│           │   └── repay_loan.rs       # Repay loan and update credit score
│           ├── state/
│           │   ├── credit_profile.rs   # CreditProfile account struct
│           │   └── loan.rs             # Loan account struct
│           └── errors.rs               # Custom program errors
├── app/
│   ├── components/
│   │   ├── ScoreDashboard.tsx
│   │   ├── EndorseForm.tsx
│   │   └── LoanRequest.tsx
│   ├── pages/
│   │   └── index.tsx
│   └── utils/
│       └── anchor.ts                   # Anchor client setup
├── tests/
│   └── creditchain.ts                  # Integration tests
├── Anchor.toml
├── Cargo.toml
└── README.md


---


## 🛠️ Local Setup & Development

### Prerequisites

Make sure you have the following installed:

bash
# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Solana CLI (v1.18+)
sh -c "$(curl -sSfL https://release.solana.com/v1.18.0/install)"

# Anchor CLI (v0.30+)
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Node.js (v18+) and yarn
npm install -g yarn


Verify installations:

bash
solana --version
anchor --version
node --version


---

### 1. Clone the Repository

bash
git clone https://github.com/YOUR_GITHUB_USERNAME/creditchain.git
cd creditchain


### 3. Configure Solana CLI for Devnet

bash
# Set cluster to devnet
solana config set --url https://api.devnet.solana.com

# Create a new wallet (or use existing)
solana-keygen new --outfile ~/.config/solana/id.json

# Airdrop SOL for testing
solana airdrop 2


---

### 4. Build the Anchor Program

bash
anchor build


After building, the program ID is generated. Update it in two places:

*programs/creditchain/src/lib.rs:*
rust
declare_id!("YOUR_PROGRAM_ID_HERE");


*Anchor.toml:*
toml
[programs.devnet]
creditchain = "YOUR_PROGRAM_ID_HERE"


---

### 5. Deploy to Devnet

bash
anchor deploy --provider.cluster devnet


Copy the deployed program ID and update your README and .env file.

---

### 6. Run Tests

bash
anchor test --provider.cluster devnet


---





## 📦 Key Dependencies

### On-chain (Rust)
| Package | Version | Purpose |
|---------|---------|---------|
| anchor-lang | 0.30.x | Solana program framework |
| anchor-spl | 0.30.x | SPL token support |

### Frontend (TypeScript)
| Package | Version | Purpose |
|---------|---------|---------|
| @coral-xyz/anchor | 0.30.x | Anchor client SDK |
| @solana/web3.js | 1.x | Solana web3 SDK |
| @solana/wallet-adapter-react | latest | Wallet connection |
| @solana/wallet-adapter-wallets | latest | Phantom, Backpack, etc. |
| next | 14.x | React framework |

---

## 🎮 How to Use (Demo Flow)

1. *Connect Wallet* — Connect Phantom or Backpack wallet (devnet)
2. *Initialize Profile* — Create your on-chain credit profile PDA
3. *Add Payment Records* — Submit school fee or mobile money payment history
4. *Get Endorsed* — Ask a peer or lecturer to endorse your wallet (they stake 0.1 SOL)
5. *View Score* — See your credit score breakdown on the dashboard
6. *Request Loan* — If score ≥ threshold, submit a microloan request
7. *Repay Loan* — Repay and watch your score increase

---


## 📹 Demo Video

Watch the 3-minute demo: **[https://youtu.be/your-demo-link](#)**

The video covers:
- Problem statement (30 sec)
- Live demo — wallet connect → score dashboard → endorsement → loan request (2 min)
- Architecture overview (30 sec)

---

## 🌍 Real-World Impact

CreditChain directly addresses financial exclusion for students in Zambia and across Africa:

- *4+ million* university students in sub-Saharan Africa lack formal credit access
- Mobile money penetration (Airtel Money, MTN Mobile Money) exceeds 60% in Zambia — CreditChain bridges this existing financial behaviour onto Solana
- Community endorsement model mirrors existing trust networks (chama groups, student unions) already used informally for lending

---

## 🔮 Roadmap

- [ ] Oracle integration for automated mobile money verification (Chainlink / Pyth)
- [ ] SPL token rewards for on-time loan repayments
- [ ] SMS/USSD interface for feature phone users
- [ ] Cross-institution credit portability
- [ ] DAO governance for loan pool parameters

---



---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Solana Foundation](https://solana.com) — infrastructure and developer resources
- [Coral Anchor](https://anchor-lang.com) — Solana program framework
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter) — wallet connection library

---

Built with ❤️ for African students, on Solana.