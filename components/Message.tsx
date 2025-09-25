import React, { useState } from 'react';
import { ChatMessage, MessageSender, Agent, OperatingSystem, SavedScript, InteractivePlan as InteractivePlanType } from '../types';
import CodeBlock from './CodeBlock';
import { UserIcon, AIIcon, ClipboardIcon, CheckIcon, SaveIcon, EditIcon, DownloadIcon, CloseIcon } from './Icons';
import WebSearchTool from './WebSearchTool';
import InteractivePlan from './InteractivePlan';
import { useToast } from './ToastProvider';

interface MessageProps {
  message: ChatMessage;
  agents: Agent[];
  os: OperatingSystem;
  onEditSubmit: (messageId: string, newContent: string) => void;
  onPlanConfirm: (selections: Record<string, string | string[]>) => void;
  onTriggerDownload: (filename: string) => void;
}

const SaveScriptModal: React.FC<{
  script: { code: string; language: string; defaultName: string };
  onClose: () => void;
  onSave: (name: string) => void;
}> = ({ script, onClose, onSave }) => {
  const [name, setName] = useState(script.defaultName);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up p-4" onClick={onClose}>
      <div className="bg-dark-card border border-border-dark rounded-lg max-w-lg w-full flex flex-col shadow-2xl shadow-cyan-accent/10" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-border-dark">
          <div className="flex items-center space-x-3">
            <SaveIcon className="w-6 h-6 text-cyan-accent" />
            <h2 className="text-xl font-bold text-text-primary">Save Script to Book</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-text-secondary hover:bg-dark-bg hover:text-cyan-accent">
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="scriptName" className="block text-sm font-medium text-text-primary mb-2">Script Name</label>
              <input
                id="scriptName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-dark-bg text-text-primary border border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                required
                autoFocus
              />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">Script Preview</p>
              <pre className="bg-dark-bg rounded-md p-3 max-h-40 overflow-y-auto text-xs text-text-secondary font-mono border border-border-dark">
                <code>{script.code}</code>
              </pre>
            </div>
          </div>
          <footer className="flex justify-end items-center p-4 bg-dark-bg border-t border-border-dark rounded-b-lg space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-dark-card rounded-md hover:bg-border-dark transition-colors border border-border-dark">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-dark-bg bg-cyan-accent rounded-md hover:bg-cyan-accent-hover transition-colors">Save Script</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ message, agents, os, onEditSubmit, onPlanConfirm, onTriggerDownload }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [scriptToSave, setScriptToSave] = useState<{ code: string; language: string; defaultName: string } | null>(null);
  const toast = useToast();

  const isUser = message.sender === MessageSender.User;

  // Render a typing indicator for empty AI messages (while streaming)
  if (!isUser && !message.content && (!message.sources || message.sources.length === 0)) {
    return null; // The main thinking indicator in ChatInterface now handles this
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content).then(() => {
        toast.addToast('Message copied to clipboard', 'success');
    }, () => {
        toast.addToast('Failed to copy message', 'error');
    });
  };

  const handleSaveScript = () => {
    // Regex to find all code blocks and their optional language
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const matches = [...message.content.matchAll(codeBlockRegex)];

    if (matches.length === 0) {
      toast.addToast("Could not find any code blocks in this message.", 'error');
      return;
    }

    let bestMatch: { language: string, code: string } | null = null;

    // 1. Prioritize 'bash' or 'powershell' scripts as they are the main output
    const mainScripts = matches
      .map(m => ({ language: m[1] || 'text', code: m[2].trim() }))
      .filter(m => m.language === 'bash' || m.language === 'powershell');

    if (mainScripts.length > 0) {
      // If there's more than one, pick the longest one
      bestMatch = mainScripts.reduce((a, b) => a.code.length > b.code.length ? a : b);
    } else {
      // 2. Fallback: if no bash/powershell, find the longest code block of any type
      const allScripts = matches.map(m => ({ language: m[1] || 'text', code: m[2].trim() }));
      if (allScripts.length > 0) {
        bestMatch = allScripts.reduce((a, b) => a.code.length > b.code.length ? a : b);
      }
    }

    if (!bestMatch) {
      toast.addToast("Could not identify a primary script to save.", 'error');
      return;
    }

    const { language, code } = bestMatch;

    // "Hyperintelligent" name detection
    let defaultName = `script-${Date.now()}`;
    const fileNameRegex = /(?:nano|notepad)\s+([a-zA-Z0-9._-]+)/;
    const fileNameMatch = message.content.match(fileNameRegex);

    if (fileNameMatch && fileNameMatch[1]) {
      // Remove extension for a cleaner name
      defaultName = fileNameMatch[1].split('.').slice(0, -1).join('.') || fileNameMatch[1];
    } else {
      // Fallback: use the first line of the message if it's not a header
      const firstLine = message.content.split('\n')[0].trim();
      if (firstLine && !firstLine.startsWith('#') && firstLine.length < 60) {
        defaultName = firstLine.replace(/[^a-zA-Z0-9\s-]/g, '').substring(0, 50).trim();
      }
    }
    
    setScriptToSave({ code, language, defaultName });
    setIsSaveModalOpen(true);
  };
  
  const handleConfirmSave = (name: string) => {
    if (!scriptToSave) return;
    const { code, language } = scriptToSave;

    try {
      const savedScriptsRaw: any[] = JSON.parse(localStorage.getItem('agentbash_saved_scripts') || '[]');
      const savedScripts: SavedScript[] = savedScriptsRaw.map(s => {
          if (s.agent && !s.agents) {
              const { agent, ...rest } = s;
              return { ...rest, agents: [agent] };
          }
           if (!s.agents) {
              return { ...s, agents: [] };
          }
          return s;
      });

      const newScript: SavedScript = {
        id: Date.now().toString(),
        name,
        code,
        language,
        agents,
        os,
        createdAt: new Date().toISOString(),
      };

      savedScripts.unshift(newScript);
      localStorage.setItem('agentbash_saved_scripts', JSON.stringify(savedScripts));
      toast.addToast(`Script "${name}" saved to your Script Book!`, 'success');
    } catch (error) {
      console.error("Failed to save script:", error);
      toast.addToast("An error occurred while saving the script.", 'error');
    } finally {
      setIsSaveModalOpen(false);
      setScriptToSave(null);
    }
  };

  const handleEditSave = () => {
    if (editedContent.trim() && editedContent.trim() !== message.content.trim()) {
      onEditSubmit(message.id, editedContent);
    }
    setIsEditing(false);
  };
  
  const handleEditCancel = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  if (isEditing && isUser) {
    return (
        <div className="my-3 w-full max-w-4xl mx-auto animate-fade-in-up px-2 sm:px-0">
            <div className="bg-dark-card border border-cyan-accent/50 rounded-xl p-4 shadow-2xl shadow-cyan-accent/10">
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-3 bg-dark-bg text-text-primary rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-cyan-accent border border-border-dark font-sans text-base leading-relaxed"
                    rows={Math.min(15, Math.max(5, editedContent.split('\n').length))}
                    autoFocus
                />
                <div className="flex justify-end gap-3 mt-3">
                    <button onClick={handleEditCancel} className="px-4 py-2 text-sm font-medium text-text-primary bg-dark-bg rounded-md hover:bg-border-dark transition-colors border border-border-dark">Cancel</button>
                    <button onClick={handleEditSave} className="px-4 py-2 text-sm font-medium text-dark-bg bg-cyan-accent rounded-md hover:bg-cyan-accent-hover transition-colors">Save & Submit</button>
                </div>
            </div>
        </div>
    );
  }

  const renderContent = () => {
    // Check for the special interactive plan block
    const planRegex = /```interactive-plan\n([\s\S]*?)```/;
    const planMatch = message.content.match(planRegex);

    if (!isUser && planMatch && planMatch[1]) {
        try {
            const planData: InteractivePlanType = JSON.parse(planMatch[1]);
            const introText = message.content.split('```interactive-plan')[0].trim();
            
            return (
                <>
                    {message.sources && message.sources.length > 0 && <WebSearchTool sources={message.sources} />}
                    <div className="prose prose-p:my-0 text-dark-bg max-w-none">
                        {introText.split('\n').map((line, i) => <p key={i} className="min-h-[1rem]">{line}</p>)}
                    </div>
                    <InteractivePlan plan={planData} onConfirm={onPlanConfirm} />
                </>
            );
        } catch (e) {
            console.error("Failed to parse interactive plan JSON:", e);
            // Fallback to showing raw text if JSON is invalid
        }
    }

    const combinedRegex = /(```[\s\S]*?```|\[.*?\]\(download_zip:.*?\))/g;
    const parts = message.content.split(combinedRegex).filter(part => part);

    const contentParts = parts.map((part, index) => {
      const codeMatch = part.match(/^```(\w+)?\n?([\s\S]+)```$/);
      if (codeMatch) {
        const language = codeMatch[1] || 'bash';
        const code = codeMatch[2];
        return <CodeBlock key={index} language={language} code={code} />;
      }

      const downloadMatch = part.match(/^\[(.*?)\]\(download_zip:(.*?)\)$/);
      if (downloadMatch) {
          const linkText = downloadMatch[1];
          const filename = downloadMatch[2];
          return (
              <p key={index} className="my-2">
                  <button
                      onClick={() => onTriggerDownload(filename)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-dark-bg border border-cyan-accent text-cyan-accent font-semibold rounded-lg hover:bg-cyan-accent/10 transition-all transform hover:scale-105 active:scale-100"
                  >
                      <DownloadIcon className="w-5 h-5" />
                      {linkText || `Download ${filename}`}
                  </button>
              </p>
          );
      }
      
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split('\n').map((line, i) => (
             <p key={i} className="min-h-[1rem]">{line}</p>
          ))}
        </div>
      );
    });

    return (
        <>
            {message.sources && message.sources.length > 0 && <WebSearchTool sources={message.sources} />}
            <div className={`prose ${isUser ? 'prose-invert' : 'prose-p:my-0 text-dark-bg'} max-w-none`}>
                {contentParts}
            </div>
        </>
    );
  };
  
  const hasCode = !isUser && (message.content.includes('```') || message.content.includes('### File:'));

  return (
    <>
      <div className={`group flex animate-fade-in-up items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
          {!isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-bg flex items-center justify-center border border-border-dark">
                  <AIIcon className="w-5 h-5 text-cyan-accent" />
              </div>
          )}

          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                  className={`max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-xl px-4 py-3 text-left ${
                  isUser
                      ? 'bg-dark-card text-text-primary border border-cyan-accent/50'
                      : 'bg-cyan-accent text-dark-bg border border-border-dark shadow-lg shadow-cyan-accent/20'
                  }`}
              >
                  {renderContent()}
              </div>
              <div className={`flex items-center justify-end gap-1 mt-2 transition-opacity opacity-0 group-hover:opacity-100 ${isUser ? 'text-text-secondary' : 'text-text-secondary'}`}>
                  {isUser && (
                      <button title="Edit & Resubmit" onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors">
                          <EditIcon className="w-4 h-4" />
                      </button>
                  )}
                  <button title="Copy Message" onClick={handleCopyMessage} className="p-2 rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors">
                      <ClipboardIcon className="w-4 h-4" />
                  </button>
                  {!isUser && (
                      <button 
                          title={hasCode ? "Save Script to Book" : "No script to save"} 
                          onClick={handleSaveScript} 
                          disabled={!hasCode}
                          className="p-2 rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          <SaveIcon className="w-4 h-4" />
                      </button>
                  )}
              </div>
          </div>

          {isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-bg flex items-center justify-center border border-border-dark">
                  <UserIcon className="w-5 h-5 text-text-secondary" />
              </div>
          )}
      </div>

      {isSaveModalOpen && scriptToSave && (
        <SaveScriptModal
          script={scriptToSave}
          onClose={() => setIsSaveModalOpen(false)}
          onSave={handleConfirmSave}
        />
      )}
    </>
  );
};

export default Message;