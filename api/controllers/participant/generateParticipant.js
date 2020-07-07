import mongoose from 'mongoose';

import {Participant} from '../../models';

export default async (req, res) => {
  const {_id, name} = await Participant.create({
    _id: mongoose.Types.ObjectId(),
  });

  res.json({_id, name});
};
