import express from 'express';

import {generateQuestioner, editName} from '../../controllers/questioner';

const router = express.Router();

router.post('/', generateQuestioner);
router.patch('/', editName);

export default router;
