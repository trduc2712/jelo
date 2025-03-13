import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import { Category } from '@prisma/client';

const getCategoryById = async (categoryId: number): Promise<Category> => {
  const foundCategory = await prisma.category.findFirst({
    where: { id: categoryId },
  });

  if (!foundCategory) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return foundCategory;
};

const createCategory = async (categoryData: Category): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({
    where: { name: categoryData.name },
  });

  if (existingCategory) {
    throw new ApiError(StatusCodes.CONFLICT, 'Category already exists');
  }

  return await prisma.category.create({
    data: categoryData,
  });
};

const getAllCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Categories not found');
  }

  return categories;
};

const deleteCategoryById = async (
  categoryId: number
): Promise<Prisma.BatchPayload> => {
  await getCategoryById(categoryId);
  return await prisma.category.delete({ where: { id: categoryId } });
};

const editCategory = async (
  categoryId: number,
  newCategoryData: Category
): Promise<Category> => {
  await getCategoryById(categoryId);
  const updatedCategory: Category = await prisma.category.update({
    where: { id: categoryId },
    data: newCategoryData,
  });

  return updatedCategory;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategoryById,
};
