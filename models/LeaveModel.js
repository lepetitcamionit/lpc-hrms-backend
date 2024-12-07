const leaveSchema = new Schema({
  leaveId: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, ref: "User" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ["sick", "vacation", "casual"], required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
