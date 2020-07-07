import {Question} from '../../models';

export default async (req, res) => {
  const {eventId, questionId} = req.body;

  const question = await Question.findById(questionId);

  const isHighlighted = question.isHighlighted;
  if (isHighlighted) {
    question.isHighlighted = false;
    question.save();
    res.io.to(eventId).emit('set-questions');
    return res.send();
  }

  // cancel other highlights for this event questions
  await Question.updateOne(
    {eventId, isHighlighted: true},
    {isHighlighted: false}
  );

  question.isHighlighted = true;
  question.save();
  res.io.to(eventId).emit('set-questions');
  res.send();
};
