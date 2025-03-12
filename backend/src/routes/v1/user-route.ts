import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  editUser,
} from '../../controllers/user-controller.js';
import { authorizePermission } from '../../middlewares/auth-middleware.js';

const router = Router();

router.post('/', authorizePermission('create-user'), createUser);
router.get('/', authorizePermission('read-all-users'), getAllUsers);
router.get('/:id', authorizePermission('read-user'), getUserById);
router.put('/:id', authorizePermission('update-user'), editUser);
router.delete('/:id', authorizePermission('delete-user'), deleteUserById);

export default router;
