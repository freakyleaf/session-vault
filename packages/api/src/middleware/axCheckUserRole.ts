import { getClerkUserIdFromReq } from '@api-src/lib/utils/axGetClerkUserIdFromReq';
import { getClerkUserRole } from '@api-src/lib/utils/axGetClerkUserRole';

import type { NextFunction, Response } from 'express';
import type { IAuthenticatedRequest } from '@shared-src/lib/interfaces';
import type { TUserRole } from '@shared-src/lib/types';

export function checkUserRole(allowedRoles: TUserRole[]) {
  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    throw new Error('allowedRoles must be a non-empty array');
  }

  return async (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = getClerkUserIdFromReq(req);

      if (!userId) {
        res.status(401).json({
          error: 'Unauthorized',
          timestamp: new Date().toISOString(),
        });

        return;
      }

      const { isAdmin, userRole } = await getClerkUserRole(userId);

      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({
          error: 'Access denied',
          timestamp: new Date().toISOString(),
        });

        return;
      }

      // Add user info to request for use in route handlers
      req.user = {
        id: userId,
        isAdmin,
        role: userRole,
      };

      next();
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m User role check failed:', error);

      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          timestamp: new Date().toISOString(),
        });
      }
    }
  };
}
