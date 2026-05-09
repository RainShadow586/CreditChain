import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useApp } from '@/lib/AppContext';
import { LogOut, Bell, Link as LinkIcon } from 'lucide-react';
import logo from '@/assets/logo.png';

export function Header() {
  const { currentUser, logout, notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cc-blue/40 bg-cc-black/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="CreditChain" className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold tracking-tight">CreditChain</span>
        </Link>

        <div className="flex items-center gap-3">
          {currentUser && (
            <>
              <Link
                to="/explorer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cc-blue/30 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Explorer
              </Link>
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card text-sm">
                <div className="w-2 h-2 rounded-full bg-score-excellent" />
                <span className="text-muted-foreground capitalize">{currentUser.role}:</span>
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <WalletMultiButton />
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-cc-blue/30 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
          {!currentUser && <WalletMultiButton />}
        </div>
      </div>
    </header>
  );
}
