import express from 'express';

import user from './user';
import event from './event';
import questioner from './questioner';
import question from './question';

const router = express.Router();

router.use('/event', event);
router.use('/user', user);
router.use('/questioner', questioner);
router.use('/question', question);

export default router;
