const notificationSchema = new Schema({
  notificationId: { type: String, required: true, unique: true },
  message: { type: String, required: true },
  employeeId: { type: String, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notification", notificationSchema);
