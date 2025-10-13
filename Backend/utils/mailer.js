
//PREVIOUS MAILER.JS LOGIC

// 
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (email, otp) => {
//   await transporter.sendMail({
//     from: `"EazyBins" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP is ${otp}. It expires in 5 minutes.`,
//   });
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   await transporter.sendMail({
//     from: `"EazyBins" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Reset Your Password',
//     html: `
//       <p>You requested a password reset. Click the link below to reset your password:</p>
//       <p><a href="${resetURL}">${resetURL}</a></p>
//       <p>This link expires in 30 minutes.</p>
//     `,
//   });
// };

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // These credentials must match the noreplyeazybins@gmail.com account
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an OTP email to the specified user.
 * This is the only email flow we'll be able to test during the demo,
 * since it's wired to the noreplyeazybins@gmail.com account.
 */
export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"EazyBins" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
};

/**
 * Sends a password reset email.
 * ⚠️ This function is included for completeness but will NOT be testable in the demo.
 * It requires a different sender email (e.g. support@eazybins.com) to avoid Gmail restrictions.
 * For now, it's safe to leave this unused.
 */
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
