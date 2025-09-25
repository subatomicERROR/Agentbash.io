import React, { useEffect } from 'react';
import { Agent, ProjectTemplate } from '../types';
import { TEMPLATES } from '../data/projectTemplates';

interface TemplateSelectorProps {
  agent: Agent;
  onSelect: (template: ProjectTemplate) => void;
  onBack: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ agent, onSelect, onBack }) => {
  const templates = TEMPLATES[agent] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-dark-bg">
      <div className="text-center mb-12 animate-fade-in-up w-full max-w-7xl">
        <div className="relative flex items-center justify-center mb-4">
             <button 
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-medium text-text-primary bg-dark-card rounded-md hover:bg-dark-bg border border-border-dark hover:border-cyan-accent/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-accent"
              >
                &larr; Back to Agents
            </button>
            <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">Choose a <span className="text-cyan-accent">Template</span></h2>
                <p className="text-md sm:text-lg text-text-secondary mt-2">
                    Start your <span className="text-cyan-accent/80 font-semibold">{agent}</span> project with a common setup.
                </p>
            </div>
        </div>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
        {templates.map((template) => {
          const { name, description, Icon } = template;
          return (
            <button
              key={name}
              onClick={() => onSelect(template)}
              className="group h-full flex flex-col items-center text-center p-6 bg-dark-card rounded-lg border border-border-dark hover:border-cyan-accent hover:shadow-2xl hover:shadow-cyan-accent/10 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-accent"
            >
              <Icon className="w-16 h-16 mb-5 text-text-secondary group-hover:text-cyan-accent transition-colors duration-300 transform group-hover:scale-110" />
              <h4 className="text-xl font-semibold text-text-primary mb-2">{name}</h4>
              <p className="text-sm text-text-secondary flex-grow">{description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;