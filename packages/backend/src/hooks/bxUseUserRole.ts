import { useUser } from '@clerk/clerk-react';

import { USER_ROLE_ADMIN, USER_ROLE_ARTIST } from '@shared-src/lib/constants';

import type { TUserRole } from '@shared-src/lib/types';

export function useUserRole() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as TUserRole;

  const isAdmin = userRole === USER_ROLE_ADMIN;
  const isArtist = userRole === USER_ROLE_ARTIST || !userRole;

  return { isAdmin, isArtist };
}
