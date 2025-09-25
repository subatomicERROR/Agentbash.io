import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { Toast, ToastType, ToastContextType } from '../types';
import { CheckIcon, CloseIcon } from './Icons';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    setToasts(prevToasts => [newToast, ...prevToasts]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const getIcon = (type: ToastType) => {
    switch(type) {
      case 'success': return <CheckIcon className="w-5 h-5" />;
      case 'error': return <CloseIcon className="w-5 h-5" />;
      default: return null;
    }
  }

  const getColors = (type: ToastType) => {
    switch(type) {
      case 'success': return 'bg-green-500/90 border-green-400';
      case 'error': return 'bg-red-500/90 border-red-400';
      default: return 'bg-blue-500/90 border-blue-400';
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] w-full max-w-xs space-y-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-start justify-between w-full p-4 text-text-primary rounded-lg shadow-lg border backdrop-blur-sm animate-fade-in-up ${getColors(toast.type)}`}
            role={toast.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0">{getIcon(toast.type)}</span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 -mr-2 -mt-2 text-text-primary/70 rounded-full hover:bg-white/20"
              aria-label="Dismiss"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};