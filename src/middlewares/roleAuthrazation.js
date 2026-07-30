const roleAuthrazation = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRoles = req.user.roles;

      const hasRoles = userRoles.some((role) => allowedRoles.includes(role));

      if (!hasRoles) {
        return res.status(403).json({
          message: "Access Denied!",
        });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = roleAuthrazation;
