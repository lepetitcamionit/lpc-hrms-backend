const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");

// Create new user
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      sendToken(newUser, 201, res);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return next(new ErrorHandler("Please enter the userId & password", 400));
  }

  const user = await User.findOne({ userId }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User is not find with this userId & password", 400)
    );
  }

  if (user.isUserDeleted) {
    return next(new ErrorHandler("This user account is deactivated.", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler(
        "User is not find with this userId address & password",
        400
      )
    );
  }

  sendToken(user, 201, res);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorHandler("User is not found with this email address", 400)
    );
  }

  const resetToken = user.getResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/v1/user/password/reset/${resetToken}`;
  const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis Reset Passoword link is only valid for 10 minutes\n\nLe Petit Camion`;
  try {
    await sendMail({
      email: user.email,
      subject: "Password Reset Link - Le Petit Camion Website",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent to your inbox",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(
      new ErrorHandler(
        "There was an error sending password reset email. Please try again later",
        500
      )
    );
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or expired", 400));
  }

  const { password, confirmPassword } = req.body;

  // Check if password and confirmPassword are provided
  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password fields are required", 400)
    );
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password do not match", 400)
    );
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.passwordChangedAt = Date.now();

  user.save();

  sendToken(user, 201, res);
});

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isUserDeleted: false });

    // If no users found, return 204 No Content
    if (users.length === 0) {
      return res.status(204).send(); // No Content
    }

    // If users are found, return them with a 200 status code
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(204).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete user
exports.softDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you're passing the user ID in the URL

    // Find the user by ID and update the isUserDeleted attribute
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isUserDeleted: true },
      { new: true } // Return the updated document
    );

    // Check if the user was found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User successfully deleted", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore user
exports.restoreUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isUserDeleted: false },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User successfully restored", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
exports.actualdeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No session found" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedData.id);

    if (!user || user.isUserDeleted) {
      return res.status(401).json({
        success: false,
        message: "Invalid session or user deleted",
      });
    }

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(new ErrorHandler("Session validation failed", 401));
  }
};
