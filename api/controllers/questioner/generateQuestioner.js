import mongoose from 'mongoose';

import Questioner from '../../models/questioner';

export default async (req, res) => {
  const {_id} = await Questioner.create({
    _id: mongoose.Types.ObjectId(),
  });

  res.send(_id);
};
