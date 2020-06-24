import mongoose from 'mongoose';

import User from '../models/user';
import Event from '../models/event';

export const get = (req, res) => {
  return res.send('test');
};
