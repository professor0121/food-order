import express from 'express';
import multer from 'multer';
import { createMeal } from '../controllers/meal.controller.js';
import { adminAuth } from '../middleware/admin.middleware.js';

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

// POST /api/meals
router.post('/create',adminAuth, createMeal);

export default router;
