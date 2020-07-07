import {Participant} from '../../models';

export default async (req, res) => {
  const {eventId, participantId, name: newName} = req.body;

  if (!participantId || !newName)
    return res.status(400).send('Fill all fields.');

  const {_id, name} = await Participant.findByIdAndUpdate(
    participantId,
    {
      name: newName,
    },
    {new: true}
  ).select({_id: 1, name: 1});

  res.io.to(eventId).emit('set-questions');
  res.json({_id, name});
};
