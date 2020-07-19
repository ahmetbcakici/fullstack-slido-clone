import mongoose from 'mongoose';

import {Poll, Event} from '../../models';

export default async (req, res) => {
  const {eventId, pollId} = req.body;

  const {type, question, options} = await Poll.findById(pollId).select({
    type: 1,
    question: 1,
    options: 1,
  });

  options.map((option) => {
    option.participantsSelected = [];
  });

  await Poll.create({
    _id: mongoose.Types.ObjectId(),
    isActive: false,
    type,
    eventId,
    question,
    options,
  });

  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
