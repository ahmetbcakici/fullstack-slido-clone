import Question from '../../models/question';

export default async (req, res) => {
  const {eventId,questionId, question} = req.body;

  await Question.findByIdAndUpdate(questionId, {question});

  res.io.to(eventId).emit('set-questions');
  res.send();
};
