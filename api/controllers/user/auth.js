import jwt from 'jsonwebtoken';

import {User} from '../../models';

export default async (req, res) => {
  const {token} = req.body;
  if (!token) return res.status(400).send('Unauthorized.');

  try {
    const {
      user: {username},
    } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({username});

    if (!user) return res.status(404).send('User could not found.');

    return res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send('Invalid token.');
  }
};
