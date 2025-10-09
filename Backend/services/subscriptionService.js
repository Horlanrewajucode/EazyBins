import Subscription from "../models/subscription.js";

export const resetPickupUsage = async () => {
    const now = new Date();

    await Subscription.updateMany(
        { active: true },
        {
            $set: {
                pickupUsed: 0,
                startDate: now,
                endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
            },
        }
    );
};