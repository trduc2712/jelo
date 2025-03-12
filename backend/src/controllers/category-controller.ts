import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Category } from '@prisma/client';
import { categoryServices } from '../services/category-service.js';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: Category[] = await categoryServices.getAllCategories();

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
    await categoryServices.createCategory(categoryData);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Create category successfully' });
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId: number = Number(req.params.id);
    await categoryServices.deleteCategoryById(categoryId);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Delete category successfully' });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId: number = Number(req.params.id);
    const category: Category =
      await categoryServices.getCategoryById(categoryId);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Get category successfully', category });
  } catch (err) {
    next(err);
  }
};

export const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId: number = Number(req.params.id);
    const newCategoryData: Category = req.body;
    await categoryServices.editCategory(categoryId, newCategoryData);

    res
      .status(StatusCodes.OK)
      .json({ message: 'Update category successfully' });
  } catch (err) {
    next(err);
  }
};
