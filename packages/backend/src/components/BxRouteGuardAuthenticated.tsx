import { Outlet } from 'react-router';
import { useAuth } from '@clerk/clerk-react';

function BxRouteGuardAuthenticated() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardAuthenticated;
