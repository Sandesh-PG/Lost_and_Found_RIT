import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.models.js';
import { SignUpController, loginController, logoutController, getProfile } from '../controllers/auth.controller.js';
// import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', SignUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
// router.get('/profile', authMiddleware, getProfile);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Find or create user based on Google profile data
      let user = await UserModel.findOne({ googleId: req.user.id });
      if (!user) {
        user = await UserModel.create({
          googleId: req.user.id,
          username: req.user.displayName,
          email: req.user.emails[0].value,
          createdAt: Date.now(),
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set JWT as HttpOnly cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // For local development; set true in production with HTTPS
        sameSite: 'lax', // Best for OAuth redirects locally
      });

      // Redirect to frontend home page
  res.redirect('http://localhost:5173/oauth-callback');
    } catch (error) {
      console.error('Error in Google OAuth callback:', error);
      res.redirect('http://localhost:5173/login');
    }
  }
);

export default router;
