import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.upload.js';
import { adminAuth } from '../middleware/admin.middleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload',adminAuth, upload.single('image'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const base64 = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
    
    const result = await uploadToCloudinary(base64, 'meals');
    res.json({ url: result.url });
  } catch (error) {
    console.error('Image upload failed:', error.message);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
