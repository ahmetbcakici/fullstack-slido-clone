import mongoose from 'mongoose';

import Questioner from '../../models/questioner';

export default async (req, res) => {
  const {_id, name} = await Questioner.create({
    _id: mongoose.Types.ObjectId(),
  }).select({_id: 1, name: 1});

  res.json({_id, name});
};
