import {Question} from '../../models';

export default async (req, res) => {
  const {eventId, questionId, participantId} = req.body;

  const question = await Question.findById(questionId);

  const likeControl = question.participantsLiked.includes(participantId);

  if (likeControl) {
    // liked already, so unlike
    question.likeCount = question.likeCount - 1;
    question.participantsLiked.remove(participantId);
    question.save();

    res.io.to(eventId).emit('set-questions');
    return res.send();
  }

  // like

  question.likeCount = question.likeCount + 1;
  question.participantsLiked.push(participantId);
  question.save();

  res.io.to(eventId).emit('set-questions');
  res.send();
};
