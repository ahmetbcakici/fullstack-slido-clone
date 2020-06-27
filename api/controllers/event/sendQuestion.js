import mongoose from 'mongoose';

import Questioner from '../../models/questioner';
import Event from '../../models/event';

export default async (req, res) => {
  let {questionerId, eventId, question} = req.body;
    console.log(eventId)
  if (!questionerId) {
    const {_id} = await Questioner.create({
      _id: mongoose.Types.ObjectId(),
    });
    questionerId = _id;
  }

  const questioner = await Questioner.findById(questionerId);
  questioner.questions.push({eventId, question});
  questioner.save();
};
