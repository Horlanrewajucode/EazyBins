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

// New mailing system, using BREVO API service
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey= client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
const sender = { email: process.env.BREVO_SENDER, name: 'Eazybins'};

export const sendOTPEmail = async (email, otp) => {
  try {
     await emailApi.sendTransacEmail({
    sender,
    to: [{ email }],
    subject: 'Your OTP Code',
    htmlContent: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`
  })
  } catch (error) {
    console.error('Brevo OTP error:', error.response?.body || error.message);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
     await emailApi.sendTransacEmail({
    sender,
    to: [{ email }],
    subject: 'Reset Your Password',
    htmlContent: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetURL}">${resetURL}</a></p>
      <p>This link expires in 30 minutes.</p>
    `,
  })
  } catch (error) {
    console.error('Brevo password reset mail:', error.response?.body || error.message)
  }
}