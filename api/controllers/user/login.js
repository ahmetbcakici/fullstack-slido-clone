import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {User} from '../../models';

export default async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) return res.status(404).send('User not found.');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Incorrect Pass');

  user.password = null;
  const token = await jwt.sign({user}, process.env.JWT_SECRET_KEY);
  res.json({user, token});
};
