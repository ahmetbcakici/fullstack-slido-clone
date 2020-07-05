import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, question, type} = req.body;

  const pollGenerated = await Poll.create({
    _id: mongoose.Types.ObjectId(),
    eventId,
    question,
    type,
  });

  res.json({pollGenerated});
};
