const express = require("express");
const {
  createShiftSchedule,
  getShiftSchedule,
  getAllShiftSchedules,
  updateShiftSchedule,
  deleteShiftSchedule,
} = require("../controllers/ScheduleController");

const router = express.Router();

router.post("/", createShiftSchedule);
router.get("/:id", getShiftSchedule);
router.get("/", getAllShiftSchedules);
router.put("/:id", updateShiftSchedule);
router.delete("/:id", deleteShiftSchedule);

module.exports = router;
