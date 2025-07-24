import type {
  TArtistIsActive,
  TArtistName,
  TClerkId,
  TId,
  TIsPublic,
  TReleaseDate,
  TTitle,
} from '@shared-src/lib/types';
import type { Request } from 'express';

export interface IAlbum {
  _id: TId;
  clerkId: TClerkId;
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

export interface IArtistAddEditFormData {
  artistName: TArtistName;
  isActive: TArtistIsActive;
}

export interface IArtist {
  _id: TId;
  artistName: TArtistName;
  clerkId: TClerkId;
  createdAt: Date;
  isActive: TArtistIsActive;
  updatedAt: Date;
}

export interface IArtistStore {
  artist: IArtist | null;
  artists: IArtist[] | null;
  clearArtist: () => void;
  clearArtists: () => void;
  setArtist: (value: IArtist) => void;
  setArtists: (value: IArtist[]) => void;
}

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

export interface ICreateUpdateAlbumRequest extends IAlbumAddEditFormData {
  clerkId: TClerkId;
}

export interface ICreateUpdateArtistRequest extends IArtistAddEditFormData {
  clerkId: TClerkId;
}

export interface ILoadingStore {
  isGlobalLoading: boolean;
  setIsGlobalLoading: (value: boolean) => void;
}

export interface ISong {
  _id: TId;
  title: TTitle;
}
