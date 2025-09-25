import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { AGENT_CATEGORIES } from '../data/agents';
import { getAgentIcon, CheckIcon, CrownIcon, MenuIcon, CloseIcon, UsersIcon, GitHubIcon, InstagramIcon, LinkIcon } from './Icons';
import { 
    SparklesIcon, SettingsIcon, CodeBranchIcon, TerminalIcon, BashLogoIcon, FileCodeIcon, BookOpenIcon,
    LayersIcon, SlidersHorizontalIcon, GridIcon, BookIcon, FileZipIcon
} from './Icons';
import AnimatedTerminal from './AnimatedTerminal';


interface HomePageProps {
    user: User | null;
    onGetStarted: () => void;
    onSignOut: () => void;
}

const navLinks = [
    { id: 'features', label: 'Features' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'guide', label: 'Guide' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'about', label: 'About' },
];


interface NavClickHandler {
    (event: React.MouseEvent<HTMLAnchorElement>, targetId: string): void;
}

const Header: React.FC<{ user: User | null; onGetStarted: () => void; onNavClick: NavClickHandler; onSignOut: () => void; activeSection: string; }> = ({ user, onGetStarted, onNavClick, onSignOut, activeSection }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setIsMobileMenuOpen(false);
        onNavClick(event, targetId);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMobileMenuOpen]);


    return (
        <header className="fixed top-0 left-0 right-0 z-30 bg-dark-card/80 backdrop-blur-sm border-b border-border-dark/50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#" onClick={(e) => onNavClick(e, 'home')} className="flex items-center space-x-2 cursor-pointer">
                    <BashLogoIcon className="w-8 h-8 text-cyan-accent" />
                    <h1 className="text-2xl font-bold text-text-primary">
                        Agent<span className="text-cyan-accent">Bash</span>
                    </h1>
                </a>
                <nav className="hidden lg:flex items-center space-x-2 bg-dark-bg/50 border border-border-dark rounded-lg p-1">
                    {navLinks.map(link => (
                         <a 
                            key={link.id}
                            href={`#${link.id}`} 
                            onClick={(e) => onNavClick(e, link.id)} 
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === link.id ? 'bg-dark-card text-cyan-accent' : 'text-text-secondary hover:text-text-primary'}`}
                         >
                            {link.label}
                         </a>
                    ))}
                </nav>
                <div className="hidden lg:flex items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={onGetStarted}
                                className="bg-cyan-accent text-dark-bg font-bold px-5 py-2 rounded-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent"
                            >
                            Go to App
                            </button>
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
                                                onClick={() => { onSignOut(); setIsUserMenuOpen(false); }}
                                                className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={onGetStarted}
                            className="bg-cyan-accent text-dark-bg font-bold px-5 py-2 rounded-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent"
                        >
                            Sign In
                        </button>
                    )}
                </div>
                {/* Mobile Menu Dropdown */}
                <div className="lg:hidden">
                    <button 
                        onClick={() => setIsMobileMenuOpen(prev => !prev)} 
                        className="p-2 text-text-secondary hover:text-cyan-accent"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu-dropdown"
                        aria-label="Open main menu"
                    >
                        {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                    {isMobileMenuOpen && (
                        <div 
                            id="mobile-menu-dropdown"
                            className="fixed top-[69px] left-0 right-0 bg-dark-card/95 backdrop-blur-sm border-b border-border-dark shadow-lg animate-slide-down z-20"
                        >
                             <div className="container mx-auto px-6 py-4">
                                <div className="bg-dark-bg/50 border border-border-dark rounded-lg p-2">
                                    <nav className="flex flex-col space-y-1" role="menu">
                                        {navLinks.map(link => (
                                            <a 
                                                key={link.id}
                                                href={`#${link.id}`} 
                                                onClick={(e) => handleMobileNavClick(e, link.id)} 
                                                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === link.id ? 'bg-dark-card text-cyan-accent' : 'text-text-secondary hover:text-cyan-accent hover:bg-dark-card/50'}`}
                                                role="menuitem"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="mt-4">
                                    {user ? (
                                        <div className="bg-dark-bg/50 border border-border-dark rounded-lg text-sm">
                                            <div className="p-3 border-b border-border-dark">
                                                <p className="font-semibold text-text-primary truncate">{user.name}</p>
                                                <p className="text-xs text-text-secondary truncate">{user.email}</p>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                <button
                                                    onClick={onGetStarted}
                                                    className="w-full text-left font-medium text-cyan-accent px-3 py-2 rounded-md hover:bg-dark-card transition-colors"
                                                >
                                                    Go to Dashboard
                                                </button>
                                                <button
                                                    onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }}
                                                    className="w-full text-left font-medium text-red-400 px-3 py-2 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => { onGetStarted(); setIsMobileMenuOpen(false); }}
                                            className="w-full bg-cyan-accent text-dark-bg font-bold px-6 py-3 rounded-lg text-sm hover:bg-cyan-accent-hover transition-all"
                                        >
                                            Sign In
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-border-dark transition-all duration-300 hover:border-cyan-accent/50 hover:shadow-lg hover:shadow-cyan-accent/10">
        <div className="text-cyan-accent mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
        <p className="text-text-secondary">{children}</p>
    </div>
);

const FeaturesSection: React.FC = () => (
    <section id="features" className="py-20 bg-dark-card scroll-mt-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">Unlock the Power of <span className="text-cyan-accent">AI Automation</span></h2>
            <p className="text-lg text-text-secondary mb-12 max-w-3xl mx-auto">
                AgentBash is more than just a code generator. It's an intelligent platform designed for robust, real-world automation tasks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard icon={<CodeBranchIcon className="w-10 h-10" />} title="Multi-Agent Architecture">
                    Utilize specialized agents like the React Automator and CI/CD Automator, each expertly trained for specific domains.
                </FeatureCard>
                 <FeatureCard icon={<FileCodeIcon className="w-10 h-10" />} title="Complete Application Generation">
                    The AI generates a single, executable script that builds an entire, runnable application for you from scratch.
                </FeatureCard>
                <FeatureCard icon={<SparklesIcon className="w-10 h-10" />} title="Intelligent Planning">
                    Our AI doesn't just write code. It asks clarifying questions, presents a plan, and awaits your approval before execution.
                </FeatureCard>
                <FeatureCard icon={<TerminalIcon className="w-10 h-10" />} title="Cross-Platform Support">
                    Generate native automation scripts for both Windows (PowerShell) and Linux (Bash) with a single, unified interface.
                </FeatureCard>
            </div>
        </div>
    </section>
);

const UseCasesSection: React.FC = () => {
    const useCases = [
        "Bootstrap a complete SaaS application with user authentication.",
        "Generate a multi-stage Dockerfile for a production-ready Node.js app.",
        "Create a playable C++ text-based adventure game from a single prompt.",
        "Set up a full CI/CD pipeline in GitHub Actions to test and deploy a web app.",
        "Generate a script to scaffold a new Next.js project with TypeScript and Tailwind CSS.",
        "Create a local PostgreSQL database environment using Docker Compose.",
        "Generate a script to build a complete, functional React To-Do application.",
        "Automate the setup of a local LangFlow environment for LLM experimentation.",
        "Write a Python script to organize your 'Downloads' folder by file type.",
        "Generate a Terraform configuration to provision an S3 bucket on AWS.",
        "Create a GUI-based backup utility for Linux using Zenity dialogs.",
        "Build a complete Node.js REST API with CRUD endpoints for a blog.",
        "Automate your daily Git workflow of fetching and cleaning up merged branches.",
        "Scaffold a new Tauri project to build a cross-platform desktop application.",
        "Create a responsive portfolio website as a single HTML file with inline CSS.",
        "Generate a script to set up a new SvelteKit project with all essentials.",
        "Write an Ansible playbook to install and configure Nginx on a remote server.",
        "Generate a .sql script to create a database schema for an e-commerce site.",
        "Set up a new mobile application project using React Native and Expo.",
        "Generate an AWS CLI script to list all running EC2 instances and their IPs."
    ];

    return (
        <section id="use-cases" className="py-20 bg-dark-bg scroll-mt-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">What can <span className="text-cyan-accent">AgentBash</span> solve for you?</h2>
                <p className="text-lg text-text-secondary mb-12 max-w-3xl mx-auto">
                    From quick utilities to complete application scaffolding, here are just a few real-world problems you can automate.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-5xl mx-auto text-left">
                    {useCases.map((useCase, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2">
                            <CheckIcon className="w-5 h-5 text-cyan-accent mt-1 flex-shrink-0" />
                            <p className="text-text-primary">{useCase}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GuideSection: React.FC = () => {
    type Tab = 'start' | 'features' | 'advanced' | 'agents';
    const [activeTab, setActiveTab] = React.useState<Tab>('start');

    // For Agents Reference Tab
    const [activeCategory, setActiveCategory] = useState(AGENT_CATEGORIES[0].title);
    const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (activeTab !== 'agents') return;

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        };
        
        observer.current = new IntersectionObserver(handleIntersect, { rootMargin: "-30% 0px -70% 0px", threshold: 0 });

        const currentRefs = categoryRefs.current;
        Object.values(currentRefs).forEach(el => {
            if (el) observer.current?.observe(el);
        });

        return () => {
            Object.values(currentRefs).forEach(el => {
                if (el) observer.current?.unobserve(el);
            });
            observer.current?.disconnect();
        };
    }, [activeTab]);


    const handleCategoryClick = (categoryTitle: string) => {
        setActiveCategory(categoryTitle);
        categoryRefs.current[categoryTitle]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };


    const tabs: { id: Tab; name: string; icon: React.ReactNode }[] = [
        { id: 'start', name: 'Getting Started', icon: <TerminalIcon className="w-5 h-5 mr-2" /> },
        { id: 'features', name: 'Core Features', icon: <LayersIcon className="w-5 h-5 mr-2" /> },
        { id: 'advanced', name: 'Advanced Usage', icon: <SlidersHorizontalIcon className="w-5 h-5 mr-2" /> },
        { id: 'agents', name: 'Agents Reference', icon: <GridIcon className="w-5 h-5 mr-2" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'start':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up">
                        <div className="bg-dark-card p-6 rounded-lg border border-border-dark">
                            <div className="flex items-center mb-4">
                                <div className="bg-dark-bg border border-cyan-accent/50 p-3 rounded-full mr-4"><span className="text-xl font-bold text-cyan-accent">1</span></div>
                                <h3 className="text-xl font-bold text-text-primary">Select Your Environment</h3>
                            </div>
                            <p className="text-text-secondary">Choose your target OS (Windows/Linux) and a specialized AI agent. You can also select a project template for a quick start.</p>
                        </div>
                        <div className="bg-dark-card p-6 rounded-lg border border-border-dark">
                            <div className="flex items-center mb-4">
                                <div className="bg-dark-bg border border-cyan-accent/50 p-3 rounded-full mr-4"><span className="text-xl font-bold text-cyan-accent">2</span></div>
                                <h3 className="text-xl font-bold text-text-primary">Define Your Task</h3>
                            </div>
                            <p className="text-text-secondary">Describe your goal in plain English. The AI will ask questions and present a step-by-step plan for your approval before generating any code.</p>
                        </div>
                        <div className="bg-dark-card p-6 rounded-lg border border-border-dark">
                            <div className="flex items-center mb-4">
                                <div className="bg-dark-bg border border-cyan-accent/50 p-3 rounded-full mr-4"><span className="text-xl font-bold text-cyan-accent">3</span></div>
                                <h3 className="text-xl font-bold text-text-primary">Generate & Manage</h3>
                            </div>
                            <p className="text-text-secondary">Receive a complete script. Download generated projects as a ZIP file, or save useful scripts to your personal "Script Book" for later use.</p>
                        </div>
                    </div>
                );
            case 'features':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left animate-fade-in-up">
                         <FeatureCard icon={<SparklesIcon className="w-8 h-8" />} title="Auto Engine & Interactive Planning">
                             Use the master Auto Engine to describe high-level goals. It devises a structured plan with technology choices for your approval before execution.
                         </FeatureCard>
                         <FeatureCard icon={<FileCodeIcon className="w-8 h-8" />} title="Complete Project Generation">
                             AgentBash creates entire, runnable applications. The AI writes all necessary files (code, config, docs) directly into a single, executable script.
                         </FeatureCard>
                          <FeatureCard icon={<UsersIcon className="w-8 h-8" />} title="Agent Collaboration">
                            Combine multiple agents in a single session. The AI will intelligently merge their capabilities to tackle complex, multi-disciplinary tasks.
                         </FeatureCard>
                         <FeatureCard icon={<BookIcon className="w-8 h-8" />} title="Script Book">
                             Save any generated script to your personal library. The Script Book allows you to easily find, view, and reuse your favorite automations.
                         </FeatureCard>
                         <FeatureCard icon={<FileZipIcon className="w-8 h-8" />} title="Project ZIP Download">
                            Package all files generated in a session into a single `.zip` archive with one click, perfect for sharing or local development.
                         </FeatureCard>
                          <FeatureCard icon={<TerminalIcon className="w-8 h-8" />} title="Cross-Platform Native Scripts">
                            The AI automatically generates the correct script type for your chosen OS—Bash for Linux and PowerShell for Windows—handling syntax differences for you.
                         </FeatureCard>
                    </div>
                );
            case 'advanced':
                return (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left animate-fade-in-up">
                         <FeatureCard icon={<FileZipIcon className="w-8 h-8" />} title="Project Analysis & Refactoring">
                             Upload an existing project as a `.zip` file. The AI can analyze the codebase, answer questions, suggest improvements, or generate scripts to add new features.
                         </FeatureCard>
                         <FeatureCard icon={<SettingsIcon className="w-8 h-8" />} title="Customize AI Behavior">
                             Use the settings panel to enable Safety Mode for destructive commands, enforce Verbose Comments for self-documenting code, or allow Google Search for up-to-date info.
                         </FeatureCard>
                         <FeatureCard icon={<BashLogoIcon className="w-8 h-8" />} title="Iterative Development & Debugging">
                            Refine your project over multiple prompts. If you encounter an error, paste it into the chat, and the AI will act as an expert debugger to find and fix the issue.
                         </FeatureCard>
                    </div>
                );
            case 'agents':
                return (
                    <div className="animate-fade-in-up">
                        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                            {/* Sticky Nav */}
                            <aside className="md:w-1/4 lg:w-1/5">
                                <nav className="sticky top-24">
                                    <h3 className="text-lg font-semibold text-text-primary mb-4 text-left">Categories</h3>
                                    <ul className="space-y-2">
                                        {AGENT_CATEGORIES.map(category => (
                                            <li key={category.title}>
                                                <button
                                                    onClick={() => handleCategoryClick(category.title)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                                        activeCategory === category.title
                                                            ? 'bg-cyan-accent/10 text-cyan-accent font-semibold'
                                                            : 'text-text-secondary hover:bg-dark-card hover:text-text-primary'
                                                    }`}
                                                >
                                                    {category.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </aside>

                            {/* Main Content */}
                            <main className="md:w-3/4 lg:w-4/5">
                                {AGENT_CATEGORIES.map(category => (
                                    <section
                                        key={category.title}
                                        id={category.title}
                                        ref={el => { categoryRefs.current[category.title] = el; }}
                                        className="mb-16 scroll-mt-24"
                                    >
                                        <h2 className="text-3xl font-bold text-text-primary mb-6 text-left border-b border-border-dark pb-3">{category.title}</h2>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {category.agents.map(agentInfo => {
                                                const AgentIcon = getAgentIcon(agentInfo.agent);
                                                return (
                                                    <div key={agentInfo.agent} className="bg-dark-card border border-border-dark rounded-lg p-5 flex flex-col text-left h-full transition-all duration-300 hover:border-cyan-accent/50 hover:shadow-md hover:shadow-cyan-accent/5">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center">
                                                                <AgentIcon className="w-8 h-8 mr-3 text-cyan-accent flex-shrink-0" />
                                                                <h3 className="text-lg font-semibold text-text-primary">{agentInfo.agent}</h3>
                                                            </div>
                                                            {agentInfo.pro && (
                                                                <div className="flex items-center space-x-1 bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                                                                    <CrownIcon className="w-3 h-3" />
                                                                    <span>PRO</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-text-secondary text-sm flex-grow">{agentInfo.description}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                ))}
                            </main>
                        </div>
                    </div>
                );
        }
    };

    return (
        <section id="guide" className="py-20 bg-dark-card scroll-mt-24">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center items-center mb-4">
                    <BookOpenIcon className="w-8 sm:w-10 h-8 sm:h-10 mr-3 text-cyan-accent"/>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Developer's Guide</h2>
                </div>
                <p className="text-lg text-text-secondary mb-12 max-w-3xl mx-auto">
                    From basic scripts to advanced project automation. Your complete guide to AgentBash.
                </p>
                <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-border-dark pb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-cyan-accent text-dark-bg'
                                    : 'bg-dark-card text-text-primary hover:bg-gray-700'
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="mt-8">{renderContent()}</div>
            </div>
        </section>
    );
};

const PricingSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

  const plans = {
    monthly: {
      price: 4.99,
      billingText: "/month"
    },
    annually: {
      price: 49.99,
      billingText: "/year",
      discount: "Save 16%"
    }
  };
  const selectedPlan = plans[billingCycle];

  const proFeatures = [
    "Access to all current & future agents",
    "Cross-platform script generation",
    "Upload & analyze project .zip files",
    "Save unlimited scripts to Script Book",
    "Priority support",
    "Early access to new features"
  ];
  const hobbyFeatures = [
    "10-Day Free Trial of all Pro features",
    "Access to all standard agents",
    "Save up to 5 scripts",
    "Community Support"
  ];

  return (
    <section id="pricing" className="py-20 bg-dark-bg scroll-mt-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">Flexible Plans for <span className="text-cyan-accent">Every Developer</span></h2>
        <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
          Start for free and scale up as you grow. Choose the plan that fits your workflow.
        </p>

        <div className="flex justify-center items-center space-x-4 mb-10">
          <span className={`font-medium ${billingCycle === 'monthly' ? 'text-cyan-accent' : 'text-text-secondary'}`}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={billingCycle === 'annually'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} className="sr-only peer" />
            <div className="w-14 h-8 bg-border-dark rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-accent"></div>
          </label>
          <span className={`font-medium ${billingCycle === 'annually' ? 'text-cyan-accent' : 'text-text-secondary'}`}>Annually</span>
          {billingCycle === 'annually' && (
            <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full">{plans.annually.discount}</span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hobbyist Plan */}
          <div className="bg-dark-card border border-border-dark rounded-lg p-8 text-left flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-gray-700">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Hobbyist</h3>
            <p className="text-text-secondary mb-6">Perfect for trying out AgentBash and small personal projects.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-text-primary">Free</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {hobbyFeatures.map(feature => (
                <li key={feature} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-cyan-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button onClick={onCTAClick} className="w-full mt-auto py-3 px-6 bg-dark-bg border border-border-dark text-text-primary font-bold rounded-lg hover:bg-border-dark transition-all">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-dark-card border-2 border-cyan-accent rounded-lg p-8 text-left flex flex-col h-full relative shadow-2xl shadow-cyan-accent/10">
            <div className="absolute top-0 right-8 -mt-4 bg-cyan-accent text-dark-bg px-4 py-1 rounded-full text-sm font-bold flex items-center">
                <CrownIcon className="w-4 h-4 mr-2" />
                <span>MOST POPULAR</span>
            </div>
            <h3 className="text-2xl font-bold text-cyan-accent mb-2">Pro</h3>
            <p className="text-text-secondary mb-6">For professional developers who need unlimited power and features.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-text-primary">${selectedPlan.price}</span>
              <span className="text-text-secondary">{selectedPlan.billingText}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {proFeatures.map(feature => (
                <li key={feature} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-cyan-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button onClick={onCTAClick} className="w-full mt-auto py-3 px-6 bg-cyan-accent text-dark-bg font-bold rounded-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const changelogData = [
    {
        version: '1.0.0', date: '2024-08-01',
        changes: {
            Changed: [
                "**Upgraded 'Edit & Resubmit' UX**: Replaced the message bubble with a wide, focused editing panel upon clicking the edit icon, inspired by modern AI chat interfaces. This provides a significantly larger and more comfortable text area for revising prompts.",
            ]
        }
    },
    {
        version: '0.9.0', date: '2024-07-31',
        changes: {
            Changed: [
                "**Mobile Navigation Overhaul**: Redesigned the mobile header for a world-class user experience. Replaced the static icon with a **fluidly animated toggle**, and ensured the menu's theme, styling, and hover effects are now perfectly consistent with the sophisticated desktop version.",
            ]
        }
    },
    {
        version: '0.8.0', date: '2024-07-30',
        changes: {
            Added: [
                "**In-Chat ZIP Downloads**: The AI can now generate a special, clickable download link directly in its response when asked to `zip` or `package` a project. This creates a seamless, powerful user experience where the AI delivers files directly to the user.",
            ],
            Changed: [
                "**Upgraded AI Download Skill**: The AI's core instructions have been updated to use the new `[Download...](download_zip:...)` markdown format instead of referring to UI elements.",
            ],
            Removed: [
                 "**Redundant UI Button**: The `Download ZIP` button has been removed from the application sidebar to declutter the interface and streamline the new in-chat download workflow."
            ]
        }
    },
    {
        version: '0.7.0', date: '2024-07-29',
        changes: {
            Changed: [
                "**Streamlined Onboarding**: Overhauled the onboarding sync process into a single, seamless page. OS selection now immediately proceeds to the sync steps, removing extra button clicks.",
                "**Enhanced AI Context**: Drastically improved the AI's conversational memory. It no longer repeats initial greetings and correctly maintains context throughout a session.",
                "**Robust Session Isolation**: Re-architected chat session management to ensure that `New Chat` creates a completely clean slate, preventing any context from leaking between conversations.",
            ],
            Added: [
                "**One-Click Copy Commands**: Added always-visible, cyan-colored copy icons for terminal commands in the onboarding flow for a faster, more user-friendly setup.",
            ],
            Fixed: [
                "**Responsive Onboarding UI**: Corrected multiple layout issues in the onboarding wizard, ensuring the entire UI is fully responsive and prevents any horizontal scrolling on all devices.",
                "**UI Consistency**: Aligned the styling of buttons and icons in the onboarding process with the app's primary cyan theme.",
                "**Interactive Plan Stability**: Added defensive code to the Interactive Plan component to prevent crashes if the AI generates a malformed plan, making the UI more robust."
            ]
        }
    },
    {
        version: '0.6.0', date: '2024-07-28',
        changes: {
            Changed: [
                "**Onboarding Overhaul**: Redesigned the onboarding flow for a more professional and intuitive user experience. The process is now a single, seamless guide without extra clicks.",
                "**AI Context Awareness**: Significantly improved the AI's contextual understanding. It no longer repeats greetings on follow-up questions and correctly processes conversational turns.",
                "**Session Isolation**: Re-architected chat session management to ensure complete isolation. Creating a `New Chat` now starts a truly independent session, preventing context leakage.",
            ],
            Added: [
                "**Web Search Toggle**: Added a web search toggle button directly in the chat input area for easy access.",
                "Added convenient copy-to-clipboard icons for commands in the onboarding process to streamline setup.",
            ],
            Fixed: [
                "Resolved multiple mobile layout issues in the onboarding screen, eliminating horizontal scrolling and ensuring all content is perfectly visible.",
                "Corrected UI styling for buttons and icons during onboarding to align with the app's primary color scheme.",
            ]
        }
    },
    {
        version: '0.5.0', date: '2024-07-27',
        changes: {
            Added: [
                "**New Web Development Agents**: Introduced three specialized agents for core web tasks: `HTML Automator`, `CSS Automator`, and `JS Automator`.",
                "**New LLM Agent**: Added `LangFlow Automator` to generate scripts for setting up and managing LangFlow projects.",
                "**New Agent Categories**: Created 'Web Development Utilities' and 'Gaming' categories to improve agent organization.",
            ],
            Changed: [
                "**Agent Rebranding**: Renamed `Game GPT C++` to `C++ Automator` and `Docker-GPT` to `Docker Automator` for better clarity and professionalism.",
                "**Hero Section Animation**: Updated the homepage's animated terminal to feature a `LangFlow Automator` example first, showcasing the new capability.",
            ]
        }
    },
    {
        version: '0.4.0', date: '2024-07-26',
        changes: { Added: ["Created `CHANGELOG.md` to track project development and updates professionally."] }
    },
    {
        version: '0.3.0', date: '2024-07-25',
        changes: {
            Changed: [
                "**Upgraded AI Core Directives**: Significantly enhanced the AI's core instructions to operate as a world-class development partner.",
                "Introduced a **Script Perfection Mandate** for zero-error, production-ready code.",
                "Implemented an **Automated Dependency Checking Protocol** for all generated scripts.",
                "Revamped the **Debugging Protocol** for root cause analysis and to prevent repetitive failed solutions.",
                "Elevated all agent personas to operate as 'world-class' experts in their respective fields.",
            ]
        }
    },
];

const ParseChangelogLine: React.FC<{ line: string }> = ({ line }) => {
    const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                    return <code key={index} className="text-xs font-mono bg-dark-bg text-cyan-accent/80 px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>;
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </span>
    );
};

const ChangelogDisplay: React.FC = () => (
    <div className="relative pl-8">
        <div className="absolute left-0 h-full w-px bg-border-dark"></div>
        {changelogData.map((entry, index) => (
            <div key={entry.version} className="relative mb-10">
                <div className="absolute -left-px -translate-x-1/2 w-4 h-4 bg-cyan-accent rounded-full border-4 border-dark-card"></div>
                <div className="pl-6">
                    <p className="text-sm text-text-secondary mb-1">{entry.date}</p>
                    <h4 className="text-xl font-bold text-text-primary mb-4">Version {entry.version}</h4>
                    {Object.entries(entry.changes).map(([type, items]) => (
                        <div key={type} className="mb-4">
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${type === 'Added' ? 'bg-green-500/10 text-green-400' : (type === 'Changed' ? 'bg-blue-500/10 text-blue-400' : (type === 'Removed' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'))}`}>
                                {type}
                            </span>
                            <ul className="mt-2 space-y-2 list-disc list-inside text-text-secondary">
                                {items.map((item, i) => <li key={i}><ParseChangelogLine line={item} /></li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);


const ChangelogSection: React.FC = () => (
    <section id="changelog" className="py-20 bg-dark-bg scroll-mt-24">
        <div className="container mx-auto px-6">
             <div className="text-center mb-16">
                 <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">Project <span className="text-cyan-accent">Changelog</span></h2>
                 <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                     Following all notable changes and updates to the AgentBash platform.
                 </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <ChangelogDisplay />
            </div>
        </div>
    </section>
);


const AboutSection: React.FC = () => (
    <section id="about" className="py-20 bg-dark-card scroll-mt-24">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
                 <div className="flex justify-center items-center space-x-4 mb-6">
                    <BashLogoIcon className="w-16 h-16 text-cyan-accent" />
                    <div>
                         <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-left">About AgentBash</h2>
                         <p className="text-text-secondary text-left">Empowering creators to build faster.</p>
                    </div>
                 </div>
                 <p className="text-text-secondary text-left mb-12">
                     AgentBash leverages a sophisticated multi-agent architecture, allowing it to understand complex requirements and generate high-quality, platform-native automation scripts. Our mission is to revolutionize developer productivity by bridging the gap between human language and machine execution. From game development to web app deployment, our AI is your trusted partner in turning ideas into reality.
                 </p>

                 <div className="border-t border-border-dark pt-12 text-left">
                     <h3 className="text-2xl font-bold text-text-primary mb-2">From the Developer</h3>
                     <p className="text-text-secondary mb-6">
                         Crafted with passion by <a href="https://subatomicerror.github.io/iamyashramteke/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-accent hover:underline">Yash R.</a> (<a href="https://github.com/subatomicERROR/" target="_blank" rel="noopener noreferrer" className="font-mono text-cyan-accent hover:underline">@subatomicERROR</a>), a solo developer dedicated to building the future of AI-powered tools.
                     </p>
                     <div className="flex flex-wrap items-center gap-4">
                         <a href="https://github.com/subatomicERROR/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-cyan-accent transition-colors">
                             <GitHubIcon className="w-5 h-5" />
                             <span>GitHub</span>
                         </a>
                         <a href="https://subatomicerror.github.io/iamyashramteke/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-cyan-accent transition-colors">
                             <LinkIcon className="w-5 h-5" />
                             <span>Portfolio</span>
                         </a>
                         <a href="https://instagram.com/iamyash.io" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-cyan-accent transition-colors">
                             <InstagramIcon className="w-5 h-5" />
                             <span>Personal</span>
                         </a>
                         <a href="https://instagram.com/subatomicerror" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text-secondary hover:text-cyan-accent transition-colors">
                             <InstagramIcon className="w-5 h-5" />
                             <span>Business</span>
                         </a>
                     </div>
                      <p className="text-xs text-text-secondary mt-8">
                        The official AgentBash application is available at <a href="https://agentbash.vercel.app" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">agentbash.vercel.app</a>
                     </p>
                 </div>
            </div>
        </div>
    </section>
);


const Footer: React.FC<{ onNavClick: NavClickHandler }> = ({ onNavClick }) => (
    <footer className="bg-dark-bg border-t border-border-dark">
        <div className="container mx-auto px-6 py-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Ready to automate your workflow?</h3>
            <p className="text-text-secondary mb-6">Click "Get Started" to begin your session.</p>
            <div className="flex justify-center space-x-6 mb-8 text-text-secondary">
                 {navLinks.map(link => (
                    <a 
                        key={link.id}
                        href={`#${link.id}`} 
                        onClick={(e) => onNavClick(e, link.id)} 
                        className="hover:text-cyan-accent transition-colors"
                    >
                        {link.label}
                    </a>
                 ))}
            </div>
            <div className="border-t border-border-dark pt-8">
                <p className="text-text-secondary text-sm text-center">
                    &copy; {new Date().getFullYear()} AgentBash. All Rights Reserved.
                </p>
            </div>
        </div>
    </footer>
);

const HomePage: React.FC<HomePageProps> = ({ user, onGetStarted, onSignOut }) => {
    const [activeSection, setActiveSection] = useState('home');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersect, { 
            rootMargin: "-40% 0px -60% 0px" // Trigger when section is in the middle of the viewport
        });

        const sections = document.querySelectorAll('section[id], div[id="home"]');
        sections.forEach(section => observer.current?.observe(section));

        return () => {
            sections.forEach(section => observer.current?.unobserve(section));
        };
    }, []);

    const handleNavClick: NavClickHandler = (event, targetId) => {
        event.preventDefault();
        if (targetId === 'home') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
             return;
        }
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

  return (
    <div id="home" className="bg-dark-bg scroll-mt-20">
      <Header user={user} onGetStarted={onGetStarted} onNavClick={handleNavClick} onSignOut={onSignOut} activeSection={activeSection} />
      <main>
        <div
          className="relative flex items-center min-h-screen p-4 pt-32 pb-16 overflow-hidden isolate"
        >
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Upgraded Animated Gradient Background */}
                <div className="absolute inset-0 animate-gradient-spin" style={{ animationDuration: '40s' }}>
                    <div className="absolute -top-1/4 left-0 w-3/4 h-3/4 bg-gradient-to-br from-magic-pink via-space-blue rounded-full opacity-50 filter blur-3xl"></div>
                    <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-accent via-blur-purple rounded-full opacity-50 filter blur-3xl"></div>
                </div>
            </div>
            
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-bg/80 via-transparent to-dark-bg"></div>
            
            <div className="relative z-10 container mx-auto px-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Text Content & CTA */}
                    <div className="text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-text-primary leading-tight">
                            Automate Your Workflow with <br/> Agent<span className="text-cyan-accent">Bash</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0">
                           Generate scripts that build and run entire applications from a single prompt. From your terminal to the cloud, let AI accelerate your development.
                        </p>
                         <div className="mt-10 flex justify-center lg:justify-start">
                           <button
                                onClick={onGetStarted}
                                className="bg-dark-bg text-cyan-accent border-2 border-cyan-accent font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-accent/20 hover:bg-cyan-accent/10 hover:shadow-xl hover:shadow-cyan-accent/40"
                            >
                               {user ? "Start New Session" : "Get Started For Free"}
                            </button>
                        </div>
                    </div>
                    {/* Right Column: Animated Terminal */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-8 bg-cyan-accent/10 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                        <div className="relative">
                            <AnimatedTerminal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FeaturesSection />
        <UseCasesSection />
        <GuideSection />
        <PricingSection onCTAClick={onGetStarted} />
        <ChangelogSection />
        <AboutSection />
      </main>
      <Footer onNavClick={handleNavClick} />
    </div>
  );
};

export default HomePage;