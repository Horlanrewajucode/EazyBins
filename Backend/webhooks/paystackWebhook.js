import crypto from 'crypto';
import Pickup from '../models/pickup.js';

export const handlePaystackWebhook = async (req, res) => {
    try {
        const hash = crypto
        .createHmac('sha512', process.env.PAYSTACK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");

        if (hash !== req.headers["x-paystack-signature"]) {
            return res.status(403).send("Invalid signature");
        }

        const event = req.body;

        if (event.event === "charge.success") {
            const pickupId = event.data.metadata.pickupId;

            if (!pickupId) {
                return res.status(400).send("Missing pickup ID in metadata");
            }

            const pickup = await Pickup.findById(pickupId);

            if (pickup && pickup.paymentStatus !== "paid") {
                pickup.paymentStatus = "paid";
                pickup.paymentReference = event.data.reference;
                pickup.paidAt = new Date();
                pickup.visibility = true;

                await pickup.save()
            }

            return res.status(200).send("Pickup payment confirmed");
        }

        return res.status(200).send("Event received")
    } catch (error) {
        console.error("Paystack webhook error: ", error.message);
        res.status(500).send("Webhook processing failed");
    }
};