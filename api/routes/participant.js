import express from 'express';

import {
  generateParticipant,
  getParticipant,
  editName,
} from '../controllers/participant';

const router = express.Router();

router.get('/', getParticipant);
router.post('/', generateParticipant);
router.patch('/', editName);

export default router;
