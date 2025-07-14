import { Outlet } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

function BxRouteGuardAuthenticated() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <SxProgressSpinner />;
  }

  if (!isSignedIn) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardAuthenticated;
