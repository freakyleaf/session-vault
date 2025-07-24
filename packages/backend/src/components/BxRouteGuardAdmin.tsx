import { Outlet } from 'react-router';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import { useLoadingStore } from '@backend-src/stores/bxLoadingStore';

function BxAdminRouteGuard() {
  const { isAdmin, isLoaded } = useClerkUserRole();
  const { setIsGlobalLoading } = useLoadingStore();

  useEffect(() => {
    setIsGlobalLoading(!isLoaded);
  }, [isLoaded, setIsGlobalLoading]);

  if (!isAdmin) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxAdminRouteGuard;
