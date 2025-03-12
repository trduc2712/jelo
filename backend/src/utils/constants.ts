import env from '../config/environment.js';
import { Role } from '@prisma/client';

export const WHITELIST_DOMAINS: string[] = [env.FRONTEND_URL];

export const WHITELIST_ROUTES: string[] = ['/auth/login', '/auth/register'];

const userPermissions: string[] = [
  'create-user',
  'read-user',
  'read-all-users',
  'update-user',
  'delete-user',
];

const categoryPermissions: string[] = [
  'create-category',
  'read-category',
  'read-all-categories',
  'update-category',
  'delete-category',
];

export const ROLE_PERMISSIONS = {
  [Role.SUPER_ADMIN]: [...userPermissions, ...categoryPermissions],
  [Role.ADMIN]: [...userPermissions, ...categoryPermissions],
  [Role.MODERATOR]: ['read-all-users', ...categoryPermissions],
  [Role.CUSTOMER]: [''],
};
