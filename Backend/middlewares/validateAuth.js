import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); //Load environment variables


//Sign up validation schema
const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name cannot exceed 50 characters',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name cannot exceed 50 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required',
    }),
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
    const { error } = loginSchema.validate(req.body, {abortEarly: false});
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