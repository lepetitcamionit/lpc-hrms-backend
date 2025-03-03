const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createNotification,
  getNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
} = require("../controllers/NotificationController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  createNotification
);
router.get("/:id", isAuthenticatedUser, getNotification);
router.get("/", isAuthenticatedUser, getAllNotifications);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateNotification
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteNotification
);

module.exports = router;
