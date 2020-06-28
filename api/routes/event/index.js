import express from 'express';

import {
  generateEvent,
  getQuestions,
  sendQuestion,
  getEventId
} from '../../controllers/event';

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/:eventCode', getEventId);
router.post('/', generateEvent);
router.post('/question', sendQuestion);

export default router;