import { Outlet } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

import { useLoadingStore } from '@backend-src/stores/bxLoadingStore';

function BxRouteGuardAuthenticated() {
  const { isLoaded, isSignedIn } = useAuth();
  const { setIsGlobalLoading } = useLoadingStore();

  useEffect(() => {
    setIsGlobalLoading(!isLoaded);
  }, [isLoaded, setIsGlobalLoading]);

  if (!isSignedIn) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardAuthenticated;
