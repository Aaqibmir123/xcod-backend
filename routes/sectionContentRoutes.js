import express from 'express';
import { getSectionContent, updateSectionContent } from '../controllers/sectionContentController.js';

const router = express.Router();

router.route('/:key').get(getSectionContent).put(updateSectionContent);

export default router;
