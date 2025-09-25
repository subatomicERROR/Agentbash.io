import React, { useState, useEffect, useRef } from 'react';
import { OperatingSystem, User } from '../types';
import { BashLogoIcon, CheckIcon, ClipboardIcon, ChevronRightIcon, TerminalIcon, FileCodeIcon, PlayIcon, WindowsIcon, LinuxIcon } from './Icons';
import { ONBOARDING_SCRIPTS } from '../data/onboardingScripts';
import { useToast } from './ToastProvider';

interface OnboardingWizardPageProps {
    user: User;
    onContinue: () => void;
    onSignOut: () => void;
    onBack: () => void;
}

const OS_OPTIONS = [
  { 
    os: OperatingSystem.Windows, 
    Icon: WindowsIcon,
    description: "Generate PowerShell scripts for Windows."
  },
  { 
    os: OperatingSystem.Linux,
    Icon: LinuxIcon,
    description: "Generate Bash scripts for Linux-based systems."
  },
];

const OnboardingWizardPage: React.FC<OnboardingWizardPageProps> = ({ user, onContinue, onSignOut, onBack }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [profileInput, setProfileInput] = useState('');
    const [isScriptCopied, setIsScriptCopied] = useState(false);
    const [copiedCommand, setCopiedCommand] = useState<'create' | 'run' | null>(null);
    const [selectedOs, setSelectedOs] = useState<OperatingSystem | null>(null);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [isSyncCompleted, setIsSyncCompleted] = useState(false);
    
    const [syncStepVisibility, setSyncStepVisibility] = useState({
        create: true,
        pasteScript: false,
        run: false,
        pasteProfile: false,
    });
    
    const pasteScriptRef = useRef<HTMLDivElement>(null);
    const runStepRef = useRef<HTMLDivElement>(null);
    const pasteStepRef = useRef<HTMLDivElement>(null);

    const toast = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    const handleScriptCopy = (scriptCode: string) => {
        navigator.clipboard.writeText(scriptCode).then(() => {
            setIsScriptCopied(true);
            toast.addToast('Script copied to clipboard!', 'success');
            if (!syncStepVisibility.run) {
                setSyncStepVisibility(prev => ({ ...prev, run: true }));
                setTimeout(() => runStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            }
            setTimeout(() => {
                setIsScriptCopied(false);
            }, 2000);
        }, () => {
            toast.addToast('Failed to copy script.', 'error');
        });
    };

    const handleCommandCopy = (text: string, commandType: 'create' | 'run') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedCommand(commandType);
            toast.addToast(`Command copied!`, 'success');
            if (commandType === 'create' && !syncStepVisibility.pasteScript) {
                setSyncStepVisibility(prev => ({ ...prev, pasteScript: true }));
                setTimeout(() => pasteScriptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            } else if (commandType === 'run' && !syncStepVisibility.pasteProfile) {
                 setSyncStepVisibility(prev => ({ ...prev, pasteProfile: true }));
                 setTimeout(() => pasteStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            }
            setTimeout(() => {
                setCopiedCommand(null);
            }, 2000);
        }, () => {
            toast.addToast('Failed to copy command.', 'error');
        });
    };
    
    const handleCompleteSync = () => {
        if (!profileInput.trim()) {
            setSyncError('Please paste your system profile. Without it, AgentBash is not calibrated and cannot generate tailored scripts, which may cause errors.');
            return;
        }
        if (!selectedOs) {
            toast.addToast('An error occurred: OS not selected.', 'error');
            return;
        }
        setSyncError(null);
        localStorage.setItem('agentbash_system_profile', profileInput);
        localStorage.setItem('agentbash_os', selectedOs);
        toast.addToast('System profile saved!', 'success');
        setIsSyncCompleted(true);
        setCurrentStep(3);
    };
    
    const handleSkipSync = () => {
        if (!selectedOs) {
            toast.addToast('An error occurred: OS not selected.', 'error');
            return;
        }
        localStorage.setItem('agentbash_os', selectedOs);
        localStorage.removeItem('agentbash_system_profile');
        setIsSyncCompleted(false);
        setCurrentStep(3);
    };
    
    const handleOsSelection = (os: OperatingSystem) => {
        setSelectedOs(os);
        setSyncStepVisibility({ create: true, pasteScript: false, run: false, pasteProfile: false });
        setCurrentStep(2);
    };

    const goBackToOsSelection = () => {
      setSyncStepVisibility({ create: true, pasteScript: false, run: false, pasteProfile: false });
      setCurrentStep(1);
    }


    const StepCard: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
        <div className="flex items-start space-x-4 sm:space-x-6 relative">
            <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-bg border-2 border-cyan-accent text-cyan-accent font-bold text-lg sm:text-xl z-10">{number}</div>
            </div>
            <div className="flex-1 pt-1 sm:pt-2 min-w-0">
                <h4 className="text-lg sm:text-xl font-bold text-text-primary mb-3">{title}</h4>
                {children}
            </div>
        </div>
    );
    
    const renderSyncStepContent = () => {
        if (!selectedOs) {
            return <div className="text-center text-red-400">Error: No Operating System selected. Please go back.</div>;
        }

        const isWindows = selectedOs === OperatingSystem.Windows;
        const scriptCode = ONBOARDING_SCRIPTS[selectedOs].sync_agentbash;
        const scriptName = isWindows ? 'sync_agentbash.ps1' : 'sync_agentbash.sh';
        const runHeader = isWindows ? 'Run in PowerShell' : 'Make Executable & Run';
        const createCommand = isWindows ? `notepad ${scriptName}` : `nano ${scriptName}`;
        const runCommands = isWindows ? `.\\${scriptName}` : `chmod +x ${scriptName}\n./${scriptName}`;

        return (
             <div className="w-full max-w-5xl mx-auto text-left animate-fade-in-up">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-text-primary mb-2">Sync With Your Environment</h3>
                    <p className="text-text-secondary">Follow these steps to give AgentBash context for tailored script generation.</p>
                </div>

                <div className="relative">
                    <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-0.5 bg-border-dark"></div>
                    <div className="space-y-0">

                        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${syncStepVisibility.create ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <StepCard number={1} title="Create the File">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="space-y-4">
                                        <p className="text-text-secondary text-sm">First, open a terminal and run this command to create a new script file. This will open a text editor.</p>
                                        <button onClick={handleSkipSync} className="text-cyan-accent/80 text-sm font-semibold hover:text-cyan-accent hover:underline transition-colors">
                                            I'll do this later, skip for now &rarr;
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <pre className="p-2 pr-10 text-xs bg-dark-bg rounded-md border border-border-dark font-mono whitespace-pre-wrap break-words"><code>{createCommand}</code></pre>
                                            <button onClick={() => handleCommandCopy(createCommand, 'create')} title="Copy command" className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 text-cyan-accent rounded-md transition-colors hover:text-cyan-accent-hover">
                                                {copiedCommand === 'create' ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </StepCard>
                        </div>

                         <div ref={pasteScriptRef} className={`transition-all duration-700 ease-in-out overflow-hidden ${syncStepVisibility.pasteScript ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                            <StepCard number={2} title="Paste & Save the Script">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <p className="text-text-secondary text-sm">Now, copy the script below and paste it into the editor you just opened. Then save and close the file.</p>
                                    <div className="bg-dark-bg border border-border-dark rounded-xl text-left overflow-hidden">
                                        <pre className="p-4 overflow-y-auto text-sm max-h-48 bg-dark-card rounded-t-md font-mono whitespace-pre-wrap break-words">{scriptCode}</pre>
                                        <div className="p-3 border-t border-border-dark">
                                            <button onClick={() => handleScriptCopy(scriptCode)} className="w-full flex items-center justify-center bg-cyan-accent text-dark-bg font-bold px-4 py-2 rounded-lg hover:bg-cyan-accent-hover transition-all">
                                                {isScriptCopied ? <CheckIcon className="w-5 h-5 mr-2" /> : <ClipboardIcon className="w-5 h-5 mr-2" />}
                                                {isScriptCopied ? 'Copied!' : 'Copy Script'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </StepCard>
                        </div>

                         <div ref={runStepRef} className={`transition-all duration-700 ease-in-out overflow-hidden ${syncStepVisibility.run ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                            <StepCard number={3} title="Run the Script">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <p className="text-text-secondary text-sm">Finally, run these commands in your terminal to execute the script. It will then print your system profile.</p>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{runHeader}</p>
                                            <div className="relative">
                                                <pre className="p-2 pr-10 text-xs bg-dark-bg rounded-md border border-border-dark font-mono whitespace-pre-wrap break-words"><code>{runCommands}</code></pre>
                                                <button onClick={() => handleCommandCopy(runCommands, 'run')} title="Copy command" className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 text-cyan-accent rounded-md transition-colors hover:text-cyan-accent-hover">
                                                    {copiedCommand === 'run' ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StepCard>
                        </div>

                         <div ref={pasteStepRef} className={`transition-all duration-700 ease-in-out overflow-hidden ${syncStepVisibility.pasteProfile ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
                             <div className="mt-8">
                                <StepCard number={4} title="Paste Your System Profile">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <p className="text-text-secondary text-sm">The script will print a profile in your terminal. Copy the entire block and paste it below to finish.</p>
                                        <textarea
                                            value={profileInput}
                                            onChange={(e) => {
                                                setProfileInput(e.target.value);
                                                if (syncError) setSyncError(null);
                                            }}
                                            placeholder="----- BEGIN SYSTEM PROFILE -----\n(Paste the full output from your terminal here)\n----- END SYSTEM PROFILE -----"
                                            className="w-full h-64 p-4 bg-dark-bg text-text-primary rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-cyan-accent font-mono border border-border-dark"
                                        />
                                    </div>
                                </StepCard>
                             </div>
                             <div className="mt-12 text-center">
                                {syncError && (
                                    <div className="mb-4 max-w-md mx-auto p-4 bg-red-900/30 border border-red-500/50 text-red-400 rounded-xl text-sm animate-fade-in-up text-left shadow-lg">
                                        <p className="font-bold text-red-300 text-base">Not Calibrated</p>
                                        <p className="mt-1">{syncError}</p>
                                    </div>
                                )}
                                <button 
                                    onClick={handleCompleteSync} 
                                    className="group w-full max-w-md flex items-center justify-center mx-auto bg-cyan-accent text-dark-bg font-bold px-8 py-3 rounded-lg text-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105"
                                >
                                    Complete Sync & Continue
                                    <ChevronRightIcon className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                 <div className="mt-6 text-center">
                    <button onClick={goBackToOsSelection} className="text-sm text-text-secondary hover:text-cyan-accent">&larr; Back to OS Selection</button>
                 </div>
            </div>
        );
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-dark-card border-2 border-cyan-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                           <BashLogoIcon className="w-12 h-12 text-cyan-accent" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Welcome, {user.name.split(' ')[0]}!</h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                           To begin calibration, please select your primary operating system. This allows AgentBash to provide you with the correct sync script.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8 max-w-xl mx-auto">
                           {OS_OPTIONS.map(({ os, Icon, description }) => (
                            <button
                                key={os}
                                onClick={() => handleOsSelection(os)}
                                className="group flex flex-col items-center p-6 bg-dark-bg rounded-lg border-2 border-border-dark hover:border-cyan-accent/50 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent"
                            >
                                <Icon className="w-16 h-16 mb-4 text-text-secondary group-hover:text-cyan-accent transition-all duration-300 transform group-hover:scale-110" />
                                <h3 className="text-xl font-semibold text-text-primary mb-2">{os}</h3>
                                <p className="text-sm text-text-secondary text-center">{description}</p>
                            </button>
                           ))}
                        </div>
                    </div>
                );
            case 2:
                return renderSyncStepContent();
            case 3:
                 return (
                    isSyncCompleted ? (
                        <div className="w-full max-w-2xl mx-auto text-center animate-fade-in-up">
                            <div className="w-24 h-24 bg-cyan-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyan-accent/30 animate-pop-in">
                                <CheckIcon className="w-12 h-12 text-cyan-accent" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Calibration Complete!</h2>
                            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
                               AgentBash is now synced with your environment and ready to generate tailored automations for you.
                            </p>
                            <button onClick={onContinue} className="group flex items-center justify-center mx-auto bg-dark-bg text-cyan-accent border-2 border-cyan-accent font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-accent/20 hover:bg-cyan-accent/10 hover:shadow-xl hover:shadow-cyan-accent/40">
                                Enter Dashboard
                               <ChevronRightIcon className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-2xl mx-auto text-center animate-fade-in-up">
                            <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-400/30 animate-pop-in">
                                <TerminalIcon className="w-12 h-12 text-yellow-400" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Onboarding Incomplete</h2>
                            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
                                <span className="text-cyan-accent font-semibold">[You have skipped the system sync.]</span> AgentBash will use default settings. You can run the sync process again from your dashboard at any time for more accurate script generation.
                            </p>
                            <button onClick={onContinue} className="group flex items-center justify-center mx-auto bg-dark-bg text-cyan-accent border-2 border-cyan-accent font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-accent/20 hover:bg-cyan-accent/10 hover:shadow-xl hover:shadow-cyan-accent/40">
                                Enter Dashboard
                               <ChevronRightIcon className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    )
                );
            default:
                return null;
        }
    }

    const ProgressStep: React.FC<{ step: number; label: string }> = ({ step, label }) => (
        <div className="flex flex-col items-center" aria-current={currentStep === step ? "step" : undefined}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= step ? 'bg-cyan-accent border-cyan-accent text-dark-bg' : 'bg-dark-card border-border-dark text-text-secondary'}`}>
                {currentStep > step ? <CheckIcon className="w-5 h-5"/> : <span className="font-bold">{step}</span>}
            </div>
            <p className={`mt-2 text-xs font-semibold transition-colors duration-500 ${currentStep >= step ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</p>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-dark-bg text-text-primary">
            <header className="flex items-center justify-between p-4 bg-dark-bg border-b border-border-dark flex-shrink-0 z-20">
                <div className="flex items-center space-x-4">
                     <button onClick={onBack} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-cyan-accent transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span>Back</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <BashLogoIcon className="w-7 h-7 text-cyan-accent" />
                        <h1 className="text-xl font-bold">Agent<span className="text-cyan-accent">Bash</span></h1>
                    </div>
                </div>
                 <div className="relative">
                    <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-cyan-accent" aria-label="User Menu">
                        <img src={user.picture} alt={user.name} className="w-full h-full rounded-full" />
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-dark-card border border-border-dark rounded-lg shadow-lg z-50 animate-pop-in">
                            <div className="p-4 border-b border-border-dark"><p className="font-semibold text-text-primary truncate">{user.name}</p><p className="text-sm text-text-secondary truncate">{user.email}</p></div>
                            <div className="p-2"><button onClick={onSignOut} className="w-full text-left px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors">Sign Out</button></div>
                        </div>
                    )}
                </div>
            </header>
            
            <main className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-center justify-center min-h-full p-4 sm:p-8">
                    <div className="w-full max-w-7xl bg-dark-card border border-border-dark rounded-2xl shadow-2xl shadow-cyan-accent/5 p-6 sm:p-10 my-8">
                        <div className="w-full max-w-md mx-auto mb-10 sm:mb-16 animate-fade-in-up">
                            <div className="flex items-center justify-between">
                               <ProgressStep step={1} label="Welcome" />
                               <div className={`flex-1 h-0.5 mx-4 transition-colors duration-500 ${currentStep > 1 ? 'bg-cyan-accent' : 'bg-border-dark'}`} role="separator"></div>
                               <ProgressStep step={2} label="Sync" />
                               <div className={`flex-1 h-0.5 mx-4 transition-colors duration-500 ${currentStep > 2 ? 'bg-cyan-accent' : 'bg-border-dark'}`} role="separator"></div>
                               <ProgressStep step={3} label="Complete" />
                            </div>
                        </div>
                        {renderStepContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingWizardPage;