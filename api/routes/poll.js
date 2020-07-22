import express from 'express';

import {
  generatePoll,
  sendAnswer,
  getActivePoll,
  getPollsByEvent,
  setActiveState,
  deletePoll,
  resetPollResults,
  duplicatePoll,
  setLockState,
  setHideResultState
} from '../controllers/poll';

const router = express.Router();

router.get('/', getPollsByEvent);
router.get('/active', getActivePoll);
router.post('/', generatePoll);
router.post('/answer', sendAnswer);
router.post('/duplicate', duplicatePoll);
router.patch('/set-active', setActiveState);
router.patch('/set-lock', setLockState);
router.patch('/set-hide-result', setHideResultState);
router.patch('/reset-results', resetPollResults);
router.delete('/', deletePoll);

export default router;
