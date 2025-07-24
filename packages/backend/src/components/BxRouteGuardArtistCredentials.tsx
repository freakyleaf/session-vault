import { Outlet } from 'react-router';

import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

function BxRouteGuardArtistCredentials() {
  const { isAdmin, isArtist } = useClerkUserRole();
  const { artist } = useArtist();

  if (!isAdmin || (isArtist && !artist)) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardArtistCredentials;
