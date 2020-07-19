import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, pollId} = req.body;

  const poll = await Poll.findById(pollId);
  poll.answers = [];
  poll.options = [];
  poll.save();

  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
