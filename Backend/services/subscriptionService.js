import Subscription from "../models/subscription.js";
import User from "../models/user.js";

export const resetPickupUsage =  async () => {
    const now = new Date();

    const subscriptions = await Subscription.find({ active: true}).populate('user');

    for (const sub of subscriptions) {
        const isFreemium = sub.user.subscriptionType == 'basic';
        const userCreatedAt = new Date(sub.user.createdAt);

        const freemiumExpired = isFreemium && now - userCreatedAt > 90 * 24 * 60 * 60 * 1000;
        const paidExpired = !isFreemium && sub.endDate < now;

        if (freemiumExpired || paidExpired) {
            sub.active = false;
            await sub.save();
            continue;
        }

        // Renew monthly usage
        sub.pickupUsed = 0;
        sub.startDate = now;
        sub.endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        await sub.save();
    }
}