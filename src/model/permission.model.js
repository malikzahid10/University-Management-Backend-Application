const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./role.model");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true },
);

Role.belongsToMany(Permission, { through: "Roles_Has_Permission" });
Permission.belongsToMany(Role, { through: "Roles_Has_Permission" });

module.exports = Permission;
