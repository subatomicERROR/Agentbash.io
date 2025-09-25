import React from 'react';
import { OperatingSystem } from '../types';
import { WindowsIcon, LinuxIcon } from './Icons';

interface OperatingSystemSelectorProps {
  onSelect: (os: OperatingSystem) => void;
}

const OS_OPTIONS = [
  { 
    os: OperatingSystem.Windows, 
    Icon: WindowsIcon,
    description: "Generate PowerShell scripts for Windows environments."
  },
  { 
    os: OperatingSystem.Linux,
    Icon: LinuxIcon,
    description: "Generate Bash scripts for Linux-based systems."
  },
];

const OperatingSystemSelector: React.FC<OperatingSystemSelectorProps> = ({ onSelect }) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
        {OS_OPTIONS.map(({ os, Icon, description }) => (
          <button
            key={os}
            onClick={() => onSelect(os)}
            className="group flex flex-col items-center p-6 sm:p-8 bg-dark-card rounded-lg border border-border-dark hover:border-cyan-accent hover:shadow-2xl hover:shadow-cyan-accent/10 transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-accent"
          >
            <Icon className="w-20 h-20 sm:w-24 sm:h-24 mb-6 text-text-secondary group-hover:text-cyan-accent transition-all duration-300 transform group-hover:scale-110" />
            <h3 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-2">{os}</h3>
            <p className="text-text-secondary text-center">{description}</p>
          </button>
        ))}
      </div>
  );
};

export default OperatingSystemSelector;