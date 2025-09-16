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
import passport from 'passport';

const router = express.Router();

router.post('/signup', sanitizeSignupInput ,validateSignup, signupController);
router.post('/login', sanitizeLoginInput, validateLogin, loginController);
router.post('/verify-otp', verifyOTPController);

// //To be uncommented, when OAuth is implemented
// //Google OAuth routes
// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// router.get('/google/callback', passport.authenticate('google', { session: false}), googleAuthCallback);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;