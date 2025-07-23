import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
/**
 * Sign a JWT token using user's email
 * @param {string} email - User's email address
 * @returns {string} - JWT token
 */
export const signToken = (email) => {
  return jwt.sign({ email },ENV.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
