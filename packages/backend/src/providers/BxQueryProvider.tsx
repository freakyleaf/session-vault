import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@backend-src/lib/bxQueryClient';

import { ENVIRONMENT_PRODUCTION } from '@shared-src/lib/constants';

import type { ReactNode } from 'react';

interface BxQueryProviderProps {
  children: ReactNode;
}

export const BxQueryProvider = ({ children }: BxQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== ENVIRONMENT_PRODUCTION && (
        <ReactQueryDevtools />
      )}
    </QueryClientProvider>
  );
};
