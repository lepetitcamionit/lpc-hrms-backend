const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");

// Create new user
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ userId: req.body.userId });

    if (existingUser) {
      return res.status(400).json({ message: "userId already exists" });
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

  const user = await User.findOne({ userId, password });

  if (!user) {
    return next(
      new ErrorHandler("User is not find with this userId & password", 400)
    );
  }

  if (user.isUserDeleted) {
    return next(new ErrorHandler("This user account is deactivated.", 403));
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
