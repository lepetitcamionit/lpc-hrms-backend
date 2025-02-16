const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createLeave,
  getLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave,
  uploadFile
} = require("../controllers/LeaveController");

const router = express.Router();

router.post("/", isAuthenticatedUser, uploadFile, createLeave);
router.get("/:id", isAuthenticatedUser, getLeave);
router.get(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  getAllLeaves
);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateLeave
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteLeave
);

module.exports = router;
