import Event from '../../models/event';

export default async (req, res) => {
  const {eventId} = req.query;
  const questions = await Event.findById(eventId).populate('questions')
  console.log(questions);
  res.send('l')
};
