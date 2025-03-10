import env from '../config/environment.js';
import { Role } from '@prisma/client';

type Token = 'access' | 'refresh';

export const WHITELIST_DOMAINS: string[] = [env.FRONTEND_URL];

export const WHITELIST_ROUTES: string[] = ['/auth/login', '/auth/register'];

const userPermissions: string[] = [
  'create-user',
  'read-all-users',
  'update-user',
  'delete-user',
];

const categoryPermissions: string[] = [
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
