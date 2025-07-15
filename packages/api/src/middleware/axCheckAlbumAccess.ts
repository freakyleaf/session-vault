import { Album } from '@database-src/models/dxAlbumModel';

import { getClerkUserIdFromReq } from '@api-src/lib/utils/axGetClerkUserIdFromReq';
import { getClerkUserRole } from '@api-src/lib/utils/axGetClerkUserRole';

import type { NextFunction, Response } from 'express';
import type { IAuthenticatedRequest } from '@shared-src/lib/interfaces';

export const checkAlbumAccess = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getClerkUserIdFromReq(req);

    if (!userId) {
      res
        .status(401)
        .json({ error: 'Unauthorized', timestamp: new Date().toISOString() });
      return;
    }

    const albumId = req.params.id;

    if (!albumId) {
      res.status(400).json({
        error: 'albumId is required',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const [userRole, album] = await Promise.all([
      getClerkUserRole(userId),
      Album.findById(albumId),
    ]);

    if (!album) {
      res.status(404).json({
        error: 'Album not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (userRole.isAdmin) {
      // Admins can access any album
      return next();
    }

    // Check if artist owns the album
    if (album.clerkId !== userId) {
      res.status(403).json({
        error: 'Access denied',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  } catch (error) {
    console.error('\x1b[31m✗\x1b[0m Album access check failed:', error);

    res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};
