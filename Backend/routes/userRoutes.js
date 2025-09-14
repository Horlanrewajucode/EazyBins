import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js'; 
import { validateProfileUpdate } from '../middlewares/validateProfileUpdate.js';
const router = express.Router();

router.patch('/profile', protect, validateProfileUpdate, updateProfile);

export default router;
