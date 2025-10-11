import express from "express";
import { protect } from "../middlewares/protect.js";
import { updatePickupStatus } from "../controllers/updatePickupStatus.js";

const router = express.Router();

// GET /api/collectors
router.get("/pickups", protect, async (req, res) => {
  try {
    const Pickup = (await import("../models/pickup.js")).default;
    const pickups = await Pickup.find().populate("user", "name email").exec();
    res.json({ data: pickups });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/collectors/pickups/:id?status=completed
router.patch("/pickups/:id", protect, updatePickupStatus);

export default router;
