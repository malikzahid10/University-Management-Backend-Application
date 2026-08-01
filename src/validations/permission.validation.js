const Joi = require("joi");

const permissionSchema = Joi.object({
  permission: Joi.string().max(100).min(3).required(),
});

const attachPermissionSchema = Joi.object({
  roleId: Joi.number().integer().positive().required(),
  permissionId: Joi.number().integer().positive().required(),
});

const permissionValidate = (req, res, next) => {
  const { error } = permissionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const attachPermissionValidate = (req, res, next) => {
  const { error } = attachPermissionSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  permissionValidate,
  attachPermissionValidate,
};
