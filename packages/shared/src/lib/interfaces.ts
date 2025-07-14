import type {
  TClerkId,
  TId,
  TIsPublic,
  TReleaseDate,
  TTitle,
} from '@shared-src/lib/types';
import type { Request } from 'express';

export interface IAuthenticatedRequest extends Request {
  auth?(): {
    userId?: string;
  } | null;
  user?: {
    id: TId;
    isAdmin: boolean;
    role: string;
  };
}

export interface IAlbum {
  _id: TId;
  artistClerkId: TClerkId;
  createdAt: Date;
  isPublic: TIsPublic;
  releaseDate: TReleaseDate;
  songs: ISong[] | string[]; // Can be populated Song objects or just ObjectIds
  title: TTitle;
  trackOrder: ISong[] | string[]; // Can be populated Song objects or just ObjectIds
  updatedAt: Date;
}

export interface IAlbumAddEditFormData {
  isPublic: TIsPublic;
  releaseDate: TReleaseDate;
  title: TTitle;
}

export interface ISong {
  _id: TId;
  title: TTitle;
}

export interface ICreateUpdateAlbumRequest extends IAlbumAddEditFormData {
  artistClerkId: TClerkId;
}
