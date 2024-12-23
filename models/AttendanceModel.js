const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  employeeId: { type: String, required: true, ref: "User" },
  date: { type: Date, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String },
  status: { type: String, enum: ["present", "absent"], required: true },
  shiftId: { type: String, required: true, ref: "Shift" },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
