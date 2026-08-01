const Permission = require("../model/permission.model");
const Role = require("../model/role.model");

const createPermissions = async (req, res) => {
  try {
    const { permission } = req.body;
    const checkPermission = await Permission.findOne({
      where: { permission },
    });

    if (checkPermission) {
      return res.status(409).json({
        message: "This Permission is Already Exist.",
      });
    }

    const newPermission = await Permission.create({ permission });
    return res.status(201).json({
      message: "Permission is Created!",
      permissionData: newPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const attachPermissions = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const role = await Role.findOne({ where: { id: roleId } });
    if (!role) {
      return res.status(404).json({
        message: "This Role is Not Found!",
      });
    }

    const permission = await Permission.findOne({
      where: { id: permissionId },
    });
    if (!permission) {
      return res.status(404).json({
        message: "This Permission is Not Found!",
      });
    }

    const alreadyAssigned = await role.hasPermission(permission);
    if (alreadyAssigned) {
      return res.status(409).json({
        message: "This Permission is already assigned this user.",
      });
    }

    await role.addPermissions(permission);
    return res.status(200).json({
      message: "Permission has been created successfully! in roles",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createPermissions,
  attachPermissions,
};
