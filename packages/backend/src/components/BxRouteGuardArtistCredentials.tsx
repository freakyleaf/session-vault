import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import type { RootState } from '@backend-src/stores/bxStore';

function BxRouteGuardArtistCredentials() {
  const { isAdmin, isArtist } = useClerkUserRole();

  const { hasArtistCredentials } = useSelector(
    (state: RootState) => state.user,
  );

  if (!isAdmin || (isArtist && !hasArtistCredentials)) {
    return <BxAccessDenied />;
  }

  return <Outlet />;
}

export default BxRouteGuardArtistCredentials;
