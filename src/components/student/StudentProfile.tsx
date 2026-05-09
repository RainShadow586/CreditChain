import React, { useState } from 'react';
import type { Student } from '@/lib/types';
import { GraduationCap, MapPin, BookOpen, Hash, Save } from 'lucide-react';

export function StudentProfile({ student }: { student: Student }) {
  const [name, setName] = useState(student.name);
  const [program, setProgram] = useState(student.program);
  const [city, setCity] = useState(student.city);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl fade-in">
      <div className="bg-card rounded-xl border border-secondary/30 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-3 flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">University</p>
              <p className="text-sm font-medium">{student.university}</p>
            </div>
          </div>
          <div className="bg-background rounded-lg p-3 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">City</p>
              <p className="text-sm font-medium">{student.city}</p>
            </div>
          </div>
          <div className="bg-background rounded-lg p-3 flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Program</p>
              <p className="text-sm font-medium">{student.program}</p>
            </div>
          </div>
          <div className="bg-background rounded-lg p-3 flex items-center gap-3">
            <Hash className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Student ID</p>
              <p className="text-sm font-mono">{student.studentId}</p>
            </div>
          </div>
        </div>

        {/* Edit Fields */}
        <div className="border-t border-secondary/30 pt-6 space-y-4">
          <h3 className="font-semibold text-sm">Edit Profile</h3>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Program</label>
              <input
                type="text"
                value={program}
                onChange={e => setProgram(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">City</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Wallet */}
        <div className="border-t border-secondary/30 pt-6">
          <h3 className="font-semibold text-sm mb-3">Wallet Address</h3>
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs font-mono break-all text-muted-foreground">{student.walletAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
