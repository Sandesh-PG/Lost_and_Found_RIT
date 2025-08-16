import express from 'express';
import { registerController, loginController, logoutController, getProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

//user register
// /api/auth/register
router.post('/register', registerController);

// /api/auth/login
//user login
router.post('/login', loginController);

// /api/auth/logout
//user logout
router.post('/logout', logoutController);

//user profile details
// /api/auth/profile
//authMiddleware so that it's protected
router.get('/profile', authMiddleware, getProfile);

export default router;