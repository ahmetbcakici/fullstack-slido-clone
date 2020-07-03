import mongoose from 'mongoose';

import generateRandom from '../../utils/generateRandom';

import {Event} from '../../models';

export default async (req, res) => {
  const {userId: ownerUserId} = req.body;
  let code, unique;

  // uniquely control
  do {
    code = generateRandom();
    unique = await Event.countDocuments({code});
  } while (unique > 0);

  const ress = await Event.create({
    _id: mongoose.Types.ObjectId(),
    ownerUserId,
    code,
  });
  return res.send(ress);
};
