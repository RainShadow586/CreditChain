import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Landmark, ArrowRight, Shield, Wallet, BarChart3, LinkIcon } from 'lucide-react';
import logo from '@/assets/logo.png';

const stats = [
  { value: '57%', label: 'of Sub-Saharan African adults have no formal credit history' },
  { value: '$200B', label: 'student loan gap across the African continent' },
  { value: '350M+', label: 'mobile money accounts active in Africa' },
];

const steps = [
  { icon: Wallet, title: 'Connect Your Accounts', desc: 'Link your mobile money and bank accounts to automatically import verified transactions.' },
  { icon: Shield, title: 'Build Your Score', desc: 'Your payment history, endorsements, and financial activity create a verifiable on-chain credit profile.' },
  { icon: BarChart3, title: 'Access Microloans', desc: 'Lenders fund loans based on your transparent, blockchain-verified credit score.' },
];

const roles = [
  {
    icon: GraduationCap,
    title: "I'm a Student",
    desc: 'Build your credit profile, connect financial accounts, get endorsed, and access microloans.',
    link: '/register?role=student',
    color: '#2F2FE4',
  },
  {
    icon: Users,
    title: "I'm an Endorser",
    desc: 'Vouch for students you know by staking SOL. Help them build credit and access funding.',
    link: '/register?role=endorser',
    color: '#14B8A6',
  },
  {
    icon: Landmark,
    title: "I'm a Lender",
    desc: 'Browse verified student profiles. Fund microloans backed by on-chain credit scores.',
    link: '/register?role=lender',
    color: '#22C55E',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-secondary/40 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="CreditChain" className="h-9 w-9 rounded-lg" />
            <span className="text-lg font-bold tracking-tight">CreditChain</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
              Log In
            </Link>
            <Link to="/register" className="px-4 py-2 rounded-lg bg-primary text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-secondary/40 text-sm text-muted-foreground mb-6">
            <LinkIcon className="w-3.5 h-3.5 text-primary" />
            Built on Solana Devnet
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-6">
            Decentralized Credit Scoring for{' '}
            <span className="text-primary">African Students</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Build a verifiable credit profile using your school fee payments, mobile money history,
            and community endorsements. Access microloans backed by transparent, on-chain data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              to="/register?role=student"
              className="px-6 py-3 rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90 transition-all shadow-glow flex items-center justify-center gap-2"
            >
              Start Building Credit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-secondary text-sm font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center"
            >
              Sign In to Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-secondary/30">
                <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">How CreditChain Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Three simple steps to build your decentralized credit profile
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-secondary/30 relative">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="absolute top-6 right-6 text-4xl font-bold text-secondary/30">{i + 1}</span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Choose Your Role</h2>
          <p className="text-muted-foreground text-center mb-12">
            Join the CreditChain ecosystem as a student, endorser, or lender
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <Link
                key={i}
                to={role.link}
                className="group bg-card rounded-xl p-6 border border-secondary/30 hover:border-primary/60 transition-all hover:shadow-card-hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: role.color + '20' }}
                >
                  <role.icon className="w-6 h-6" style={{ color: role.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{role.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.desc}</p>
                <span className="text-sm text-primary font-medium flex items-center gap-1">
                  Get Started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary/20 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CreditChain" className="h-6 w-6 rounded" />
            <span className="text-sm text-muted-foreground">CreditChain — Decentralized Student Credit</span>
          </div>
          <div className="text-xs text-muted-foreground">Built on Solana Devnet</div>
        </div>
      </footer>
    </div>
  );
}
