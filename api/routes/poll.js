import express from 'express';

import {generatePoll, sendAnswer, getActivePoll} from '../controllers/poll';

const router = express.Router();

router.get('/active', getActivePoll);
router.post('/', generatePoll);
router.post('/answer', sendAnswer);

export default router;
