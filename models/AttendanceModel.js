const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  employeeName: {type: String},
  date: { type: Date, required: true },
  checkInTime: { type: String },
  checkOutTime: { type: String },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
