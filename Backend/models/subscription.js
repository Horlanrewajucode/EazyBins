import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  plan: {
    type: String,
    enum: ["basic", "pro", "premium"],
    default: "basic",
  },

  pickupQuota: {
    type: Number,
    required: true,
    default: 3, // Basic plan default
  },

  pickupUsed: {
    type: Number,
    default: 0,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days ahead
  },

  active: {
    type: Boolean,
    default: true,
  },

  paymentReference: {
    type: String,
  },

  paidAt: {
    type: Date,
  },
});

export default mongoose.model("Subscription", SubscriptionSchema);

// Virtuals
SubscriptionSchema.virtual('isPaid').get(function () {
  return !!(this.paymentReference && this.paidAt);
});