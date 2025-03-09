import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Get all categories successfully', categories });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Name is required');
    }

    await prisma.category.create({
      data: { name },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Create category successfully' });
  } catch (err) {
    next(err);
  }
};
