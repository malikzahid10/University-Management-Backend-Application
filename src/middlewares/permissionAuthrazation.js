const permissionAuthorization = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;

    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = permissionAuthorization;
