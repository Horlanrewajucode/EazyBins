import express from "express";
import { handlePaystackWebhook } from "../webhooks/paystackWebhook.js";

const router = express.Router();

router.post("/paystack", express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}), handlePaystackWebhook);

export default router; 