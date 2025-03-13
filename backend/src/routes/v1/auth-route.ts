import { Router } from 'express';
import {
  register,
  login,
  getCurrentUser,
  logout,
  refreshToken,
} from '../../controllers/auth-controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getCurrentUser);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
