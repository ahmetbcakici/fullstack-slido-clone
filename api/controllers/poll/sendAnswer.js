import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {pollId, answer, ownerQuestionerId} = req.body;

  const poll = await Poll.findById(pollId);

  // if there is already answer, delete it
  const currentAnswer = poll.answer.find(
    (answer) => answer.ownerQuestionerId == ownerQuestionerId
  );
  if (currentAnswer) poll.answer.remove(currentAnswer);

  poll.answer.push({
    _id: mongoose.Types.ObjectId(),
    answer,
    ownerQuestionerId,
  });
  poll.save();

  res.json({poll});
};
