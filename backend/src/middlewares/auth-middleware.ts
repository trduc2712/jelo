import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { WHITELIST_ROUTES, ROLE_PERMISSIONS } from '../utils/constants.js';
import { verifyToken } from '../utils/token-util.js';
import { userServices } from '../services/user-service.js';
import { authServices } from '../services/auth-service.js';
import { Role } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (WHITELIST_ROUTES.some((route) => req.path.endsWith(route))) {
    return next();
  }

  if (req.headers && req.headers.authorization) {
    const token: string = req.headers.authorization.split(' ')[1];

    try {
      const decodedToken: JwtPayload | string = verifyToken(token);
      const userId: number = Number(decodedToken.sub);
      await userServices.updateUserLastActive(userId);
      (req as any).userId = userId;

      next();
    } catch (err) {
      next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Token has expired or is invalid'
        )
      );
    }
  } else {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token is missing'));
  }
};

export const authorizePermission =
  (requiredPermisson: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = await userServices.getUserById((req as any).userId);
      const userRole: Role = user.role;
      if (!ROLE_PERMISSIONS[userRole].includes(requiredPermisson)) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          'You do not have permission to access this resource'
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
