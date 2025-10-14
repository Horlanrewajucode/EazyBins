import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests
    message: 'Too many login requests, please try again in 15 minutes.'
});

export const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many OTP requests. Please wait before trying again'
});

export const resetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Too many password reset attempts. Try again in an hour',
})

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests. Please try again later'
})