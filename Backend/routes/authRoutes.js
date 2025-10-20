import express from 'express';
import { 
    signupController,
    loginController,
    verifyOTPController,
    googleAuthCallback,
    forgotPassword,
    resetPassword,
} from '../controllers/authController.js';
import { validateSignup, validateLogin, sanitizeSignupInput, sanitizeLoginInput } from '../middlewares/validateAuth.js';
import { limiter, loginLimiter, otpLimiter, resetLimiter } from '../middlewares/limiter.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', limiter, sanitizeSignupInput ,validateSignup, signupController);
router.post('/login', loginLimiter, sanitizeLoginInput, validateLogin, loginController);
router.post('/verify-otp', resetLimiter, verifyOTPController);

// //To be uncommented, when OAuth is implemented
// //Google OAuth routes
// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// router.get('/google/callback', passport.authenticate('google', { session: false}), googleAuthCallback);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetLimiter, resetPassword);

export default router;