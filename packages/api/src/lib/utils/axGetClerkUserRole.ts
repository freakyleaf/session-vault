import { createClerkClient } from '@clerk/express';

import { USER_ROLE_ADMIN, USER_ROLE_ARTIST } from '@shared-src/lib/constants';

import type { TIsAdmin, TIsArtist, TUserRole } from '@shared-src/lib/types';

const clerkClient = createClerkClient({
  secretKey: process.env.PRIVATE_CLERK_SECRET_KEY!,
});

async function getClerkUserRole(userId: string): Promise<{
  isAdmin: TIsAdmin;
  isArtist: TIsArtist;
  userRole: TUserRole;
}> {
  if (!userId?.trim()) {
    throw new Error('userId is required');
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const role = user.publicMetadata?.role as TUserRole | null;
    const userRole = role || USER_ROLE_ARTIST; // Default to artist if no role is set

    const isAdmin = userRole === USER_ROLE_ADMIN;
    const isArtist = userRole === USER_ROLE_ARTIST;

    return {
      isAdmin,
      isArtist,
      userRole,
    };
  } catch (error) {
    console.error(
      '\x1b[31m✗\x1b[0m Failed to get user role for userId:',
      userId,
      error,
    );

    if (error instanceof Error) {
      throw new Error(`Failed to retrieve user role: ${error.message}`);
    }

    throw new Error('Failed to retrieve user role: Unknown error');
  }
}

export { getClerkUserRole };
