import jwt from 'jsonwebtoken';

import {generateRandom, sendCodeToVerifyEmail} from '../../utils';

import {User} from '../../models';

export default async (req, res) => {
  const {email} = req.body;
  const confirmCode = generateRandom();

  if (!email) return res.status(400).send('Please fill all fields.');

  const isRegistered = await User.countDocuments({email});

  if (isRegistered > 0)
    return res.status(400).send('This e-mail address already registered.');

  console.log(confirmCode);
  //await sendCodeToVerifyEmail(email, confirmCode);
  const token = await jwt.sign(
    {email_verification: confirmCode},
    process.env.JWT_SECRET_KEY
  );
  res.send(token);
};
