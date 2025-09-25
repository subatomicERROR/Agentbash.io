import React, { useState, useEffect } from 'react';
import { OperatingSystem, User } from '../types';
import OperatingSystemSelector from './OperatingSystemSelector';
import { BashLogoIcon } from './Icons';

interface OperatingSystemSelectionPageProps {
  user: User;
  onSelect: (os: OperatingSystem) => void;
  onSignOut: () => void;
  onBackToHome: () => void;
}

const OperatingSystemSelectionPage: React.FC<OperatingSystemSelectionPageProps> = ({ user, onSelect, onSignOut, onBackToHome }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-text-primary">
      <header className="flex items-center justify-between p-4 bg-dark-card border-b border-border-dark flex-shrink-0">
        <div className="flex items-center space-x-4">
            <button onClick={onBackToHome} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-cyan-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span>Home</span>
            </button>
            <div className="flex items-center space-x-2">
                <BashLogoIcon className="w-7 h-7 text-cyan-accent" />
                <h1 className="text-xl font-bold">Agent<span className="text-cyan-accent">Bash</span></h1>
            </div>
        </div>
        <div className="relative">
            <button
                onClick={() => setIsUserMenuOpen(prev => !prev)}
                className="w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent"
                aria-label="User Menu"
            >
                <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
            </button>
            {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-dark-card border border-border-dark rounded-lg shadow-lg z-50 animate-pop-in">
                    <div className="p-4 border-b border-border-dark">
                        <p className="font-semibold text-text-primary truncate">{user.name}</p>
                        <p className="text-sm text-text-secondary truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                        <button
                            onClick={onSignOut}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in-up">
         <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-text-primary">Select Your <span className="text-cyan-accent">Target OS</span></h2>
            <p className="text-lg text-text-secondary">Choose the environment where your script will run.</p>
        </div>
        <OperatingSystemSelector onSelect={onSelect} />
      </main>
    </div>
  );
};

export default OperatingSystemSelectionPage;