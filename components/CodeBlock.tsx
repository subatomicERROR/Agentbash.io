import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-dark-bg rounded-md my-4 border border-border-dark text-text-primary overflow-hidden">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-dark-card/80 backdrop-blur-sm border-b border-border-dark">
        <span className="text-sm font-semibold text-text-secondary select-none">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-xs font-medium text-text-secondary hover:text-cyan-accent transition-colors"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-auto text-sm max-h-[60vh]">
        <code className="font-mono whitespace-pre-wrap break-words">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
