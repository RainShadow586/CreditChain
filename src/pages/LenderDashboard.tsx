import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { Header } from '@/components/Header';
import type { Lender } from '@/lib/types';
import { Users, ClipboardList, Banknote, Shield, BarChart3 } from 'lucide-react';
import { BrowseStudents } from '@/components/lender/BrowseStudents';
import { ActiveLoans } from '@/components/lender/ActiveLoans';
import { InsurancePoolView } from '@/components/lender/InsurancePoolView';
import { LenderAnalytics } from '@/components/lender/LenderAnalytics';

const tabs = [
  { id: 'browse', label: 'Browse Students', icon: Users },
  { id: 'active', label: 'Active Loans', icon: ClipboardList },
  { id: 'insurance', label: 'Insurance Pool', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function LenderDashboard() {
  const { currentUser, lenders } = useApp();
  const [activeTab, setActiveTab] = useState('browse');

  if (!currentUser || currentUser.role !== 'lender') return <Navigate to="/login" />;

  const lender = lenders.find(l => l.id === currentUser.id) as Lender;
  if (!lender) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 overflow-x-auto pb-4 mb-6 border-b border-secondary/30">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'browse' && <BrowseStudents lender={lender} />}
        {activeTab === 'active' && <ActiveLoans lender={lender} />}
        {activeTab === 'insurance' && <InsurancePoolView />}
        {activeTab === 'analytics' && <LenderAnalytics lender={lender} />}
      </div>
    </div>
  );
}
