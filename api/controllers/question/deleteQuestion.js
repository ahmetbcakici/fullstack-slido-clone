import Event from '../../models/event';
import Question from '../../models/question';
import Questioner from '../../models/questioner';

export default async (req, res) => {
  const {eventId, questionerId, questionId} = req.body;

  const event = await Event.findById(eventId).select({questions: 1});
  event.questions.remove(questionId);
  event.save();

  const questioner = await Questioner.findById(questionerId).select({
    questions: 1,
  });
  questioner.questions.remove(questionId);
  questioner.save();

  await Question.findByIdAndDelete(questionId);

  res.io.to(eventId).emit('set-questions');
  res.send();
};
