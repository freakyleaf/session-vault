import type { TUserRole } from '@shared-src/lib/types';

export interface IUser {
  artistProfile?: string;
  createdAt: string;
  email: string;
  isActive: boolean;
  password: string;
  role: TUserRole;
}
