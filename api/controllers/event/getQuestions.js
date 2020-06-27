import mongoose from 'mongoose';

import generateRandom from '../../utils/generateRandom';

import Event from '../../models/event';

export default async (req, res) => {
  const {eventId} = req.query;
  console.log(eventId)
  const questions = await Event.findById(eventId).populate('questions');
  console.log(questions);
};
