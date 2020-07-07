import express from 'express';

import user from './user';
import event from './event';
import participant from './participant';
import question from './question';
import poll from './poll';

const router = express.Router();

router.use('/event', event);
router.use('/user', user);
router.use('/participant', participant);
router.use('/question', question);
router.use('/poll', poll);

export default router;
