import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import logo from '@/assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, students, endorsers, lenders } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (!user) {
      setError('Account not found. Check your email or register a new account.');
      return;
    }
    if (user.role === 'student') navigate('/student');
    else if (user.role === 'endorser') navigate('/endorser');
    else navigate('/lender');
  };

  const allUsers = [...students, ...endorsers, ...lenders];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="CreditChain" className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold">CreditChain</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your CreditChain account</p>
        </div>

        <div className="bg-card rounded-xl border border-secondary/30 p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Register</Link>
          </p>

          {/* Quick login hints for demo */}
          <div className="mt-6 pt-4 border-t border-secondary/30">
            <p className="text-xs text-muted-foreground mb-3">Quick demo access — click to fill:</p>
            <div className="space-y-1.5">
              {allUsers.map(u => (
                <button
                  key={u.id}
                  onClick={() => { setEmail(u.email); setPassword('demo'); }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-background hover:bg-secondary/30 text-xs transition-colors flex items-center justify-between"
                >
                  <span>{u.name}</span>
                  <span className="text-muted-foreground capitalize">{u.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
