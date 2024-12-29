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
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  createTraining
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  getTraining
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  getAllTrainings
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  updateTraining
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  deleteTraining
);

module.exports = router;
