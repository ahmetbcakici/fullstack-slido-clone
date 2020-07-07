import {Participant} from '../../models';

export default async (req, res) => {
  const {participantId} = req.query;

  const {_id, name} = await Participant.findById(participantId).select({
    _id: 1,
    name: 1,
  });

  res.json({_id, name});
};