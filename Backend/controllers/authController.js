import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import { createOTP, storeOTP, verifyOTP } from "../utils/otpUtils.js";
import { initiatePasswordReset } from "../utils/passwordReset.js";
import { sendOTPEmail } from "../utils/mailer.js";


dotenv.config();

/**
 * @desc Handles user signup
 * - Checks for existing user by email or username
 * - Creates new user (password is hashed via pre-save hook)
 * - Generates and sends OTP for email verification
 */
export const signupController = async (req, res) => {
  const { fullName, username, email, phoneNumber, password, address, role } =
    req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with this email or username already exists" });
  }

  // Create new user (password will be hashed via model hook)
  const newUser = await User.create({
    fullName,
    username,
    email,
    phoneNumber,
    password,
    address,
    role,
  });

  // Generate and send OTP for email verification
  const otp = createOTP();
  storeOTP(email, otp);
  await sendOTPEmail(email, otp);

  res.status(201).json({ message: "User created. OTP sent for verification." });
};

/**
 * @desc Handles user login
 * - Verifies email and password
 * - Sends OTP for second-factor authentication
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Find user and explicitly include password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare incoming password with stored hash
  const isMatch = await bcrypt.compare(password.trim(), user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate and send OTP for login verification
  const otp = createOTP();
  storeOTP(user.email, otp);
  await sendOTPEmail(user.email, otp);

  res.status(200).json({ message: "OTP sent for login verification." });
};

/**
 * @desc Verifies OTP and issues JWT token
 * - Validates OTP from user input
 * - Issues JWT token if OTP is valid
 */
export const verifyOTPController = async (req, res) => {
  const { email, otp } = req.body;

  const result = verifyOTP(email, otp);
  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  // Optional: fetch user for token payload
  const user = await User.findOne({ email });

  // Issue JWT token
  const token = jwt.sign(
    { id: user._id }, // use user ID for token payload
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: result.message, token });
};

/**
 * @desc Controller to handle Google OAuth callback
 * Passport sets req.user after successful authentication
 * We issue a JWT and return user info to the client.
 */
export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user; // Passport attaches the authenticated user

    // Generate JWT token with user ID as payload
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '7d'} // Token valid for 7 days
    )

    // Respond with token and basic user info
    res.status(200).json({
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo
      }
    });
  } catch (err) {
    //Handle unexpected errors
    res.status(500).json({ message: 'Google login failed', error: err.message})
  }
}
/**
 * @desc  Controller to handle user password reset using token
 */
export const forgotPassword = async (req, res) => {
  try {
    const result = await initiatePasswordReset(req.body.email)
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset' });
};
