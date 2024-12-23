const express = require("express");
const {
  createShiftSchedule,
  getShiftSchedule,
  getAllShiftSchedules,
  updateShiftSchedule,
  deleteShiftSchedule,
  getShiftScheduleByEmployee,
} = require("../controllers/ScheduleController");

const router = express.Router();

router.post("/", createShiftSchedule);
router.get("/:id", getShiftSchedule);
router.get("/employee/:employeeId", getShiftScheduleByEmployee);
router.get("/", getAllShiftSchedules);
router.patch("/:id", updateShiftSchedule);
router.delete("/:id", deleteShiftSchedule);

module.exports = router;
