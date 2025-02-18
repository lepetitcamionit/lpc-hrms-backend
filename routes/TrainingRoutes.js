const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createTraining,
  getTraining,
  getAllTrainings,
  updateTraining,
  deleteTraining,
} = require("../controllers/TrainingController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  createTraining
);
router.get(
  "/:id",
  isAuthenticatedUser,
  getTraining
);
router.get(
  "/",
  isAuthenticatedUser,
  getAllTrainings
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  updateTraining
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  deleteTraining
);

module.exports = router;
