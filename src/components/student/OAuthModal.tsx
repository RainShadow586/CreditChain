import React, { useState } from 'react';
import type { ProviderName } from '@/lib/types';
import { X, Phone, Building2, Shield, Eye, User, Check } from 'lucide-react';

interface OAuthModalProps {
  provider: ProviderName;
  onComplete: () => void;
  onCancel: () => void;
}

const providerConfigs: Record<ProviderName, {
  label: string; color: string; accentBg: string;
  phonePrefix: string[]; placeholder: string;
  fields: { label: string; placeholder: string }[];
  consentBg: string; consentText: string; consentBtnLabel: string; consentBtnColor: string;
  permissions: string[];
  warning: string;
  loadingSteps: string[];
  successMsg: string; txCount: number;
}> = {
  airtel: {
    label: 'Airtel Money', color: '#FF6600', accentBg: '#E40000',
    phonePrefix: ['097', '096', '095', '077', '076'],
    placeholder: '097XXXXXXX or 077XXXXXXX',
    fields: [{ label: 'Airtel phone number', placeholder: '097XXXXXXX or 077XXXXXXX' }],
    consentBg: '#1A1953', consentText: '#E40000', consentBtnLabel: 'Authorise Access', consentBtnColor: '#E40000',
    permissions: ['View account balance', 'View transaction history (read only)', 'View phone number and account details'],
    warning: 'CreditChain cannot move money or make payments on your behalf',
    loadingSteps: ['Authenticating with Airtel Africa servers...', 'Fetching 6 months of transaction history...', 'Verifying transactions on Solana Devnet...'],
    successMsg: 'Airtel Money connected', txCount: 31,
  },
  mtn: {
    label: 'MTN Mobile Money', color: '#FFCC00', accentBg: '#FFCC00',
    phonePrefix: ['096', '095', '076', '075'],
    placeholder: '096XXXXXXX or 076XXXXXXX',
    fields: [{ label: 'MTN phone number', placeholder: '096XXXXXXX or 076XXXXXXX' }],
    consentBg: '#FFCC00', consentText: '#1a1a1a', consentBtnLabel: 'Allow Access', consentBtnColor: '#FFCC00',
    permissions: ['View account balance', 'View transaction history (read only)', 'View registered name and details'],
    warning: 'CreditChain cannot move money or make payments on your behalf',
    loadingSteps: ['Connecting to MTN MoMo API...', 'Retrieving transaction records...', 'Writing verification hashes to Solana Devnet...'],
    successMsg: 'MTN MoMo connected', txCount: 18,
  },
  zanaco: {
    label: 'Zanaco', color: '#003087', accentBg: '#003087',
    phonePrefix: [],
    placeholder: '1234567890123',
    fields: [
      { label: 'Zanaco account number', placeholder: '1234567890123' },
      { label: 'National ID or NRC number', placeholder: '123456/78/1' },
    ],
    consentBg: '#ffffff', consentText: '#003087', consentBtnLabel: 'Authorise', consentBtnColor: '#003087',
    permissions: ['View account balance', 'View transaction and statement history (read only)', 'View account holder name and details'],
    warning: 'CreditChain cannot make payments or transfers on your behalf',
    loadingSteps: ['Authenticating with Zanaco Open Banking...', 'Fetching 6 months of account statement history...', 'Hashing and verifying transactions on Solana Devnet...'],
    successMsg: 'Zanaco connected', txCount: 22,
  },
  fnb: {
    label: 'FNB Zambia', color: '#006341', accentBg: '#006341',
    phonePrefix: [],
    placeholder: '62XXXXXXXXX',
    fields: [
      { label: 'FNB account number', placeholder: '62XXXXXXXXX' },
      { label: 'FNB Online Banking username', placeholder: 'Your FNB username' },
    ],
    consentBg: '#ffffff', consentText: '#006341', consentBtnLabel: 'Allow Access', consentBtnColor: '#006341',
    permissions: ['View account balance and details', 'View transaction history and bank statements (read only)', 'View registered name and account information'],
    warning: 'CreditChain cannot initiate payments, transfers, or any account changes',
    loadingSteps: ['Connecting to FNB Zambia secure banking API...', 'Retrieving transaction and statement records...', 'Writing verification proofs to Solana Devnet...'],
    successMsg: 'FNB Zambia connected', txCount: 17,
  },
  stanbic: {
    label: 'Stanbic Bank Zambia', color: '#0033A0', accentBg: '#0033A0',
    phonePrefix: [],
    placeholder: '9040XXXXXXXXX',
    fields: [
      { label: 'Stanbic account number', placeholder: '9040XXXXXXXXX' },
      { label: 'ID number or passport', placeholder: 'Your national ID or passport number' },
    ],
    consentBg: '#ffffff', consentText: '#0033A0', consentBtnLabel: 'Connect Account', consentBtnColor: '#0033A0',
    permissions: ['View account balance', 'View transaction history and statements (read only)', 'View account holder details'],
    warning: 'CreditChain has no ability to move funds or change your account settings',
    loadingSteps: ['Authenticating with Stanbic Zambia banking API...', 'Importing account statement history...', 'Anchoring transaction hashes to Solana Devnet...'],
    successMsg: 'Stanbic Bank Zambia connected', txCount: 14,
  },
};

export function OAuthModal({ provider, onComplete, onCancel }: OAuthModalProps) {
  const [step, setStep] = useState<'input' | 'consent' | 'loading' | 'success'>('input');
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const config = providerConfigs[provider];
  const isMobile = provider === 'airtel' || provider === 'mtn';
  const isBank = !isMobile;

  const handleInputSubmit = () => {
    setStep('consent');
  };

  const handleConsent = () => {
    setStep('loading');
    setLoadingProgress(0);

    // Simulate 3-step loading
    const steps = config.loadingSteps;
    setLoadingText(steps[0]);

    setTimeout(() => {
      setLoadingProgress(33);
      setLoadingText(steps[1]);
    }, 1000);

    setTimeout(() => {
      setLoadingProgress(66);
      setLoadingText(steps[2]);
    }, 2000);

    setTimeout(() => {
      setLoadingProgress(100);
      setStep('success');
    }, 3000);
  };

  const handleDone = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(8, 6, 22, 0.85)' }}>
      <div className="w-full max-w-md rounded-xl overflow-hidden animate-scale-in" style={{ backgroundColor: step === 'consent' && isBank ? config.consentBg : '#1A1953' }}>
        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Connect {config.label}</h3>
              <button onClick={onCancel} className="p-1 rounded hover:bg-secondary/30">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              {config.fields.map((field, i) => (
                <div key={i}>
                  <label className="text-sm text-muted-foreground mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    value={fieldValues[i] || ''}
                    onChange={e => {
                      const vals = [...fieldValues];
                      vals[i] = e.target.value;
                      setFieldValues(vals);
                    }}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                {isBank ? 'We will request read-only access to your account statement history' : 'We will request read-only access to your transaction history'}
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg bg-secondary text-sm font-medium">Cancel</button>
              <button onClick={handleInputSubmit} className="flex-1 py-2.5 rounded-lg bg-primary text-sm font-medium">Continue</button>
            </div>
          </div>
        )}

        {/* Step 2: Consent */}
        {step === 'consent' && (
          <div className="p-6" style={isBank ? { color: '#333' } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: config.color + '20' }}>
                {isMobile ? <Phone className="w-5 h-5" style={{ color: config.color }} /> : <Building2 className="w-5 h-5" style={{ color: config.color }} />}
              </div>
              <h3 className="text-lg font-semibold" style={isBank ? { color: config.consentText } : {}}>{config.label}</h3>
            </div>
            <p className="text-sm mb-4" style={isBank ? { color: '#555' } : { color: '#A0AEC0' }}>
              CreditChain is requesting permission to access your {config.label} account
            </p>
            <div className="space-y-3 mb-4">
              {config.permissions.map((perm, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: isBank ? config.consentText + '15' : '#2F2FE420' }}>
                    {i === 0 ? <Eye className="w-3 h-3" style={{ color: isBank ? config.consentText : '#2F2FE4' }} /> :
                     i === 1 ? <Shield className="w-3 h-3" style={{ color: isBank ? config.consentText : '#2F2FE4' }} /> :
                     <User className="w-3 h-3" style={{ color: isBank ? config.consentText : '#2F2FE4' }} />}
                  </div>
                  <span className="text-sm" style={isBank ? { color: '#333' } : {}}>{perm}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg mb-6" style={{ backgroundColor: isBank ? '#f5f5f5' : '#162E93' }}>
              <p className="text-xs" style={isBank ? { color: '#666' } : { color: '#A0AEC0' }}>
                {config.warning}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg text-sm font-medium" style={{ backgroundColor: isBank ? '#e5e5e5' : '#162E93', color: isBank ? '#333' : 'white' }}>
                {provider === 'stanbic' ? 'Deny' : provider === 'zanaco' ? 'Decline' : 'Cancel'}
              </button>
              <button onClick={handleConsent} className="flex-1 py-2.5 rounded-lg text-sm font-medium" style={{
                backgroundColor: config.consentBtnColor,
                color: provider === 'mtn' ? '#1a1a1a' : 'white'
              }}>
                {config.consentBtnLabel}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loading */}
        {step === 'loading' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-6">Connecting {config.label}</h3>
            <div className="mb-4">
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000 ease-in-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">{loadingText}</p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-score-excellent/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-score-excellent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{config.successMsg}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {config.txCount} transactions imported and verified on-chain
            </p>
            <button onClick={handleDone} className="w-full py-2.5 rounded-lg bg-primary text-sm font-medium">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
