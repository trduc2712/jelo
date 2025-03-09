import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
} from '../../controllers/user-controller.js';
import { authorizeRole } from '../../middlewares/auth-middleware.js';

const router = Router();

router.get('/', authorizeRole('read-all-users'), getAllUsers);
router.post('/', authorizeRole('create-user'), createUser);
router.delete('/:id', authorizeRole('delete-user'), deleteUserById);
router.post('/:id', authorizeRole('update-user'), editUser);

export default router;
