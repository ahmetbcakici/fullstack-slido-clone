import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId} = req.body;

  const poll = await Poll.findOne({eventId, isActive: true}).select({
    hideResults: 1,
  });
  const currentState = poll.hideResults;
  poll.hideResults = !currentState;
  poll.save();
  
  res.io.to(eventId).emit('get-active-poll');
  res.send();
};
