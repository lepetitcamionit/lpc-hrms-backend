const notificationSchema = new Schema({
  message: { type: String, required: true },
  employeeId: { type: String, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notification", notificationSchema);
