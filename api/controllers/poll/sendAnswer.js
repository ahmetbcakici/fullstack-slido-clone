import mongoose from 'mongoose';

import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, pollId, type, answer, options, ownerParticipantId} = req.body;

  const poll = await Poll.findById(pollId);

  switch (type) {
    case 'Multiple Choice': {
      poll.options.map(({_id, participantsSelected}) => {
        const isOptionSelected = options.includes(_id.toString());
        if (isOptionSelected) {
          const alreadySaved = participantsSelected.includes(
            ownerParticipantId
          );

          if (!alreadySaved) participantsSelected.push(ownerParticipantId);

          return;
        }
        participantsSelected.remove(ownerParticipantId);
      });
      break;
    }
    case 'Rating':
    case 'Open Text':
    case 'Word Cloud': {
      const currentAnswer = poll.answers.find(
        (answer) => answer.ownerParticipantId == ownerParticipantId
      );
      if (currentAnswer) poll.answers.remove(currentAnswer);

      poll.answers.push({
        _id: mongoose.Types.ObjectId(),
        answer,
        ownerParticipantId,
      });
      break;
    }
    default:
      console.log('default s-c ');
  }

  poll.save();

  res.io.to(eventId).emit('get-active-poll');
  res.json({poll});
};
