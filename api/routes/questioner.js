import express from 'express';

import {
  generateQuestioner,
  editName,
  getQuestioner,
} from '../controllers/questioner';

const router = express.Router();

router.get('/', getQuestioner);
router.post('/', generateQuestioner);
router.patch('/', editName);

export default router;
