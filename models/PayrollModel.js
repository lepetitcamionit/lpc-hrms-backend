const payrollSchema = new Schema({
  payrollId: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, ref: "User" },
  salary: { type: Number, required: true },
  overtime: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
});

module.exports = mongoose.model("Payroll", payrollSchema);
