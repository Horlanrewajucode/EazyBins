import Pickup from "../models/pickup.js";
import Subscriptions from "../models/subscription.js";

export const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.query; // e.g. /pickups/123?status=completed

    // Find and update the pickup status
    const pickup = await Pickup.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "_id name email");

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    // If the pickup is completed, update user's subscription
    if (status === "completed") {
      const subscription = await Subscriptions.findOne({
        user: pickup.user._id,
      });

      if (!subscription) {
        return res.status(404).json({ message: "User subscription not found" });
      }

      // Mark pickup as completed
      pickup.pickupStatus = "completed";
      await pickup.save();

      // Increase pickupUsed count by 1
      subscription.pickupUsed = (subscription.pickupUsed || 0) + 1;
      await subscription.save();
    }

    // Respond with updated pickup
    res.json({
      message: "Pickup updated successfully",
      pickup,
    });
  } catch (error) {
    console.error("Error updating pickup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
