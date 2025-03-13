import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { userServices } from '../services/user-service.js';
import { authServices } from '../services/auth-service.js';
import { prisma } from '../config/prisma.js';
import { User } from '@prisma/client';
import { verifyToken, sendRefreshTokenCookie } from '../utils/token-util.js';
import { JwtPayload } from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: User = req.body;
    await authServices.register(userData);

    res.status(StatusCodes.CREATED).json({
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authServices.login(
      email,
      password
    );
    sendRefreshTokenCookie(res, refreshToken);

    res.status(StatusCodes.OK).json({
      message: 'User authenticated successfully',
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = (req as any).userId;
    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not logged in yet');
    }

    const user: User = await userServices.getUserById(userId);
    res.status(StatusCodes.OK).json({
      message: 'User data fetched successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = (req as any).userId;
    await authServices.clearRefreshToken(userId);

    res.status(StatusCodes.OK).json({
      message: 'Log out successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken: string = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Refresh token missing');
    }

    const decodedToken: JwtPayload | string = verifyToken(refreshToken);
    const userId: number = Number(decodedToken.sub);

    const isRefreshTokenExpired: boolean =
      await authServices.isRefreshTokenExpired(userId);
    if (isRefreshTokenExpired) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token has expired');
    }

    const { newAccessToken, newRefreshToken } =
      await authServices.refreshToken(userId);
    sendRefreshTokenCookie(res, newRefreshToken);

    res.status(StatusCodes.OK).json({
      message: 'Token refreshed successfully',
      newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};
