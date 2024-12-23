const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createBranch,
  getBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
} = require("../controllers/BranchController");

const router = express.Router();

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  createBranch
);
router.get("/:id", isAuthenticatedUser, getBranch);
router.get("/", isAuthenticatedUser, getAllBranches);
router.patch(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  updateBranch
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager", "owner"),
  deleteBranch
);

module.exports = router;
