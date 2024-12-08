const express = require("express");
const {
  createTraining,
  getTraining,
  getAllTrainings,
  updateTraining,
  deleteTraining,
} = require("../controllers/TrainingController");

const router = express.Router();

router.post("/", createTraining);
router.get("/:id", getTraining);
router.get("/", getAllTrainings);
router.patch("/:id", updateTraining);
router.delete("/:id", deleteTraining);

module.exports = router;
