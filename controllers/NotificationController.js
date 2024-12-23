const Notification = require("../models/NotificationModel");

exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
