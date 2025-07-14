import type { IAuthenticatedRequest } from '@shared-src/lib/interfaces';
import type { TClerkId } from '@shared-src/lib/types';

function getClerkUserIdFromReq(req: IAuthenticatedRequest): TClerkId | null {
  if (!req?.auth || typeof req.auth !== 'function') {
    return null;
  }

  const auth = req.auth();
  return auth && typeof auth.userId === 'string' ? auth.userId : null;
}

export { getClerkUserIdFromReq };
