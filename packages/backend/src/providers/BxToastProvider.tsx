import { ToastContext } from '@backend-src/hooks/bxUseToast';

import {
  TOAST_SEVERITY_ERROR,
  TOAST_SEVERITY_INFO,
  TOAST_SEVERITY_SUCCESS,
  TOAST_SEVERITY_WARNING,
} from '@shared-src/lib/constants';

import type { ReactNode } from 'react';
import type { Toast } from 'primereact/toast';
import type { TToastSeverity } from '@shared-src/lib/types';

interface ToastProviderProps {
  children: ReactNode;
}

export const BxToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useRef<Toast>(null!);

  const showToast = useCallback(
    (message: string, severity: TToastSeverity = TOAST_SEVERITY_INFO) => {
      if (!message?.trim()) {
        console.warn('Toast message is empty or invalid');
        return;
      }

      if (toast.current) {
        toast.current.show({
          detail: message,
          severity,
        });
      } else {
        console.warn('Toast ref is not available');
      }
    },
    [],
  );

  const showErrorToast = useCallback(
    (message: string) => {
      showToast(message, TOAST_SEVERITY_ERROR);
    },
    [showToast],
  );

  const showInfoToast = useCallback(
    (message: string) => {
      showToast(message, TOAST_SEVERITY_INFO);
    },
    [showToast],
  );

  const showSuccessToast = useCallback(
    (message: string) => {
      showToast(message, TOAST_SEVERITY_SUCCESS);
    },
    [showToast],
  );

  const showWarningToast = useCallback(
    (message: string) => {
      showToast(message, TOAST_SEVERITY_WARNING);
    },
    [showToast],
  );

  const contextValue = useMemo(
    () => ({
      showErrorToast,
      showInfoToast,
      showSuccessToast,
      showWarningToast,
      toast,
    }),
    [showErrorToast, showInfoToast, showSuccessToast, showWarningToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
