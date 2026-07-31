const Role = require("../model/role.model");

const createRoles = async (req, res) => {
  try {
    const { role } = req.body;

    const existingRoles = await Role.findOne({ where: { role: role } });
    if (existingRoles) {
      return res.status(409).json({
        message: "This Role is Already Exist!",
      });
    }

    const newRole = await Role.create({ role });
    return res.status(201).json({
      message: "Role is Created!",
      roleData: newRole,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = createRoles;
