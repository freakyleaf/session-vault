import { useUserRole } from '@backend-src/hooks/bxUseUserRole';

import type { ReactNode } from 'react';

interface BxAdminRouteGuardProps {
  children: ReactNode;
}

function BxAdminRouteGuard({ children }: BxAdminRouteGuardProps) {
  const { isAdmin } = useUserRole();

  if (!isAdmin) {
    return <BxAccessDenied />;
  }

  return <>{children}</>;
}

export default BxAdminRouteGuard;
