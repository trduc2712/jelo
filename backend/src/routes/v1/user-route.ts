import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  editUser,
} from '../../controllers/user-controller.js';
import { authorizeRole } from '../../middlewares/auth-middleware.js';

const router = Router();

router.post('/', authorizeRole('create-user'), createUser);
router.get('/', authorizeRole('read-all-users'), getAllUsers);
router.get('/:id', authorizeRole('read-user'), getUserById);
router.put('/:id', authorizeRole('update-user'), editUser);
router.delete('/:id', authorizeRole('delete-user'), deleteUserById);

export default router;
