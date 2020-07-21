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

  const duplicatedPollId = mongoose.Types.ObjectId();
  await Poll.create({
    _id: duplicatedPollId,
    isActive: false,
    type,
    eventId,
    question,
    options,
  });

  const event = await Event.findById(eventId).select({polls: 1});
  event.polls.push(duplicatedPollId);
  event.save();

  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
