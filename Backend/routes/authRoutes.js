import express from 'express';
import { 
    signupController,
    loginController,
    verifyOTPController,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/verify-otp', verifyOTPController);

export default router;