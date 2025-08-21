import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"EazyBins" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  await transporter.sendMail({
    from: `"EazyBins" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetURL}">${resetURL}</a></p>
      <p>This link expires in 30 minutes.</p>
    `,
  });
};

