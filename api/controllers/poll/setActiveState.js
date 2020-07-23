import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, pollId} = req.body;

  const poll = await Poll.findById(pollId).select({isActive: 1});
  const currentState = poll.isActive;
  if (!currentState)
    await Poll.updateMany({eventId, isActive: true}, {isActive: false});
  poll.isActive = !currentState;
  poll.save();

  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
