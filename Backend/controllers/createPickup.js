import Pickup from "../models/pickup.js";
import Subscription from "../models/subscription.js";

export const createPickup =  async (req, res) => {
  try {
    const user = req.user; // Authenticated user from middleware
    const { type, address, scheduledDate, notes, paymentReference } = req.body;
    // Validate role
    if (user.role !== "user") {
      return res.status(403).json({ message: "Only users can request pickups."});
    }

    // Validate required fields
    if (!type || !address) {
      return res.status(400).json({ message: "Missing required fields."});
    }

    if (type === "one-time" && !scheduledDate) {
      return res.status(400).json({ message: "Scheduled date is required for one-time pickups."})
    }

    // Handle subscription pickups 
    if (type === "subscription") {
      const subscription =  await Subscription.findOne({ user: user._id, active: true });

      if (!subscription) {
        return res.status(403).json({ message: "No active subscription found"});
      }

      if (subscription.pickupUsed >= subscription.pickupQuota) {
        return res.status(403).json({ message: "Pickup quota exceeded. Upgrade yoour plan or request a one-time pickup."});
      }

      // Create subscription pickup

      const pickup = new Pickup({
        user: user.id,
        type,
        location: { address },
        scheduledDate,
        subscription: subscription._id,
        notes
      });
      
      await pickup.save();

      // Increment pickupUsed
      subscription.pickupUsed += 1;
      await subscription.save();

      return res.status(201).json({
        message: "Subscription pickup created",
        data: pickup
      });
    }

    // Handle one-tiime pickup
    if (type === "one-time") {
      if (!paymentReference) {
        return res.status(400).json({ message: "Payment reference required for one-time pickup"});
      }

      const pickup = new Pickup({
        user: user._id,
        type,
        location: { address },
        scheduledDate,
        paid: true,
        paymentReference,
        notes
      });

      await pickup.save();

      return res.status(201).json({
        message: "One-time pickup created",
        data: pickup
      });
     }

     // Invalid type
     return res.status(400).json({ message: "Invalid pickup type" });

  } catch (error) {
    console.error("Pickup creation failed:", error.message);
    res.status(500).json({
      message: "Server error, please try again later",
      error: error.message
    });
  }
};