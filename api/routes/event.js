import express from 'express';

import {
  generateEvent,
  getEventId,
  setQAState
} from '../controllers/event';

const router = express.Router();

router.get('/:eventCode', getEventId);
router.post('/', generateEvent);
router.patch('/set-qa', setQAState);

export default router;
