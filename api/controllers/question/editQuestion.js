import Question from '../../models/question';

export default async (req, res) => {
  const {questionId, question} = req.body;

  await Question.findByIdAndUpdate(questionId, {question});

  res.send();
};
