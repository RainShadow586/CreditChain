import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { GraduationCap, Users, Landmark } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [extra, setExtra] = useState<Record<string, string>>({});
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = register(name, email, password, role, extra);
    if (user.role === 'student') navigate('/student');
    else if (user.role === 'endorser') navigate('/endorser');
    else navigate('/lender');
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'endorser', label: 'Endorser', icon: Users },
    { value: 'lender', label: 'Lender', icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="CreditChain" className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold">CreditChain</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground">Join the decentralized credit ecosystem</p>
        </div>

        <div className="bg-card rounded-xl border border-secondary/30 p-6">
          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roleOptions.map(r => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                  role === r.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-secondary/30 text-muted-foreground hover:border-secondary'
                }`}
              >
                <r.icon className="w-5 h-5" />
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a password"
                required
              />
            </div>

            {role === 'student' && (
              <>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">University</label>
                  <input
                    type="text"
                    value={extra.university || ''}
                    onChange={e => setExtra(p => ({ ...p, university: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Cavendish University"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">City</label>
                    <input
                      type="text"
                      value={extra.city || ''}
                      onChange={e => setExtra(p => ({ ...p, city: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Lusaka"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Program</label>
                    <input
                      type="text"
                      value={extra.program || ''}
                      onChange={e => setExtra(p => ({ ...p, program: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Computer Science"
                    />
                  </div>
                </div>
              </>
            )}

            {role === 'endorser' && (
              <>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Title / Position</label>
                  <input
                    type="text"
                    value={extra.title || ''}
                    onChange={e => setExtra(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Senior Lecturer"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Organization</label>
                  <input
                    type="text"
                    value={extra.organization || ''}
                    onChange={e => setExtra(p => ({ ...p, organization: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Cavendish University"
                  />
                </div>
              </>
            )}

            {role === 'lender' && (
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Organization Name</label>
                <input
                  type="text"
                  value={extra.organization || ''}
                  onChange={e => setExtra(p => ({ ...p, organization: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. AfriLend Capital"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
