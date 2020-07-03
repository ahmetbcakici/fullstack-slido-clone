import {Question} from '../../models';

export default async (req, res) => {
  const {eventId, questionId, questionerId} = req.body;

  const question = await Question.findById(questionId);

  const likeControl = question.questionersLiked.includes(questionerId);

  if (likeControl) {
    // liked already, so unlike
    question.likeCount = question.likeCount - 1;
    question.questionersLiked.remove(questionerId);
    question.save();

    res.io.to(eventId).emit('set-questions');
    return res.send();
  }

  // like

  question.likeCount = question.likeCount + 1;
  question.questionersLiked.push(questionerId);
  question.save();

  res.io.to(eventId).emit('set-questions');
  res.send();
};
