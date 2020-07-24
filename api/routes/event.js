import express from 'express';

import {
  generateEvent,
  getEvent,
  setQAState
} from '../controllers/event';

const router = express.Router();

router.get('/:eventCode', getEvent);
router.post('/', generateEvent);
router.patch('/set-qa', setQAState);

export default router;
