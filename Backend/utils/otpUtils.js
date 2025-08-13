import { generateOTP } from 'otp-agent';
import otpCache from './otpCache.js';

export const createOTP = () => generateOTP({
  length: 6,
  numbers: true,
  alphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
});

export const storeOTP = (email, otp) => {
  otpCache.set(email, otp);
};

export const verifyOTP = (email, inputOtp) => {
  const storedOtp = otpCache.get(email);
  if (!storedOtp) return { success: false, message: 'OTP expired or not found' };
  if (storedOtp !== inputOtp) return { success: false, message: 'Invalid OTP' };
  otpCache.del(email);
  return { success: true, message: 'OTP verified' };
};
