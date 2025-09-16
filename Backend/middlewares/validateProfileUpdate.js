import Joi from 'joi';

const profileUpdateSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50),
  lastName: Joi.string().trim().min(2).max(50),
  username: Joi.string().alphanum().min(3).max(30).lowercase().trim(),
  phoneNumber: Joi.string()
    .pattern(/^\+?234[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Invalid Nigerian phone number format' }),
  gender: Joi.string().valid('male', 'female', 'other'),
  dob: Joi.date().less('now').iso(),
  country: Joi.string().valid('Nigeria').messages({
    'any.only': 'Currently, our services are only available in Nigeria'
  }),
  address: Joi.object({
    street: Joi.string().max(200).trim(),
    state: Joi.string().max(100).trim(),
    city: Joi.string().max(100).trim()
  }).optional()
}).min(1); // Require at least one field

export const validateProfileUpdate = (req, res, next) => {
  const { error, value } = profileUpdateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const isEmpty = error.details.some(detail => detail.type === 'object.min');
    if (isEmpty) {
      return res.status(400).json({ message: 'No information provided, returning to profile' });
    }

    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ status: 'fail', errors });
  }

  req.body = value; // sanitized input
  next();
};
