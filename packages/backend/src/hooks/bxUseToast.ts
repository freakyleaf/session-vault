import { createContext } from 'react';

import type { Toast } from 'primereact/toast';

export interface ToastContextType {
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showWarningToast: (message: string) => void;
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
