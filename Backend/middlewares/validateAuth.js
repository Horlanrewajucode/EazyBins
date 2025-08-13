import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); //Load environment variables


//Sign up validation schema
const signupSchema = Joi.object({
    fullName: Joi.string().min(2).max(100).required()
    .messages({
        'string.base': 'Full name must be a string',
        'string.empty': 'Full name is required',
        'string.min': 'Full name must be at least 2 characters',
        'string.max': 'Full name cannot exceed 100 characters',
    }),
    username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username is required',
        'string.min': 'Username must contain at least 3 characters',
        'string.max': 'Username cannot exceed 30 characters',
        'string.alphanum': 'Username can only contain letters and numbers',
    }),
    email: Joi.string().email().required
    .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
    }),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required()
    .messages({
        'string.pattern.base': 'Please provide a valid phone number',
        'string.empty': 'Phone number is required',
    }),
    password: Joi.string().min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z)(?=.*\\d)(?=.*[!@#$%^&*])'))
    .required()
    .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, number and special character',
        'string.min': 'Password must be at least 8 characters long',
        'string.empty': 'Password is required',
    }),
    address: Joi.object({
        street: Joi.string().max(200).required()
        .messages({
            'string.empty': 'Street address is required',
            'string max': 'Street address cannot exceed 200 characters',
        }),
        city: Joi.string().max(100).required
        .messages({
            'string.empty': 'City is required',
            'string.max': 'City name cannot exceed 100 charaters',
        }),
        state: Joi.string().max(100).required()
        .messages({
            'string.empty': 'State is required',
            'string.max': 'State name cannot exceed 100 character',
        }),
        country: Joi.string().max(100).required()
        .messages({
            'string.empty': 'Country is required',
            'string.max': 'Country name cannot exceed 100 characters',
        }),
    }).required(),
    
    role: Joi.string().valid('user','admin', 'collector').default('user'),
});

//Login validation schema
const loginSchema =Joi.object({
    identifier: Joi.string().required()
    .messages({
        'string.empty': 'Email or username is required',
    }),
    password: Joi.string().required()
    .messages({ 
        'string,empty': 'Password is required',
    }),
});

//Middleware for signup input validation
const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, {abortEarly: false});
    if (error) { 
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};

// Middleware for login input validation
const validateLogin = (req, res, next ) => {
    const { error } = loginSchema.validate(re.body, {abortEarly: false});
    if (error) { 
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};

//Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Access denied. No token provided'});
    } 
    let decoded;
    try { 
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token'})
    }
    
}

export default {
    validateSignup,
    validateLogin,
    verifyToken,
}