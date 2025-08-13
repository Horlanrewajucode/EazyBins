import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import { createOTP, storeOTP, verifyOTP } from "../utils/otpUtils.js";
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
