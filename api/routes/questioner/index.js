import express from 'express';

import {generateQuestioner} from '../../controllers/questioner';

const router = express.Router();

router.post('/', generateQuestioner);

export default router;
