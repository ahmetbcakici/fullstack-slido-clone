import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {pollId, answer, ownerParticipantId} = req.body;

  const poll = await Poll.findById(pollId);

  // if there is already answer, delete it
  const currentAnswer = poll.answers.find(
    (answer) => answer.ownerParticipantId == ownerParticipantId
  );
  if (currentAnswer) poll.answers.remove(currentAnswer);

  poll.answers.push({
    _id: mongoose.Types.ObjectId(),
    answer,
    ownerParticipantId,
  });
  poll.save();

  res.json({poll});
};
