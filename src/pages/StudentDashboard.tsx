import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { Header } from '@/components/Header';
import type { Student } from '@/lib/types';
import { LayoutDashboard, CreditCard, Users, Banknote, UserCircle } from 'lucide-react';
import { StudentOverview } from '@/components/student/StudentOverview';
import { PaymentHistory } from '@/components/student/PaymentHistory';
import { StudentEndorsements } from '@/components/student/StudentEndorsements';
import { StudentLoans } from '@/components/student/StudentLoans';
import { StudentProfile } from '@/components/student/StudentProfile';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'payments', label: 'Payment History', icon: CreditCard },
  { id: 'endorsements', label: 'Endorsements', icon: Users },
  { id: 'loans', label: 'Loans', icon: Banknote },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

export default function StudentDashboard() {
  const { currentUser, students } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser || currentUser.role !== 'student') return <Navigate to="/login" />;

  const student = students.find(s => s.id === currentUser.id) as Student;
  if (!student) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-4 mb-6 border-b border-secondary/30">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <StudentOverview student={student} />}
        {activeTab === 'payments' && <PaymentHistory student={student} />}
        {activeTab === 'endorsements' && <StudentEndorsements student={student} />}
        {activeTab === 'loans' && <StudentLoans student={student} />}
        {activeTab === 'profile' && <StudentProfile student={student} />}
      </div>
    </div>
  );
}
