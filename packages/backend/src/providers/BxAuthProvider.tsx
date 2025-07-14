import { setAuthTokenGetter } from '@shared-src/stores/api/storeBaseApi';
import { useAuth } from '@clerk/clerk-react';

import type { ReactNode } from 'react';

interface BxAuthProviderProps {
  children: ReactNode;
}

function BxAuthProvider({ children }: BxAuthProviderProps) {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      setAuthTokenGetter(getToken);
    }
  }, [getToken, isLoaded]);

  // Clean up token getter on unmount
  useEffect(() => {
    return () => {
      setAuthTokenGetter(() => Promise.resolve(null));
    };
  }, []);

  return <>{children}</>;
}

export default BxAuthProvider;
