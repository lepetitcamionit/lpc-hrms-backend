const Leave = require("../models/LeaveModel");

exports.createLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
