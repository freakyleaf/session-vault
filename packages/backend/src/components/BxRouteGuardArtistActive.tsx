import { Outlet } from 'react-router';

import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

function BxRouteGuardArtistActive() {
  const { isAdmin } = useClerkUserRole();
  const { artist, isLoadingProfile } = useArtist();

  if (isAdmin) {
    return <Outlet />;
  }

  if (isLoadingProfile) {
    return <BxGlobalLoading />;
  }

  if (!artist?.isActive) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardArtistActive;
