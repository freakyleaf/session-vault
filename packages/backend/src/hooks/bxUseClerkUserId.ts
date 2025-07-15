import { useUser } from '@clerk/clerk-react';

import type { TClerkId } from '@shared-src/lib/types';

function useClerkUserId(): {
  clerkId: TClerkId;
  isLoaded: boolean;
} {
  const { isLoaded, user } = useUser();

  return { clerkId: user?.id as TClerkId, isLoaded };
}

export { useClerkUserId };
