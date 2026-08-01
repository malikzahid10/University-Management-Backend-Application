const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../model/role.model");
const Permission = require("../model/permission.model");
require("dotenv").config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email, isActive: true },
      include: { model: Role, include: { model: Permission } },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    const userRoles = [];

    const userPermissions = [];

    for (const role of user.Role) {
      userRoles.push(role.role);

      for (const permission of role.Permission) {
        userPermissions.push(permission.permission);
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        roles: userRoles,
        permissions: userPermissions,
      },
      process.env.jwt_secret_key,
      { expiresIn: "12h" },
    );

    return res.status(200).json({
      message: "Login Successful!",
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        roles: userRoles,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  userLogin,
};
