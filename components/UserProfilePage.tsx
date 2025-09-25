import React, { useState, useEffect } from 'react';
import { User, SubscriptionStatus, SavedScript, OperatingSystem, Agent, ProjectTemplate } from '../types';
import { TEMPLATES } from '../data/projectTemplates';
import { CloseIcon, CrownIcon, TerminalIcon, PlusIcon, BookIcon, SettingsIcon, BashLogoIcon, ClockIcon, getAgentIcon, getOSIcon, ChevronRightIcon, GridIcon, CheckIcon } from './Icons';

interface UserProfilePageProps {
  user: User;
  onStartSession: () => void;
  onStartSessionFromTemplate: (agent: Agent, template: ProjectTemplate) => void;
  onShowScriptBook: () => void;
  onShowSettings: () => void;
  onShowPricing: () => void;
  onSignOut: () => void;
  onResetOnboarding: () => void;
  subscriptionStatus: SubscriptionStatus;
  trialEndDate: number | null;
}

const ProfileModal: React.FC<{ onClose: () => void; onResetOnboarding: () => void; }> = ({ onClose, onResetOnboarding }) => {
    const [systemProfile, setSystemProfile] = useState<string | null>(null);

    useEffect(() => {
        const profile = localStorage.getItem('agentbash_system_profile');
        setSystemProfile(profile);
    }, []);

    const handleResetClick = () => {
      if (window.confirm("Are you sure you want to reset your onboarding? This will clear your saved system profile and you will have to go through the setup process again.")) {
          onResetOnboarding();
          onClose();
      }
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up" onClick={onClose}>
            <div className="bg-dark-card border border-border-dark rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col shadow-2xl shadow-cyan-accent/10" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-border-dark">
                    <div className="flex items-center space-x-3">
                        <TerminalIcon className="w-6 h-6 text-cyan-accent" />
                        <h2 className="text-xl font-bold text-text-primary">Saved System Profile</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-dark-bg hover:text-cyan-accent">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </header>
                <div className="p-6 overflow-y-auto bg-dark-bg flex-1">
                    {systemProfile ? (
                        <pre className="bg-dark-card rounded-md p-4 w-full text-sm text-text-secondary font-mono whitespace-pre-wrap break-words">
                            {systemProfile}
                        </pre>
                    ) : (
                        <p className="text-text-secondary">No system profile found. Please complete the onboarding process to save your system information.</p>
                    )}
                </div>
                 <div className="p-6 border-t border-border-dark bg-dark-card rounded-b-lg">
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-red-400 mb-1">Danger Zone</h3>
                        <p className="text-sm text-red-400/80 mb-3">This will clear your saved system profile and require you to complete the setup again.</p>
                        <button 
                            onClick={handleResetClick}
                            className="bg-red-600 text-white font-bold px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900/20 focus:ring-red-500"
                        >
                            Clear & Re-run Onboarding
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; }> = ({ icon, label, value }) => (
    <div className="bg-dark-card/50 backdrop-blur-sm p-5 rounded-xl border border-border-dark flex items-center space-x-4">
        <div className="text-cyan-accent bg-dark-bg p-3 rounded-lg border border-border-dark">{icon}</div>
        <div>
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="text-2xl font-bold text-text-primary truncate">{typeof value === 'string' ? value : value.toLocaleString()}</p>
        </div>
    </div>
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; icon: React.ReactNode; }> = ({ label, isActive, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
            isActive
                ? 'bg-dark-bg text-cyan-accent'
                : 'text-text-secondary hover:bg-dark-bg hover:text-text-primary'
        }`}
    >
        {icon}
        {label}
    </button>
);


const QuickLink: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-bg transition-colors duration-200">
        <div className="text-cyan-accent">{icon}</div>
        <p className="font-semibold text-text-primary">{title}</p>
        <ChevronRightIcon className="w-5 h-5 text-text-secondary ml-auto" />
    </button>
);


const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, onStartSession, onStartSessionFromTemplate, onShowScriptBook, onShowSettings, onShowPricing, onSignOut, onResetOnboarding, subscriptionStatus, trialEndDate }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [greeting, setGreeting] = useState("Welcome");
    const [stats, setStats] = useState({ scriptCount: 0, mostUsedAgent: 'N/A' });
    const [recentScripts, setRecentScripts] = useState<SavedScript[]>([]);
    const [activeTab, setActiveTab] = useState<'recent' | 'templates'>('recent');

    const quickStartTemplates: (ProjectTemplate & { agent: Agent })[] = [];
    for (const agent in TEMPLATES) {
        if (TEMPLATES[agent as Agent]) {
            TEMPLATES[agent as Agent]!.forEach(template => {
                if (quickStartTemplates.length < 4) {
                    quickStartTemplates.push({ ...template, agent: agent as Agent });
                }
            });
        }
        if (quickStartTemplates.length >= 4) break;
    }

    const getDaysRemaining = () => {
        if (!trialEndDate) return 0;
        const remaining = Math.ceil((trialEndDate - Date.now()) / (1000 * 60 * 60 * 24));
        return remaining > 0 ? remaining : 0;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");

        try {
            const savedScriptsRaw: any[] = JSON.parse(localStorage.getItem('agentbash_saved_scripts') || '[]');
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

            setRecentScripts(migratedScripts.slice(0, 5));

            const agentCounts: Record<string, number> = {};
            migratedScripts.forEach(script => {
                script.agents.forEach(agent => {
                    agentCounts[agent] = (agentCounts[agent] || 0) + 1;
                });
            });
            
            const mostUsed = Object.entries(agentCounts).sort((a, b) => b[1] - a[1])[0];
            
            setStats({
                scriptCount: migratedScripts.length,
                mostUsedAgent: mostUsed ? mostUsed[0] : 'N/A'
            });

        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        }

    }, []);

    const MostUsedAgentIcon = stats.mostUsedAgent !== 'N/A' ? getAgentIcon(stats.mostUsedAgent as Agent) : GridIcon;


    return (
        <div className="relative flex flex-col min-h-screen bg-dark-bg text-text-primary font-sans">
             <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 animate-gradient-spin" style={{ animationDuration: '40s' }}>
                    <div className="absolute -top-1/4 left-0 w-3/4 h-3/4 bg-gradient-to-br from-magic-pink via-space-blue rounded-full opacity-30 filter blur-3xl"></div>
                    <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-accent via-blur-purple rounded-full opacity-30 filter blur-3xl"></div>
                </div>
            </div>

            {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} onResetOnboarding={onResetOnboarding} />}
            <header className="flex items-center justify-between p-4 bg-dark-bg/50 backdrop-blur-sm border-b border-border-dark flex-shrink-0 z-20 sticky top-0">
                <div className="flex items-center space-x-2">
                    <BashLogoIcon className="w-7 h-7 text-cyan-accent" />
                    <h1 className="text-xl font-bold">Agent<span className="text-cyan-accent">Bash</span></h1>
                </div>
                <div className="relative">
                    <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-cyan-accent" aria-label="User Menu">
                        <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-dark-card border border-border-dark rounded-lg shadow-lg z-50 animate-pop-in">
                            <div className="p-4 border-b border-border-dark"><p className="font-semibold text-text-primary truncate">{user.name}</p><p className="text-sm text-text-secondary truncate">{user.email}</p></div>
                            <div className="p-2">
                                <button onClick={onSignOut} className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors">Sign Out</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                                {greeting}, <span className="font-light">{user.name.split(' ')[0]}</span>.
                            </h2>
                            <p className="text-md text-text-secondary mt-1">Let's automate something great today.</p>
                        </div>
                        <button
                            onClick={onStartSession}
                            className="flex items-center justify-center gap-2 bg-cyan-accent text-dark-bg font-bold px-6 py-3 rounded-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-cyan-accent"
                        >
                            <PlusIcon className="w-5 h-5" />
                            New Automation
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <StatCard icon={<BookIcon className="w-6 h-6"/>} label="Scripts Saved" value={stats.scriptCount} />
                        <StatCard icon={<MostUsedAgentIcon className="w-6 h-6"/>} label="Top Agent" value={stats.mostUsedAgent} />
                        <StatCard icon={<CrownIcon className="w-6 h-6"/>} label="Subscription" value={subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="bg-dark-card/60 backdrop-blur-lg border border-border-dark rounded-xl p-6 h-full">
                                <div className="flex items-center gap-2 border-b border-border-dark pb-4 mb-4">
                                    <TabButton label="Recent Scripts" isActive={activeTab === 'recent'} onClick={() => setActiveTab('recent')} icon={<ClockIcon className="w-5 h-5"/>} />
                                    <TabButton label="Quick Starts" isActive={activeTab === 'templates'} onClick={() => setActiveTab('templates')} icon={<GridIcon className="w-5 h-5"/>} />
                                </div>
                                {activeTab === 'recent' && (
                                    <div className="space-y-3 animate-fade-in-up">
                                    {recentScripts.length > 0 ? (
                                        recentScripts.map(script => {
                                            const OSIcon = getOSIcon(script.os);
                                            return(
                                                <div key={script.id} className="group flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-border-dark hover:border-cyan-accent/50 transition-colors cursor-pointer" onClick={onShowScriptBook}>
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <OSIcon className="w-5 h-5 text-text-secondary flex-shrink-0" />
                                                    <div className="overflow-hidden">
                                                        <p className="font-medium text-text-primary truncate">{script.name}</p>
                                                        <div className="flex items-center gap-1.5 text-xs text-text-secondary truncate">
                                                            {script.agents && script.agents.length > 0 ? script.agents.map(agent => {
                                                                const AgentIcon = getAgentIcon(agent);
                                                                return (
                                                                    <span key={agent} title={agent}><AgentIcon className="w-4 h-4" /></span>
                                                                );
                                                            }) : <span className="italic">No agent</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                    <span className="text-xs text-text-secondary flex-shrink-0 ml-4">{new Date(script.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p className="text-text-secondary text-center py-8">No recent scripts found. Start a new session to create one!</p>
                                    )}
                                    </div>
                                )}
                                {activeTab === 'templates' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
                                        {quickStartTemplates.map(template => {
                                            const AgentIcon = getAgentIcon(template.agent);
                                            return (
                                                <button key={template.name} onClick={() => onStartSessionFromTemplate(template.agent, template)} className="group flex flex-col text-left p-4 bg-dark-bg rounded-lg border border-border-dark hover:border-cyan-accent/50 transition-colors">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <AgentIcon className="w-6 h-6 text-cyan-accent flex-shrink-0"/>
                                                        <h4 className="font-semibold text-text-primary truncate">{template.name}</h4>
                                                    </div>
                                                    <p className="text-xs text-text-secondary flex-grow">{template.description}</p>
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="flex flex-col gap-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <div className="bg-dark-card/60 backdrop-blur-lg border border-border-dark rounded-xl p-6 text-center">
                                {subscriptionStatus === 'trial' && (
                                    <>
                                        <CrownIcon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold text-yellow-400">Trial Period</h3>
                                        <p className="text-text-secondary mb-4">{getDaysRemaining()} {getDaysRemaining() === 1 ? 'day' : 'days'} left</p>
                                        <button onClick={onShowPricing} className="w-full bg-yellow-400 text-dark-bg font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors">Upgrade to Pro</button>
                                    </>
                                )}
                                {subscriptionStatus === 'subscribed' && (
                                    <>
                                        <CrownIcon className="w-10 h-10 text-cyan-accent mx-auto mb-3" />
                                        <h3 className="text-xl font-bold text-text-primary">Pro Member</h3>
                                        <p className="text-text-secondary mb-4">All features unlocked.</p>
                                        <div className="flex items-center justify-center gap-2 text-green-400">
                                            <CheckIcon className="w-5 h-5" />
                                            <span>Subscription Active</span>
                                        </div>
                                    </>
                                )}
                                {subscriptionStatus === 'expired' && (
                                    <>
                                        <CrownIcon className="w-10 h-10 text-red-400 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold text-red-400">Trial Expired</h3>
                                        <p className="text-text-secondary mb-4">Please subscribe to continue.</p>
                                        <button onClick={onShowPricing} className="w-full bg-cyan-accent text-dark-bg font-bold px-4 py-2 rounded-lg hover:bg-cyan-accent-hover transition-colors">View Plans</button>
                                    </>
                                )}
                            </div>
                            
                            <div className="bg-dark-card/60 backdrop-blur-lg border border-border-dark rounded-xl p-2">
                                <QuickLink icon={<BookIcon className="w-5 h-5"/>} title="Open Script Book" onClick={onShowScriptBook} />
                                <QuickLink icon={<SettingsIcon className="w-5 h-5"/>} title="Settings" onClick={onShowSettings} />
                                <QuickLink icon={<TerminalIcon className="w-5 h-5"/>} title="System Profile" onClick={() => setShowProfileModal(true)} />
                            </div>

                             <div className="bg-dark-card/60 backdrop-blur-lg border border-border-dark rounded-xl p-6">
                                <h3 className="text-lg font-bold text-text-primary mb-3">What's New</h3>
                                <p className="text-sm text-cyan-accent font-semibold mb-1">In-Chat ZIP Downloads</p>
                                <p className="text-xs text-text-secondary">
                                    The AI can now generate a clickable download link in its response when asked to "zip" or "package" a project.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;