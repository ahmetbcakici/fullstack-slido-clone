import express from 'express';

import {generatePoll, sendAnswer} from '../controllers/poll';

const router = express.Router();

router.post('/', generatePoll);
router.post('/answer', sendAnswer);

export default router;
