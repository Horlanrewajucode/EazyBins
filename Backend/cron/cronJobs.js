import cron from "node-cron";
import { resetPickupUsage } from "../services/subscriptionService.js";
import { expireUnpaidPickups } from "../services/expireUnpaidPickups.js";

// Schedule the cron job for subscription pickup usage reset to run at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running daily pickup quota reset...");
    try {
        await resetPickupUsage();
        console.log("Pickup quota reset complete")
    } catch (error) {
        console.error("Error resetting pickup quota:", error.message);
    }
});


// Schedule the cron for Unpaid Pickup Expiration to run every minute
cron.schedule("* * * * *", async () => {
//   console.log("🔁 Running pickup expiration job...");
  await expireUnpaidPickups();
});