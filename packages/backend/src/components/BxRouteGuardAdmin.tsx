import type { ReactNode } from 'react';

interface BxAdminRouteGuardProps {
  children: ReactNode;
}

function BxAdminRouteGuard({ children }: BxAdminRouteGuardProps) {
  const { isAdmin, isLoaded } = useClerkUserRole();

  if (!isLoaded) {
    return <SxProgressSpinner />;
  }

  if (!isAdmin) {
    return <BxAccessDenied />;
  }

  return <>{children}</>;
}

export default BxAdminRouteGuard;
