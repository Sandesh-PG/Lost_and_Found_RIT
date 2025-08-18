import jwt from 'jsonwebtoken';
import UserModel from '../models/user.models.js';

const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 1. Look for the token in the standard 'Authorization' header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }

    // 2. Verify the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    // 3. Find the user from the token's payload
    const user = await UserModel.findById(decoded.userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // 4. Attach the user to the request object for the next function to use
    req.user = user;

    next(); // Proceed to the getProfile controller
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message);
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized - Token Expired' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default protectRoute;
