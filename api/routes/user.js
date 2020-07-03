import express from 'express';

import {
  auth,
  register,
  login,
  sendCodeToEmail,
  emailVerification,
} from '../controllers/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/auth', auth);
router.post('/send-code-to-email', sendCodeToEmail);
router.post('/email-verification', emailVerification);

export default router;
