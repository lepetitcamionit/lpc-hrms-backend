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
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  createShiftSchedule
);
router.get("/:id", isAuthenticatedUser, getShiftSchedule);
router.get(
  "/employee/:employeeId",
  isAuthenticatedUser,
  getShiftScheduleByEmployee
);
router.get("/", isAuthenticatedUser, getAllShiftSchedules);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  updateShiftSchedule
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  deleteShiftSchedule
);

module.exports = router;
