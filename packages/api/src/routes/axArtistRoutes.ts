import { clerkMiddleware } from '@clerk/express';
import express from 'express';

import { Artist } from '@database-src/models/dxArtistModel';
import { checkUserRole } from '@api-src/middleware/axCheckUserRole';

import { getClerkUserIdFromReq } from '@api-src/lib/utils/axGetClerkUserIdFromReq';

import { USER_ROLE_ADMIN, USER_ROLE_ARTIST } from '@shared-src/lib/constants';

import type {
  IArtistAddEditFormData,
  IAuthenticatedRequest,
} from '@shared-src/lib/interfaces';
import type { Response } from 'express';

const artistRoutes = express.Router();

// Get all artists (admin only)
artistRoutes.get(
  '/all',
  clerkMiddleware(),
  checkUserRole([USER_ROLE_ADMIN]),
  async (_req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const artists = await Artist.find();
      res.json(artists);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error fetching all artists:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Get artist by ID (owner or admin only)
artistRoutes.get(
  '/:id',
  clerkMiddleware(),
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const artist = await Artist.findById(req.params.id);

      if (!artist) {
        res.status(404).json({
          error: 'Artist not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json(artist);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error fetching artist:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Create new artist (owner only)
artistRoutes.post(
  '/create',
  clerkMiddleware(),
  checkUserRole([USER_ROLE_ARTIST]),
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = getClerkUserIdFromReq(req);

      if (!userId) {
        res.status(401).json({
          error: 'Unauthorized',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const body: IArtistAddEditFormData = req.body as IArtistAddEditFormData;

      const artistData = {
        ...body,
        clerkId: userId, // Always set to current user
      };

      const artist = new Artist(artistData);
      await artist.save();

      res.status(201).json(artist);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error creating artist:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Update artist (owner or admin only)
artistRoutes.put(
  '/:id',
  clerkMiddleware(),
  checkUserRole([USER_ROLE_ADMIN, USER_ROLE_ARTIST]),
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const update: IArtistAddEditFormData = req.body as IArtistAddEditFormData;

      const artist = await Artist.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });

      if (!artist) {
        res.status(404).json({
          error: 'Artist not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json(artist);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error updating artist:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

export { artistRoutes };
