import express from 'express';
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactStatus,
} from '../controllers/contactController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();
const adminOnly = [authenticateToken, authorizeRole(['admin'])];

router.post('/', createContactMessage);
router.get('/', ...adminOnly, getContactMessages);
router.patch('/:id/status', ...adminOnly, updateContactStatus);
router.delete('/:id', ...adminOnly, deleteContactMessage);

export default router;
