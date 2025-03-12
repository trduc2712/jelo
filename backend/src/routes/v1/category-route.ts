import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  editCategory,
  getCategoryById,
} from '../../controllers/category-controller.js';
import { authorizePermission } from '../../middlewares/auth-middleware.js';

const router = Router();

router.get('/', authorizePermission('read-all-categories'), getAllCategories);
router.post('/', authorizePermission('create-category'), createCategory);
router.put('/:id', authorizePermission('update-category'), editCategory);
router.delete(
  '/:id',
  authorizePermission('delete-category'),
  deleteCategoryById
);
router.get('/:id', authorizePermission('read-category'), getCategoryById);

export default router;
