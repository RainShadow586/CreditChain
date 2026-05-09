import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { Header } from '@/components/Header';
import type { Endorser } from '@/lib/types';
import { Search, ClipboardList, BarChart3 } from 'lucide-react';
import { EndorserSearch } from '@/components/endorser/EndorserSearch';
import { MyEndorsements } from '@/components/endorser/MyEndorsements';
import { EndorserImpact } from '@/components/endorser/EndorserImpact';

const tabs = [
  { id: 'search', label: 'Search Students', icon: Search },
  { id: 'endorsements', label: 'My Endorsements', icon: ClipboardList },
  { id: 'impact', label: 'Impact', icon: BarChart3 },
];

export default function EndorserDashboard() {
  const { currentUser, endorsers } = useApp();
  const [activeTab, setActiveTab] = useState('search');

  if (!currentUser || currentUser.role !== 'endorser') return <Navigate to="/login" />;

  const endorser = endorsers.find(e => e.id === currentUser.id) as Endorser;
  if (!endorser) return <Navigate to="/login" />;

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

        {activeTab === 'search' && <EndorserSearch endorser={endorser} />}
        {activeTab === 'endorsements' && <MyEndorsements endorser={endorser} />}
        {activeTab === 'impact' && <EndorserImpact endorser={endorser} />}
      </div>
    </div>
  );
}
