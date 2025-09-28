const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. No user found." });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden. Access denied." });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Role check failed", error: err.message });
    }
  };
};

module.exports = roleCheck;
