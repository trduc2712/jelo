import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Category } from '@prisma/client';
import { categoryServies } from '../services/category-service.js';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: Category[] = await categoryServies.getAllCategories();

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
    const categoryData: Category = req.body;
    await categoryServies.createCategory(categoryData);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Create category successfully' });
  } catch (err) {
    next(err);
  }
};
