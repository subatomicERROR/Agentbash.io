import React, { useEffect } from 'react';
import { Agent } from '../types';
import { CheckIcon } from './Icons';
import { AGENT_CATEGORIES } from '../data/agents';

interface AgentSelectorProps {
  onSelect: (agent: Agent) => void;
  onBack: () => void;
  existingAgents?: Agent[];
  hideBackButton?: boolean;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ onSelect, onBack, existingAgents = [], hideBackButton = false }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 sm:p-8 bg-dark-bg">
      <div className="text-center mb-12 animate-fade-in-up w-full max-w-7xl relative">
         {!hideBackButton && (
            <button 
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-medium text-text-primary bg-dark-card rounded-md hover:bg-dark-bg border border-border-dark hover:border-cyan-accent/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent"
            >
                &larr; Back
            </button>
         )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-text-primary">Select Your <span className="text-cyan-accent">Automation Engine</span></h2>
        <p className="text-md sm:text-lg text-text-secondary">Choose a specialist to generate your entire workflow.</p>
      </div>
      <div className="w-full max-w-7xl space-y-12 animate-fade-in-up">
        {AGENT_CATEGORIES.map((category) => (
          <div key={category.title}>
            <h3 className={`text-2xl font-semibold mb-6 border-b-2 border-border-dark pb-2 ${category.title === 'Recommended' ? 'text-yellow-400' : 'text-cyan-accent/80'}`}>{category.title}</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 ${category.title === 'Recommended' ? '!grid-cols-1' : ''}`}>
              {category.agents.map(({ agent, Icon, description }) => {
                const isDisabled = existingAgents.includes(agent);
                const isRecommended = category.title === 'Recommended';
                return (
                  <button
                    key={agent}
                    disabled={isDisabled}
                    onClick={() => onSelect(agent)}
                    className={`relative group h-full flex flex-col items-center text-center p-4 sm:p-6 bg-dark-card rounded-lg border transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-accent ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed border-border-dark'
                        : isRecommended
                        ? 'border-2 border-yellow-400/50 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/10 hover:-translate-y-2'
                        : 'border-border-dark hover:border-cyan-accent hover:shadow-2xl hover:shadow-cyan-accent/10 hover:-translate-y-2'
                    } ${isRecommended ? 'sm:flex-row sm:text-left sm:items-start sm:p-8' : ''}`}
                  >
                    {isDisabled && (
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-cyan-accent text-dark-bg text-xs font-bold px-2 py-1 rounded-full">
                            <CheckIcon className="w-3 h-3" />
                            <span>ACTIVE</span>
                        </div>
                    )}
                    <Icon className={`mb-5 text-text-secondary transition-colors duration-300 ${!isDisabled ? (isRecommended ? 'group-hover:text-yellow-400' : 'group-hover:text-cyan-accent group-hover:scale-110') : ''} ${isRecommended ? 'w-20 h-20 sm:w-24 sm:h-24 sm:mb-0 sm:mr-8 flex-shrink-0' : 'w-14 h-14 sm:w-16 sm:h-16'}`} />
                    <div className="flex flex-col flex-grow">
                      <h4 className={`font-semibold text-text-primary mb-2 ${isRecommended ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{agent}</h4>
                      <p className={`text-sm text-text-secondary flex-grow ${isRecommended ? 'sm:text-base' : ''}`}>{description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSelector;