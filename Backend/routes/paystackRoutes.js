import express from 'express';
import { initiatePickupPayment, verifyPickupPayment } from '../controllers/paystackController.js';

const router = express.Router();

router.post('/initiate-pickup', initiatePickupPayment);
router.get('/verify/:reference', verifyPickupPayment)

export default router;