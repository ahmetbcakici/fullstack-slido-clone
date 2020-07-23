import mongoose from 'mongoose';

import {Poll,Event} from '../../models';

export default async (req, res) => {
  const {eventId, question, options, type} = req.body;

  const pollCount = await Poll.countDocuments({eventId})
  if(pollCount >= 3) return res.status(400).send();

  // convert false other active polls
  await Poll.updateMany({eventId, isActive: true}, {isActive: false});

  const pollId = mongoose.Types.ObjectId();
  if (type === 'Multiple Choice' || type === 'Quiz') {
    req.body.options = options.map((option) => ({
      _id: mongoose.Types.ObjectId(),
      option,
    }));
    const pollGenerated = await Poll.create({
      _id: pollId,
      ...req.body,
    });
    res.io.to(eventId).emit('get-active-poll');
    return res.json({pollGenerated});
  }

  const pollGenerated = await Poll.create({
    _id: pollId,
    eventId,
    question,
    type,
  });

  const event = await Event.findById(eventId).select({polls: 1});
  event.polls.push(pollId);
  event.save();

  res.io.to(eventId).emit('get-active-poll');
  res.json({pollGenerated});
};
