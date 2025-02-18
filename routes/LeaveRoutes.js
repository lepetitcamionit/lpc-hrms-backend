const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createLeave,
  getLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
} = require("../controllers/LeaveController");

const router = express.Router();

router.post("/", isAuthenticatedUser, createLeave);
router.get("/:id", isAuthenticatedUser, getLeave);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  getAllLeaves
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner", "supervisor", "HR"),
  updateLeave
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteLeave
);

module.exports = router;
