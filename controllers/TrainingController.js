const Training = require("../models/TrainingModel");

exports.createTraining = async (req, res) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json(training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.status(200).json(training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json(trainings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.status(200).json(training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
