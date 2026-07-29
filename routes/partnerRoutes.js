import express from 'express';
import {
  createPartner,
  deletePartner,
  getPartners,
  updatePartner,
} from '../controllers/partnerController.js';

const router = express.Router();

router.route('/').get(getPartners).post(createPartner);
router.route('/:id').put(updatePartner).delete(deletePartner);

export default router;
