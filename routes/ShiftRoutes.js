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
  authorizeRoles("admin", "manager", "owner"),
  createShift
);
router.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  getShift
);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  getAllShifts
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateShift
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteShift
);

module.exports = router;
