const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createAttendance,
  getAttendance,
  getAllAttendances,
  updateAttendance,
  deleteAttendance,
  getAttendaceByEmployee,
} = require("../controllers/AttendanceController");

const router = express.Router();

router.post("/", isAuthenticatedUser, createAttendance);
router.get("/:id", isAuthenticatedUser, getAttendance);
router.get(
  "/employee/:employeeId",
  isAuthenticatedUser,
  getAttendaceByEmployee
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "accountant", "HR"),
  getAllAttendances
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  updateAttendance
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteAttendance
);

module.exports = router;
