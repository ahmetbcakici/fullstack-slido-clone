import express from 'express';

import {
  deleteQuestion,
  editQuestion,
  sendQuestion,
  getQuestions,
  likeQuestion
} from '../../controllers/question';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/', sendQuestion);
router.delete('/', deleteQuestion);
router.patch('/', editQuestion);
router.patch('/like', likeQuestion);

export default router;
