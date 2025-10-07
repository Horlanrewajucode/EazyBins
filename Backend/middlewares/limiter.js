import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    // windowMs: 15 * 60 *1000, // 15 minutes
    // max: 5, // limit each IP to 5 requests
    // message: 'Too many requests, please try again later.'
});
