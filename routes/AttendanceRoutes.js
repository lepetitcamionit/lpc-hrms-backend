const express = require("express");
const {
  createAttendance,
  getAttendance,
  getAllAttendances,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/AttendanceController");

const router = express.Router();

router.post("/", createAttendance);
router.get("/:id", getAttendance);
router.get("/", getAllAttendances);
router.patch("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
