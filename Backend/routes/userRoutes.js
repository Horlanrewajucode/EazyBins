import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js'; 
import { validateProfileUpdate } from '../middlewares/validateProfileUpdate.js';
import { limiter } from '../middlewares/limiter.js';
const router = express.Router();

router.patch('/profile', limiter, protect, validateProfileUpdate, updateProfile);

export default router;
