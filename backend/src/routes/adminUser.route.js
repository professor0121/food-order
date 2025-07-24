import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
} from '../controllers/adminUser.controller.js'; // eslint-disable-line no-unused-vars
import { adminAuth } from '../middleware/admin.middleware.js';

const router = express.Router();

// GET /admin/users?page=1&limit=10&role=all
router.get('/', adminAuth, getUsers);

// GET /admin/users/:userId
router.get('/:userId', adminAuth, getUserById);

// POST /admin/users
router.post('/', adminAuth, createUser);

// PUT /admin/users/:userId
router.put('/:userId', adminAuth, updateUser);

// DELETE /admin/users/:userId
router.delete('/:userId', adminAuth, deleteUser);

// PUT /admin/users/:userId/status
router.put('/:userId/status', adminAuth, updateUserStatus);

export default router;
