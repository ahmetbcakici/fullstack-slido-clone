import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {User} from '../../models';

export default async (req, res) => {
  const {password} = req.body;

  const hash = await bcrypt.hash(password, 10);

  req.body._id = mongoose.Types.ObjectId();
  req.body.password = hash;

  const user = await User.create(req.body);

  const token = await jwt.sign({user}, process.env.JWT_SECRET_KEY);
  res.json({user, token});
};
