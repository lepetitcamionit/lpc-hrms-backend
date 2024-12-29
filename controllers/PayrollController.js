const Payroll = require("../models/PayrollModel");

exports.createPayroll = async (req, res) => {
  try {
    const {
      salary,
      overtime = 0,
      deductions = 0,
      paymentDate,
      employeeId,
    } = req.body;

    const netPay = salary + overtime - deductions;

    const payroll = await Payroll.create({
      employeeId,
      salary,
      overtime,
      deductions,
      netPay,
      paymentDate,
    });

    res.status(201).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) return res.status(404).json({ error: "Payroll not found" });
    res.status(200).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPayrollByEmployee = async (req, res) => {
  try {
    const payroll = await Payroll.find({ employeeId: req.params.employeeId });
    if (!payroll)
      return res
        .status(404)
        .json({ error: "Payroll not found by employee id" });
    res.status(200).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.status(200).json(payrolls);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePayroll = async (req, res) => {
  try {
    const { salary, overtime, deductions } = req.body;

    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ error: "Payroll not found" });
    }

    payroll.salary = salary ?? payroll.salary;
    payroll.overtime = overtime ?? payroll.overtime;
    payroll.deductions = deductions ?? payroll.deductions;

    payroll.netPay = payroll.salary + payroll.overtime - payroll.deductions;

    await payroll.save();

    res.status(200).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) return res.status(404).json({ error: "Payroll not found" });
    res.status(200).json({ message: "Payroll deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
