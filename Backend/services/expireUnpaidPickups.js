import Pickup from "../models/pickup.js";

export const expireUnpaidPickups = async () => {
  try {
    const cutoff = new Date(Date.now() - 15 * 60 * 1000);

    const pickups = await Pickup.find({
      type: "one-time",
      paymentStatus: "pending",
      status: "pending",
      createdAt: { $lte: cutoff }
    });

    for (let pickup of pickups) {
      pickup.status = "unpaid";
      pickup.paymentStatus = "expired";
      pickup.visibility = false;
      await pickup.save();
    }
  } catch (err) {
    console.error("Expiration job failed:", err.message);
  }
};
