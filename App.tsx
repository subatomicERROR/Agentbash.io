import React, { useState, useRef, useEffect } from 'react';
import { OperatingSystem, Agent, ProjectTemplate, SavedScript, SubscriptionStatus, User, ChatSession, ChatMessage } from './types';
import AgentSelector from './components/AgentSelector';
import ChatInterface from './components/ChatInterface';
import SettingsPage from './components/SettingsPage';
import { SettingsIcon, getAgentIcon, DownloadIcon, BookIcon, CloseIcon, TrashIcon, ClipboardIcon, CheckIcon, getOSIcon, CrownIcon, PlusIcon, BashLogoIcon, UserIcon, ChevronsLeftIcon, ChevronsRightIcon, MessageSquareIcon, SparklesIcon, ChevronRightIcon, ChevronDownIcon, EditIcon } from './components/Icons';
import TemplateSelector from './components/TemplateSelector';
import { TEMPLATES } from './data/projectTemplates';
import CodeBlock from './components/CodeBlock';
import PricingPage from './components/PricingPage';
import OperatingSystemSelectionPage from './components/OperatingSystemSelectionPage';
import OnboardingWizardPage from './components/OnboardingChatPage';
import UserProfilePage from './components/UserProfilePage';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import { Analytics } from '@vercel/analytics/react';


const ScriptBookPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [scripts, setScripts] = useState<SavedScript[]>([]);
  const [viewingScript, setViewingScript] = useState<SavedScript | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New state for sorting and filtering
  const [sortBy, setSortBy] = useState<'createdAt' | 'name'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterOS, setFilterOS] = useState<OperatingSystem | 'all'>('all');
  const [filterAgent, setFilterAgent] = useState<Agent | 'all'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      const savedScriptsRaw: any[] = JSON.parse(localStorage.getItem('agentbash_saved_scripts') || '[]');
      // Migration for old format (agent) to new format (agents)
      const migratedScripts: SavedScript[] = savedScriptsRaw.map(s => {
          if (s.agent && !s.agents) {
              const { agent, ...rest } = s;
              return { ...rest, agents: [agent] };
          }
          if (!s.agents) {
              return { ...s, agents: [] };
          }
          return s;
      });
      setScripts(migratedScripts);
    } catch (error) {
      console.error("Failed to load scripts from localStorage:", error);
      setScripts([]);
    }
  }, []);

  const handleDelete = (scriptId: string) => {
    if (window.confirm("Are you sure you want to delete this script? This action cannot be undone.")) {
      const updatedScripts = scripts.filter(s => s.id !== scriptId);
      setScripts(updatedScripts);
      localStorage.setItem('agentbash_saved_scripts', JSON.stringify(updatedScripts));
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    });
  };
  
  const uniqueAgents = Array.from(new Set(scripts.flatMap(s => s.agents)));

  const processedScripts = scripts
    .filter(script => {
      // Search filter
      const searchMatch =
        script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        script.agents.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
        script.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        script.os.toLowerCase().includes(searchTerm.toLowerCase());
      
      // OS filter
      const osMatch = filterOS === 'all' || script.os === filterOS;

      // Agent filter
      const agentMatch = filterAgent === 'all' || script.agents.includes(filterAgent);

      return searchMatch && osMatch && agentMatch;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else { // 'createdAt'
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateB - dateA; 
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

  const FilterDropdown: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
  }> = ({ label, value, onChange, options }) => (
    <div className="flex-1 min-w-[150px]">
        <label htmlFor={label} className="sr-only">{label}</label>
        <select
            id={label}
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-dark-bg text-text-primary border border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent text-sm"
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
  );

  return (
    <>
      <div className="absolute inset-0 bg-dark-bg flex flex-col z-10 animate-fade-in-up">
        <header className="flex items-center justify-between p-4 bg-dark-card border-b border-border-dark flex-shrink-0">
          <div className="flex items-center space-x-3">
            <BookIcon className="w-8 h-8 text-cyan-accent" />
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Script Book</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-accent"
            aria-label="Close Script Book"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-dark-bg">
          <div className="max-w-7xl mx-auto">
            {/* Toolbar */}
            <div className="bg-dark-card border border-border-dark rounded-lg p-4 mb-8 flex flex-col sm:flex-row flex-wrap items-center gap-4">
               <div className="w-full sm:flex-1 sm:min-w-[250px]">
                 <input
                    type="text"
                    placeholder="Search scripts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 bg-dark-bg text-text-primary border border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent text-sm"
                  />
               </div>
               <div className="w-full sm:w-auto flex flex-wrap gap-2">
                    <FilterDropdown
                        label="Filter by OS"
                        value={filterOS}
                        onChange={(e) => setFilterOS(e.target.value as OperatingSystem | 'all')}
                        options={[
                            { value: 'all', label: 'All Operating Systems' },
                            { value: OperatingSystem.Windows, label: 'Windows' },
                            { value: OperatingSystem.Linux, label: 'Linux' },
                        ]}
                    />
                     <FilterDropdown
                        label="Filter by Agent"
                        value={filterAgent}
                        onChange={(e) => setFilterAgent(e.target.value as Agent | 'all')}
                        options={[
                            { value: 'all', label: 'All Agents' },
                            ...uniqueAgents.map(agent => ({ value: agent, label: agent }))
                        ]}
                    />
                    <FilterDropdown
                        label="Sort by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'name')}
                        options={[
                            { value: 'createdAt', label: 'Sort by Date' },
                            { value: 'name', label: 'Sort by Name' },
                        ]}
                    />
                    <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="p-2 bg-dark-bg text-text-primary border border-border-dark rounded-md hover:border-cyan-accent/50 focus:outline-none focus:ring-2 focus:ring-cyan-accent">
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                    </button>
               </div>
            </div>

            {processedScripts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedScripts.map(script => {
                  const OSIcon = getOSIcon(script.os);
                  return (
                    <div key={script.id} className="bg-dark-card border border-border-dark rounded-lg p-4 flex flex-col justify-between animate-pop-in transition-all duration-300 hover:border-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/10">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-lg font-bold text-text-primary pr-2">{script.name}</h3>
                           <div className="flex items-center gap-2 flex-shrink-0">
                             <span title={script.os}>
                               <OSIcon className="w-5 h-5 text-text-secondary" />
                             </span>
                             {script.agents && script.agents.length > 0 && script.agents.map(agent => {
                               const AgentIcon = getAgentIcon(agent);
                               return (
                                 <span key={agent} title={agent}>
                                   <AgentIcon className="w-5 h-5 text-text-secondary" />
                                 </span>
                               )
                             })}
                           </div>
                        </div>
                        <p className="text-xs text-text-secondary mb-4">
                          Saved on {new Date(script.createdAt).toLocaleDateString()}
                        </p>
                        <pre className="bg-dark-bg rounded-md p-3 max-h-32 overflow-hidden relative">
                           <code className="text-sm font-mono text-text-secondary whitespace-pre-wrap break-words">{script.code}</code>
                           <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent"></div>
                        </pre>
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-4">
                         <button onClick={() => setViewingScript(script)} className="text-sm text-cyan-accent hover:underline">View Full Script</button>
                         <button onClick={() => handleCopy(script.code, script.id)} className="p-2 text-text-secondary rounded-md hover:bg-dark-bg hover:text-cyan-accent transition-colors" title="Copy script">
                             {copiedId === script.id ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardIcon className="w-4 h-4" />}
                         </button>
                         <button onClick={() => handleDelete(script.id)} className="p-2 text-text-secondary rounded-md hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Delete script">
                             <TrashIcon className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in-up">
                <BookIcon className="w-24 h-24 mx-auto text-border-dark mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">No Scripts Found</h3>
                <p className="text-text-secondary">
                  {searchTerm || filterOS !== 'all' || filterAgent !== 'all' 
                    ? "Try adjusting your search or filters." 
                    : "Generate a script and click the save icon to get started!"
                  }
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      {viewingScript && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up p-4" onClick={() => setViewingScript(null)}>
          <div className="bg-dark-card border border-border-dark rounded-lg max-w-4xl w-full h-full sm:max-h-[80vh] flex flex-col shadow-2xl shadow-cyan-accent/10" onClick={e => e.stopPropagation()}>
            <header className="flex items-center justify-between p-4 border-b border-border-dark">
                <h2 className="text-xl font-bold text-text-primary">{viewingScript.name}</h2>
                <button onClick={() => setViewingScript(null)} className="p-1 rounded-full text-text-secondary hover:bg-dark-bg hover:text-cyan-accent">
                    <CloseIcon className="w-5 h-5" />
                </button>
            </header>
            <div className="p-4 overflow-y-auto bg-dark-bg">
                <CodeBlock language={viewingScript.language} code={viewingScript.code} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TrialExpiredPage: React.FC<{ onSubscribeClick: () => void }> = ({ onSubscribeClick }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-dark-bg text-center p-8">
    <CrownIcon className="w-24 h-24 text-yellow-400 mb-6" />
    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">Your Free Trial Has Ended</h1>
    <p className="text-md md:text-lg text-text-secondary mb-8 max-w-xl mx-auto">
      Thanks for trying AgentBash! To continue creating scripts, analyzing projects, and using all our advanced agents, please subscribe.
    </p>
    <button
      onClick={onSubscribeClick}
      className="bg-cyan-accent text-dark-bg font-bold px-8 py-4 rounded-lg text-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105"
    >
      View Subscription Plans
    </button>
  </div>
);

// Simple JWT decoder for Google Sign-In
const decodeJwt = (token: string): any => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Error decoding JWT", e);
        return null;
    }
};

const Sidebar: React.FC<{
    user: User;
    isOpen: boolean;
    sessions: ChatSession[];
    currentSessionId: string | null;
    onNewChat: () => void;
    onSelectChat: (id: string) => void;
    onDeleteChat: (id: string) => void;
    onRenameChat: (id: string, newTitle: string) => void;
    onShowSettings: () => void;
    onShowScriptBook: () => void;
    onShowPricing: () => void;
    onBackToDashboard: () => void;
    onSignOut: () => void;
    subscriptionStatus: SubscriptionStatus;
    trialEndDate: number | null;
}> = ({
    user, isOpen, sessions, currentSessionId, onNewChat, onSelectChat, onDeleteChat, onRenameChat,
    onShowSettings, onShowScriptBook, onShowPricing, onBackToDashboard, onSignOut,
    subscriptionStatus, trialEndDate
}) => {
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');

    const handleRenameSubmit = () => {
        if (renamingId && renameValue.trim()) {
            onRenameChat(renamingId, renameValue.trim());
        }
        setRenamingId(null);
        setRenameValue('');
    };

    const getDaysRemaining = () => {
        if (!trialEndDate) return 0;
        const remaining = Math.ceil((trialEndDate - Date.now()) / (1000 * 60 * 60 * 24));
        return remaining > 0 ? remaining : 0;
    };
    
    return (
        <div className={`
            ${isOpen ? 'w-72' : 'w-0'}
            bg-dark-card border-r border-border-dark flex-shrink-0 flex flex-col
            transition-all duration-300 ease-in-out overflow-hidden
        `}>
            <div className="p-4 border-b border-border-dark flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <BashLogoIcon className="w-7 h-7 text-cyan-accent" />
                    <h1 className="text-xl font-bold">Agent<span className="text-cyan-accent">Bash</span></h1>
                </div>
            </div>

            <div className="p-2 flex-shrink-0">
                 <button onClick={onNewChat} className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-text-primary bg-dark-bg border border-border-dark rounded-md hover:bg-border-dark hover:border-cyan-accent/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Chat
                </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-2">
                <p className="px-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">History</p>
                <div className="space-y-1">
                    {sessions.map(session => (
                         renamingId === session.id ? (
                            <div key={session.id} className="flex items-center p-2 rounded-md bg-dark-bg border border-cyan-accent ring-2 ring-cyan-accent/50 space-x-2">
                                <MessageSquareIcon className="w-4 h-4 flex-shrink-0 text-cyan-accent" />
                                <input
                                    type="text"
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleRenameSubmit();
                                        if (e.key === 'Escape') setRenamingId(null);
                                    }}
                                    onBlur={handleRenameSubmit}
                                    className="flex-1 bg-transparent text-sm font-medium text-cyan-accent focus:outline-none"
                                    autoFocus
                                />
                                <button onClick={handleRenameSubmit} className="p-1 text-text-secondary hover:text-green-400" title="Save">
                                    <CheckIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => setRenamingId(null)} className="p-1 text-text-secondary hover:text-red-400" title="Cancel">
                                    <CloseIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                key={session.id}
                                onClick={() => onSelectChat(session.id)}
                                className={`group w-full flex items-center justify-between text-left p-2 rounded-md transition-colors ${
                                    currentSessionId === session.id ? 'bg-cyan-accent/10 text-cyan-accent' : 'text-text-primary hover:bg-border-dark'
                                }`}
                            >
                               <div className="flex items-center space-x-2 overflow-hidden">
                                 <MessageSquareIcon className="w-4 h-4 flex-shrink-0" />
                                 <span className="text-sm font-medium truncate">{session.title}</span>
                               </div>
                               <div className="flex items-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRenamingId(session.id);
                                            setRenameValue(session.title);
                                        }}
                                        className="p-1 text-text-secondary hover:text-cyan-accent"
                                        title="Rename Chat"
                                    >
                                        <EditIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {e.stopPropagation(); onDeleteChat(session.id)}}
                                        className="p-1 text-text-secondary hover:text-red-400"
                                        title="Delete Chat"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                               </div>
                            </button>
                        )
                    ))}
                </div>
            </nav>

            <div className="p-2 border-t border-border-dark flex-shrink-0 space-y-1">
                 {subscriptionStatus === 'trial' && (
                    <div className="flex items-center space-x-2 px-3 py-2 text-xs font-bold text-yellow-400 bg-yellow-400/10 rounded-md border border-yellow-400/20">
                        <CrownIcon className="w-4 h-4" />
                        <span>{getDaysRemaining()} {getDaysRemaining() === 1 ? 'Day' : 'Days'} Left</span>
                        <button onClick={onShowPricing} className="ml-auto font-bold hover:underline">Subscribe</button>
                    </div>
                 )}
                 <button onClick={onShowScriptBook} className="w-full text-left flex items-center p-2 rounded-md text-text-primary hover:bg-border-dark transition-colors text-sm font-medium"><BookIcon className="w-4 h-4 mr-3" />Script Book</button>
                 <button onClick={onShowSettings} className="w-full text-left flex items-center p-2 rounded-md text-text-primary hover:bg-border-dark transition-colors text-sm font-medium"><SettingsIcon className="w-4 h-4 mr-3" />Settings</button>
                 <button onClick={onBackToDashboard} className="w-full text-left flex items-center p-2 rounded-md text-text-primary hover:bg-border-dark transition-colors text-sm font-medium"><UserIcon className="w-4 h-4 mr-3" />Back to Dashboard</button>
            </div>

            <div className="p-2 border-t border-border-dark flex-shrink-0">
                <div className="group relative">
                    <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-border-dark">
                        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                        </div>
                    </div>
                     <button onClick={onSignOut} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-xs text-red-400 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-all">Sign Out</button>
                </div>
            </div>
        </div>
    );
}

const PaymentSuccessPage: React.FC<{ onContinue: () => void }> = ({ onContinue }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-bg text-center p-8 animate-fade-in-up">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/30 animate-pop-in">
            <SparklesIcon className="w-12 h-12 text-green-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Welcome to Pro!</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
           Your subscription is now active. You have unlocked all professional features and agents. Enjoy building!
        </p>
        <button 
            onClick={onContinue} 
            className="group flex items-center justify-center mx-auto bg-cyan-accent text-dark-bg font-bold px-8 py-4 rounded-lg text-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105 shadow-lg shadow-cyan-accent/20"
        >
            Go to Dashboard
            <ChevronRightIcon className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    </div>
);


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [os, setOs] = useState<OperatingSystem | null>(null);
  const [showOnboardingWizard, setShowOnboardingWizard] = useState(false);
  const [isInSession, setIsInSession] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [template, setTemplate] = useState<ProjectTemplate | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showScriptBook, setShowScriptBook] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('none');
  const [trialEndDate, setTrialEndDate] = useState<number | null>(null);
  const [postPaymentStatus, setPostPaymentStatus] = useState<'idle' | 'success'>('idle');

  const [safetyMode, setSafetyMode] = useState(true);
  const [verboseComments, setVerboseComments] = useState(false);
  const [useGoogleSearch, setUseGoogleSearch] = useState(false);

  // Load sessions from localStorage
  useEffect(() => {
    let migratedSessions: ChatSession[] = [];
    try {
      const savedSessionsRaw = localStorage.getItem('agentbash_chat_sessions');
      const globalOsFromStorage = localStorage.getItem('agentbash_os') as OperatingSystem | null;

      if (savedSessionsRaw) {
          const savedSessions: any[] = JSON.parse(savedSessionsRaw);
          // Data migration: ensure content is string and session has OS
          migratedSessions = savedSessions.map(session => {
              const migratedMessages = Array.isArray(session.messages) ? session.messages.map(message => {
                  let content = message.content;
                  if (typeof content !== 'string') {
                      if (content && typeof content === 'object' && 'text' in content && typeof content.text === 'string') {
                           content = content.text;
                      } else {
                           content = '[Unsupported message format]';
                      }
                  }
                  return {
                      ...message,
                      id: message.id?.toString() || Math.random().toString(),
                      content: content,
                      sources: Array.isArray(message.sources) ? message.sources : undefined,
                  };
              }) : [];

              return {
                ...session,
                os: session.os || globalOsFromStorage, // Fix: Ensure session has an OS from global storage if missing
                messages: migratedMessages
              };
          }).filter(s => s.os); // Safety Net: Only load sessions that actually have an OS after migration
          
          setSessions(migratedSessions);
      }
    } catch (e) {
      console.error("Failed to load or parse chat sessions:", e);
      // If parsing fails, clear corrupted data to prevent crash loop
      localStorage.removeItem('agentbash_chat_sessions');
      setSessions([]);
    }
    const lastSessionId = localStorage.getItem('agentbash_last_session_id');
    // Check if the last session ID is valid and exists in the loaded sessions
    if (lastSessionId && migratedSessions.some(s => s.id === lastSessionId)) {
        setCurrentSessionId(lastSessionId);
        setIsInSession(true); // Restore session view
    } else if (lastSessionId) {
        // Clean up invalid last session id
        localStorage.removeItem('agentbash_last_session_id');
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('agentbash_chat_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Save last active session ID
  useEffect(() => {
    if (currentSessionId) {
        localStorage.setItem('agentbash_last_session_id', currentSessionId);
    }
  }, [currentSessionId]);
  
  // Sync App state (agents, template) with the currently selected session
  useEffect(() => {
    const currentSession = sessions.find(s => s.id === currentSessionId);
    if (currentSession) {
        setAgents(currentSession.agents);
        setTemplate(currentSession.template);
        if (os !== currentSession.os) {
            setOs(currentSession.os);
        }
    }
  }, [currentSessionId, sessions]);
  
  useEffect(() => {
    const checkSubscription = () => {
      const status = localStorage.getItem('agentbash_sub_status') as SubscriptionStatus | null;
      const endDate = localStorage.getItem('agentbash_trial_end');

      if (status === 'subscribed') {
        setSubscriptionStatus('subscribed');
        setTrialEndDate(null);
      } else if (status === 'trial' && endDate) {
        const endDateNum = parseInt(endDate, 10);
        if (Date.now() > endDateNum) {
          setSubscriptionStatus('expired');
          localStorage.setItem('agentbash_sub_status', 'expired');
        } else {
          setSubscriptionStatus('trial');
          setTrialEndDate(endDateNum);
        }
      } else if (status === 'expired') {
        setSubscriptionStatus('expired');
      } else {
        if (!status) {
            const newEndDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
            localStorage.setItem('agentbash_sub_status', 'trial');
            localStorage.setItem('agentbash_trial_end', newEndDate.toString());
            setSubscriptionStatus('trial');
            setTrialEndDate(newEndDate);
        }
      }
    };
    checkSubscription();
  }, []);

  const handleSignInSuccess = (response: any) => {
      if (!response || !response.credential) {
          console.error("Invalid sign-in response", response);
          return;
      }
      
      const decoded = decodeJwt(response.credential);
      
      if (decoded) {
          const userObject: User = { name: decoded.name, email: decoded.email, picture: decoded.picture };
          setUser(userObject);
          setShowLandingPage(false);
          const onboardingComplete = localStorage.getItem('agentbash_onboarding_complete') === 'true';
          if (!onboardingComplete) {
              setShowOnboardingWizard(true);
          } else {
              const storedOs = localStorage.getItem('agentbash_os') as OperatingSystem | null;
              if (storedOs) {
                  setOs(storedOs);
              }
          }
      } else {
          console.error("Failed to decode JWT credential.");
      }
  };

  const handleGetStarted = () => setShowLandingPage(false);
  const handleBackToHome = () => {
      setOs(null);
      setIsInSession(false);
      setShowOnboardingWizard(false);
      setShowLandingPage(true);
  };
  const handleSelectOs = (selectedOs: OperatingSystem) => {
    setOs(selectedOs);
    localStorage.setItem('agentbash_os', selectedOs);
    const onboardingComplete = localStorage.getItem('agentbash_onboarding_complete') === 'true';
    if (!onboardingComplete) setShowOnboardingWizard(true);
  };
  const handleOnboardingComplete = () => {
      localStorage.setItem('agentbash_onboarding_complete', 'true');
      const newlySelectedOs = localStorage.getItem('agentbash_os') as OperatingSystem | null;
      if (newlySelectedOs) {
          setOs(newlySelectedOs);
      }
      setShowOnboardingWizard(false);
      setIsInSession(false);
  }
  
  const handleUpdateSession = (sessionId: string, updates: Partial<ChatSession>) => {
    setSessions(prevSessions => {
      const updatedSessions = prevSessions.map(s => s.id === sessionId ? { ...s, ...updates } : s);
      const currentSession = updatedSessions.find(s => s.id === sessionId);
      const originalSession = prevSessions.find(s => s.id === sessionId);

      if (originalSession && originalSession.title === "New Chat" && currentSession && currentSession.messages.length > 0) {
        const firstUserMessage = currentSession.messages.find(m => m.sender === 'User');
        if (firstUserMessage) {
            const cleanedMessage = firstUserMessage.content
              .replace(/(\*|_|`|#|\[.*?\]\(.*?\)|\[.*?\])/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            
            let newTitle = cleanedMessage.split(' ').slice(0, 5).join(' ');

            if (newTitle.length > 40) {
              newTitle = newTitle.substring(0, 40).trim();
            }

            if (newTitle && cleanedMessage.length > newTitle.length) {
                newTitle += '...';
            }
            
            currentSession.title = newTitle || "Untitled Chat";
        }
      }
      return updatedSessions;
    });
  };

  const handleAgentSelect = (selectedAgent: Agent) => {
    setAgents(prev => {
        const newAgents = prev.includes(selectedAgent) ? prev : [...prev, selectedAgent];
        if (currentSessionId) {
            handleUpdateSession(currentSessionId, { agents: newAgents });
        }
        return newAgents;
    });
    setShowAddAgentModal(false);
  };
  
  const handleTemplateSelect = (selectedTemplate: ProjectTemplate) => {
    setTemplate(selectedTemplate);
    if (currentSessionId) {
        handleUpdateSession(currentSessionId, { template: selectedTemplate });
    }
  };

  const handleFullReset = () => {
    localStorage.clear();
    const newEndDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
    localStorage.setItem('agentbash_sub_status', 'trial');
    localStorage.setItem('agentbash_trial_end', newEndDate.toString());
    setSubscriptionStatus('trial');
    setTrialEndDate(newEndDate);
    setUser(null);
    setShowLandingPage(true);
    setOs(null);
    setShowOnboardingWizard(false);
    setIsInSession(false);
    setAgents([]);
    setTemplate(null);
    setShowSettings(false);
    setShowScriptBook(false);
    setShowPricing(false);
    setShowAddAgentModal(false);
    setSafetyMode(true); //
    setVerboseComments(false);
    setUseGoogleSearch(false);
    setSessions([]);
    setCurrentSessionId(null);
  }
  const handleSignOut = () => handleFullReset();
  const handleResetOnboarding = () => {
    localStorage.removeItem('agentbash_onboarding_complete');
    localStorage.removeItem('agentbash_system_profile');
    handleFullReset();
  };
  const handleResetSession = () => {
    setAgents([]);
    setTemplate(null);
    setIsInSession(false);
    setCurrentSessionId(null);
  };
  const handleSubscribeSuccess = () => {
    setSubscriptionStatus('subscribed');
    localStorage.setItem('agentbash_sub_status', 'subscribed');
    localStorage.removeItem('agentbash_trial_end');
    setShowPricing(false);
    setPostPaymentStatus('success');
  };

  const handleAcknowledgeSuccess = () => {
    setPostPaymentStatus('idle');
    handleResetSession();
  };
  
  const getDaysRemaining = () => {
    if (!trialEndDate) return 0;
    const remaining = Math.ceil((trialEndDate - Date.now()) / (1000 * 60 * 60 * 24));
    return remaining > 0 ? remaining : 0;
  };

  const createSessionFromAppContext = () => {
    const newSession: ChatSession = {
        id: Date.now().toString(),
        title: "New Chat",
        messages: [],
        os: os!,
        agents: agents,
        template: template,
        createdAt: new Date().toISOString()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };
  
  const handleNewChat = () => {
    const newSession: ChatSession = {
        id: Date.now().toString(),
        title: "New Chat",
        messages: [],
        os: os!,
        agents: [],
        template: null,
        createdAt: new Date().toISOString()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };
  
  const handleDeleteChat = (sessionId: string) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
        setSessions(prev => {
            const newSessions = prev.filter(s => s.id !== sessionId);
            if (currentSessionId === sessionId) {
                const nextSessionId = newSessions.length > 0 ? newSessions[0].id : null;
                setCurrentSessionId(nextSessionId);
                if (!nextSessionId) {
                    handleResetSession();
                }
            }
            return newSessions;
        });
    }
  };

  const handleRenameChat = (sessionId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setSessions(prevSessions =>
        prevSessions.map(session =>
            session.id === sessionId ? { ...session, title: newTitle.trim() } : session
        )
    );
  };
  
  const handleStartSessionFromTemplate = (agent: Agent, template: ProjectTemplate) => {
    if (!os) return;
    const newSession: ChatSession = {
        id: Date.now().toString(),
        title: template.name,
        messages: [],
        os: os!,
        agents: [agent],
        template: template,
        createdAt: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setIsInSession(true);
  };


  const renderContent = () => {
    if (postPaymentStatus === 'success') {
      return <PaymentSuccessPage onContinue={handleAcknowledgeSuccess} />;
    }
    if (showLandingPage) {
        return <HomePage user={user} onGetStarted={handleGetStarted} onSignOut={handleSignOut} />;
    }
    if (!user) {
        return <SignInPage onSignInSuccess={handleSignInSuccess} onBackToHome={handleBackToHome} />;
    }
    if (showPricing) {
        return <PricingPage user={user} onClose={() => setShowPricing(false)} onSubscribe={handleSubscribeSuccess} />
    }
    if (subscriptionStatus === 'expired') {
      return <TrialExpiredPage onSubscribeClick={() => setShowPricing(true)} />;
    }
    if (showSettings) {
      return (
        <SettingsPage 
          onClose={() => setShowSettings(false)}
          safetyMode={safetyMode}
          setSafetyMode={setSafetyMode}
          verboseComments={verboseComments}
          setVerboseComments={setVerboseComments}
          useGoogleSearch={useGoogleSearch}
          setUseGoogleSearch={setUseGoogleSearch}
        />
      );
    }
    if (showScriptBook) {
        return <ScriptBookPage onClose={() => setShowScriptBook(false)} />;
    }
    if (showOnboardingWizard) {
        return <OnboardingWizardPage user={user} onContinue={handleOnboardingComplete} onSignOut={handleSignOut} onBack={handleBackToHome} />
    }
    if (!os) {
      return <OperatingSystemSelectionPage user={user} onSelect={handleSelectOs} onSignOut={handleSignOut} onBackToHome={handleBackToHome} />
    }
    
    if (isInSession) {
        if (agents.length === 0) {
            return <AgentSelector onSelect={handleAgentSelect} onBack={() => setIsInSession(false)} />;
        }
        const agentHasTemplates = agents[0] in TEMPLATES;
        if (agentHasTemplates && !template) {
            return <TemplateSelector agent={agents[0]} onSelect={handleTemplateSelect} onBack={() => setAgents([])} />;
        }
      
        if (!currentSessionId) {
            createSessionFromAppContext();
            return null;
        }

        const currentSession = sessions.find(s => s.id === currentSessionId);
        if (!currentSession) {
             const fallbackSessionId = sessions[0]?.id || null;
             setCurrentSessionId(fallbackSessionId);
             if (!fallbackSessionId) createSessionFromAppContext();
             return null;
        }
      
        const TemplateIcon = template?.Icon;
        return (
            <div className="flex h-screen bg-dark-bg text-text-primary">
                <Sidebar
                    user={user}
                    isOpen={isSidebarOpen}
                    sessions={sessions}
                    currentSessionId={currentSessionId}
                    onNewChat={handleNewChat}
                    onSelectChat={setCurrentSessionId}
                    onDeleteChat={handleDeleteChat}
                    onRenameChat={handleRenameChat}
                    onShowSettings={() => setShowSettings(true)}
                    onShowScriptBook={() => setShowScriptBook(true)}
                    onShowPricing={() => setShowPricing(true)}
                    onBackToDashboard={handleResetSession}
                    onSignOut={handleSignOut}
                    subscriptionStatus={subscriptionStatus}
                    trialEndDate={trialEndDate}
                />
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="flex items-center justify-between p-4 bg-dark-card border-b border-border-dark flex-shrink-0">
                         <div className="flex items-center gap-4">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-text-secondary rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent" aria-label="Toggle Sidebar">
                                {isSidebarOpen ? <ChevronsLeftIcon className="w-6 h-6" /> : <ChevronsRightIcon className="w-6 h-6" />}
                            </button>

                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-text-secondary">
                                <span className="bg-dark-bg px-2 py-1 rounded-md border border-border-dark whitespace-nowrap">{os}</span>
                                <span className="hidden sm:inline">/</span>
                                {agents.map((agent, index) => {
                                    const AgentIcon = getAgentIcon(agent);
                                    return (
                                        <React.Fragment key={agent}>
                                            <span className="bg-dark-bg pl-2 pr-3 py-1 rounded-md flex items-center space-x-2 border border-border-dark whitespace-nowrap">
                                                <AgentIcon className="w-5 h-5 text-cyan-accent" />
                                                <span className="text-text-primary">{agent}</span>
                                            </span>
                                            {index < agents.length - 1 && <span className="font-bold text-cyan-accent">+</span>}
                                        </React.Fragment>
                                    );
                                })}
                                <button
                                        onClick={() => setShowAddAgentModal(true)}
                                        className="p-1.5 text-text-secondary rounded-full bg-dark-bg border border-border-dark hover:text-cyan-accent hover:border-cyan-accent/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                                        aria-label="Connect Automators"
                                        title="Connect another automator"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                {template && TemplateIcon && (
                                    <>
                                    <span className="hidden sm:inline">/</span>
                                    <span className="bg-dark-bg pl-2 pr-3 py-1 rounded-md flex items-center space-x-2 border border-border-dark whitespace-nowrap">
                                        <TemplateIcon className="w-5 h-5 text-cyan-accent" />
                                        <span className="text-text-primary">{template.name}</span>
                                    </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="flex-grow h-0">
                        <ChatInterface
                        key={currentSessionId}
                        session={currentSession}
                        onUpdateSession={handleUpdateSession}
                        safetyMode={safetyMode}
                        verboseComments={verboseComments}
                        useGoogleSearch={useGoogleSearch}
                        setUseGoogleSearch={setUseGoogleSearch}
                        subscriptionStatus={subscriptionStatus}
                        onSubscribeClick={() => setShowPricing(true)}
                        />
                    </div>
                </div>
                {showAddAgentModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up p-4" onClick={() => setShowAddAgentModal(false)}>
                        <div className="bg-dark-bg border border-border-dark rounded-lg w-full h-full sm:max-w-7xl sm:h-[90vh] flex flex-col shadow-2xl shadow-cyan-accent/10" onClick={e => e.stopPropagation()}>
                            <header className="flex items-center justify-between p-4 border-b border-border-dark flex-shrink-0">
                                <h2 className="text-xl font-bold text-text-primary">Connect another Automator</h2>
                                <button onClick={() => setShowAddAgentModal(false)} className="p-1 rounded-full text-text-secondary hover:bg-dark-bg hover:text-cyan-accent">
                                    <CloseIcon className="w-5 h-5" />
                                </button>
                            </header>
                            <div className="overflow-y-auto flex-1">
                                <AgentSelector
                                    onSelect={handleAgentSelect}
                                    onBack={() => {}}
                                    existingAgents={agents}
                                    hideBackButton={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        }
    
    // Default view after login/onboarding is the dashboard
    return <UserProfilePage 
                user={user}
                onStartSession={() => setIsInSession(true)}
                onStartSessionFromTemplate={handleStartSessionFromTemplate}
                onShowScriptBook={() => setShowScriptBook(true)}
                onShowSettings={() => setShowSettings(true)}
                onShowPricing={() => setShowPricing(true)}
                onSignOut={handleSignOut}
                onResetOnboarding={handleResetOnboarding}
                subscriptionStatus={subscriptionStatus}
                trialEndDate={trialEndDate}
           />;
  };

  return (
    <div className="h-screen font-sans">
      {renderContent()}
      <Analytics />
    </div>
  );
};

export default App;