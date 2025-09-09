import Joi from 'joi';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Signup Schema
const signupSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name cannot exceed 50 characters',
  }),
  lastName: Joi.string().trim().min(2).max(50).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name cannot exceed 50 characters',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().trim().min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required',
    }),
});
// Login schema
const loginSchema = Joi.object({
  identifier: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Identifier must be a string',
      'string.empty': 'Email or username is required',
    }),
  password: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
    }),
});


// Pre-sanitizaton middleware
const sanitizeSignupInput = (req, res, next) => {
  if (req.body.firstName) req.body.firstName = validator.escape(req.body.firstName.trim());
  if (req.body.lastName) req.body.lastName = validator.escape(req.body.lastName.trim());
  if (req.body.email) req.body.email = validator.normalizeEmail(req.body.email.trim());
  if (req.body.identifier) req.body.identifier = validator.escape(req.body.identifier.trim());
  if (req.body.password) req.body.password = req.body.password.trim(); // Don't escape passwords
  next();
};
const sanitizeLoginInput = (req, res, next) => {
  if (req.body.identifier) {
    req.body.identifier = validator.escape(req.body.identifier.trim());
  }
  if (req.body.password) {
    req.body.password = req.body.password.trim(); // Don't escape passwords
  }
  next();
};

// Validation middleware
const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};
export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/]).{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must not exceed 128 characters.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.'
    })
});

export { sanitizeSignupInput,sanitizeLoginInput, validateSignup, validateLogin,};

