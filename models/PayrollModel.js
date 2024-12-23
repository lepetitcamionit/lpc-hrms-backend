const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
  employeeId: { type: String, required: true, ref: "User" },
  salary: { type: Number, required: true },
  overtime: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number },
  paymentDate: { type: Date, required: true },
});

module.exports = mongoose.model("Payroll", payrollSchema);
