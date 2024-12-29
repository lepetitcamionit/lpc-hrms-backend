const Shift = require("../models/ShiftModel");

exports.createShift = async (req, res) => {
  try {
    const existingShift = await Shift.findOne({ shiftId: req.body.shiftId });
    if (existingShift) {
      return res
        .status(400)
        .json({ error: "Shift with this shiftId already exists" });
    }

    const shift = await Shift.create(req.body);
    res.status(201).json(shift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ error: "Shift not found" });
    res.status(200).json(shift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json(shifts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shift) return res.status(404).json({ error: "Shift not found" });
    res.status(200).json(shift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) return res.status(404).json({ error: "Shift not found" });
    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
