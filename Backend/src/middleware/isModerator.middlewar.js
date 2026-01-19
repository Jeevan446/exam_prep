const isAllowedAccess = (req, res, next) => {
  const allowedRoles = ["admin", "moderator"];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ 
      message: "Access denied: Only Admins and Moderators can access this resource." 
    });
  }


  next();
};

export default isAllowedAccess;