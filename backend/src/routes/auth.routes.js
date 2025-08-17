const express  = require('express')
const {registerController,loginController,logoutController, getProfile} = require('../controllers/auth.controller');
const {authMiddleware} = require('../middleware/auth.middleware');
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


module.exports = router;