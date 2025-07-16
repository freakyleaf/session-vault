import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getCurrentEnvironment } from '@backend-src/lib/utils/bxGetCurrentEnvironment';
import { queryClient } from '@backend-src/lib/bxQueryClient';

import { ENVIRONMENT_PRODUCTION } from '@shared-src/lib/constants';

import type { ReactNode } from 'react';

interface BxQueryProviderProps {
  children: ReactNode;
}

export const BxQueryProvider = ({ children }: BxQueryProviderProps) => {
  const { currentEnvironment } = getCurrentEnvironment();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {currentEnvironment !== ENVIRONMENT_PRODUCTION && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
