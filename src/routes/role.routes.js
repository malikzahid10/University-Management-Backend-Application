const express = require("express");
const authenticateJwt = require("../Passport/passport.middlewares");
const roleAuthrazation = require("../middlewares/roleAuthrazation");
const roleValidate = require("../validations/role.validation");
const createRoles = require("../controllers/role.controllers");

const roleRouter = express.Router();

roleRouter.post(
  "/",
  authenticateJwt,
  roleAuthrazation(["Super Admin"]),
  roleValidate,
  createRoles,
);

module.exports = roleRouter;
