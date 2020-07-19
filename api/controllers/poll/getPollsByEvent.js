import {Poll} from '../../models';

export default async (req, res) => {
  const {eventId} = req.query;

  const polls = await Poll.find({eventId});

  res.send(polls);
};
