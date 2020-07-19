import {Poll, Event} from '../../models';

export default async (req, res) => {
  const {eventId, pollId} = req.body;

  await Poll.findByIdAndDelete(pollId);

  const event = await Event.findById(eventId);
  event.polls.remove(pollId);
  event.save();

  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
