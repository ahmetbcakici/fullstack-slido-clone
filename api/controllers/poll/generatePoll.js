import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, question, options, type} = req.body;

  // convert false other active polls
  await Poll.updateMany({eventId, isActive: true}, {isActive: false});

  if (type === 'Multiple Choice' || type === 'Quiz') {
    req.body.options = options.map((option) => ({option}));
    const pollGenerated = await Poll.create({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    });
    res.io.to(eventId).emit('get-active-poll');
    return res.json({pollGenerated});
  }

  const pollGenerated = await Poll.create({
    _id: mongoose.Types.ObjectId(),
    eventId,
    question,
    type,
  });

  res.io.to(eventId).emit('get-active-poll');
  res.json({pollGenerated});
};
