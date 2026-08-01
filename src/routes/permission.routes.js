const express = require("express");
const authenticateJwt = require("../Passport/passport.middlewares");
const roleAuthrazation = require("../middlewares/roleAuthrazation");
const {
  createPermissions,
  attachPermissions,
} = require("../controllers/permission.controllers");
const {
  permissionValidate,
  attachPermissionValidate,
} = require("../validations/permission.validation");

const permissionRouter = express.Router();

permissionRouter.post(
  "/",
  authenticateJwt,
  roleAuthrazation(["Super Admin"]),
  permissionValidate,
  createPermissions,
);

permissionRouter.post(
  "/:attachPermission",
  authenticateJwt,
  roleAuthrazation(["Super Admin"]),
  attachPermissionValidate,
  attachPermissions,
);

module.exports = permissionRouter;
