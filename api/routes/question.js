import express from 'express';

import {
  deleteQuestion,
  editQuestion,
  sendQuestion,
  getQuestions,
  likeQuestion,
  highlightQuestion
} from '../controllers/question';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/', sendQuestion);
router.delete('/', deleteQuestion);
router.patch('/', editQuestion);
router.patch('/like', likeQuestion);
router.patch('/highlight', highlightQuestion);

export default router;
