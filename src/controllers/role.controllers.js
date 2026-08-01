const Role = require("../model/role.model");
const User = require("../model/user.model");

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

const attachRoles = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    const role = await Role.findOne({ where: { id: roleId } });

    if (!role) {
      return res.status(404).json({
        message: "role not found!",
      });
    }

    const alreadyAssigned = await user.hasRole(role);
    if (alreadyAssigned) {
      return res.status(409).json({
        message: "This role is already assigned to this user.",
      });
    }

    await user.addRoles(role);
    return res.status(200).json({
      message: "Role Assigned Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createRoles,
  attachRoles,
};
