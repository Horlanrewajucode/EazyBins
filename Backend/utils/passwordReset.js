import crypto from 'crypto';
import axios from 'axios';
import User from '../models/user.js';

export const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 1000 * 60 * 30;
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await axios.post(`${process.env.VERCEL_MAILER_URL}/api/send-email`, {
    type: 'reset',
    email: user.email,
    resetURL,
  });

  return { message: 'Reset link sent to email' };
};
