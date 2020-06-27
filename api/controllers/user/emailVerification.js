import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const {code, token} = req.body;

  if (!code || !token) return res.status(400).send('Please fill all fields.');

  try {
    const {email_verification} = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    if (code !== email_verification)
      return res.status(401).send('Incorrect Confirm Code');

    res.send();
  } catch (e) {
    res.status(401).send('Invalid Token');
  }
};
