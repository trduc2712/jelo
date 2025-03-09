import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
} from '../../controllers/category-controller.js';
import { authorizeRole } from '../../middlewares/auth-middleware.js';

const router = Router();

router.get('/', authorizeRole('read-all-categories'), getAllCategories);
router.post('/', authorizeRole('create-category'), createCategory);

export default router;
