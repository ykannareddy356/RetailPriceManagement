const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("role is ", req.user.role);

    if (!req.user || !roles.includes(req.user.role)) {
  return res.status(403).json({
    message: "Access Denied"
  });
}

    next();
  };
};

module.exports = authorizeRoles;