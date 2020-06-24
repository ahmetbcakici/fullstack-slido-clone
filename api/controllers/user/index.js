import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../../models/user';

import sendCodeToVerifyEmail from '../utils/sendCodeToVerifyEmail';
import {upload} from '../config/multer';

export const login = (req, res) => {
  return res.send('test');
};
