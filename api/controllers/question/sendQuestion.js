import mongoose from 'mongoose';

import Question from '../../models/question';
import Questioner from '../../models/questioner';
import Event from '../../models/event';

export default async (req, res) => {
  let {questionerId, eventId, question, isAnon} = req.body;

  const questionId = mongoose.Types.ObjectId();
  Question.create({
    _id: questionId,
    ownerQuestionerId: questionerId,
    eventId,
    question,
    isAnon,
  });

  const questioner = await Questioner.findById(questionerId).select({
    questions: 1,
  });
  const event = await Event.findById(eventId).select({questions: 1});
  questioner.questions.push(questionId);
  event.questions.push(questionId);
  event.save();
  questioner.save();

  res.send();
};
