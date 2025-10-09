import jwt from 'jsonwebtoken';
import User from '../models/user.js'
// Middleware for protecting routes
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user  = await User.findById(decoded.id)
    req.user = user; // Attach full user object to request
    next(); // Proceed to next middleware or controller
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

