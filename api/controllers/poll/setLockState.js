import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId, pollId} = req.body;

  const poll = await Poll.findOne({eventId, isActive: true}).select({
    isLocked: 1,
  });
  const currentState = poll.isLocked;
  poll.isLocked = !currentState;
  poll.save();
  
  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
