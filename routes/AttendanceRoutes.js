const express = require("express");
const {
  createAttendance,
  getAttendance,
  getAllAttendances,
  updateAttendance,
  deleteAttendance,
  getAttendaceByEmployee,
} = require("../controllers/AttendanceController");

const router = express.Router();

router.post("/", createAttendance);
router.get("/:id", getAttendance);
router.get("/employee/:employeeId", getAttendaceByEmployee);
router.get("/", getAllAttendances);
router.patch("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
