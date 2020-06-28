import express from 'express';

import user from './user';
import event from './event';
import questioner from './questioner';

const router = express.Router();

router.use('/event', event);
router.use('/user', user);
router.use('/questioner', questioner);

export default router;
