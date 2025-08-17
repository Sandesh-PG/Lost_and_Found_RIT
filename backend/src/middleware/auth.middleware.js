import jwt from 'jsonwebtoken';
import UserModel from '../models/user.models.js';

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: 'Unauthorized access, please login!',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid or expired token',
    });
  }
}

export { authMiddleware };
