import {Event, Question, Participant} from '../../models';

export default async (req, res) => {
  const {eventId, participantId, questionId} = req.body;

  const event = await Event.findById(eventId).select({questions: 1});
  event.questions.remove(questionId);
  event.save();

  const participant = await Participant.findById(participantId).select({
    questions: 1,
  });
  participant.questions.remove(questionId);
  participant.save();

  await Question.findByIdAndDelete(questionId);

  res.io.to(eventId).emit('set-questions');
  res.send();
};
