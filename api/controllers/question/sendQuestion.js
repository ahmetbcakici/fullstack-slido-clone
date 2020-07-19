import mongoose from 'mongoose';

import {Event, Question, Participant} from '../../models';

export default async (req, res) => {
  let {participantId, eventId, question, isAnon} = req.body;

  const questionId = mongoose.Types.ObjectId();
  Question.create({
    _id: questionId,
    ownerParticipantId: participantId,
    eventId,
    question,
    isAnon,
  });

  const participant = await Participant.findById(participantId).select({
    questions: 1,
  });
  const event = await Event.findById(eventId).select({questions: 1});
  participant.questions.push(questionId);
  event.questions.push(questionId);
  event.save();
  participant.save();

  res.io.to(eventId).emit('set-questions');
  res.send();
};
