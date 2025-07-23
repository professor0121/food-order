import { verifyToken } from '../utils/jsonWebToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import BlacklistToken from '../models/blacklistToken.model.js';

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    const err = new Error('Not Authenticated');
    err.statusCode = 401;
    return next(err);
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    const err = new Error('Token has been blacklisted. Please log in again.');
    err.statusCode = 401;
    return next(err);
  }

  const decoded = verifyToken(token);
  req.user = decoded;
  next();
});
