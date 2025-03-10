import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma.js';
import ApiError from '../utils/ApiError.js';
import { Category } from '@prisma/client/wasm';

const createCategory = async (categoryData: Category) => {
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

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Categories not found');
  }

  return categories;
};

export const categoryServies = { createCategory, getAllCategories };
