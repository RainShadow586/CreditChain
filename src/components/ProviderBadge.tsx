import React from 'react';
import { Phone, Building2 } from 'lucide-react';
import type { ProviderName } from '@/lib/types';

const providerConfig: Record<ProviderName, { label: string; color: string; bg: string }> = {
  airtel: { label: 'Airtel', color: '#FF6600', bg: '#FF660020' },
  mtn: { label: 'MTN', color: '#FFCC00', bg: '#FFCC0020' },
  zanaco: { label: 'Zanaco', color: '#003087', bg: '#00308720' },
  fnb: { label: 'FNB', color: '#006341', bg: '#00634120' },
  stanbic: { label: 'Stanbic', color: '#0033A0', bg: '#0033A020' },
};

export function ProviderBadge({ provider, size = 'sm' }: { provider: ProviderName; size?: 'sm' | 'md' }) {
  const config = providerConfig[provider];
  const isMobile = provider === 'airtel' || provider === 'mtn';
  const Icon = isMobile ? Phone : Building2;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {config.label}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const typeColors: Record<string, { bg: string; text: string }> = {
    'School Fee': { bg: '#7C3AED20', text: '#A78BFA' },
    'Utility': { bg: '#2F2FE420', text: '#6366F1' },
    'Purchase': { bg: '#A0AEC020', text: '#A0AEC0' },
    'Airtime': { bg: '#F9731620', text: '#F97316' },
    'Received': { bg: '#22C55E20', text: '#22C55E' },
    'Sent': { bg: '#EF444420', text: '#EF4444' },
    'Repayment': { bg: '#14B8A620', text: '#14B8A6' },
    'Transport': { bg: '#F59E0B20', text: '#F59E0B' },
    'Food': { bg: '#F4735620', text: '#F47356' },
    'Subscription': { bg: '#6366F120', text: '#818CF8' },
    'Withdrawal': { bg: '#EAB30820', text: '#EAB308' },
  };

  const colors = typeColors[type] || { bg: '#A0AEC020', text: '#A0AEC0' };

  return (
    <span
      className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  );
}

export function VerifiedBadge({ hash }: { hash: string }) {
  return (
    <a
      href={`https://explorer.solana.com/tx/${hash}?cluster=devnet`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors cursor-pointer"
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      Verified on-chain
    </a>
  );
}
