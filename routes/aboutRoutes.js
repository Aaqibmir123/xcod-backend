import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';

const router = express.Router();

// Public route - get about data
router.get('/', getAbout);

// Admin route - update about data
router.put('/', updateAbout);

export default router;