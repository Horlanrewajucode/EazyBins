
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

import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends OTP email using Resend API
 * ✅ This is the only email flow wired to noreplyeazybins@gmail.com and testable in the demo
 */
export const sendOTPEmail = async (email, otp) => {
  console.log(`📨 Sending OTP to ${email} via Resend...`);
  const response = await resend.emails.send({
    from: 'EazyBins <onboarding@resend.dev>', // Sandbox sender
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
  });
  console.log("📬 Resend response:", response);
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
