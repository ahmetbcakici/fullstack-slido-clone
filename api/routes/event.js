import express from 'express';

import {
  generateEvent,
  getEventId
} from '../controllers/event';

const router = express.Router();

router.get('/:eventCode', getEventId);
router.post('/', generateEvent);

export default router;
