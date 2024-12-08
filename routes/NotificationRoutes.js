const express = require("express");
const {
  createNotification,
  getNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
} = require("../controllers/NotificationController");

const router = express.Router();

router.post("/", createNotification);
router.get("/:id", getNotification);
router.get("/", getAllNotifications);
router.patch("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
