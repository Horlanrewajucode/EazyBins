import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { type, email, otp, resetURL } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions;

  if (type === 'otp') {
    mailOptions = {
      from: `"EazyBins" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };
  } else if (type === 'reset') {
    mailOptions = {
      from: `"EazyBins" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetURL}">${resetURL}</a></p>
        <p>This link expires in 30 minutes.</p>
      `,
    };
  } else {
    return res.status(400).json({ error: 'Invalid email type' });
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
