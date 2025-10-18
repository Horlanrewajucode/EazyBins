import express from "express";
import { createPickup } from "../controllers/createPickup.js";
import { protect } from "../middlewares/protect.js";
import { resetPickupUsage } from "../services/subscriptionService.js";

const router = express.Router();

// POST /api/pickups
router.post("/", protect, createPickup);

export default router;
