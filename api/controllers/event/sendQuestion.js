import mongoose from 'mongoose';

import Questioner from '../../models/questioner';
import Event from '../../models/event';

export default async (req, res) => {
  let {questionerId, eventId, question} = req.body;
  if (!questionerId) {
    const {_id} = await Questioner.create({
      _id: mongoose.Types.ObjectId(),
    });
    questionerId = _id;
  }

  const questioner = await Questioner.findById(questionerId);
  const questionId = mongoose.Types.ObjectId();
  questioner.questions.push({_id: questionId, eventId, question});
  questioner.save();

  const event = await Event.findById(eventId).select({questions: 1});
  event.questions.push(questionId);
  event.save();

  res.send();
};
