import {
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT,
  USER_ROLE_ADMIN,
  USER_ROLE_ARTIST,
} from '@shared-src/lib/constants';

export type TInputType =
  | typeof INPUT_TYPE_EMAIL
  | typeof INPUT_TYPE_NUMBER
  | typeof INPUT_TYPE_PASSWORD
  | typeof INPUT_TYPE_TEXT;

export type TUserRole = typeof USER_ROLE_ADMIN | typeof USER_ROLE_ARTIST;
