import crypto from 'crypto';
import { sendPasswordResetEmail } from './mailer.js'
import User from '../models/user.js';

export const initiatePasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 1000 * 60 * 30 // 30 minutes expiry
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.BACKEND_URL}/api/auth/reset-password/${token}`; // To be updated in the .env file with frontend base URL
    await sendPasswordResetEmail(user.email, resetURL);
    return { message: 'Reset link sent to email'};
}