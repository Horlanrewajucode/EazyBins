import express from 'express';
import { initiatePickupPayment, verifyPickupPayment } from '../controllers/paystackController.js';
import { protect } from '../middlewares/protect.js';
import { limiter } from '../middlewares/limiter.js';
const router = express.Router();

router.post('/initiate-pickup', limiter, protect, initiatePickupPayment);
router.get('/verify/:reference', protect, verifyPickupPayment)

export default router;