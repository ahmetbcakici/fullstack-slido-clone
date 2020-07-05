import express from 'express';

import user from './user';
import event from './event';
import questioner from './questioner';
import question from './question';
import poll from './poll';

const router = express.Router();

router.use('/event', event);
router.use('/user', user);
router.use('/questioner', questioner);
router.use('/question', question);
router.use('/poll', poll);

export default router;
