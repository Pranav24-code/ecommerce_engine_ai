import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X, ShoppingBag } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  image?: string;
  title?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: { image?: string; title?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'success', options?: { image?: string; title?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, ...options };
    
    setToasts(prev => [...prev.slice(-4), newToast]); // Limit to 5 max

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Fixed Toast Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-2xl animate-fade-in transition-all duration-300 transform translate-y-0 hover:scale-[1.02]"
          >
            {toast.image ? (
              <img src={toast.image} alt="Thumbnail" className="w-12 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-700" />
            ) : (
              <div className={`p-2.5 rounded-xl shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                toast.type === 'error' ? 'bg-rose-500/10 text-rose-500' :
                'bg-primary-500/10 text-primary-500'
              }`}>
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {toast.type === 'info' && <Info className="w-5 h-5" />}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {toast.title && <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{toast.title}</p>}
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
