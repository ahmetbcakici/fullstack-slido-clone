import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {pollId, answer, ownerQuestionerId} = req.body;

  const poll = await Poll.findById(pollId);

  poll.answer.push({
    _id: mongoose.Types.ObjectId(),
    answer,
    ownerQuestionerId,
  });
  poll.save();

  res.json({poll});
};
