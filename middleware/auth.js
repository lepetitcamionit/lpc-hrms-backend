const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Role = require("../models/RoleModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token:", token);

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id).populate("role");

    if (!req.user || req.user.isUserDeleted) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ErrorHandler("Role not found", 403));
    }

    try {
      const role = await Role.findById(req.user.role);

      if (!role) {
        return next(new ErrorHandler("Role not found", 404));
      }

      const roleName = role.roleId;

      if (!roles.includes(roleName)) {
        return next(
          new ErrorHandler(`${roleName} cannot access this resource`, 403)
        );
      }

      next();
    } catch (error) {
      return next(new ErrorHandler("Role check failed", 500));
    }
  };
};
