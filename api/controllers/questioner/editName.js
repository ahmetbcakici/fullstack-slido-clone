import Questioner from '../../models/questioner';

export default async (req, res) => {
  const {eventId, questionerId, name: newName} = req.body;

  if (!questionerId || !newName)
    return res.status(400).send('Fill all fields.');

  const {_id, name} = await Questioner.findByIdAndUpdate(
    questionerId,
    {
      name: newName,
    },
    {new: true}
  ).select({_id: 1, name: 1});

  res.io.to(eventId).emit('set-questions');
  res.json({_id, name});
};
