import {
  initializeTransaction,
  verifyTransaction,
} from "../services/paystackService.js";
import Pickup from "../models/pickup.js";

export const initiatePickupPayment = async (req, res) => {
  try {
    const { email, amount, pickupId } = req.body;
    
    const pickup = await Pickup.findById(pickupId);
    if(!pickup || pickup.user.toString()!== req.user.id) {
      return res.status(403).json({ error: "Unauthorized pickup payment attempt"})
    }

    const tx_ref = `pickup-${pickupId}-${Date.now()}`;

    const metadata = { pickupId, userId: req.user?.id || "anonymous" };
    const result = await initializeTransaction({
      email,
      amount: amount * 100, // Convert to kobo
      metadata,
      tx_ref,
    });

    res.status(200).json({ authorization_url: result.data.authorization_url });
  } catch (error) {
    console.error("Payment initiation error:", error.message);
    res.status(500).json({ message: "Payment processing failed. Please try again" });
  }
};

export const verifyPickupPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const result = await verifyTransaction(reference);

    if (result?.data?.status === "success") {
      const pickupId  = result.data.metadata?.pickupId;
      const pickup = await Pickup.findById(pickupId);
      
      if (pickup && pickup.paymentStatus != "paid") {
      await Pickup.findByIdAndUpdate(pickupId, {
        paymentStatus: "paid",
        paymentReference: result.data.reference,
        paidAt: Date(),
        visibility: true,
      })
    }
      return res
        .status(200)
        .json({ message: "Payment verified" });
    }
    res.status(400).json({ message: "Payment unsuccessful" });
  } catch (error) {
    console.error('Verification failed:', error.message);
    res.status(500).json({message: "Payment processing failed. Please try again"})
  }
};
