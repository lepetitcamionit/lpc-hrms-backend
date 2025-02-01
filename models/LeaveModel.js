const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  employeeId: { type: String, required: true, ref: "User" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ["annual", "sick", "emergency", "unpaid", "maternity", "marriage", "casual", "optionalDays", "probationaryPeriod", "hajj", "visaRun"], required: true },
  supervisorApprovalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  managerApprovalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  hrApprovalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Leave", leaveSchema);