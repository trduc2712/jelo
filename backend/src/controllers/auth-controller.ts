import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { userServices } from '../services/user-service.js';
import { authServices } from '../services/auth-service.js';
import { prisma } from '../config/prisma.js';
import { User } from '@prisma/client';

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
    const accessToken: string = await authServices.login(email, password);

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

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null, refreshTokenExpiresAt: null },
    });

    res.status(StatusCodes.OK).json({
      message: 'Log out successfully',
    });
  } catch (err) {
    next(err);
  }
};
