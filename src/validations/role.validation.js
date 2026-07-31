const Joi = require("joi");

const roleSchema = Joi.object({
  role: Joi.string().min(2).max(20).required(),
});

const roleValidate = (req, res, next) => {
  const { error } = roleSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = roleValidate;
