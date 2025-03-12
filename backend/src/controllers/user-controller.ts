import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userServices } from '../services/user-service.js';
import { User } from '@prisma/client';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: User[] = await userServices.getAllUsers();
    const totalUsers: number = await userServices.countAllUsers();

    res.status(StatusCodes.OK).json({
      message: 'Get all users successfully',
      users,
      meta: { total: totalUsers },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req.params.id);
    const user: User = await userServices.getUserById(userId);

    res.status(StatusCodes.OK).json({ message: 'Get user successfully', user });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: User = req.body;
    await userServices.createUser(userData);

    res.status(StatusCodes.OK).json({ message: 'Create user successfully' });
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId: number = (req as any).userId;
    const targetUserId: number = Number(req.params.id);

    await userServices.deleteUserById(currentUserId, targetUserId);
    res.status(StatusCodes.OK).json({ message: 'Delete user successfully' });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number = Number(req.params.id);
    const newUserData: User = req.body;
    await userServices.editUser(userId, newUserData);

    res.status(StatusCodes.OK).json({ message: 'Update user successfully' });
  } catch (err) {
    next(err);
  }
};
