import {
  initializeTransaction,
  verifyTransaction,
} from "../services/paystackService.js";

export const initiatePickupPayment = async (req, res) => {
  try {
    const { email, amount, pickupId } = req.body;

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
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};

export const verifyPickupPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const result = await verifyTransaction(reference);

    if (result?.data?.status === "success") {
      // TODO: Update pickup status in DB
      console.log("Sending success response:", result.data);
      return res
        .status(200)
        .json({ message: "Payment verified", data: result.data });
    }
    res.status(400).json({ message: "Payment unsuccessful" });
  } catch (error) {
    console.error('Verification failed:', error.message);
    res.status(500).json({
        message: 'Failed to verify payment',
        details: error.response?.data  || error.message
    })
  }
};
