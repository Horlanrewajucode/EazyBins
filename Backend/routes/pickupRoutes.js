import express from "express";
import { createPickup } from "../controllers/createPickup.js";
import { protect } from "../middlewares/protect.js";
import { resetPickupUsage } from "../services/subscriptionService.js";
import { limiter } from "../middlewares/limiter.js";
const router = express.Router();

// POST /api/pickups
router.post("/", limiter, protect, createPickup);

export default router;
