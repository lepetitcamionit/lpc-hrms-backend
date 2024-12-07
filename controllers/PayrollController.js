const Payroll = require("../models/PayrollModel");

exports.createPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);
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
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payroll) return res.status(404).json({ error: "Payroll not found" });
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
