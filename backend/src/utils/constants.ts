import env from '../config/environment.js';
import { Role } from '@prisma/client/wasm';

export const WHITELIST_DOMAINS: string[] = [env.FRONTEND_URL];

export const WHITELIST_ROUTES: string[] = ['/auth/login', '/auth/register'];

const userPermissions = [
  'create-user',
  'read-all-users',
  'update-user',
  'delete-user',
];

const categoryPermissions = [
  'create-category',
  'read-all-categories',
  'update-category',
  'delete-category',
];

export const ROLE_PERMISSIONS = {
  [Role.ADMIN]: [...userPermissions, ...categoryPermissions],
  [Role.MODERATOR]: [...categoryPermissions],
  [Role.CUSTOMER]: [''],
};
