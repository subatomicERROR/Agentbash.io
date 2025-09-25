import React, { useEffect, useState } from 'react';
import { BashLogoIcon, GoogleIcon, GitHubIcon, UserIcon, ClipboardIcon, CheckIcon } from './Icons';
import { User } from '../types';
import AnimatedTerminal from './AnimatedTerminal';
import { useToast } from './ToastProvider';


interface SignInPageProps {
  onSignInSuccess: (response: any) => void;
  onBackToHome: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignInSuccess, onBackToHome }) => {
    const [origin, setOrigin] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const toast = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
        setOrigin(window.location.origin);

        // Ensure the Google Identity Services library is loaded
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
                client_id: "979452344002-beummuth4uo4erp0mak4k3st1h05sa6p.apps.googleusercontent.com",
                callback: onSignInSuccess
            });
        }
    }, [onSignInSuccess]);
    
    const handleGoogleSignIn = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.prompt();
        } else {
            console.error("Google Sign-In is not initialized.");
            toast.addToast("Google Sign-In is not ready. Please try again in a moment.", 'error');
        }
    };

    const handleCopyOrigin = () => {
        navigator.clipboard.writeText(origin).then(() => {
            setIsCopied(true);
            toast.addToast('URL copied to clipboard!', 'success');
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-dark-bg text-text-primary font-sans overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <BashLogoIcon className="w-8 h-8 text-cyan-accent" />
                        <h1 className="text-2xl font-bold">Agent<span className="text-cyan-accent">Bash</span></h1>
                    </div>
                    <button 
                        onClick={onBackToHome}
                        className="px-4 py-2 text-sm font-medium text-text-primary bg-dark-card/50 backdrop-blur-sm rounded-lg hover:bg-dark-bg border border-border-dark hover:border-cyan-accent/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                    >
                       &larr; Back to Home
                    </button>
                </div>
            </header>

            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 animate-gradient-spin" style={{ animationDuration: '40s' }}>
                    <div className="absolute -top-1/4 left-0 w-3/4 h-3/4 bg-gradient-to-br from-magic-pink via-space-blue rounded-full opacity-50 filter blur-3xl"></div>
                    <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-cyan-accent via-blur-purple rounded-full opacity-50 filter blur-3xl"></div>
                </div>
            </div>
            <div className="absolute inset-0 z-0 bg-dark-bg/50"></div>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 z-10">
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left: Animated Terminal Showcase (hidden on smaller screens) */}
                    <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <AnimatedTerminal />
                    </div>

                    {/* Right: Sign-In Panel */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right animate-fade-in-up">
                        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 leading-tight">
                            Sign in to <br/>Agent<span className="text-cyan-accent">Bash</span>
                        </h2>
                        <p className="text-lg text-text-secondary max-w-md mb-8">
                            Automate your entire development workflow, from terminal to cloud.
                        </p>

                        <div className="w-full max-w-sm bg-dark-card/60 backdrop-blur-lg border border-border-dark rounded-xl p-8 shadow-2xl shadow-cyan-accent/10">
                            {/* Dynamic Origin Help Box */}
                            <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-300 rounded-lg p-4 text-left text-xs mb-6 animate-fade-in-up">
                                <p className="font-bold text-yellow-200 text-sm mb-2">Configuration Help</p>
                                <p className="mb-3">To fix the sign-in error, add this exact URL to your Google Cloud Console's "Authorized JavaScript origins":</p>
                                <div className="flex items-center bg-dark-bg rounded-md p-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={origin}
                                        className="flex-grow bg-transparent text-cyan-accent font-mono text-xs focus:outline-none"
                                    />
                                    <button onClick={handleCopyOrigin} className="p-1.5 text-text-secondary hover:text-cyan-accent transition-colors">
                                        {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center space-y-4">
                                <button 
                                    onClick={handleGoogleSignIn}
                                    className="w-full flex items-center justify-center gap-3 bg-dark-card text-text-primary py-3 px-4 rounded-full font-semibold text-base border border-border-dark hover:bg-dark-bg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent"
                                >
                                    <GoogleIcon className="w-6 h-6 text-cyan-accent" />
                                    <span>Sign in with Google</span>
                                </button>
                                <button 
                                    disabled
                                    title="Coming soon!"
                                    className="w-full flex items-center justify-center gap-3 bg-dark-card text-text-primary py-3 px-4 rounded-full font-semibold text-base border border-border-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-cyan-accent opacity-50 cursor-not-allowed"
                                >
                                    <GitHubIcon className="w-6 h-6 text-cyan-accent" />
                                    <span>Sign in with GitHub</span>
                                </button>
                            </div>
                            
                            <p className="text-center text-xs text-text-secondary mt-8">
                                By signing in, you agree to the AgentBash Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SignInPage;