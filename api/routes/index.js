import express from 'express';

import user from './user';
import event from './event';

const router = express.Router();

router.use('/event', event);
router.use('/user', user);

export default router;
