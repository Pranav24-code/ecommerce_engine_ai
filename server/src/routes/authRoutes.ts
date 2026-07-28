import { Router } from 'express';
import { register, login, getMe, refreshToken } from '../controllers/authController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/me', jwtAuth, getMe);

export default router;
