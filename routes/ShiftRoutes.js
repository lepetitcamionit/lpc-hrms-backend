const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createShift,
  getShift,
  getAllShifts,
  updateShift,
  deleteShift,
} = require("../controllers/ShiftController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  createShift
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  getShift
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  getAllShifts
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  updateShift
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  deleteShift
);

module.exports = router;
