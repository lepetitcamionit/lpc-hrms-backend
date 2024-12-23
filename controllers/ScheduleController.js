const ShiftSchedule = require("../models/ShiftScheduleModel");

exports.createShiftSchedule = async (req, res) => {
  try {
    const shiftSchedule = await ShiftSchedule.create(req.body);
    res.status(201).json(shiftSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getShiftSchedule = async (req, res) => {
  try {
    const shiftSchedule = await ShiftSchedule.findById(req.params.id);
    if (!shiftSchedule)
      return res.status(404).json({ error: "ShiftSchedule not found" });
    res.status(200).json(shiftSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getShiftScheduleByEmployee = async (req, res) => {
  try {
    const shiftSchedule = await ShiftSchedule.find({
      employeeId: req.params.employeeId,
    });
    if (!shiftSchedule)
      return res
        .status(404)
        .json({ error: "ShiftSchedule not found by employee id" });
    res.status(200).json(shiftSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllShiftSchedules = async (req, res) => {
  try {
    const shiftSchedules = await ShiftSchedule.find();
    res.status(200).json(shiftSchedules);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateShiftSchedule = async (req, res) => {
  try {
    const shiftSchedule = await ShiftSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!shiftSchedule)
      return res.status(404).json({ error: "ShiftSchedule not found" });
    res.status(200).json(shiftSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteShiftSchedule = async (req, res) => {
  try {
    const shiftSchedule = await ShiftSchedule.findByIdAndDelete(req.params.id);
    if (!shiftSchedule)
      return res.status(404).json({ error: "ShiftSchedule not found" });
    res.status(200).json({ message: "ShiftSchedule deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
