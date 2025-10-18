import mongoose from "mongoose";

const PickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: ["one-time", "subscription"],
    required: true,
  },

  pickupStatus: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed", "cancelled"],
    default: "pending",
  },

  location: {
    address: { type: String, required: true },
    // coordinates: {
    //   lat: { type: Number },
    //   lng: { type: Number },
    // }, // for future geolocation feature support
  },

  scheduledDate: { type: Date }, // For one-time pickups

  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription", // Links pickup to user's active subscription
  },

  // collector: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Collector",
  // },  // Not certain since we're going to have collectors view available pickups by region

  paid: {
    type: Boolean,
    default: false,
  },

  paymentReference: { type: String },
  paidAt: { type: Date },

  notes: { type: String },
  images: [{ type: String }], // URLs or file paths

  rewardPoints: { type: Number, defualt: 0 },
  blockedAccess: { type: Boolean, default: false },

  createdAt: {
    type: Date,
    defualt: Date.now,
  },
});

export default mongoose.model("Pickup", PickupSchema);
