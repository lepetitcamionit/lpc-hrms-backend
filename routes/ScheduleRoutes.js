const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createShiftSchedule,
  getShiftSchedule,
  getAllShiftSchedules,
  updateShiftSchedule,
  deleteShiftSchedule,
  getShiftScheduleByEmployee,
} = require("../controllers/ScheduleController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  createShiftSchedule
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  getShiftSchedule
);
router.get(
  "/employee/:employeeId",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  getShiftScheduleByEmployee
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  getAllShiftSchedules
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor"),
  updateShiftSchedule
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteShiftSchedule
);

module.exports = router;
