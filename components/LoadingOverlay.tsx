import React from 'react';
import { BashLogoIcon } from './Icons';

const LoadingOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
      aria-label="Loading content"
      role="status"
    >
      <div className="relative w-24 h-24">
        <BashLogoIcon className="w-full h-full text-cyan-accent animate-pulse" />
      </div>
      <p className="mt-4 text-lg font-semibold text-text-primary animate-pulse">
        Agent is coming online...
      </p>
    </div>
  );
};

export default LoadingOverlay;
