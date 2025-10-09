import cron from "node-cron";
import { resetPickupUsage } from "../services/subscriptionService.js";

// Schedule the cron job to run at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running daily pickup quota reset...");
    try {
        await resetPickupUsage();
        console.log("Pickup quota reset complete")
    } catch (error) {
        console.error("Error resetting pickup quota:", error.message);
    }
});