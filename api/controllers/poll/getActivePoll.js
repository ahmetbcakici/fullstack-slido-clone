import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId} = req.query;

  const poll = await Poll.findOne({eventId, isActive: true});

  res.send(poll);
};
