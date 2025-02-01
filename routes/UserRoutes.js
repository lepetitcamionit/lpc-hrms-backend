const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/", userController.createUser);

router.get(
  "/admin",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "HR"),
  userController.getAllUsers
);

router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

router.post("/password/forgot", userController.forgotPassword);

router.patch("/password/reset/:token", userController.resetPassword);

router.get("/:id", isAuthenticatedUser, userController.getUserById);

router.patch("/:id", isAuthenticatedUser, authorizeRoles("admin", "manager", "owner", "HR"), userController.updateUser);

router.patch("/soft-delete/:id", isAuthenticatedUser, authorizeRoles("admin", "manager", "owner", "HR"), userController.softDeleteUser);

router.get("/auth/session", isAuthenticatedUser, userController.getSession);

//admin only
router.delete(
  "/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.actualdeleteUser
);

//admin only
router.patch(
  "/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.restoreUser
);

module.exports = router;
