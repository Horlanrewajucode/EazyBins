import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import Subscription from "../models/subscription.js";
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
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: " User with this email already exists" });
    }

    // Create new user(password hashing handled in User model pre-save hook)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      profileCompleted: false,
    });

    // Auto-assign Basic subscription to new users
    const basicSubscription = await Subscription.create({
      user: newUser.id,
      plan: "basic",
      pickupQuota: 3,
      pickupUsed: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      active: true,
    });

    newUser.subscription = basicSubscription._id;
    await newUser.save();

   // Generate and send OTP for email verification
// ✅ This is the only email flow wired to noreplyeazybins@gmail.com and testable in the demo
const otp = createOTP();
storeOTP(email, otp);
await sendOTPEmail(email, otp);

    return res
      .status(201)
      .json({
        message: "User created successfully. OTP sent for verification.",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An unexpected error occurred, please try again later." });
  }
};

/**
 * @desc Handles user login
 * - Accepts either email or username as identifier
 * - Verifies password against stored hash
 * - Checks if email is verified
 * - Issues JWT token upon successful authentication
 */
export const loginController = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be either email or username

    // Attempt to find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password"); // explicitly include password field

    // If no user is found, return 404
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Ensure user has verified their email before allowing login
    if (!user.isEmailVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email before logging in" });
    }

    // Generate JWT token for authenticated session
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and success message
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * @desc Verifies OTP and issues JWT token
 * - Validates OTP from user input
 * - Issues JWT token if OTP is valid
 */
export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input (optional but good practice)
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    // Verify OTP
    const result = verifyOTP(email, otp);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    // Fetch user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    await user.save();

    // I don't think we need to issue a token here since user already has one from login

    // // Issue JWT token
    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
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
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    // Respond with token and basic user info
    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
      },
    });
  } catch (err) {
    //Handle unexpected errors
    res
      .status(500)
      .json({ message: "Google login failed", error: err.message });
  }
};
/**
 * @desc  Controller to handle user password reset using token
 * ⚠️ This flow is not testable in the demo because it requires a separate sender email
 * (e.g. support@eazybins.com) due to Gmail restrictions on password reset content.
 */
export const forgotPassword = async (req, res) => {
  try {
    const result = await initiatePasswordReset(req.body.email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc  Controller to handle password reset confirmation
 * ⚠️ This flow is not testable in the demo due to sender limitations.
 */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Validate newPassword
    const { error } = resetPasswordSchema.validate({ newPassword });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token invalid or expired" });
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
