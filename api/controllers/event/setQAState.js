import {Event} from '../../models';

export default async (req, res) => {
  const {eventId} = req.body;

  const event = await Event.findById(eventId).select({
    disableQA: 1,
  });
  const currentState = event.disableQA;
  event.disableQA = !currentState;
  event.save();

  res.io.to(eventId).emit('set-event');
  res.send();
};
