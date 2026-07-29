const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  isActive: Joi.boolean().optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

const updateUserSchema = Joi.object({
  userName: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(4).max(20).optional(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const validateLoginUser = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const updateValidateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  validateUser,
  validateLoginUser,
  updateValidateUser,
};
