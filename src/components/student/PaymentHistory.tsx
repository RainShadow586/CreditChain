import React, { useState } from 'react';
import type { Student, ProviderName, Transaction } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { ProviderBadge, TypeBadge, VerifiedBadge } from '@/components/ProviderBadge';
import { OAuthModal } from '@/components/student/OAuthModal';
import { Phone, Building2, Check, RefreshCw, ChevronDown, Search, Filter } from 'lucide-react';

interface ProviderInfo {
  name: ProviderName;
  label: string;
  sublabel: string;
  color: string;
  icon: 'phone' | 'bank';
  category: 'mobile' | 'bank';
}

const providers: ProviderInfo[] = [
  { name: 'airtel', label: 'Airtel Money Zambia', sublabel: 'Automatically import Airtel Money transactions', color: '#FF6600', icon: 'phone', category: 'mobile' },
  { name: 'mtn', label: 'MTN Mobile Money', sublabel: 'Automatically import MTN MoMo transactions', color: '#FFCC00', icon: 'phone', category: 'mobile' },
  { name: 'zanaco', label: 'Zanaco', sublabel: 'Zambia National Commercial Bank — import bank statements', color: '#003087', icon: 'bank', category: 'bank' },
  { name: 'fnb', label: 'FNB Zambia', sublabel: 'First National Bank Zambia — import bank statements', color: '#006341', icon: 'bank', category: 'bank' },
  { name: 'stanbic', label: 'Stanbic Bank Zambia', sublabel: 'Import bank account transaction history', color: '#0033A0', icon: 'bank', category: 'bank' },
];

export function PaymentHistory({ student }: { student: Student }) {
  const { connectProvider } = useApp();
  const [oauthProvider, setOauthProvider] = useState<ProviderName | null>(null);
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  const isConnected = (p: ProviderName) => student.connectedProviders.some(c => c.provider === p);

  const handleConnect = (provider: ProviderName) => {
    if (isConnected(provider)) return;
    setOauthProvider(provider);
  };

  const handleOAuthComplete = () => {
    if (oauthProvider) {
      connectProvider(student.id, oauthProvider);
    }
    setOauthProvider(null);
  };

  let transactions = [...student.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (filterProvider !== 'all') {
    transactions = transactions.filter(t => t.provider === filterProvider);
  }
  if (filterType !== 'all') {
    transactions = transactions.filter(t => t.type === filterType);
  }
  if (searchTerm) {
    transactions = transactions.filter(t =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const types = [...new Set(student.transactions.map(t => t.type))].sort();
  const totalIn = student.transactions.filter(t => t.type === 'Received').reduce((s, t) => s + t.amount, 0);
  const totalOut = student.transactions.filter(t => t.type !== 'Received').reduce((s, t) => s + t.amount, 0);

  const mobileProviders = providers.filter(p => p.category === 'mobile');
  const bankProviders = providers.filter(p => p.category === 'bank');

  return (
    <div className="space-y-6 fade-in">
      {/* Connected Accounts */}
      <div className="bg-card rounded-xl border border-secondary/30 p-6">
        <h3 className="text-lg font-semibold mb-1">Connected financial accounts</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Connect your mobile money and bank accounts to automatically import and verify your transactions on-chain
        </p>

        {/* Mobile Money */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Mobile Money</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {mobileProviders.map(p => {
            const connected = isConnected(p.name);
            return (
              <button
                key={p.name}
                onClick={() => handleConnect(p.name)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  connected ? 'border-score-excellent/30 bg-score-excellent/5' : 'border-secondary/30 hover:border-primary/40 bg-background'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: p.color + '20' }}>
                  <Phone className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.sublabel}</p>
                </div>
                {connected ? (
                  <span className="text-xs font-medium text-score-excellent flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Live sync
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Not connected</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bank Accounts */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Bank Accounts</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {bankProviders.map(p => {
            const connected = isConnected(p.name);
            return (
              <button
                key={p.name}
                onClick={() => handleConnect(p.name)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  connected ? 'border-score-excellent/30 bg-score-excellent/5' : 'border-secondary/30 hover:border-primary/40 bg-background'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: p.color + '20' }}>
                  <Building2 className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.sublabel}</p>
                </div>
                {connected ? (
                  <span className="text-xs font-medium text-score-excellent flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Live sync
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Not connected</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transaction Table */}
      {student.transactions.length > 0 && (
        <div className="bg-card rounded-xl border border-secondary/30 overflow-hidden">
          {/* Summary */}
          <div className="p-4 border-b border-secondary/30 flex flex-wrap gap-4 text-sm">
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{student.transactions.length}</span> transactions
            </span>
            <span className="text-muted-foreground">
              Total received: <span className="font-medium text-score-excellent">ZMW {totalIn.toLocaleString()}</span>
            </span>
            <span className="text-muted-foreground">
              Total spent: <span className="font-medium text-foreground">ZMW {totalOut.toLocaleString()}</span>
            </span>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-secondary/30 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterProvider}
              onChange={e => setFilterProvider(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Providers</option>
              <option value="airtel">Airtel Money</option>
              <option value="mtn">MTN MoMo</option>
              <option value="zanaco">Zanaco</option>
              <option value="fnb">FNB Zambia</option>
              <option value="stanbic">Stanbic Bank</option>
            </select>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/30 text-xs text-muted-foreground">
                  <th className="text-left p-3 font-medium">Provider</th>
                  <th className="text-left p-3 font-medium">Transaction ID</th>
                  <th className="text-left p-3 font-medium">Description</th>
                  <th className="text-right p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <React.Fragment key={tx.id}>
                    <tr
                      onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}
                      className="border-b border-secondary/20 hover:bg-secondary/20 cursor-pointer transition-colors"
                    >
                      <td className="p-3"><ProviderBadge provider={tx.provider} /></td>
                      <td className="p-3 font-mono text-xs text-muted-foreground max-w-[120px] truncate">{tx.id}</td>
                      <td className="p-3 text-sm">{tx.description}</td>
                      <td className={`p-3 text-sm text-right font-medium ${tx.type === 'Received' ? 'text-score-excellent' : ''}`}>
                        {tx.type === 'Received' ? '+' : ''}ZMW {tx.amount.toLocaleString()}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-3"><TypeBadge type={tx.type} /></td>
                      <td className="p-3"><VerifiedBadge hash={tx.solanaHash} /></td>
                    </tr>
                    {expandedRow === tx.id && (
                      <tr className="bg-background">
                        <td colSpan={7} className="p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="text-muted-foreground mb-1">Solana Transaction Hash</p>
                              <p className="font-mono break-all">{tx.solanaHash}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Block Number</p>
                              <p className="font-mono">{tx.blockNumber.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Slot</p>
                              <p className="font-mono">{tx.slot.toLocaleString()}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Entry Fallback */}
      <div className="bg-card rounded-xl border border-secondary/30">
        <button
          onClick={() => setShowManual(!showManual)}
          className="w-full flex items-center justify-between p-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Don't have mobile money or a supported bank account? Add a payment record manually.</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showManual ? 'rotate-180' : ''}`} />
        </button>
        {showManual && (
          <div className="p-4 pt-0 border-t border-secondary/30 mt-0 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm">
                <option>School Fee</option>
                <option>Mobile Money</option>
                <option>Mobile Banking</option>
              </select>
              <input type="number" placeholder="Amount (ZMW)" className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm" />
              <input type="date" className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Reference Number" className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm" />
              <select className="px-3 py-2 rounded-lg bg-background border border-secondary text-sm">
                <option>Airtel Money</option>
                <option>MTN MoMo</option>
                <option>Zanaco</option>
                <option>FNB Zambia</option>
                <option>Stanbic Bank</option>
              </select>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-sm font-medium">Submit</button>
          </div>
        )}
      </div>

      {/* OAuth Modal */}
      {oauthProvider && (
        <OAuthModal
          provider={oauthProvider}
          onComplete={handleOAuthComplete}
          onCancel={() => setOauthProvider(null)}
        />
      )}
    </div>
  );
}
