import { clerkMiddleware } from '@clerk/express';
import express from 'express';

import { Album } from '@database-src/models/dxAlbumModel';
import { checkAlbumAccess } from '@api-src/middleware/axCheckAlbumAccess';
import { checkUserRole } from '@api-src/middleware/axCheckUserRole';

import { getClerkUserIdFromReq } from '@api-src/lib/utils/axGetClerkUserIdFromReq';

import { USER_ROLE_ADMIN, USER_ROLE_ARTIST } from '@shared-src/lib/constants';

import type {
  IAlbumAddEditFormData,
  IAuthenticatedRequest,
} from '@shared-src/lib/interfaces';
import type { Response } from 'express';

const albumRoutes = express.Router();

// Get all artist albums
albumRoutes.get(
  '/artist',
  clerkMiddleware(),
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = getClerkUserIdFromReq(req);

      if (!userId) {
        res
          .status(401)
          .json({ error: 'Unauthorized', timestamp: new Date().toISOString() });
        return;
      }

      const albums = await Album.find({
        artistClerkId: userId,
      });

      // const albums = await Album.find({
      //   artistClerkId: userId,
      // }).populate('songs');

      res.json(albums);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error fetching user albums:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Get all admin albums
albumRoutes.get(
  '/admin',
  clerkMiddleware(),
  checkUserRole([USER_ROLE_ADMIN]),
  async (_req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // const albums = await Album.find().populate('songs');
      const albums = await Album.find();
      res.json(albums);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error fetching all albums:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Get album by ID (owner or admin only)
albumRoutes.get(
  '/:id',
  clerkMiddleware(),
  checkAlbumAccess,
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // const album = await Album.findById(req.params.id).populate('songs');
      const album = await Album.findById(req.params.id);

      if (!album) {
        res.status(404).json({
          error: 'Album not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json(album);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error fetching album:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Create new album (owner or admin only)
albumRoutes.post(
  '/create',
  clerkMiddleware(),
  checkUserRole([USER_ROLE_ADMIN, USER_ROLE_ARTIST]),
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

      const body: IAlbumAddEditFormData = req.body as IAlbumAddEditFormData;

      const albumData = {
        ...body,
        artistClerkId: userId, // Always set to current user
      };

      const album = new Album(albumData);
      await album.save();

      res.status(201).json(album);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error creating album:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Update album (owner or admin only)
albumRoutes.put(
  '/:id',
  clerkMiddleware(),
  checkAlbumAccess,
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const update: IAlbumAddEditFormData = req.body as IAlbumAddEditFormData;

      // const album = await Album.findByIdAndUpdate(req.params.id, update, {
      //   new: true,
      //   runValidators: true,
      // }).populate('songs');

      const album = await Album.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });

      if (!album) {
        res.status(404).json({
          error: 'Album not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.json(album);
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error updating album:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

// Delete album (owner or admin only)
albumRoutes.delete(
  '/:id',
  clerkMiddleware(),
  checkAlbumAccess,
  async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const album = await Album.findByIdAndDelete(req.params.id);

      if (!album) {
        res.status(404).json({
          error: 'Album not found',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('\x1b[31m✗\x1b[0m Error deleting album:', error);

      res.status(500).json({
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }
  },
);

export { albumRoutes };
