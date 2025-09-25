import React, { useState, useEffect } from 'react';
import { AIIcon, SlidersIcon, BrainIcon, WandIcon, CloseIcon, ShieldCheckIcon, AnnotationIcon, GoogleIcon } from './Icons';

interface SettingsPageProps {
  onClose: () => void;
  safetyMode: boolean;
  setSafetyMode: (value: boolean) => void;
  verboseComments: boolean;
  setVerboseComments: (value: boolean) => void;
  useGoogleSearch: boolean;
  setUseGoogleSearch: (value: boolean) => void;
}

type SettingsCategory = 'agent' | 'gpt' | 'memory' | 'tailor';

const SETTINGS_CATEGORIES: { id: SettingsCategory; name:string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { id: 'agent', name: 'Agent Settings', icon: AIIcon },
  { id: 'gpt', name: 'GPT Settings', icon: SlidersIcon },
  { id: 'memory', name: 'Memory Settings', icon: BrainIcon },
  { id: 'tailor', name: 'Tailor-Agent Settings', icon: WandIcon },
];

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose, safetyMode, setSafetyMode, verboseComments, setVerboseComments, useGoogleSearch, setUseGoogleSearch }) => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('agent');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    switch (activeCategory) {
      case 'agent':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Agent Settings</h2>
            <p className="text-text-secondary mb-6">Configure agent-specific behaviors and instructions for this session.</p>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-dark-card rounded-lg border border-border-dark gap-4">
                    <div className='flex items-start sm:items-center space-x-4'>
                        <ShieldCheckIcon className="w-8 h-8 text-cyan-accent flex-shrink-0 mt-1 sm:mt-0" />
                        <div>
                            <h3 className="text-lg font-medium text-text-primary">Safety Mode</h3>
                            <p className="text-sm text-text-secondary">Instruct the agent to ask for confirmation before running potentially destructive commands.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-end sm:self-center">
                      <input type="checkbox" checked={safetyMode} onChange={(e) => setSafetyMode(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-border-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-accent"></div>
                    </label>
                </div>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-dark-card rounded-lg border border-border-dark gap-4">
                    <div className='flex items-start sm:items-center space-x-4'>
                         <AnnotationIcon className="w-8 h-8 text-cyan-accent flex-shrink-0 mt-1 sm:mt-0" />
                        <div>
                            <h3 className="text-lg font-medium text-text-primary">Verbose Comments</h3>
                            <p className="text-sm text-text-secondary">Force the agent to add extensive inline comments to generated scripts.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-end sm:self-center">
                      <input type="checkbox" checked={verboseComments} onChange={(e) => setVerboseComments(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-border-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-accent"></div>
                    </label>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-dark-card rounded-lg border border-border-dark gap-4">
                    <div className='flex items-start sm:items-center space-x-4'>
                        <GoogleIcon className="w-8 h-8 text-cyan-accent flex-shrink-0 mt-1 sm:mt-0" />
                        <div>
                            <h3 className="text-lg font-medium text-text-primary">Enable Google Search</h3>
                            <p className="text-sm text-text-secondary">Allow the agent to search the web for up-to-date information. (Recommended for recent topics)</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-end sm:self-center">
                      <input type="checkbox" checked={useGoogleSearch} onChange={(e) => setUseGoogleSearch(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-border-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-accent"></div>
                    </label>
                </div>
            </div>
          </div>
        );
      case 'gpt':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">GPT Settings</h2>
            <div className="space-y-8">
              <div>
                <label htmlFor="temperature" className="block text-lg font-medium text-text-primary mb-2">Temperature</label>
                <p className="text-sm text-text-secondary mb-3">Controls randomness. Lower values make the model more deterministic.</p>
                <div className="flex items-center space-x-4">
                    <input type="range" id="temperature" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full h-2 bg-border-dark rounded-lg appearance-none cursor-pointer accent-cyan-accent" />
                    <span className="font-mono text-lg text-text-primary bg-dark-card px-3 py-1 rounded-md border border-border-dark">0.7</span>
                </div>
              </div>
              <div>
                <label htmlFor="top-p" className="block text-lg font-medium text-text-primary mb-2">Top-P</label>
                <p className="text-sm text-text-secondary mb-3">Controls diversity via nucleus sampling. 0.9 means only tokens comprising the top 90% probability mass are considered.</p>
                <div className="flex items-center space-x-4">
                    <input type="range" id="top-p" min="0" max="1" step="0.1" defaultValue="0.9" className="w-full h-2 bg-border-dark rounded-lg appearance-none cursor-pointer accent-cyan-accent" />
                    <span className="font-mono text-lg text-text-primary bg-dark-card px-3 py-1 rounded-md border border-border-dark">0.9</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'memory':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Memory Settings</h2>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg border border-border-dark">
                    <div>
                        <h3 className="text-lg font-medium text-text-primary">Conversation History</h3>
                        <p className="text-sm text-text-secondary">Allow the agent to remember previous messages in this session.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-border-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-accent"></div>
                    </label>
                </div>
                 <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400">
                    Clear Session Memory
                 </button>
            </div>
          </div>
        );
      case 'tailor':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Tailor-Agent Settings</h2>
            <p className="text-text-secondary mb-4">Provide custom instructions to permanently alter the behavior of AgentBash for all future sessions. This will be combined with the agent's core system instructions.</p>
            <textarea
                placeholder="e.g., Always use Python for scripting if possible..."
                className="w-full h-64 p-4 bg-dark-card text-text-primary rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-accent font-mono border border-border-dark"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 bg-dark-card flex flex-col z-10 animate-fade-in-up">
      <header className="flex items-center justify-between p-4 bg-dark-card border-b border-border-dark flex-shrink-0">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <button
          onClick={onClose}
          className="p-2 text-text-secondary rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-accent"
          aria-label="Close settings"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <aside className="w-full md:w-64 bg-dark-bg p-4 border-b md:border-b-0 md:border-r border-border-dark flex-shrink-0">
          <nav className="flex flex-row md:flex-col md:space-y-2 gap-2 overflow-x-auto pb-2 md:pb-0">
            {SETTINGS_CATEGORIES.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors flex-shrink-0 md:flex-shrink-1 ${
                  activeCategory === id
                    ? 'bg-cyan-accent/10 text-cyan-accent'
                    : 'text-text-primary hover:bg-border-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{name}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-dark-card">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;