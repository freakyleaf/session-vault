import { createContext } from 'react';

import type { Toast } from 'primereact/toast';
import type { TToastSeverity } from '@shared-root/src/lib/types';

export interface ToastContextType {
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  showToast: (message: string, severity?: TToastSeverity) => void;
  showWarning: (message: string) => void;
  toast: React.RefObject<Toast>;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
