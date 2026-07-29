"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../src/model/user.model");
const Role = require("../src/model/role.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const encryptedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10,
    );
    const user = await User.create({
      userName: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: encryptedPassword,
    });

    const superAdminRole = await Role.findOne({
      where: { role: "Super Admin" },
    });
    await user.addRoles(superAdminRole);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
