const Branch = require("../models/BranchModel");

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
