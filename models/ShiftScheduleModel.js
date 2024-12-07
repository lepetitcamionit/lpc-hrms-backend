const shiftScheduleSchema = new Schema({
  employeeId: { type: String, required: true, ref: "User" },
  shiftId: { type: String, required: true, ref: "Shift" },
  shiftDate: { type: Date, required: true },
});

module.exports = mongoose.model("ShiftSchedule", shiftScheduleSchema);
