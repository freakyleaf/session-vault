import {
  INPUT_TYPE_CALENDAR,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT,
  TOAST_SEVERITY_ERROR,
  TOAST_SEVERITY_INFO,
  TOAST_SEVERITY_SUCCESS,
  TOAST_SEVERITY_WARNING,
  USER_ROLE_ADMIN,
  USER_ROLE_ARTIST,
  VIEW_TYPE_ALL,
  VIEW_TYPE_SINGLE,
} from '@shared-src/lib/constants';

export type TAlbumId = string;

export type TArtistIsActive = boolean;

export type TArtistId = string;

export type TArtistName = string;

export type TClerkId = string;

export type TId = string;

export type TInputType =
  | typeof INPUT_TYPE_CALENDAR
  | typeof INPUT_TYPE_EMAIL
  | typeof INPUT_TYPE_NUMBER
  | typeof INPUT_TYPE_PASSWORD
  | typeof INPUT_TYPE_TEXT;

export type TIsAdmin = boolean;

export type TIsArtist = boolean;

export type TIsPublic = boolean;

export type TReleaseDate = Date | null;

export type TTitle = string;

export type TToastSeverity =
  | typeof TOAST_SEVERITY_ERROR
  | typeof TOAST_SEVERITY_INFO
  | typeof TOAST_SEVERITY_SUCCESS
  | typeof TOAST_SEVERITY_WARNING;

export type TUserRole = typeof USER_ROLE_ADMIN | typeof USER_ROLE_ARTIST;

export type TViewType = typeof VIEW_TYPE_ALL | typeof VIEW_TYPE_SINGLE;
