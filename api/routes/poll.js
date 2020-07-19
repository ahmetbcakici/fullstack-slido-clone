import express from 'express';

import {
  generatePoll,
  sendAnswer,
  getActivePoll,
  getPollsByEvent,
  setActiveState,
  deletePoll,
  resetPollResults,
  duplicatePoll
} from '../controllers/poll';

const router = express.Router();

router.get('/', getPollsByEvent);
router.get('/active', getActivePoll);
router.post('/', generatePoll);
router.post('/answer', sendAnswer);
router.post('/duplicate', duplicatePoll);
router.patch('/set-active', setActiveState);
router.patch('/reset-results', resetPollResults);
router.delete('/', deletePoll);

export default router;
