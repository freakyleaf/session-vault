import { useUser } from '@clerk/clerk-react';

import { USER_ROLE_ADMIN, USER_ROLE_ARTIST } from '@shared-src/lib/constants';

import type { TIsAdmin, TIsArtist, TUserRole } from '@shared-src/lib/types';

function useClerkUserRole(): {
  isAdmin: TIsAdmin;
  isArtist: TIsArtist;
  isLoaded: boolean;
  userRole: TUserRole | null;
} {
  const { isLoaded, user } = useUser();
  const userRole = user?.publicMetadata?.role as TUserRole;

  const isAdmin = userRole === USER_ROLE_ADMIN;
  const isArtist = userRole === USER_ROLE_ARTIST || !userRole;

  return { isAdmin, isArtist, isLoaded, userRole };
}

export { useClerkUserRole };
