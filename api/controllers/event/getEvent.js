import {Event} from '../../models';

export default async (req, res) => {
  const {eventCode} = req.params;
  const event = await Event.findOne({code: eventCode}).select({
    questions: 0,
    polls: 0,
  });
  if (!event) return res.status(404).send('Event not found');

  res.send(event);
};
