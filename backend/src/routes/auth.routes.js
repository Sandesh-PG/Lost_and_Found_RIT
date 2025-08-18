import express from 'express';
import passport from 'passport';
import {
  SignUpController,
  loginController,
  logoutController,
  googleCallbackController,
  getProfile,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/auth.controller.js';
// 1. Import the middleware from your new file
import protectRoute from '../middleware/auth.middleware.js'; 

const router = express.Router();

// --- Local Authentication ---
router.post('/signup', SignUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);

// --- Password Reset ---
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);

// --- Google OAuth ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: false,
  }),
  googleCallbackController
);

// --- User Profile ---
// 2. Apply the middleware to protect this route
router.get('/profile', protectRoute, getProfile);


export default router;
