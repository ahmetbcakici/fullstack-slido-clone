import Event from '../../models/event';

export default async (req, res) => {
  const {eventCode} = req.params;
  const {_id} = await Event.findOne({code: eventCode}).select({_id: 1});
  res.send(_id);
};
