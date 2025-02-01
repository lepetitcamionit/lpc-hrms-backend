const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const attendanceRoutes = require("./AttendanceRoutes");
const branchRoutes = require("./BranchRoutes");
const leaveRoutes = require("./LeaveRoutes");
const notificationRoutes = require("./NotificationRoutes");
const payrollRoutes = require("./PayrollRoutes");
const scheduleRoutes = require("./ScheduleRoutes");
const shiftRoutes = require("./ShiftRoutes");
const trainingRoutes = require("./TrainingRoutes");
const userRoutes = require("./UserRoutes");

router.use("/attendance", attendanceRoutes);
router.use("/branch", branchRoutes);
router.use("/leave", leaveRoutes);
router.use("/notification", notificationRoutes);
router.use("/payroll", payrollRoutes);
router.use("/shiftschedule", scheduleRoutes);
router.use("/shift", shiftRoutes);
router.use("/training", trainingRoutes);
router.use("/user", userRoutes);

module.exports = router;
